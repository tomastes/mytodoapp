import React from "react";
import styled from "styled-components";
import Footer from "../Components/Footer/Footer";
import Header from "../Components/Header/Header";

const Layout = ({ children }) => {
  return (
    <Container>
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
  background-color: white;
`;
