import React from "react";
import { Link } from "gatsby";
import { css } from "@emotion/react";
import Tag from "components/tag/tag";
import Date from "components/date/date";
import { Color } from "constants/constants";
import { mq } from "styles/styled-function";

const article = css`
  position: relative;
  background: #fffffe;
  color: ${Color.navy.main};
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
  border-radius: 3px;
  & + & {
    margin-top: 24px;
  }
  ${mq("max", "md")} {
    padding: 5%;
    & + & {
      margin-top: 5%;
    }
  }
  ${mq("min", "md")} {
    max-width: 1000px;
    width: 100%;
    margin: 0 auto;
    padding: 20px 3%;
    box-sizing: border-box;
    transition: background-color 0.2s ease-in-out;
    &:hover {
      background: rgba(35, 41, 70, 0.1);
    }
  }
`;
const articleTitle = css`
  color: inherit;
  font-size: 2rem;
  font-weight: bold;
`;
const articleText = css`
  color: inherit;
  margin-top: 10px;
  font-size: 1.6rem;
`;
const articleLink = css`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: block;
  color: inherit;
  z-index: 5;
`;

const dateWrap = css`
  margin-top: 10px;
`;

const ArticleModule = (props) => {
  const slug = "/blog/" + props.content.node.frontmatter.slug;
  const formatter = props.content.node.frontmatter;
  const title = formatter.title;
  const text = props.content.node.excerpt;
  const date = formatter.date;
  const update = formatter.update;
  const tags = formatter.tag;

  return (
    <article css={article}>
      <Link css={articleLink} to={slug}></Link>
      <h2 css={articleTitle}>{title}</h2>
      <p css={articleText}>{text}</p>
      <div css={dateWrap}>
        <Date date={date} update={update} />
      </div>
      <Tag tags={tags} />
    </article>
  );
};

export default ArticleModule;
