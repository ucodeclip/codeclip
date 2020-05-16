import React from "react"
import { graphql } from "gatsby"
import styled from "styled-components"
import Layout from "../components/layout/layout";
import SEO from "../components/seo/seo"
import MainVisual from "../components/page-top/mainVisual/mainVisual";
import Article from "../components/page-top/article/article-wrap"

const Main = styled.div`
  position:relative;
  background: #f9f9f9;
  @media screen and (min-width:813px) {
  }
  @media screen and (max-width:812px) {
  }
`
const IndexPage = (props) => {
  return (
    <Layout page="top">
      <SEO
        title="Code Clop Blog"
        description="フロントエンドエンジニアの雑記帳"
        type="website"
        meta={[
          {
            name: 'google-site-verification',
            content:
              'H9iRfK03WwB_7J-ijEMiAkby71EmS1ejxlW1wYWyoSo',
          }
        ]}
      />
      <MainVisual />
      <Main>
        <Article data={props.data} />
      </Main>
    </Layout>
  )
}

export const query = graphql`
  query indexQuery {
    allMarkdownRemark (
      sort: {fields: id, order: ASC}
      ) {
      edges {
        node {
          excerpt(pruneLength: 200)
          frontmatter {
            slug
            title
            date(formatString: "YYYY-MM-DD")
            tag
          }
        }
      }
    }
  }
`

export default IndexPage
