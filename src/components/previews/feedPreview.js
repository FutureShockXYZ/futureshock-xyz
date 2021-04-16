import React from 'react'
import { MDXRenderer } from 'gatsby-plugin-mdx'
import { GatsbyImage } from 'gatsby-plugin-image'
import { FiLink } from 'react-icons/fi'
import classNames from 'classnames'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import ReactPlayer from 'react-player/lazy'
import EmbedContainer from 'react-oembed-container'

class FeedPreview extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      bodyEl: {},
      bodySize: {},
      isExpanded: false,
      permalinkCopied: false,
      oembedHtml: null,
    }
  }

  componentDidMount() {
    if (this.props.category === 'tweet') {
      fetch(
        `https://noembed.com/embed?url=${encodeURIComponent(this.props.url)}`
      )
        .then((res) => res.json())
        .then((data) => {
          this.setState({ oembedHtml: data.html })
        })
        .catch(console.log)
    }
  }

  getBodySize = (element) => {
    if (element) {
      this.setState({
        bodyEl: element,
        bodySize: element.getBoundingClientRect(),
      })
    }
  }

  showMore = (e) => {
    e.preventDefault()

    this.setState({
      isExpanded: true,
    })
  }

  render() {
    const {
      title,
      url,
      featured,
      category,
      permalink_url,
      permalink_truncated,
      domain,
      created,
      coverImageData,
      coverImageUrl,
      notesMdx,
    } = this.props

    var { isExpanded, oembedHtml } = this.state
    var bodyHeight = this.state.bodySize.height
    const bodyMaxHeight = 280

    var bodyClassnames = classNames('feed-body post px-6', {
      'hidden-content': bodyHeight > bodyMaxHeight && isExpanded === false,
    })

    return (
      <article
        className={`feed-item mb-28 border-gray-200 bg-gray-50 rounded dark:bg-gray-800 ${
          featured && `featured`
        }`}
      >
        {/* media */}
        <div className="rounded-t overflow-hidden">
          {category === 'post' && coverImageData && (
            <div className="transition-opacity hover:opacity-80">
              <a
                href={url}
                target="_blank"
                rel="noreferrer"
                title={`Read ‘${title}’ on ${domain}`}
              >
                <GatsbyImage image={coverImageData} alt={title} />
              </a>
            </div>
          )}

          {category === 'post' && !coverImageData && coverImageUrl && (
            <div className="transition-opacity hover:opacity-80">
              <a
                href={url}
                target="_blank"
                rel="noreferrer"
                title={`Read ‘${title}’ on ${domain}`}
              >
                <img src={coverImageUrl} alt={title} />
              </a>
            </div>
          )}

          {category === 'video' && (
            <div className="player-wrapper">
              <ReactPlayer
                url={url}
                controls={true}
                width="100%"
                height="100%"
                light={true}
                className="react-player"
              />
            </div>
          )}
        </div>

        {/* meta */}
        <header className="mt-2 px-6">
          <div className="grid grid-cols-2 mb-2 text-xs font-medium text-gray-500  dark:text-gray-400">
            {/* domain */}
            <div>
              <a
                href={url}
                target="_blank"
                rel="noreferrer"
                title={`Read ‘${title}’ on ${domain}`}
                className="no-underline inline-flex items-center text-gray-500  dark:text-gray-400"
              >
                <img
                  src={`https://api.faviconkit.com/${domain}/32`}
                  alt={domain}
                  className="inline-block w-3 mr-1 opacity-70"
                />
                <span>{domain}</span>
              </a>
            </div>

            {/* time */}
            <div className="text-right">
              <time>{created}</time>
            </div>
          </div>

          <h2 className="mt-3 mb-2">
            <a
              href={url}
              target="_blank"
              rel="noreferrer"
              title={`Read ‘${title}’ on ${domain}`}
              className="no-underline inherit-color"
            >
              {title}
            </a>
          </h2>
        </header>

        {/* body */}
        <div
          ref={this.getBodySize}
          className={bodyClassnames}
          style={this.state.bodyExpandedStyles}
        >
          {notesMdx && <MDXRenderer>{notesMdx}</MDXRenderer>}
          {!isExpanded && (
            <div className="show-more">
              <div className="show-more-button bg-gray-50 dark:bg-gray-800">
                <button
                  onClick={this.showMore.bind(this)}
                  className="uppercase underline text-sm text-gray-800 font-semibold tracking-wide dark:text-gray-100 "
                >
                  Show more
                </button>
              </div>
            </div>
          )}
        </div>

        {category === 'tweet' && oembedHtml && (
          <div className="obembed-wrapper px-6 mt-4">
            {/* <div dangerouslySetInnerHTML={{ __html: oembedHtml }} /> */}
            <EmbedContainer markup={oembedHtml}>
              <div dangerouslySetInnerHTML={{ __html: oembedHtml }} />
            </EmbedContainer>
          </div>
        )}

        {/* footer */}
        <footer className="text-xs mt-8 pb-6 px-6">
          <CopyToClipboard
            text={permalink_url}
            onCopy={() => this.setState({ copied: true })}
          >
            <div
              title="Copy permalink to clipboard"
              className="mx-auto inline-flex items-center text-gray-500 no-underline cursor-pointer bg-gray-50 px-1 py-1 rounded-sm hover:bg-gray-200 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700"
            >
              <FiLink className="mr-1" />
              <span>{permalink_truncated}</span>
            </div>
          </CopyToClipboard>

          {this.state.copied ? (
            <div class="mt-1 font-medium text-green-700 dark:text-green-300">
              Permalink copied
            </div>
          ) : null}
        </footer>
      </article>
    )
  }
}
export default FeedPreview
