import React from 'react'
import Header from './header'
import Footer from './footer'
import '@fontsource/inter'
import '../css/styles.css'

const Layout = ({ children, location }) => {
  return (
    <div>
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  )
}

export default Layout
