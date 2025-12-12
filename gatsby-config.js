module.exports = {
	siteMetadata: {
		title: `Learn Cryptic - Daily Cryptic Crossword Clues`,
		description: `Learn and practice cryptic crossword clues with our daily game. Perfect for beginners and experienced solvers alike. Improve your cryptic crossword skills with guided hints and explanations.`,
		author: `@oh-kay-blanket`,
		siteUrl: `https://learncryptic.com`,
		keywords: `cryptic crossword, crossword clues, word puzzles, daily puzzle, learn cryptic, cryptic clues, wordplay`
	},
	plugins: [
		`gatsby-plugin-image`,
		`gatsby-plugin-sharp`,
		`gatsby-transformer-sharp`,
		`gatsby-transformer-remark`,
		`gatsby-plugin-sass`,
		{
			resolve: `gatsby-plugin-postcss`,
			options: {
				postCssPlugins: [
					require(`tailwindcss`),
					require(`autoprefixer`),
				],
			},
		},
		`gatsby-transformer-json`,
		{
			resolve: `gatsby-plugin-sitemap`,
			options: {
				excludes: [`/futureclues`],
				query: `
					{
						site {
							siteMetadata {
								siteUrl
							}
						}
						allSitePage {
							nodes {
								path
								pageContext
							}
						}
						allCluesJson {
							nodes {
								clid
								release
							}
						}
					}
				`,
				resolvePages: ({
					allSitePage: { nodes: allPages },
					allCluesJson: { nodes: allClues }
				}) => {
					const pages = allPages.map(page => {
						// Add priority and changefreq based on page type
						let priority = 0.5
						let changefreq = 'monthly'
						
						if (page.path === '/') {
							priority = 1.0
							changefreq = 'daily'
						} else if (page.path === '/learn/') {
							priority = 0.8
							changefreq = 'weekly'
						} else if (page.path === '/clues/') {
							priority = 0.7
							changefreq = 'daily'
						} else if (page.path.startsWith('/clues/')) {
							// Individual clue pages
							priority = 0.6
							changefreq = 'weekly'
						} else if (page.path.startsWith('/learn/')) {
							// Individual learn pages
							priority = 0.7
							changefreq = 'monthly'
						}
						
						return {
							path: page.path,
							priority,
							changefreq
						}
					})
					
					return pages
				},
				serialize: ({ path, priority, changefreq }) => {
					return {
						url: path,
						priority,
						changefreq,
						lastmod: new Date().toISOString().split('T')[0]
					}
				}
			}
		},
		{
			resolve: `gatsby-plugin-manifest`,
			options: {
				name: "Learn Cryptic - Daily Cryptic Crossword Clues",
				short_name: "Learn Cryptic",
				description: "Learn and practice cryptic crossword clues with our daily game",
				start_url: "/",
				background_color: "#FAF9F6",
				theme_color: "#faf9f6",
				display: "standalone",
				orientation: "portrait",
				icon: "src/assets/img/favicon.png",
				categories: ["games", "education", "puzzle"],
				lang: "en",
				scope: "/",
			},
		},
		{
			resolve: `gatsby-source-filesystem`,
			options: {
				name: `images`,
				path: `${__dirname}/src/assets/img/`,
			},
		},
		{
			resolve: `gatsby-source-filesystem`,
			options: {
				name: `data`,
				path: `${__dirname}/src/assets/data`,
			},
		},
		{
			resolve: `gatsby-plugin-google-gtag`,
			options: {
			    // You can add multiple tracking ids and a pageview event will be fired for all of them.
			    trackingIds: [
					"G-FMM13GJQK3", // Google Analytics / GA
			    ],
			    // This object gets passed directly to the gtag config command
			    // This config will be shared across all trackingIds
			    gtagConfig: {
					// optimize_id: "OPT_CONTAINER_ID",
					// anonymize_ip: true,
					cookie_expires: 0,
			    },
			    // This object is used for configuration specific to this plugin
			    pluginConfig: {
					// Puts tracking script in the head instead of the body
					// head: true,
					// Setting this parameter is also optional
					respectDNT: true,
					// Avoids sending pageview hits from custom paths
					exclude: ["/preview/**", "/do-not-track/me/too/"],
					// Defaults to https://www.googletagmanager.com
					// origin: "learncryptic.com",
					// Delays processing pageview events on route update (in milliseconds)
					delayOnRouteUpdate: 0,
			    },
			},
		},
		{
			resolve: 'gatsby-plugin-robots-txt',
			options: {
				host: 'https://learncryptic.com',
				sitemap: 'https://learncryptic.com/sitemap-index.xml',
				policy: [
					{
						userAgent: '*',
						allow: '/',
						disallow: ['/futureclues']
					}
				]
			}
		}
	],
}
