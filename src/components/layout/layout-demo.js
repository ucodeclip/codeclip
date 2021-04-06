import React from "react";
import styled from "styled-components";
import Header from "../header/header";
import Footer from "../footer/footer";
import GlobalStyle from "../../styles/styled-reset";

const Wrapper = styled.div`
  position: relative;
  background: #ddd;
  color: #232946;
  min-height: 100vh;
  @media screen and (min-width: 813px) {
  }
  @media screen and (max-width: 812px) {
  }
`;
const Contents = styled.div`
  min-height: 100vmax;
  background: #ddd;
  box-sizing: border-box;
  @media screen and (min-width: 813px) {
    width: 90%;
    margin: 0 auto;
    padding: 60px 0;
  }
  @media screen and (max-width: 812px) {
    padding: 16vw 5.333vw 0;
  }
`;

const layoutDemo = ({ children, page }) => {
  return (
    <Wrapper data-page={"demo"}>
      <GlobalStyle />
      <Header page={"demo"} />
      <Contents>{children}</Contents>
      <Footer />
    </Wrapper>
  );
};
export default layoutDemo;
