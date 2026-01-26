import React, { useEffect } from 'react'
import { navigate } from 'gatsby'

const SubredditRedirect = ({ params }) => {
  const slug = params.slug || 'unknown'

  useEffect(() => {
    if (typeof window !== 'undefined' && typeof window.gtag !== 'undefined') {
      window.gtag('event', 'reddit_referral', {
        event_category: 'acquisition',
        event_label: slug,
      })
    }

    navigate(`/?utm_source=reddit&utm_medium=social&utm_campaign=reddit_share&utm_content=${slug}`, {
      replace: true
    })
  }, [slug])

  return null
}

export default SubredditRedirect

export const Head = () => (
  <>
    <title>Learn Cryptic - Master Cryptic Crosswords</title>
    <meta name="robots" content="noindex, nofollow" />
    <meta property="og:type" content="website" />
    <meta property="og:url" content="https://learncryptic.com/" />
    <meta property="og:title" content="Learn Cryptic - Master Cryptic Crosswords" />
    <meta property="og:description" content="Learn to solve cryptic crossword clues with interactive lessons and daily puzzles." />
    <meta property="og:image" content="https://learncryptic.com/social.jpg" />
    <meta property="twitter:card" content="summary_large_image" />
    <meta property="twitter:image" content="https://learncryptic.com/social.jpg" />
  </>
)
