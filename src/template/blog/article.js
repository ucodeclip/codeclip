import React from "react"
import { graphql } from "gatsby"
import styled from "styled-components"
import { calcSpVw } from '../../styles/styled-function'
import Layout from "../../components/layout/layout";
import SEO from "../../components/seo/seo"
import Tag from "../../components/page-blog-article/tag"
import Pager from "../../components/page-blog-article/pager"

const Main = styled.main`
  box-sizing: border-box;
  background: #f9f9f9;
  @media screen and (min-width:813px) {
    padding: 100px 0 60px;
    min-height: calc(100vh - 60px);
    &::before {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 200px;
      background: #232946;
    }
  }
  @media screen and (max-width:812px) {
    padding: ${calcSpVw(120)} 0 ${calcSpVw(60)};
    min-height: calc(100vh - ${calcSpVw(60)});
    &::before {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: ${calcSpVw(400)};
      background: #232946;
    }
  }
`
const Article = styled.article`
  position: relative;
  margin: 0 auto;
  background: #fffffe;
  box-sizing: border-box;
  @media screen and (min-width:813px) {
    max-width: 1000px;
    width: 90%;
    border-radius: 5px;
    padding: 60px 3%;
    box-shadow: 0 0 3px rgba(0,0,0,.3);
  }
  @media screen and (max-width:812px) {
    width: 90%;
    border-radius: ${calcSpVw(10)};
    padding: ${calcSpVw(50)} 3%;
    box-shadow: 0 0 ${calcSpVw(6)} rgba(0,0,0,.3);
  }
`
const ArticleHead = styled.div`
  position: relative;
  @media screen and (min-width:813px) {
  }
  @media screen and (max-width:812px) {
  }
`
const Title = styled.h1`
  font-weight: bold;
  @media screen and (min-width:813px) {
    font-size: 30px;
  }
  @media screen and (max-width:812px) {
    font-size: ${calcSpVw(50)}
  }
`
const Info = styled.div`
  @media screen and (min-width:813px) {
    display: flex;
    align-items: center;
    margin-top: 30px;
  }
  @media screen and (max-width:812px) {
    margin-top: ${calcSpVw(30)};
  }
`
const Date = styled.div`
  @media screen and (min-width:813px) {
    font-size: 14px;
  }
  @media screen and (max-width:812px) {
    font-size: ${calcSpVw(28)};
  }
`

const ArticleBody = styled.div`
  .language-text {
    white-space: -moz-pre-wrap;
    white-space: -pre-wrap;
    white-space: -o-pre-wrap;
    white-space: pre-wrap;
    word-wrap: break-word;
  }
  @media screen and (min-width:813px) {
    margin-top: 50px;
    font-size: 16px;
    > *:first-child {
      margin-top: 0!important;
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
          background:#ddd;
        }
      }
    }
    .gatsby-code-title {
      display: inline-block;
      margin-top: 20px;
      margin-bottom: -.5rem;
      padding: .2em .5em;
      border-radius: 2px 2px 0 0;
      background-color: #FCA451;
      font-family: Consolas, Monaco, 'Andale Mono', 'Ubuntu Mono', monospace;
      font-size: .8em;
      color: #fff;
    }
    .gatsby-resp-image-wrapper {
      margin-bottom: 40px;
    }
    a {
      position: relative;
      color: #4ab4fc;
      cursor: pointer;
      &::before {
        content: "";
        position: absolute;
        width: 100%;
        height: 1px;
        bottom: 0;
        background: #4ab4fc;
      }
      &:hover {
        &::before {
          opacity: 0
        }
      }
    }
  }
  @media screen and (max-width:812px) {
    margin-top: ${calcSpVw(100)};
    > *:first-child {
      margin-top: 0!important;
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
          background:#ddd;
        }
      }
    }
    .gatsby-code-title {
      display:inline-block;
      margin-top: ${calcSpVw(40)};
      margin-bottom: -.5rem;
      padding: .2em .5em;
      border-radius: ${calcSpVw(4)} ${calcSpVw(4)} 0 0;
      background-color: #FCA451;
      font-family: Consolas, Monaco, 'Andale Mono', 'Ubuntu Mono', monospace;
      font-size: .8em;
      color: #fff;
    }
    .gatsby-resp-image-wrapper {
      margin-bottom: ${calcSpVw(80)};
    }
    a {
      color: #4ab4fc;
      text-decoration: underline;
    }
  }
`

const BlogArticlePage = (props) => {
  const pageContext = props.pageContext;
  const pageInfo = props.data.allMarkdownRemark.pageInfo;
  const htmlContents = props.data.markdownRemark.html;
  const title = props.data.markdownRemark.frontmatter.title;
  const date = props.data.markdownRemark.frontmatter.date;
  const tag = props.data.markdownRemark.frontmatter.tag;
  const excerpt = props.data.markdownRemark.excerpt;

  return (
    <Layout page="blog-article">
      <SEO
        title={title}
        description={excerpt}
        type="article"
      />
      <Main>
        <Article>
          <ArticleHead>
            <Title>{title}</Title>
            <Info>
              <Date>{date}</Date>
              <Tag tag={tag} />
            </Info>
          </ArticleHead>
          <ArticleBody dangerouslySetInnerHTML={{ __html: htmlContents }}></ArticleBody>
        </Article>
        <Pager pageInfo={pageInfo} pageContext={pageContext} />
      </Main>
    </Layout>
  )
}

export const query = graphql`
  query blogQuery ($id: String!, $number: Int) {
    allMarkdownRemark (
      sort:{fields: frontmatter___date, order: DESC}, limit: 1, skip: $number
      ) {
      pageInfo {
        currentPage
        hasNextPage
        hasPreviousPage
        pageCount
        perPage
      }
    }
    markdownRemark(id: {eq: $id}) {
      frontmatter {
        date(formatString: "YYYY-MM-DD")
        slug
        tag
        title
      }
      html
      excerpt(pruneLength: 200)
    }
  }
`

export default BlogArticlePage