import React from "react";
import { css } from "@emotion/react";
import { Color } from "constants/constants";

const footer = css`
  width: 100%;
  background: #232946;
  color: #fffffe;
`;
const footerInner = css`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  box-sizing: border-box;
  height: 40px;
`;

const footerCopy = css`
  color: ${Color.white.dark};
  font-size: 1.2rem;
`;

const FooterModule = () => {
  return (
    <footer css={footer}>
      <div css={footerInner}>
        <small css={footerCopy}>&copy; 2021 CodeClipBlog</small>
      </div>
    </footer>
  );
};

export default FooterModule;
