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
