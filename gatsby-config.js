module.exports = {
    siteMetadata: {
        title: `Cryptic`,
        description: `A description of your project`,
        author: `@oh-kay-blanket`,
    },
	pathPrefix: "/learn-cryptic",
    plugins: [
        `gatsby-plugin-image`,
        `gatsby-plugin-sharp`,
        `gatsby-transformer-sharp`,
		`gatsby-transformer-remark`,
		`gatsby-plugin-sass`,
		{
			resolve: `gatsby-plugin-manifest`,
			options: {
				name: "Learn Cryptic",
				short_name: "LC",
				start_url: "/",
				background_color: "#ffffff",
				theme_color: "#000000",
				display: "standalone",
				icon: "src/assets/img/favicon.png", // Path to your favicon (512x512 recommended)
			},
	    },
        // {
        //     resolve: `gatsby-source-filesystem`,
        //     options: {
        //         name: `images`,
        //         path: `${__dirname}/src/assets/img/`,
        //     },
        // },
        {
            resolve: `gatsby-source-filesystem`,
            options: {
                name: `data`,
                path: `${__dirname}/src/assets/data`,
            },
        },
		`gatsby-transformer-json`,
		{
			resolve: `gatsby-plugin-google-analytics`,
			options: {
				// The property ID; the tracking code won't be generated without it
				trackingId: "G-FMM13GJQK3",
				// Defines where to place the tracking script - `true` in the head and `false` in the body
				head: true,
				// Setting this parameter is optional
				anonymize: true,
				// Setting this parameter is also optional
				respectDNT: true,
				// Avoids sending pageview hits from custom paths
				exclude: ["/preview/**", "/do-not-track/me/too/"],
				// Delays sending pageview hits on route update (in milliseconds)
				pageTransitionDelay: 0,
				// Enables Google Optimize using your container Id
				optimizeId: "YOUR_GOOGLE_OPTIMIZE_TRACKING_ID",
				// Enables Google Optimize Experiment ID
				experimentId: "YOUR_GOOGLE_EXPERIMENT_ID",
				// Set Variation ID. 0 for original 1,2,3....
				variationId: "YOUR_GOOGLE_OPTIMIZE_VARIATION_ID",
				// Defers execution of google analytics script after page load
				defer: false,
				// Any additional optional fields
				sampleRate: 5,
				siteSpeedSampleRate: 10,
				cookieDomain: "example.com",
				// defaults to false
				enableWebVitalsTracking: true,
			},
	    },
    ],
}
