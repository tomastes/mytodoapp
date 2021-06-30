import { Avatar } from "@material-ui/core";
import React from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import logo from "../../assets/Logo.png";
import Nav from "./Nav";
import NavDropDown from "./NavDropDown";
const Header = () => {
  const history = useHistory();
  return (
    <Container>
      {" "}
      <Logo onClick={(e) => history.push("/")} src={logo} />
      <NavContainer>
        <Nav />
      </NavContainer>
    </Container>
  );
};

export default Header;

const Container = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  border-bottom: 1px solid #fff;
  background-color: whitesmoke;
  position: sticky;
  top: 0;
  z-index: 1000;
`;
const NavContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  padding: 5px;
  align-items: center;
  padding: 15px;
`;
const Logo = styled.img`
  cursor: pointer;
  height: 3rem;

  @media (max-width: 640px) {
    height: 1.5rem;
  }
`;
