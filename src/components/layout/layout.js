import React from "react";
import { css } from "@emotion/react";
import Header from "components/header/header";
import Footer from "components/footer/footer";
import StyledReset from "styles/styled-reset";
import StyledBase from "styles/styled-base";
import { Color } from "constants/constants";

const wrapper = css`
  position: relative;
  color: ${Color.navy.main};
`;
const contents = css`
  position: relative;
`;

const layout = ({ children, page }) => {
  return (
    <div css={wrapper} data-page={page}>
      <StyledReset />
      <StyledBase />
      <Header page={page} />
      <div css={contents}>{children}</div>
      <Footer />
    </div>
  );
};
export default layout;
