import React from 'react'
import Header from './header'
import Footer from './footer'
import '@fontsource/inter'
import '../css/styles.css'

const Layout = ({ children, location }) => {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  )
}

export default Layout
