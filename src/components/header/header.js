import React from "react";
import { Link } from "gatsby";
import { css } from "@emotion/react";
import { Color } from "constants/constants";

const header = css`
  position: absolute;
  top: 0;
  left: 0;
  z-index: 100;
  width: 100%;
  background: #232946;
  height: 60px;
`;
const inner = css`
  display: flex;
  align-items: center;
  height: 100%;
  max-width: 1000px;
  width: 90%;
  margin: 0 auto;
  box-sizing: border-box;
`;
const logo = css`
  color: ${Color.white.dark};
  font-weight: bold;
  font-size: 1.6rem;
`;

const HeaderModule = ({ page }) => {
  if (page === "top") {
    return null;
  }
  return (
    <header id="header" css={header} page={page}>
      <div css={inner}>
        <Link css={logo} to="/">
          Code Clip Blog
        </Link>
      </div>
    </header>
  );
};

export default HeaderModule;
