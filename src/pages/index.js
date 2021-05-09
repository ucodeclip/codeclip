import React from "react";
import { graphql } from "gatsby";
import { css } from "@emotion/react";
import { Color } from "constants/constants";
import Layout from "components/layout/layout";
import Seo from "components/seo/seo";
import Article from "components/articleCard/article";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faTwitter } from "@fortawesome/free-brands-svg-icons";
library.add(faTwitter);

const main = css`
  position: relative;
  background: ${Color.gray.main};
`;
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
const articleList = css`
  box-sizing: border-box;
  width: 90%;
  margin: 0 auto;
  padding: 5% 0;
  min-height: calc(100vh - 30vh - 60px);
`;

const IndexPage = ({ data }) => {
  return (
    <Layout page="top">
      <Seo
        title="Code Clip Blog"
        description="フロントエンドエンジニアの雑記帳"
        type="website"
      />
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
      <div css={main}>
        <div css={articleList}>
          {data.allMarkdownRemark.edges.map((v, i) => {
            return <Article content={v} key={i} />;
          })}
        </div>
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
