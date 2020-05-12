module.exports = {
  siteMetadata: {
    title: `Code Clip Blog`,
    description: `フロントエンドエンジニアの雑記帳`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
      options: {
        path: `${__dirname}/src/contents/blog`,
        name: `blog`,
      }
    },
    `gatsby-transformer-remark`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    `gatsby-plugin-styled-components`,
    // {
    //   resolve: `gatsby-plugin-manifest`,
    //   options: {
    //     name: `codeclip`,
    //     short_name: `codeclip`,
    //     start_url: `/`,
    //     //icon: `src/images/gatsby-icon.png`, // This path is relative to the root of the site.
    //   },
    // },
    `gatsby-plugin-sass`
  ]
}
