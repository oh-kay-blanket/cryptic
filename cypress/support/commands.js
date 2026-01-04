/**
 * LocalStorage Management Commands
 */

// Clear all app state
Cypress.Commands.add('clearAppState', () => {
	cy.window().then((win) => {
		win.localStorage.removeItem('lcState')
	})
})

// Set specific user state
Cypress.Commands.add('setUserState', (state) => {
	cy.window().then((win) => {
		win.localStorage.setItem('lcState', JSON.stringify(state))
	})
})

// Verify localStorage state
Cypress.Commands.add('verifyUserState', (expectedState) => {
	cy.window().then((win) => {
		const actual = JSON.parse(win.localStorage.getItem('lcState'))
		expect(actual).to.deep.include(expectedState)
	})
})

/**
 * Date Mocking Command
 * Critical for consistent "today's clue" testing
 */
Cypress.Commands.add('setSystemDate', (dateString) => {
	cy.log(`Setting system date to: ${dateString}`)
	cy.clock(new Date(dateString).getTime(), ['Date'])
})

Cypress.Commands.add('restoreSystemDate', () => {
	cy.clock().then((clock) => clock.restore())
})

/**
 * Navigation Commands
 */

// Navigate to specific clue by ID
Cypress.Commands.add('visitClue', (clid) => {
	cy.visit(`/clues/${clid}`)
	cy.get('[data-testid="clue-container"]', { timeout: 10000 }).should('be.visible')
})

// Navigate to today's clue (requires date mocking first)
Cypress.Commands.add('visitTodaysClue', () => {
	cy.visit('/')
	cy.get('[data-testid="btn-today-clue"]').click()
	cy.url().should('include', '/clues/')
})

/**
 * Clue Interaction Commands
 */

// Type answer letter by letter using keyboard
Cypress.Commands.add('typeAnswer', (answer) => {
	cy.log(`Typing answer: ${answer}`)
	const letters = answer.toUpperCase().split('')

	letters.forEach((letter) => {
		cy.get(`[data-testid="keyboard-${letter}"]`).click()
		cy.wait(100) // Small delay to account for state updates
	})
})

// Clear typed answer
Cypress.Commands.add('clearAnswer', () => {
	// Click delete multiple times to clear all letters
	for (let i = 0; i < 20; i++) {
		cy.get('[data-testid="keyboard-DEL"]').click()
	}
})

// Submit answer
Cypress.Commands.add('submitAnswer', () => {
	cy.get('[data-testid="check answer"]').click()
})

// Request a hint
Cypress.Commands.add('requestHint', () => {
	cy.get('[data-testid="show hint"]').click()
	// Wait for animation to complete
	cy.wait(2000)
	// Click continue to close the hint message
	cy.get('[data-testid="continue"]').click()
})

// Reveal a specific letter
Cypress.Commands.add('revealLetter', (index) => {
	cy.get(`[data-testid="solution-square-${index}"]`).click()
	cy.get('[data-testid="modal-reveal-confirm"]').click()

	// Verify letter was revealed
	cy.get(`[data-testid="solution-square-${index}"]`)
		.should('have.attr', 'data-revealed', 'true')
})

/**
 * Assertion Helpers
 */

// Verify clue is solved
Cypress.Commands.add('verifyClueSolved', () => {
	cy.get('[data-testid="message-success"]').should('be.visible')
	cy.get('[data-testid="message-success"]').should('contain', 'correct')
})

// Verify stats display
Cypress.Commands.add('verifyStats', (expectedGuesses, expectedHints) => {
	cy.get('[data-testid="stat-guesses"]').should('contain', expectedGuesses)
	cy.get('[data-testid="stat-hints"]').should('contain', expectedHints)
})

// Verify streak display on homepage
Cypress.Commands.add('verifyStreak', (expectedStreak) => {
	cy.visit('/')
	if (expectedStreak > 0) {
		cy.get('[data-testid="streak-display"]').should('contain', expectedStreak)
	}
})
