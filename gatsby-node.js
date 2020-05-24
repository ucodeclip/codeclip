const path = require('path')

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;

  //blog-sigleページの作成
  const blogResult = await graphql(`
    query blogQuery {
      allMarkdownRemark (
        sort: {fields: id, order: ASC}
        ) {
        edges {
          node {
            frontmatter {
              slug
              title
              date
              tag
            }
            id
          }
        }
        totalCount
      }
    }
  `)

  const blogArticleTemp = path.resolve("./src/template/blog/article.js")
  const totalPageNum = blogResult.data.allMarkdownRemark.totalCount;
  blogResult.data.allMarkdownRemark.edges.forEach((v, i) => {
    const curentPageNum = i + 1;
    const postPath = '/blog/' + v.node.frontmatter.slug;
    const nextSlug = curentPageNum < totalPageNum ? blogResult.data.allMarkdownRemark.edges[i + 1].node.frontmatter.slug : "none";
    const nextPath = '/blog/' + nextSlug;
    const prevSlug = curentPageNum > 1 ? blogResult.data.allMarkdownRemark.edges[i - 1].node.frontmatter.slug : "none";
    const prevPath = '/blog/' + prevSlug;
    createPage({
      path: postPath,
      component: blogArticleTemp,
      context: {
        id: v.node.id,
        number: i,
        nextPath: nextPath,
        prevPath: prevPath
      }
    })
  })

  //tagArchive
  const tagsResult = await graphql(`
    query tagsQuery {
      allMarkdownRemark {
        group(field: frontmatter___tag) {
          fieldValue
        }
      }
    }
  `)

  const tagArchiveTemp = path.resolve("./src/template/blog/tag-archive.js")
  tagsResult.data.allMarkdownRemark.group.forEach(v => {
    const path = '/blog/tags/' + v.fieldValue
    createPage({
      path: path,
      component: tagArchiveTemp,
      context: {
        tag: v.fieldValue
      }
    })
  });
}
