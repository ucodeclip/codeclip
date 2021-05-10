import React from "react";
import { graphql } from "gatsby";
import { css } from "@emotion/react";
import Layout from "components/layout/layout";
import Seo from "components/seo/seo";
import Tag from "components/tag/tag";
import Date from "components/date/date";
import Pager from "components/pager/pager";
import { Color } from "constants/constants";

const main = css`
  display: block;
  box-sizing: border-box;
  background: ${Color.white.dark};
  padding: 0 0 60px;
  min-height: calc(100vh - 60px);
`;
const articleHead = css`
  position: relative;
  background: ${Color.navy.main};
  padding: 80px 0 50px;
`;
const articleHeadContainer = css`
  max-width: 1000px;
  width: 90%;
  margin: 0 auto;
  padding: 0 3%;
  color: ${Color.white.main};
  font-weight: bold;
`;
const articleTitle = css`
  color: ${Color.white.main};
  font-size: 2.4rem;
  font-weight: bold;
`;
const articleDate = css`
  margin-top: 30px;
  color: ${Color.white.main};
`;
const article = css`
  position: relative;
  margin: 0 auto;
  background: ${Color.white.dark};
  box-sizing: border-box;
  max-width: 1000px;
  width: 90%;
  padding: 60px 0;
`;
const articleBody = css`
  font-size: 1.6rem;
  > * + h2 {
    margin-top: 40px;
  }
  > * + h3 {
    margin-top: 30px;
  }
  > * + p {
    margin-top: 20px;
  }
  h2,
  h3 {
    box-sizing: border-box;

    line-height: 1.5;
    font-weight: bold;
  }
  h2 {
    font-size: 2rem;
    padding: 10px 15px;
    background: ${Color.gray.dark};
    border-left: 5px solid ${Color.navy.main};
  }
  h3 {
    font-size: 1.8rem;
    padding: 10px 0;
    border-bottom: 3px solid ${Color.navy.main};
  }
  p {
    font-size: 1.6rem;
  }
  ul {
    margin-top: 20px;
    li {
      position: relative;
      margin-top: 10px;
      padding-left: 2rem;
      font-size: 1.6rem;
      &::before {
        content: "";
        position: absolute;
        top: 10px;
        left: 1rem;
        width: 5px;
        height: 3px;
        background: ${Color.navy.main};
        transform: translate(-50%, 0);
      }
    }
  }
  a {
    color: ${Color.blue.light};
    text-decoration: underline;
    word-break: break-all;
    font-size: 1.6rem;
  }
  del {
    font-size: 1.6rem;
  }
  .language-text {
    white-space: -moz-pre-wrap;
    white-space: -pre-wrap;
    white-space: -o-pre-wrap;
    white-space: pre-wrap;
    word-wrap: break-word;
  }
  .gatsby-code-title {
    display: inline-block;
    margin-top: 20px;
    margin-bottom: -0.5rem;
    padding: 0.2em 0.5em;
    border-radius: 2px 2px 0 0;
    background-color: #fca451;
    font-family: Consolas, Monaco, "Andale Mono", "Ubuntu Mono", monospace;
    font-size: 1.2rem;
    color: #fff;
    + .gatsby-highlight {
      margin-top: 0;
    }
  }
  .gatsby-highlight {
    margin-top: 20px;
    * {
      font-size: 1.6rem;
    }
    pre {
      margin-top: 0.5rem;
    }
  }
  .gatsby-resp-image-wrapper {
    margin-bottom: 40px;
  }
`;

const BlogArticlePage = (props) => {
  const pageContext = props.pageContext;
  const pageInfo = props.data.allMarkdownRemark.pageInfo;
  const htmlContents = props.data.markdownRemark.html;
  const title = props.data.markdownRemark.frontmatter.title;
  const date = props.data.markdownRemark.frontmatter.date;
  const update = props.data.markdownRemark.frontmatter.update;
  const tags = props.data.markdownRemark.frontmatter.tag;
  const excerpt = props.data.markdownRemark.excerpt;
  const path = props.location.pathname;

  return (
    <Layout page="blog-article">
      <Seo title={title} description={excerpt} type="article" path={path} />
      <main css={main}>
        <div css={articleHead}>
          <div css={articleHeadContainer}>
            <h1 css={articleTitle}>{title}</h1>
            <div css={articleDate}>
              <Date date={date} update={update} />
            </div>
            <Tag tags={tags} />
          </div>
        </div>
        <article css={article}>
          <div
            css={articleBody}
            dangerouslySetInnerHTML={{ __html: htmlContents }}
          ></div>
        </article>
        <Pager pageInfo={pageInfo} pageContext={pageContext} />
      </main>
    </Layout>
  );
};

export const query = graphql`
  query blogQuery($id: String!, $number: Int) {
    allMarkdownRemark(
      sort: { fields: frontmatter___date, order: DESC }
      limit: 1
      skip: $number
    ) {
      pageInfo {
        currentPage
        hasNextPage
        hasPreviousPage
        pageCount
        perPage
      }
    }
    markdownRemark(id: { eq: $id }) {
      frontmatter {
        date(formatString: "YYYY-MM-DD")
        update(formatString: "YYYY-MM-DD")
        slug
        tag
        title
      }
      html
      excerpt(pruneLength: 200)
    }
  }
`;

export default BlogArticlePage;
