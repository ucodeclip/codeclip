import React from "react";
import { graphql } from "gatsby";
import styled from "styled-components";
import Layout from "../../components/layout/layout";
import Seo from "../../components/seo/seo";
import MainVisual from "../../components/tag-archive/main-visual/main-visual";
import Article from "../../components/archive/article/article-wrap";

const Main = styled.div`
  position: relative;
  background: #f9f9f9;
  @media screen and (min-width: 813px) {
  }
  @media screen and (max-width: 812px) {
  }
`;
const TagArchivePage = props => {
  const tag = props.pageContext.tag;
  const title = tag + "一覧";
  return (
    <Layout page="tag-archive">
      <Seo
        title={title}
        description="フロントエンドエンジニアの雑記帳"
        type="article"
      />
      <Main>
        <MainVisual tag={tag} />
        <Article data={props.data} />
      </Main>
    </Layout>
  );
};

export const query = graphql`
  query tagArchiveQuery($tag: String) {
    allMarkdownRemark(
      sort: { fields: frontmatter___date, order: DESC }
      filter: { frontmatter: { tag: { eq: $tag } } }
    ) {
      edges {
        node {
          excerpt(pruneLength: 120, truncate: true)
          frontmatter {
            slug
            title
            date(formatString: "YYYY-MM-DD")
            update(formatString: "YYYY-MM-DD")
            tag
          }
        }
      }
    }
  }
`;

export default TagArchivePage;
