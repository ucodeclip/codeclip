import React from "react";
import { graphql } from "gatsby";
import { css } from "@emotion/react";
import Layout from "components/layout/layout";
import Seo from "components/seo/seo";
import Article from "components/articleCard/article";
import { Color } from "constants/constants";

const main = css`
  position: relative;
  background: ${Color.gray.main};
`;
const articleList = css`
  box-sizing: border-box;
  width: 90%;
  margin: 0 auto;
  padding: 5% 0;
  min-height: calc(100vh - 30vh - 60px);
`;
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
const visualTitle = css`
  color: ${Color.white.dark};
  font-weight: bold;
  font-size: 2.4rem;
`;

const TagArchivePage = (props) => {
  const tag = props.pageContext.tag;
  const title = tag + "一覧";
  return (
    <Layout page="tag-archive">
      <Seo
        title={title}
        description="フロントエンドエンジニアの雑記帳"
        type="article"
      />
      <div css={main}>
        <div css={visual}>
          <div css={visualBlock}>
            <h1 css={visualTitle}>Tag: {tag} 一覧</h1>
          </div>
        </div>
        <div css={articleList}>
          {props.data.allMarkdownRemark.edges.map((v, i) => {
            return <Article content={v} key={i} />;
          })}
        </div>
      </div>
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
