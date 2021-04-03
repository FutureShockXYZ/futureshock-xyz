const path = require(`path`)
const { createFilePath } = require('gatsby-source-filesystem')

exports.createPages = async ({ actions, graphql, reporter }) => {
  const { createPage } = actions
  const feedTemplate = path.resolve(`./src/templates/feedTemplate.js`)
  const feedListTemplate = path.resolve(`./src/templates/feedListTemplate.js`)
  const result = await graphql(`
    {
      feed: allAirtable(
        filter: { table: { eq: "feed" } }
        sort: { fields: data___created, order: DESC }
      ) {
        edges {
          node {
            id
            data {
              title
              slug
            }
          }
        }
      }
    }
  `)
  // Handle errors
  if (result.errors) {
    reporter.panicOnBuild(`Error while running GraphQL query.`)
    return
  }

  const feedPosts = result.data.feed.edges
  const feedPostsPerPage = 10
  const feedNumPages = Math.ceil(feedPosts.length / feedPostsPerPage)

  feedPosts.forEach((post, index) => {
    const previous =
      index === feedPosts.length - 1 ? null : feedPosts[index + 1].node
    const next = index === 0 ? null : feedPosts[index - 1].node

    createPage({
      path: `/feed/${post.node.data.slug}`,
      component: feedTemplate,
      context: {
        slug: post.node.data.slug,
        previous,
        next,
      },
    })
  })

  /* create a home page from the first page */
  createPage({
    path: '/',
    component: feedListTemplate,
    context: {
      limit: feedPostsPerPage,
      skip: 0 * feedPostsPerPage,
      feedNumPages,
      currentPage: 0 + 1,
    },
  })

  /* create feed pages */
  Array.from({ length: feedNumPages }).forEach((_, i) => {
    createPage({
      path: i === 0 ? `/feed` : `/feed/${i + 1}`,
      component: feedListTemplate,
      context: {
        limit: feedPostsPerPage,
        skip: i * feedPostsPerPage,
        feedNumPages,
        currentPage: i + 1,
      },
    })
  })
}
