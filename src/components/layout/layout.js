import React from "react";
import styled from "@emotion/styled";
import Header from "../header/header";
import Footer from "../footer/footer";
import StyledReset from "../../styles/styled-reset";

const Wrapper = styled.div`
  position: relative;
  color: #232946;
  @media screen and (min-width: 813px) {
  }
  @media screen and (max-width: 812px) {
  }
`;
const Contents = styled.div`
  position: relative;
  @media screen and (min-width: 813px) {
  }
  @media screen and (max-width: 812px) {
  }
`;

const layout = ({ children, page }) => {
  return (
    <Wrapper data-page={page}>
      <StyledReset />
      <Header page={page} />
      <Contents>{children}</Contents>
      <Footer />
    </Wrapper>
  );
};
export default layout;
