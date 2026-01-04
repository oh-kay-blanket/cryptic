// Import commands
import './commands'

// Global before hook
before(() => {
	// Log environment info
	cy.log('Running in:', Cypress.config('baseUrl'))
})

// Before each test
beforeEach(() => {
	// Suppress uncaught exceptions from third-party code
	cy.on('uncaught:exception', (err) => {
		// Ignore Google Analytics errors
		if (err.message.includes('gtag')) {
			return false
		}
		// Let other errors fail the test
		return true
	})
})

// After each test
afterEach(function () {
	// On failure, take screenshot
	if (this.currentTest.state === 'failed') {
		cy.screenshot(`${this.currentTest.title} -- FAILED`)
	}
})
