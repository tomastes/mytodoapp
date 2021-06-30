import { Button } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import db, { auth } from "../../firebase";
import Counter from "../../utils/Counter";
import { useAuthState } from "react-firebase-hooks/auth";
import { useHistory } from "react-router-dom";
const Setting = () => {
  const history = useHistory();
  const [user] = useAuthState(auth);
  const [todoAmount, setTodoAmount] = useState(10);
  const [maxAmount, setMaxAmount] = useState(null);
  useEffect(() => {
    db.collection("todos")
      .doc(user.uid)
      .get()
      .then((doc) => {
        setMaxAmount(doc.data()?.maxTodo);
      });
  });
  // addamount
  const addAmountBtnClicked = () => {
    setTodoAmount((todoAmount) => (todoAmount += 1));
  };
  // remove amount
  const removeAmountBtnClicked = () => {
    setTodoAmount((todoAmount) => (todoAmount -= 1));
    todoAmount <= 1 && setTodoAmount(1);
  };
  // updateMaxtodos
  const updateMaxtodos = () => {
    db.collection("todos")
      .doc(user.uid)
      .set({
        maxTodo: parseInt(todoAmount),
      })
      .then(() => {
        history.push("/");
      });
  };
  return (
    <Container>
      <Div1>
        <P>
          currently you can add up to <span>{maxAmount}</span> todos{" "}
        </P>
        <Counter
          addAmountBtnClicked={addAmountBtnClicked}
          removeAmountBtnClicked={removeAmountBtnClicked}
          todoAmount={todoAmount}
          column
        />
        <BtnConfigure onClick={updateMaxtodos}>Configure</BtnConfigure>
      </Div1>
    </Container>
  );
};

export default Setting;
const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 60vh;
`;
const Div1 = styled.div`
  background-color: whitesmoke;
  padding: 1rem;
  min-width: 15rem;
  box-shadow: rgba(17, 17, 26, 0.1) 0px 4px 16px,
    rgba(17, 17, 26, 0.1) 0px 8px 24px, rgba(17, 17, 26, 0.1) 0px 16px 56px;
`;
const BtnConfigure = styled(Button)`
  width: 100%;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  margin: 1rem 0 !important;
  font-weight: 600 !important;
  color: gray !important;
  background-color: #8ec5fc;
  background-image: linear-gradient(62deg, #8ec5fc 0%, #e0c3fc 100%);
`;
const P = styled.p`
  margin: 0;
  color: gray;
  font-weight: 900;
  span {
    font-size: 28px;
    color: green !important;
  }
`;
