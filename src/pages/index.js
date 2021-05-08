import React from "react";
import { graphql } from "gatsby";
import { css } from "@emotion/react";
import { Color } from "constants/constants";
import Layout from "../components/layout/layout";
import Seo from "../components/seo/seo";
import MainVisual from "../components/page-top/mainVisual/mainVisual";
import Article from "../components/archive/article/article-wrap";

const main = css`
  position: relative;
  background: ${Color.gray.main};
`;

const IndexPage = ({ data }) => {
  return (
    <Layout page="top">
      <Seo
        title="Code Clip Blog"
        description="フロントエンドエンジニアの雑記帳"
        type="website"
      />
      <MainVisual />
      <div css={main}>
        <Article data={data} />
      </div>
    </Layout>
  );
};

export const query = graphql`
  query indexQuery {
    allMarkdownRemark(sort: { fields: frontmatter___date, order: DESC }) {
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

export default IndexPage;
