import React from 'react'
import Layout from '../components/layout.js'
import SEO from '../components/seo.js'

const NotFoundPage = ({ location }) => (
  <Layout location={location}>
    <SEO title="404" />
    <section className="container">
      <article className="content-column">
        <h1 className="">404</h1>
        <img
          src="https://media.giphy.com/media/g01ZnwAUvutuK8GIQn/giphy.gif"
          alt="John Travolta looking lost and slightly confused (scene from Pulp Fiction)"
          className="mt"
        />
        <p className="mt ">
          You just hit a route that doesn&#39;t exist. I may have moved things
          around when redesigning the site. I hope you find what you are looking
          for by browsing available sections.
        </p>
      </article>
    </section>
  </Layout>
)

export default NotFoundPage
