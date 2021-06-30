import React from "react";
import styled from "styled-components";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";
import { ImGithub } from "react-icons/im";
import { AiFillApple } from "react-icons/ai";
import { Button, IconButton } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import db, { auth } from "../../firebase";
import firebase from "firebase";
const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const history = useHistory();
  const loginWithemail = ({ email, password }) => {
    auth
      .signInWithEmailAndPassword(email, password)
      .then(() => history.push("/setting"))
      .catch((e) => alert(e.message));
  };
  // login with google
  const loginWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth
      .signInWithPopup(provider)
      .then(({ user }) => {
        history.push("/setting");
      })
      .catch((e) => {
        alert(e.message);
      });
  };
  // login with fb
  const loginWithFb = () => {
    const provider = new firebase.auth.FacebookAuthProvider();
    auth
      .signInWithPopup(provider)
      .then((res) => history.replace("/"))
      .catch((e) => alert(e.message));
  };
  return (
    <Container>
      <Title>Welcome</Title>
      <Form onSubmit={handleSubmit(loginWithemail)}>
        <Input
          {...register("email", { required: true })}
          type="email"
          placeholder="email"
        />

        <Input
          {...register("password", { required: true })}
          type="password"
          placeholder="password"
        />
        <LoginButton type="submit"> LOGIN</LoginButton>
      </Form>
      <P>or sign in with</P>
      <IconsContainer>
        <IconButton onClick={loginWithGoogle}>
          <GoogleIcon />
        </IconButton>
        <IconButton>
          <AppleIcon />
        </IconButton>
        <IconButton onClick={loginWithFb}>
          <FbIcon />
        </IconButton>
        <IconButton>
          <GitIcon />
        </IconButton>
      </IconsContainer>
      <P>
        Don't Have an account?{" "}
        <Span onClick={(e) => history.push("/signup")}>Sign Up</Span>
      </P>
    </Container>
  );
};

export default Login;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  align-content: space-around;
  background-color: white;
  padding: 10px;
  width: 20rem;
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
  border-bottom: 1px solid gray;
  transition: 0.3s all;
  outline: none;

  :focus {
    border-bottom: 2px solid #383c42;
  }
`;
const LoginButton = styled(Button)`
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  margin: 1rem 1rem !important;
  font-weight: 600 !important;
  color: gray !important;
  background-color: #8ec5fc;
  background-image: linear-gradient(62deg, #8ec5fc 0%, #e0c3fc 100%);
`;

const IconsContainer = styled.div`
  margin-bottom: 1rem;
`;
const GoogleIcon = styled(FcGoogle)`
  font-size: 2rem;
`;
const FbIcon = styled(FaFacebook)`
  font-size: 2rem;
  color: #1877f2;
`;
const GitIcon = styled(ImGithub)`
  font-size: 2rem;
  color: gray;
`;
const AppleIcon = styled(AiFillApple)`
  font-size: 2rem;
  color: black;
`;
const P = styled.p`
  font-family: Arial, Helvetica, sans-serif;
  text-transform: capitalize;
`;
const Span = styled.span`
  color: #201b7d;
  cursor: pointer;
  font-style: oblique;
  :hover {
    border-bottom: 1px solid #201b7d;
  }
`;
