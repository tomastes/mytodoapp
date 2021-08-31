import { Avatar, IconButton, Switch } from "@material-ui/core";
import { Brightness6, Brightness7 } from "@material-ui/icons";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import logo from "../../assets/Logo.png";
import { selectAppState, setNightMode } from "../../features/appSlice";
import { selectModalState } from "../../features/modalSlice";
import Nav from "./Nav";
import NavDropDown from "./NavDropDown";
const Header = () => {
  const darkModeState = useSelector(selectAppState);
  const dispatch = useDispatch();
  const history = useHistory();
  //handle appmode dark/light
  const handleChange = (event) => {
    dispatch(setNightMode(event.target.checked));
  };
  return (
    <Container darkMode={darkModeState}>
      {" "}
      <Logo onClick={(e) => history.push("/")} src={logo} />
      <NavContainer>
        <Nav />
      </NavContainer>
      <div>
        <IconBtn>
          <Icon1 darkMode={darkModeState} />
        </IconBtn>
        <Switch
          onChange={handleChange}
          color="primary"
          name="checkedB"
          inputProps={{ "aria-label": "primary checkbox" }}
        />
        <IconBtn>
          <Icon2 darkMode={darkModeState} />
        </IconBtn>
      </div>
    </Container>
  );
};

export default Header;

const Container = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  border-bottom: 1px solid #fff;
  background-color: ${(props) =>
    props.darkMode == true ? "#303030" : "whitesmoke"};
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
const IconBtn = styled(IconButton)``;
const Icon1 = styled(Brightness6)`
  color: ${(props) => (props.darkMode == true ? "whitesmoke" : "gray")};
`;
const Icon2 = styled(Brightness7)`
  color: ${(props) => (props.darkMode == true ? "whitesmoke" : "gray")};
`;
