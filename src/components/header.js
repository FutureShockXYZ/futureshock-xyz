import React from 'react'
import { Link } from 'gatsby'
import { FiInfo } from 'react-icons/fi'
import ThemeToggle from './themeToggle'

const isPartiallyActive = ({ isPartiallyCurrent }) => {
  return isPartiallyCurrent
    ? { className: 'active' } // active
    : { className: '' } // normal
}

const navItemClasses = 'inline-block mr-4 lg:mr-8 last:mr-0'

const Header = () => {
  return (
    <header className="header pt-2 pb-4 mb-8 sticky top-0 z-10 grid grid-cols-8 items-center lg:px-8 lg:grid-cols-3 lg:pt-3 lg:pb-6">
      {/* theme toggle */}
      <div className="mt-1 col-span-1 lg:mt-0 lg:col-span-1">
        <ThemeToggle />
      </div>

      {/* logo */}
      <div className="text-left col-span-4 lg:text-center lg:col-span-1">
        <h1 className="text-base">
          <Link
            to="/"
            className="no-underline uppercase text-base leading-none lg:text-lg"
          >
            <span className="text-gray-900 dark:text-white">Future</span>{' '}
            <span className="text-red-800 dark:text-red-500">Shock</span>
          </Link>
          <div className="hidden text-xs text-gray-500 font-normal lg:block dark:text-gray-300">
            Critical Thinking for an Exponential World
          </div>
        </h1>
      </div>

      {/* nav */}
      <nav className="col-span-3 text-right lg:col-span-1">
        <ul>
          <li className={`${navItemClasses}`}>
            <Link
              to="/about"
              title="About the site"
              getProps={isPartiallyActive}
              className="inline-flex items-center"
            >
              <FiInfo className="inline-block text-xl" />
            </Link>
          </li>
          <li className={`${navItemClasses}`}>
            <Link to="#subscribe">
              <span className="btn hidden lg:inline-block">Subscribe</span>
              <span className="btn btn-small lg:hidden">Subscribe</span>
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  )
}

export default Header
