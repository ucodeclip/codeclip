import React from "react";
import { css } from "@emotion/react";
import Header from "components/header/header";
import Footer from "components/footer/footer";
import StyledReset from "styles/styled-reset";
import StyledBase from "styles/styled-base";
import { Color } from "constants/constants";

const wrapper = css`
  position: relative;
  background: ${Color.gray.dark};
  color: ${Color.navy.main};
  min-height: 100vh;
`;
const contents = css`
  min-height: 100vmax;
  background: ${Color.gray.dark};
  box-sizing: border-box;
  width: 90%;
  max-width: 1000px;
  margin: 0 auto;
  padding: 60px 0;
`;

const layoutDemo = ({ children }) => {
  return (
    <div css={wrapper} data-page={"demo"}>
      <StyledReset />
      <StyledBase />
      <Header page={"demo"} />
      <div css={contents}>{children}</div>
      <Footer />
    </div>
  );
};
export default layoutDemo;
