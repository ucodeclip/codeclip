import React from "react";
import { useStaticQuery, graphql } from "gatsby";
import Helmet from "react-helmet";

const Seo = (props) => {
  const { allImageSharp } = useStaticQuery(query);
  const type = props.type;
  const title =
    type === "website" ? props.title : props.title + " | Code Clip Blog";
  const description = props.description;
  const url = "https://codeclip.netlify.app" + props.path;
  const img =
    "https://codeclip.netlify.app" + allImageSharp.edges[0].node.fixed.src;
  return (
    <Helmet
      title={title}
      htmlAttributes={{
        lang: "ja",
      }}
      meta={[
        {
          name: "description",
          content: description,
        },
        {
          name: "og:title",
          content: title,
        },
        {
          name: "og:description",
          content: description,
        },
        {
          name: "og:image",
          content: img,
        },
        {
          name: "og:type",
          content: type,
        },
        {
          name: "og:site_name",
          content: "Code Clip Blog",
        },
        {
          name: "og:url",
          content: url,
        },
        {
          name: "google-site-verification",
          content: "H9iRfK03WwB_7J-ijEMiAkby71EmS1ejxlW1wYWyoSo",
        },
      ]}
    />
  );
};

export const query = graphql`
  query OGP {
    allImageSharp(filter: { fixed: { originalName: { eq: "ogp.png" } } }) {
      edges {
        node {
          fixed(width: 1200) {
            src
          }
        }
      }
    }
  }
`;

export default Seo;
