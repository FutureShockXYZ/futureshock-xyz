import React from 'react'
import { graphql } from 'gatsby'
import { Link } from 'gatsby'
import classNames from 'classnames'

import Layout from '../components/layout'
import SEO from '../components/seo'
import FeedPreview from '../components/previews/feedPreview'

export default function feedList({ data, location, pageContext }) {
  // Pagination
  const { currentPage, feedNumPages } = pageContext

  const isFirst = currentPage === 1
  const isLast = currentPage === feedNumPages
  const prevPage = currentPage - 1 === 1 ? '' : (currentPage - 1).toString()
  const nextPage = (currentPage + 1).toString()

  // Posts
  const allPosts = data.feed.edges
  const posts = allPosts.map(({ node }) => {
    const item = node.data
    var notesMdx
    var imageData
    var imageUrl
    var itemUrl
    var itemSocialCoverUrl

    if (item.meta_image) {
      if (item.meta_image.localFiles[0].childImageSharp) {
        imageData =
          item.meta_image.localFiles[0].childImageSharp.gatsbyImageData
      } else if (item.meta_image.localFiles[0].publicURL) {
        imageUrl = item.meta_image.localFiles[0].publicURL
      }
    }

    if (item.notes) {
      notesMdx = item.notes.childrenMdx[0].body
    }

    if (item.bitly) {
      itemUrl = item.bitly
    } else {
      itemUrl = item.url
    }

    if (item.image_cover) {
      itemSocialCoverUrl = item.image_cover.localFiles[0].publicURL
    }

    return (
      <FeedPreview
        key={item.slug}
        title={item.title}
        category={item.category}
        url={itemUrl}
        featured={item.featured}
        domain={item.domain}
        permalink={`/feed/${item.slug}`}
        permalink_url={item.permalink}
        permalink_truncated={item.permalink_truncated}
        created={item.created}
        coverImageData={imageData}
        coverImageUrl={imageUrl}
        socialCoverUrl={itemSocialCoverUrl}
        notesMdx={notesMdx}
      />
    )
  })

  return (
    <Layout location={location}>
      {/* eslint-disable-next-line react/jsx-pascal-case */}
      <SEO title={!isFirst && `${currentPage} of ${feedNumPages}`} />
      <section className="max-w-lg mx-auto">
        <div>{posts}</div>

        {/* PAGINATION */}
        <div className="pagination">
          <div className="grid grid-cols-2 gap-4 lg:gap-12">
            {/* previous */}
            <div className="previous text-right">
              {!isFirst && (
                <Link
                  to={`/feed/${prevPage}`}
                  rel="prev"
                  className="no-underline"
                >
                  ← Newer posts
                </Link>
              )}
            </div>
            {/* next */}
            <div className="next">
              {!isLast && (
                <Link
                  to={`/feed/${nextPage}`}
                  rel="next"
                  className="no-underline"
                >
                  Older posts →
                </Link>
              )}
            </div>
          </div>

          {/* numbers */}
          <div className="numbering text-center mt-8">
            {Array.from({ length: feedNumPages }, (_, i) => (
              <Link
                key={`pagination-number${i + 1}`}
                to={`/feed/${i === 0 ? '' : i + 1}`}
                className={classNames('number mx-1 no-underline p-1', {
                  'bg-gray-100 text-gray-800 cursor-default hover:text-gray-800 dark:bg-gray-700 dark:text-gray-100':
                    i + 1 === currentPage,
                })}
                title={`Go to page ${i + 1}`}
              >
                {i + 1}
              </Link>
            ))}
          </div>
        </div>
        {/* END PAGINATION */}
      </section>
    </Layout>
  )
}

export const pageQuery = graphql`
  query($skip: Int!, $limit: Int!) {
    feed: allAirtable(
      filter: { table: { eq: "feed" } }
      sort: { fields: data___created, order: DESC }
      limit: $limit
      skip: $skip
    ) {
      edges {
        node {
          id
          data {
            title
            category
            url
            featured
            slug
            permalink
            permalink_truncated
            created(fromNow: true)
            domain
            bitly
            meta_image {
              localFiles {
                publicURL
                childImageSharp {
                  gatsbyImageData(
                    width: 640
                    layout: CONSTRAINED
                    placeholder: BLURRED
                  )
                }
              }
            }
            notes {
              childrenMdx {
                body
              }
            }
            tags {
              data {
                name
                slug
              }
            }
          }
        }
      }
    }
  }
`
