import React from "react";
import { css } from "@emotion/react";
import Article from "components/archive/article/article";
import { calcSpVw, mq } from "styles/styled-function";

const wrapper = css`
  box-sizing: border-box;
  width: 90%;
  margin: 0 auto;
  padding: 5% 0;
  ${mq("max", "md")} {
    min-height: calc(100vh - ${calcSpVw(400)} - ${calcSpVw(160)});
  }
  ${mq("min", "md")} {
    min-height: calc(100vh - 30vh - 60px);
  }
`;

const ArticleWrapModule = (props) => {
  return (
    <div css={wrapper}>
      {props.data.allMarkdownRemark.edges.map((v, i) => {
        return <Article content={v} key={i} />;
      })}
    </div>
  );
};

export default ArticleWrapModule;
