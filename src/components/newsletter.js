import React from 'react'

export default function Newsletter() {
  return (
    <section id="subscribe" className="text-center max-w-xl mx-auto relative">
      <span class="absolute top-0 left-0 w-full h-full mt-1 ml-1 bg-red-700 rounded-lg z-0"></span>
      <div className="relative bg-white border-2 border-red-700 z-10 py-6 px-4 rounded-md">
        <h2 className="text-gray-800 dark:text-gray-800">
          See the future clearly
        </h2>
        <p className="mt-2 text-gray-800">
          Our mission is to deliver the insights you need to see the future more
          clearly. We’re here to help you understand complex problems, identify
          emerging patterns and ultimately make better decisions today.
        </p>
        <div className="mt-6">
          <form
            action="https://buttondown.email/api/emails/embed-subscribe/futureshock"
            method="post"
            target="popupwindow"
            onsubmit="window.open('https://buttondown.email/futureshock', 'popupwindow')"
            className="embeddable-buttondown-form"
          >
            <div className="flex items-stretch max-w-xs mx-auto">
              <input
                type="email"
                name="email"
                id="bd-email"
                className="flex-grow"
                placeholder="your email"
              />
              <input type="hidden" value="1" name="embed" />
              <input
                type="submit"
                value="Subscribe"
                className="btn rounded-l-none"
              />
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}
