import { Avatar } from "@material-ui/core";
import React, { useState } from "react";
import styled from "styled-components";
import NavDropDown from "./NavDropDown";
import { NavLink } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase";

const Nav = () => {
  const [user] = useAuthState(auth);
  const [showDropDown, setShowDropDown] = useState(false);
  return (
    <NavContainer>
      {user ? (
        <>
          <Div1 onMouseOver={(e) => setShowDropDown(true)}>
            <Avatar src={user?.photoURL} />
            <Div2>
              <P>{`hey, ${user?.displayName}`}</P>
            </Div2>
          </Div1>
          {showDropDown && (
            <div onMouseLeave={(e) => setShowDropDown(!showDropDown)}>
              <NavDropDown />
            </div>
          )}
        </>
      ) : (
        <Link to="/login">Login</Link>
      )}
    </NavContainer>
  );
};

export default Nav;
const NavContainer = styled.nav``;

const Div1 = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
`;
const Div2 = styled.li`
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
  margin-bottom: 15px;
  margin-left: 5px;
`;
const Link = styled(NavLink)`
  list-style: none;
  text-decoration: none;
  color: gray;
  font-size: ${(props) => (props.profile ? "12px" : "20px")};
  font-style: ${(props) => (props.profile ? "italic" : "none")};
  margin-top: 4px;
  &:hover {
    border-bottom: 1px solid gray;
    color: #171515;
  }
`;
const P = styled.p`
  margin-bottom: 0;
  font-size: 18px;
  color: gray;
  text-transform: capitalize;
  font-weight: 500;
`;
