import React from 'react'
import Layout from './layout'
import SEO from '../components/seo'

const LayoutDefault = ({ children, pageContext, location }) => {
  const post = pageContext.frontmatter

  var title = post.title
  var description
  var keywords

  if (post.description) {
    description = post.description
  }

  if (post.keywords) {
    keywords = post.keywords.join(', ')
  }

  return (
    <Layout location={location}>
      <SEO title={title} description={description} keywords={keywords} />
      <section className="container">
        <article className="content-column">{children}</article>
      </section>
    </Layout>
  )
}

export default LayoutDefault
