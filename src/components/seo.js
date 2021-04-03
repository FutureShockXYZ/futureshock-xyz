/**
 * SEO component that queries for data with
 *  Gatsby's useStaticQuery React hook
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from 'react'
import PropTypes from 'prop-types'
import { Helmet } from 'react-helmet'

function SEO({ description, lang, meta, title, keywords, previewUrl }) {
  var metaTitle
  if (title) {
    metaTitle = title
  }

  var metaKeywords =
    'Ilja Panić, creative technologist, design technologist, portfolio, resume'
  if (keywords) {
    metaKeywords = keywords
  }
  const metaDescription = description
  const metaPreviewUrl = previewUrl

  return (
    <Helmet
      htmlAttributes={{
        lang,
      }}
      title={metaTitle}
      defaultTitle={`Ilja Panić`}
      titleTemplate={`%s — Ilja Panić`}
      meta={[
        {
          name: `description`,
          content: metaDescription,
        },
        {
          name: `author`,
          content: 'Ilja Panić',
        },
        {
          name: `keywords`,
          content: metaKeywords,
        },
        {
          property: `og:title`,
          content: metaTitle,
        },
        {
          property: `og:description`,
          content: metaDescription,
        },
        {
          property: `og:type`,
          content: `website`,
        },
        {
          property: `og:image`,
          content: metaPreviewUrl,
        },

        {
          name: `twitter:card`,
          content: `summary`,
        },
        {
          name: `twitter:title`,
          content: metaTitle,
        },
        {
          name: `twitter:description`,
          content: metaDescription,
        },
      ].concat(meta)}
    />
  )
}

SEO.defaultProps = {
  lang: `en`,
  meta: [],
}

SEO.propTypes = {
  description: PropTypes.string,
  lang: PropTypes.string,
  meta: PropTypes.arrayOf(PropTypes.object),
  title: PropTypes.string.isRequired,
}

export default SEO
