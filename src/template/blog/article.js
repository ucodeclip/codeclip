import React from "react";
import { graphql } from "gatsby";
import styled from "styled-components";
import { calcSpVw } from "../../styles/styled-function";
import Layout from "../../components/layout/layout";
import SEO from "../../components/seo/seo";
import Tag from "../../components/page-blog-article/tag";
import Date from "../../components/page-blog-article/date";
import Pager from "../../components/page-blog-article/pager";

const Main = styled.main`
  display: block;
  box-sizing: border-box;
  background: #fff;
  @media screen and (min-width:813px) {
    padding: 0 0 60px;
    min-height: calc(100vh - 60px);
    /* &::before {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 200px;
      background: #232946;
    } */
  }
  @media screen and (max-width:812px) {
    padding: 0 0 ${calcSpVw(60)};
    min-height: calc(100vh - ${calcSpVw(60)});
    /* &::before {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: ${calcSpVw(400)};
      background: #232946;
    } */
  }
`;
const ArticleHead = styled.div`
  position: relative;
  background: #232946;
  @media screen and (min-width: 813px) {
    padding: 100px 0 60px;
  }
  @media screen and (max-width: 812px) {
    padding: ${calcSpVw(180)} 0 ${calcSpVw(60)};
  }
`;
const ArticleHeadContainer = styled.div`
  font-weight: bold;
  margin: 0 auto;
  color: #fff;
  @media screen and (min-width: 813px) {
    max-width: 1000px;
    width: 90%;
    padding: 0 3%;
  }
  @media screen and (max-width: 812px) {
    width: 90%;
    padding: 0 3%;
  }
`;
const Title = styled.h1`
  font-weight: bold;
  color: #fff;
  @media screen and (min-width: 813px) {
    padding-bottom: 30px;
    font-size: 30px;
  }
  @media screen and (max-width: 812px) {
    padding-bottom: ${calcSpVw(60)};
    font-size: ${calcSpVw(50)};
  }
`;
const Article = styled.article`
  position: relative;
  margin: 0 auto;
  background: #fffffe;
  box-sizing: border-box;
  @media screen and (min-width: 813px) {
    max-width: 1000px;
    width: 90%;
    padding: 60px 0;
  }
  @media screen and (max-width: 812px) {
    width: 90%;
    padding: ${calcSpVw(80)} 0;
  }
`;
const ArticleBody = styled.div`
  .language-text {
    white-space: -moz-pre-wrap;
    white-space: -pre-wrap;
    white-space: -o-pre-wrap;
    white-space: pre-wrap;
    word-wrap: break-word;
  }
  @media screen and (min-width: 813px) {
    font-size: 16px;
    > *:first-child {
      margin-top: 0 !important;
    }
    h2 {
      margin-top: 40px;
      padding: 10px 15px;
      background: #f5f5f5;
      border-left: 5px solid #232946;
      box-sizing: border-box;
      font-size: 20px;
      line-height: 1.5;
      font-weight: bold;
    }
    h3 {
      margin-top: 30px;
      padding: 10px 0;
      border-bottom: 3px solid #232946;
      box-sizing: border-box;
      font-size: 20px;
      line-height: 1.5;
      font-weight: bold;
    }
    p {
      margin-top: 20px;
    }
    ul {
      margin-top: 20px;
      li {
        position: relative;
        margin-top: 10px;
        padding-left: 2rem;
        &::before {
          content: "";
          position: absolute;
          top: 10px;
          left: 1rem;
          width: 5px;
          height: 3px;
          background: #ddd;
        }
      }
    }
    .gatsby-code-title {
      display: inline-block;
      margin-top: 20px;
      margin-bottom: -0.5rem;
      padding: 0.2em 0.5em;
      border-radius: 2px 2px 0 0;
      background-color: #fca451;
      font-family: Consolas, Monaco, "Andale Mono", "Ubuntu Mono", monospace;
      font-size: 0.8em;
      color: #fff;
      + .gatsby-highlight {
        margin-top: 0;
      }
    }
    .gatsby-highlight {
      margin-top: 20px;
    }
    .gatsby-resp-image-wrapper {
      margin-bottom: 40px;
    }
    a {
      color: #4ab4fc;
      text-decoration: underline;
      word-break: break-all;
    }
  }
  @media screen and (max-width: 812px) {
    > *:first-child {
      margin-top: 0 !important;
    }
    h2 {
      margin-top: ${calcSpVw(80)};
      padding: ${calcSpVw(15)} ${calcSpVw(30)};
      background: #f5f5f5;
      border-left: ${calcSpVw(10)} solid #232946;
      box-sizing: border-box;
      font-size: ${calcSpVw(40)};
      font-weight: bold;
    }
    h3 {
      margin-top: ${calcSpVw(60)};
      padding: ${calcSpVw(15)} ${calcSpVw(0)};
      border-bottom: ${calcSpVw(6)} solid #232946;
      box-sizing: border-box;
      font-size: ${calcSpVw(40)};
      font-weight: bold;
    }
    p {
      margin-top: ${calcSpVw(40)};
    }
    ul {
      margin-top: ${calcSpVw(40)};
      li {
        position: relative;
        margin-top: ${calcSpVw(20)};
        padding-left: 2rem;
        &::before {
          content: "";
          position: absolute;
          top: ${calcSpVw(20)};
          left: 1rem;
          width: ${calcSpVw(10)};
          height: ${calcSpVw(6)};
          background: #ddd;
        }
      }
    }
    .gatsby-code-title {
      display: inline-block;
      margin-top: ${calcSpVw(40)};
      margin-bottom: -0.5rem;
      padding: 0.2em 0.5em;
      border-radius: ${calcSpVw(4)} ${calcSpVw(4)} 0 0;
      background-color: #fca451;
      font-family: Consolas, Monaco, "Andale Mono", "Ubuntu Mono", monospace;
      font-size: 0.8em;
      color: #fff;
      + .gatsby-highlight {
        margin-top: 0;
      }
    }
    .gatsby-highlight {
      margin-top: ${calcSpVw(40)};
    }
    .gatsby-resp-image-wrapper {
      margin-bottom: ${calcSpVw(80)};
    }
    a {
      color: #4ab4fc;
      text-decoration: underline;
      word-break: break-all;
    }
  }
`;

const BlogArticlePage = props => {
  const pageContext = props.pageContext;
  const pageInfo = props.data.allMarkdownRemark.pageInfo;
  const htmlContents = props.data.markdownRemark.html;
  const title = props.data.markdownRemark.frontmatter.title;
  const date = props.data.markdownRemark.frontmatter.date;
  const update = props.data.markdownRemark.frontmatter.update;
  const tag = props.data.markdownRemark.frontmatter.tag;
  const excerpt = props.data.markdownRemark.excerpt;
  const path = props.location.pathname;

  return (
    <Layout page="blog-article">
      <SEO title={title} description={excerpt} type="article" path={path} />
      <Main>
        <ArticleHead>
          <ArticleHeadContainer>
            <Title>{title}</Title>
            <Date date={date} update={update} />
            <Tag tag={tag} />
          </ArticleHeadContainer>
        </ArticleHead>
        <Article>
          <ArticleBody
            dangerouslySetInnerHTML={{ __html: htmlContents }}
          ></ArticleBody>
        </Article>
        <Pager pageInfo={pageInfo} pageContext={pageContext} />
      </Main>
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
