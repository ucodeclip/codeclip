import React from "react";
import { Global, css } from "@emotion/react";
const global = css`
  html,
  body {
    font-family: "Helvetica Neue", Arial, "Hiragino Kaku Gothic ProN",
      "Hiragino Sans", Meiryo, sans-serif;
    line-height: 1.5;
    letter-spacing: 0.04em;
  }
  strong {
    font-weight: bold;
  }
`;

const StyledBase = () => {
  return <Global styles={global} />;
};

export default StyledBase;
