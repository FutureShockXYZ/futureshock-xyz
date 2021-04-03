import React from 'react'
import { ThemeToggler } from 'gatsby-plugin-dark-mode'
import IconSun from '../images/icons/sun.svg'
import IconMoon from '../images/icons/moon.svg'

const ThemeToggle = () => {
  const iconClassnames = 'w-5 text-gray-600 dark:text-gray-200'

  return (
    <ThemeToggler>
      {({ theme, toggleTheme }) => (
        <span
          role="checkbox"
          tabIndex={0}
          aria-checked={theme}
          onClick={() => {
            toggleTheme(theme === 'dark' ? 'light' : 'dark')
          }}
          onKeyDown={() => {
            toggleTheme(theme === 'dark' ? 'light' : 'dark')
          }}
          className="inline-block cursor-pointer focus:outline-none"
        >
          <span aria-hidden="true">
            <span>
              <IconSun
                className={`${
                  theme === 'dark' ? 'visible' : 'hidden'
                } ${iconClassnames} sun`}
              />

              <IconMoon
                className={`${
                  theme === 'light' ? 'visible' : 'hidden'
                } ${iconClassnames} moon`}
              />
            </span>
          </span>
        </span>
      )}
    </ThemeToggler>
  )
}

export default ThemeToggle
