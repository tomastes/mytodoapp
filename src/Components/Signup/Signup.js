import { Button } from "@material-ui/core";
import { AddCircleSharp, Label, Remove } from "@material-ui/icons";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import db, { auth, storage } from "../../firebase";
import Counter from "../../utils/Counter";
import CircularProgress from "@material-ui/core/CircularProgress";

const Signup = () => {
  const history = useHistory();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  // states
  const [todoAmount, setTodoAmount] = useState(10);
  const [noPwMatch, setNoPwMatch] = useState(false);
  const [loading, setLoading] = useState(false);
  // addamount
  const addAmountBtnClicked = () => {
    setTodoAmount((todoAmount) => (todoAmount += 1));
  };
  // remove amount
  const removeAmountBtnClicked = () => {
    setTodoAmount((todoAmount) => (todoAmount -= 1));
    todoAmount <= 1 && setTodoAmount(1);
  };
  // sign in
  const signUpHandler = (data) => {
    if (data.password !== data.confirmPassword) {
      return setNoPwMatch(true);
    }
    setLoading(true);
    //upload image
    const uploadTask = storage
      .ref(`profileImages/${data.profilePic[0]?.name}`)
      .put(data.profilePic[0]);
    //get image url
    uploadTask.on(
      "state_changed",
      (snapshot) => {},
      (error) => alert(error.message),
      () => {
        storage
          .ref("profileImages")
          .child(data.profilePic[0]?.name)
          .getDownloadURL()
          .then((url) => {
            //register user
            auth
              .createUserWithEmailAndPassword(data.email, data.password)
              .then((userAuth) => {
                // udpate userprofile
                userAuth.user
                  .updateProfile({
                    displayName: data.fullname,
                    photoURL: url,
                  })
                  .then(() => {
                    // add max todos
                    db.collection("todos")
                      .doc(userAuth?.user.uid)
                      .set({
                        maxTodo: parseInt(todoAmount),
                      });
                  });

                setLoading(false);
                history.push("/");
              })
              .catch((error) => {
                setLoading(false);
                alert(error.message);
              });
          });
      }
    );

    setNoPwMatch(false);
  };
  return (
    <Container>
      <Title>Welcome</Title>
      <Form onSubmit={handleSubmit(signUpHandler)}>
        <Input
          {...register("fullname", { required: true })}
          placeholder="username"
        />
        {errors.fullname?.type === "required" && (
          <Span error>name is required.</Span>
        )}
        <Input {...register("email", { required: true })} placeholder="email" />
        {errors.email?.type === "required" && (
          <Span error>email is required.</Span>
        )}
        <Input
          type="password"
          {...register("password", { required: true })}
          placeholder="password"
        />
        {errors.password?.type === "required" && (
          <Span error>password is required.</Span>
        )}
        <Input
          type="password"
          {...register("confirmPassword", { required: true })}
          placeholder="confirm Password"
        />
        {errors.password?.type === "required" && (
          <Span error>password is required.</Span>
        )}
        {noPwMatch && <Span error>password doesn't match.</Span>}
        <P> profile photo </P>
        <Input
          {...register("profilePic", { required: true })}
          file
          type="file"
        />
        {errors.profilePic?.type === "required" && (
          <Span error>profilePic is required.</Span>
        )}
        <Counter
          addAmountBtnClicked={addAmountBtnClicked}
          removeAmountBtnClicked={removeAmountBtnClicked}
          todoAmount={todoAmount}
        />
        <BtnSubmit type="submit">
          {" "}
          {loading && <CircularProgress color="secondary" />}
          sign up
        </BtnSubmit>
      </Form>
    </Container>
  );
};

export default Signup;
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  align-content: space-around;
  background-color: white;
  padding: 10px;
  width: 28rem;
  margin: auto;
  margin-top: 5rem;
  box-shadow: rgba(17, 12, 46, 0.15) 0px 48px 100px 0px;
  @media (max-width: 640px) {
    width: 90%;
  }
`;
const Title = styled.h2`
  flex: 1;
  color: gray;
  text-transform: uppercase;
  font-weight: 900;
  letter-spacing: 1px;
`;
const Form = styled.form`
  flex: 2;
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 15px;
`;
const Input = styled.input`
  margin-bottom: 10px;
  width: 100%;
  height: 46px;
  font-size: 12px;
  border: none;
  border-bottom: ${(props) => (props.file ? "none" : "1px solid gray")};
  transition: 0.3s all;
  outline: none;

  :focus {
    border-bottom: 2px solid #383c42;
  }
`;
const BtnSubmit = styled(Button)`
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  margin: 1rem 1rem !important;
  font-weight: 600 !important;
  color: gray !important;
  background-color: #8ec5fc;
  background-image: linear-gradient(62deg, #8ec5fc 0%, #e0c3fc 100%);
`;
const P = styled.p`
  font-family: Arial, Helvetica, sans-serif;
  color: grey;
  margin-right: 1rem;
  font-size: 16px;
`;
const Span = styled.span`
  font-size: 12px;
  font-style: italic;
  color: ${(props) => (props.error ? "#8f1818" : "gray")};
`;
