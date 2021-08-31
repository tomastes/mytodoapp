import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import Footer from "../Components/Footer/Footer";
import Header from "../Components/Header/Header";
import { selectAppState } from "../features/appSlice";

const Layout = ({ children }) => {
  const darkModeState = useSelector(selectAppState);
  return (
    <Container nightMode={darkModeState}>
      <Header />
      <main>{children}</main>
      <Footer />
    </Container>
  );
};

export default Layout;

const Container = styled.div`
  max-width: 1280px;
  width: 100%;
  height: 100vh;
  margin: auto;
  background-color: ${(props) => (props.nightMode == true ? "black" : "white")};
`;
