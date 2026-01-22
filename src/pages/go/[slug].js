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
    <title>Redirecting... | Learn Cryptic</title>
    <meta name="robots" content="noindex, nofollow" />
  </>
)
