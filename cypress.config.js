const { defineConfig } = require('cypress')

module.exports = defineConfig({
	e2e: {
		// Base URLs
		baseUrl: 'http://localhost:8000', // Dev server

		// Viewport - set to 850px+ to ensure keyboard is visible for tests
		// (keyboard is hidden on desktop when height < 850px)
		viewportWidth: 375,
		viewportHeight: 900,

		// Test file patterns
		specPattern: 'cypress/e2e/**/*.cy.{js,jsx,ts,tsx}',
		supportFile: 'cypress/support/e2e.js',

		// Video and screenshots
		video: true,
		videosFolder: 'cypress/videos',
		screenshotsFolder: 'cypress/screenshots',
		videoCompression: 32, // Balance between quality and file size

		// Retry configuration for flaky tests
		retries: {
			runMode: 2, // CI environment
			openMode: 0, // Local development
		},

		// Timeouts
		defaultCommandTimeout: 8000, // Account for animation delays
		pageLoadTimeout: 60000,

		// Setup node events
		setupNodeEvents(on, config) {
			// Environment-specific config
			if (config.env.CI) {
				config.baseUrl = 'http://localhost:9000' // Production build in CI
			}

			return config
		},
	},

	// Component testing disabled (E2E only per requirements)
	component: {
		enabled: false,
	},
})
