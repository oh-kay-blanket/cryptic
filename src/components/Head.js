import React from 'react'
import { useSiteMetadata } from '../hooks/useSiteMetadata'

export const Head = ({ title, description, pathname, children }) => {
	const { title: defaultTitle, description: defaultDescription, siteUrl, keywords } = useSiteMetadata()
	
	const seo = {
		title: title || defaultTitle,
		description: description || defaultDescription,
		url: `${siteUrl}${pathname || '/'}`,
	}

	return (
		<>
			<meta charSet="UTF-8"/>
			<meta name="viewport" content="width=device-width, initial-scale=1.0"/>
			<meta httpEquiv="X-UA-Compatible" content="ie=edge"/>
			
			{/* Primary Meta Tags */}
			<title>{seo.title}</title>
			<meta name="title" content={seo.title} />
			<meta name="description" content={seo.description} />
			<meta name="keywords" content={keywords} />
			<meta name="author" content="Learn Cryptic" />
			<meta name="language" content="English" />
			
			{/* Canonical URL */}
			<link rel="canonical" href={seo.url} />
			
			{/* Open Graph / Facebook */}
			<meta property="og:type" content="website" />
			<meta property="og:url" content={seo.url} />
			<meta property="og:title" content={seo.title} />
			<meta property="og:description" content={seo.description} />
			<meta property="og:image" content={`${siteUrl}/favicon.png`} />
			<meta property="og:site_name" content="Learn Cryptic" />
			<meta property="og:locale" content="en_US" />
			
			{/* Twitter */}
			<meta property="twitter:card" content="summary_large_image" />
			<meta property="twitter:url" content={seo.url} />
			<meta property="twitter:title" content={seo.title} />
			<meta property="twitter:description" content={seo.description} />
			<meta property="twitter:image" content={`${siteUrl}/favicon.png`} />
			
			{/* Favicon */}
			<link rel="icon" type="image/png" href="/favicon.png" />
			<link rel="apple-touch-icon" href="/favicon.png" />
			
			{/* Theme Color */}
			<meta name="theme-color" content="#faf9f6" />
			<meta name="msapplication-TileColor" content="#faf9f6" />
			
			{/* Additional structured data */}
			<script type="application/ld+json">
				{JSON.stringify({
					"@context": "https://schema.org",
					"@type": "WebSite",
					"name": "Learn Cryptic",
					"description": seo.description,
					"url": siteUrl,
					"potentialAction": {
						"@type": "SearchAction",
						"target": `${siteUrl}/clues`,
						"query-input": "required name=search_term_string"
					}
				})}
			</script>
			
			{children}
		</>
	)
}