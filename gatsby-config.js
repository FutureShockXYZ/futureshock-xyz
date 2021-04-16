require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`,
})

module.exports = {
  pathPrefix: '/',
  siteMetadata: {
    title: `Future Shock`,
    titleTemplate: `%s | Future Shock`,
    description: 'Critical Thinking for an Exponential World',
    image: '/cover.png',
    keywords: 'Futurism, Forecasting, Critical Futures',
    author: '@futureshock_xyz',
    siteUrl: `https://futureshock.xyz`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    `gatsby-plugin-offline`,
    `gatsby-plugin-robots-txt`,
    `gatsby-plugin-dark-mode`,
    `gatsby-plugin-image`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Future Shock`,
        short_name: `futureshock`,
        start_url: `/`,
        background_color: `#9a2e22`,
        theme_color: `#9a2e22`,
        display: `minimal-ui`,
        icon: `src/images/favicon.svg`, // This path is relative to the root of the site.
      },
    },
    {
      resolve: `gatsby-plugin-sitemap`,
      options: {
        exclude: [
          // `/feed/*`,
        ],
      },
    },
    {
      resolve: `gatsby-plugin-plausible`,
      options: {
        domain: `futureshock.xyz`,
        customDomain: `stats.futureshock.xyz`,
      },
    },
    {
      resolve: `gatsby-plugin-react-helmet-canonical-urls`,
      options: {
        siteUrl: `https://futureshock.xyz`,
        noQueryString: true,
        noHash: true,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `pages`,
        path: `${__dirname}/src/pages/`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: `gatsby-plugin-mdx`,
      options: {
        extensions: [`.mdx`, `.md`],
        defaultLayouts: {
          default: require.resolve('./src/components/layoutDefault.js'),
        },
        gatsbyRemarkPlugins: [
          `gatsby-remark-smartypants`,
          `gatsby-remark-embed-video`,
          `gatsby-remark-responsive-iframe`,
          `gatsby-remark-relative-images`,
          `gatsby-remark-copy-linked-files`,
          {
            resolve: `gatsby-remark-autolink-headers`,
            options: {
              isIconAfterHeader: true,
            },
          },
          {
            resolve: 'gatsby-remark-external-links',
            options: {
              target: '_blank',
              rel: null,
            },
          },
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 800,
              showCaptions: true,
              backgroundColor: 'transparent',
              linkImagesToOriginal: false,
              quality: 85,
            },
          },
        ],
      },
    },
    {
      resolve: 'gatsby-plugin-react-svg',
      options: {
        rule: {
          include: `${__dirname}/src/images`,
        },
      },
    },
    {
      resolve: 'gatsby-plugin-postcss',
    },
    {
      resolve: `gatsby-source-airtable`,
      options: {
        apiKey: process.env.AIRTABLE_API_KEY,
        tables: [
          {
            baseId: process.env.AIRTABLE_BASE_FEED,
            tableName: `feed`,
            tableView: `published`,
            queryName: `feed`,
            mapping: {
              notes: `text/markdown`,
              meta_image: `fileNode`,
              image_cover: `fileNode`,
            },
            tableLinks: [`tags`],
          },
          {
            baseId: process.env.AIRTABLE_BASE_FEED,
            tableName: `tags`,
            tableView: `sorted`,
            queryName: `tagsFeed`,
            tableLinks: [`feed`],
          },
        ],
      },
    },
    {
      resolve: `gatsby-plugin-feed`,
      options: {
        query: `
          {
            site {
              siteMetadata {
                title
                description
                siteUrl
                site_url: siteUrl
              }
            }
          }
        `,
        feeds: [
          {
            serialize: ({ query: { allAirtable } }) => {
              return allAirtable.edges.map((edge) => {
                const item = edge.node.data

                var itemExcerpt
                var itemHtml

                if (item.notes) {
                  itemExcerpt = item.notes.childrenMdx[0].excerpt
                  itemHtml = item.notes.childrenMdx[0].html
                }

                return Object.assign({}, item, {
                  title: item.title,
                  description: itemExcerpt,
                  date: item.created,
                  url: item.permalink,
                  guid: item.permalink,
                  custom_elements: [{ 'content:encoded': itemHtml }],
                })
              })
            },
            query: `
              {
                allAirtable(
                  filter: { table: { eq: "feed" } }
                  sort: { fields: data___created, order: DESC }
                ) {
                  edges {
                    node {
                      data {
                        title
                        permalink
                        created
                        notes {
                          childrenMdx {
                            excerpt
                            html
                          }
                        }
                      }
                    }
                  }
                }
              }
            `,
            output: '/rss.xml',
            title: 'Future Shock — RSS Feed',
          },
        ],
      },
    },
  ],
}
