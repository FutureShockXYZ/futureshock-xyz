import React from 'react'
import { Link } from 'gatsby'
import { FiRss } from 'react-icons/fi'

const Footer = () => {
  return (
    <footer className="mt-24 pb-12">
      <section id="subscribe" className="text-center max-w-xl mx-auto">
        <div className="py-6 px-4 bg-gray-900 text-white rounded-md dark:bg-gray-100 dark:text-gray-800">
          <h2 className="inherit-color">See the future clearly</h2>
          <p className="mt-2">
            Our mission is to deliver the insights you need to see the future
            more clearly. We’re here to help you understand complex problems,
            identify emerging patterns and ultimately make better decisions
            today.
          </p>
        </div>
      </section>

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
