import React from 'react'
import { Link } from 'gatsby'
import ThemeToggle from './themeToggle'

const isPartiallyActive = ({ isPartiallyCurrent }) => {
  return isPartiallyCurrent
    ? { className: 'active' } // active
    : { className: '' } // normal
}

const ListLink = ({ ...props }) => (
  <li>
    <Link to={props.to} getProps={isPartiallyActive}>
      {props.children}
    </Link>
  </li>
)

const Header = () => {
  return (
    <header className="pt-8 pb-16 lg:px-8 lg:grid lg:grid-cols-3">
      <div>
        <ThemeToggle />
      </div>

      <div className="text-center">
        <h1 className="text-red-800">
          <Link to="/" className="no-underline">
            Future Shock
          </Link>
        </h1>
      </div>
      <nav className="text-right">
        <ul>
          <ListLink to="/about/">About</ListLink>
        </ul>
      </nav>
    </header>
  )
}

export default Header
