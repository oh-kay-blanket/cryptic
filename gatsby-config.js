module.exports = {
	siteMetadata: {
		title: `Cryptic`,
		description: `A description of your project`,
		author: `@oh-kay-blanket`,
		siteUrl: `https://learncryptic.com`
	},
	plugins: [
		`gatsby-plugin-image`,
		`gatsby-plugin-sharp`,
		`gatsby-transformer-sharp`,
		`gatsby-transformer-remark`,
		`gatsby-plugin-sass`,
		`gatsby-transformer-json`,
		{
			resolve: `gatsby-plugin-manifest`,
			options: {
				name: "Learn Cryptic",
				short_name: "LC",
				start_url: "/",
				background_color: "#ffffff",
				theme_color: "#E1D8FF",
				display: "standalone",
				icon: "src/assets/img/favicon.png", // Path to your favicon (512x512 recommended)
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
			resolve: `gatsby-plugin-sitemap`,
			// options: {
			//   query: `
			// 	{
			// 		site {
			// 			siteMetadata {
			// 			siteUrl
			// 			}
			// 		}
			// 		allSitePage {
			// 			nodes {
			// 				path
			// 			}
			// 		}
			// 	}
			//   `,
			//   resolveSiteUrl: ({ site, allSitePage }) => {
			// 	//Alternatively, you may also pass in env variables
			// 	return site.siteMetadata.siteUrl;
			//   },
			//   serialize: ({ site, allSitePage }) =>
			// 	allSitePage.nodes.map(node => {
			// 	  return {
			// 			url: `<span class="math-inline">\{site\.siteMetadata\.siteUrl\}</span>{node.path}`,
			// 			changefreq: `daily`,
			// 			priority: 0.7,
			// 	  }
			// 	})
			// },
		},
		{
			resolve: 'gatsby-plugin-robots-txt',
			options: {
				host: 'https://learncryptic.com',
				sitemap: 'https://learncryptic.com/sitemap.xml',
				policy: [{userAgent: '*', allow: '/'}]
			}
		}
	],
}
