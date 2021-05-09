import React from "react";
import { css } from "@emotion/react";
import { Color } from "constants/constants";

const visual = css`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  background: ${Color.navy.main};
  height: 30vh;
  min-height: 200px;
  margin: 0 auto;
`;

const visualBlock = css`
  position: relative;
  text-align: center;
`;
const title = css`
  color: ${Color.white.dark};
  font-weight: bold;
  font-size: 2.4rem;
`;

const MainVisual = (props) => {
  return (
    <div css={visual}>
      <div css={visualBlock}>
        <h1 css={title}>Tag: {props.tag} 一覧</h1>
      </div>
    </div>
  );
};

export default MainVisual;
