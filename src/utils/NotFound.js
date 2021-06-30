import React from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
const NotFound = () => {
  return (
    <Container>
      <Div1>
        Oops! page not found. <br /> <NavLink to="/">home</NavLink>{" "}
      </Div1>
    </Container>
  );
};

export default NotFound;
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
const BtnConfigure = styled.button`
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
