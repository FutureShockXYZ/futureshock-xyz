import React from 'react'
import { Link } from 'gatsby'
import { FiRss } from 'react-icons/fi'

import Newsletter from '../components/newsletter'

const Footer = () => {
  return (
    <footer className="mt-24 pb-12">
      <Newsletter />

      <section className="max-w-lg mx-auto mt-20 text-sm text-gray-500 text-center dark:text-gray-300">
        <div className="mb-8">
          <Link
            to="/feed.xml"
            className=" text-orange-600 text-lg inline-flex items-center no-underline"
          >
            <FiRss className="mr-2 text-xl" /> Subscribe via RSS
          </Link>
        </div>

        <p>
          All the content belongs to their respective authors. We don't take
          ownership of any of the information presented here. All the commentary
          is free to share.
        </p>

        <p className="mt-4">
          Made with{' '}
          <span role="img" aria-label="hands">
            🙌
          </span>{' '}
          by{' '}
          <a href="https://iljapanic.com" target="_blank" rel="noreferrer">
            Ilja Panić
          </a>{' '}
          in Prague 🇨🇿
        </p>
      </section>
    </footer>
  )
}

export default Footer
