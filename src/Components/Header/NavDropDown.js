import React from "react";
import { ArrowDropDownRounded, ArrowDropUpOutlined } from "@material-ui/icons";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import { auth } from "../../firebase";
import { logout } from "../../features/userSlice";
import { useDispatch } from "react-redux";

const NavDropDown = () => {
  const history = useHistory();
  const logoutUser = () => {
    console.log("clicked");
    auth
      .signOut()
      .then(() => {
        history.push("/login");
      })
      .catch((e) => {
        alert(e.message);
      });
  };
  return (
    <Container>
      <IconDropDown />
      <DropdownLInks>
        <H6 onClick={(e) => history.push("/setting")}>Setting</H6>
        <H6 onClick={logoutUser}>Sign Out</H6>
      </DropdownLInks>
    </Container>
  );
};

export default NavDropDown;
const Container = styled.div`
  position: absolute;
  padding: 5px;
  z-index: 1000;
`;
const DropdownLInks = styled.div`
  background-color: whitesmoke;
  margin: 15px 0 0 5px;
  padding: 0.1rem 2rem;
  box-shadow: rgba(0, 0, 0, 0.02) 0px 1px 3px 0px,
    rgba(27, 31, 35, 0.15) 0px 0px 0px 1px;
`;

const IconDropDown = styled(ArrowDropUpOutlined)`
  color: gray;
  margin-bottom: 0;
  position: absolute;
  left: 0;
  top: 0;
  padding: 0.3rem;
  transform: scale(1.8);
`;
const H6 = styled.h6`
  font-size: 14px;
  color: gray;
  cursor: pointer;
  margin: 10px 0 8px 0;
  letter-spacing: 1px;
  transition: 0.2s;
  &:hover {
    color: #282b29;
    transition: 0.2s ease-in;
  }
`;
