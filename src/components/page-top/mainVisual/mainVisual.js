import React from "react";
import { css } from "@emotion/react";
import { Color } from "constants/constants";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faTwitter } from "@fortawesome/free-brands-svg-icons";
library.add(faTwitter);

const visual = css`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  background: ${Color.navy.main};
`;
const visualInner = css`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: 1000px;
  width: 90%;
  height: calc(100vh - 300px);
  min-height: 60vmin;
  max-height: 100vmin;
  margin: 0 auto;
`;
const visualBlock = css`
  position: relative;
  text-align: center;
`;
const title = css`
  color: ${Color.white.dark};
  font-size: 3rem;
  font-weight: bold;
`;
const caption = css`
  margin-top: 15px;
  color: ${Color.white.dark};
  font-size: 1.6rem;
  font-weight: bold;
  text-align: center;
`;
const sns = css`
  position: absolute;
  right: 0;
  bottom: 20px;
`;
const twt = css`
  display: inline-block;
  width: 30px;
  height: 30px;
  color: ${Color.blue.twitter};
  font-size: 3rem;
  svg {
    display: block;
  }
`;

const MainVisual = () => {
  return (
    <div css={visual}>
      <div css={visualInner}>
        <div css={visualBlock}>
          <h1 css={title}>Code Clip Blog</h1>
          <p css={caption}>フロントエンドエンジニアの雑記帳</p>
        </div>
        <div css={sns}>
          <a
            css={twt}
            href="https://twitter.com/blog_clip"
            rel="noreferrer"
            target="_blank"
          >
            <FontAwesomeIcon icon={faTwitter} />
          </a>
        </div>
      </div>
    </div>
  );
};

export default MainVisual;
