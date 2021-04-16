import React from 'react'
import { graphql, Link } from 'gatsby'

import Layout from '../components/layout'
import SEO from '../components/seo'
import FeedPreview from '../components/previews/feedPreview'

export default function feedTemplate({ data, location, pageContext }) {
  const { previous, next } = pageContext
  const item = data.item.data

  var notesMdx
  var itemExcerpt
  var imageData
  var imageUrl
  var itemUrl
  var itemSocialCoverUrl
  var keywords = 'Future Shock'

  if (item.meta_image) {
    if (item.meta_image.localFiles[0].childImageSharp) {
      imageData = item.meta_image.localFiles[0].childImageSharp.gatsbyImageData
    } else if (item.meta_image.localFiles[0].publicURL) {
      imageUrl = item.meta_image.localFiles[0].publicURL
    }
  }

  if (item.notes) {
    notesMdx = item.notes.childrenMdx[0].body
    itemExcerpt = item.notes.childrenMdx[0].excerpt
  }

  if (item.bitly) {
    itemUrl = item.bitly
  } else {
    itemUrl = item.url
  }

  if (item.image_cover) {
    itemSocialCoverUrl = item.image_cover.localFiles[0].publicURL
  }

  if (item.tags) {
    item.tags.forEach((tag) => {
      keywords += ', '
      keywords += tag.data.name
    })
  }

  return (
    <Layout location={location}>
      <SEO // eslint-disable-line react/jsx-pascal-case
        title={item.title}
        description={itemExcerpt}
        keywords={keywords}
        image={itemSocialCoverUrl}
      />
      <div>
        <div className="max-w-lg mx-auto">
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
          <div className="-mt-12">
            <div>
              {previous && (
                <Link to={`/feed/${previous.data.slug}`} rel="prev">
                  {'← ' + previous.data.title}
                </Link>
              )}
            </div>
            <div className="mt-8 text-right">
              {next && (
                <Link to={`/feed/${next.data.slug}`} rel="next">
                  {next.data.title + '→'}
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}
export const pageQuery = graphql`
  query($slug: String!) {
    item: airtable(table: { eq: "feed" }, data: { slug: { eq: $slug } }) {
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
        image_cover {
          localFiles {
            publicURL
            absolutePath
          }
        }
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
            excerpt
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
`
