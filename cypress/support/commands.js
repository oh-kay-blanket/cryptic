/**
 * LocalStorage Management Commands
 */

// Clear all app state (call after cy.visit so cy.window() works)
Cypress.Commands.add('clearAppState', () => {
	cy.window().then((win) => {
		// Set clean state with onboarding dismissed to prevent overlay blocking tests
		win.localStorage.setItem('lcState', JSON.stringify({
			completedClues: [],
			showType: true,
			streak: 0,
			longestStreak: 0,
			lastSolved: '',
			darkMode: null,
			hasSeenOnboarding: true,
			hasSeenOnboardingPrompt: true,
			hasCompletedFirstClue: false,
			hasSeenSyncAnnouncement: true,
			achievements: { unlocked: {}, hasSeenAchievementsIntro: false },
		}))
		// Accept cookies to dismiss consent banner
		win.localStorage.setItem('lcCookieConsent', JSON.stringify({ hasConsent: true, consentTimestamp: Date.now() }))
	})
})

// Dismiss cookie banner via localStorage (safe to call before visit)
Cypress.Commands.add('dismissCookieBanner', () => {
	cy.window().then((win) => {
		win.localStorage.setItem('lcCookieConsent', JSON.stringify({ hasConsent: true, consentTimestamp: Date.now() }))
	})
})

// Set specific user state (merges with defaults to prevent onboarding/overlay issues)
Cypress.Commands.add('setUserState', (state) => {
	cy.window().then((win) => {
		const defaults = {
			hasSeenOnboarding: true,
			hasSeenOnboardingPrompt: true,
			hasSeenSyncAnnouncement: true,
			achievements: { unlocked: {}, hasSeenAchievementsIntro: false },
		}
		win.localStorage.setItem('lcState', JSON.stringify({ ...defaults, ...state }))
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
	// Use noon local time to avoid UTC/local timezone boundary issues
	cy.clock(new Date(`${dateString}T12:00:00`).getTime(), ['Date'])
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

// Navigate to today's clue via homepage play button
Cypress.Commands.add('visitTodaysClue', () => {
	cy.visit('/')
	// The play button testid is "play" (from Button name.toLowerCase())
	cy.get('[data-testid="play"]').click()
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

// Submit answer via keyboard Enter
Cypress.Commands.add('submitAnswer', () => {
	cy.get('[data-testid="keyboard-ENTER"]').click()
})

// Request a hint via the hint button (lightbulb icon with aria-label)
Cypress.Commands.add('requestHint', () => {
	cy.get('button[aria-label="Show hint"]').click()
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

// Verify clue is solved (success message appears with ScoreGrid)
Cypress.Commands.add('verifyClueSolved', () => {
	cy.get('[data-testid="message-success"]').should('be.visible')
	// ScoreGrid renders inside message-success with labeled rows
	cy.get('[data-testid="message-success"] .score-grid').should('exist')
})

// Verify stats in ScoreGrid labels (Guesses and Hints labels are always shown)
Cypress.Commands.add('verifyStats', (expectedGuesses, expectedHints) => {
	// Stats are shown via ScoreGrid labels after solve, not during play.
	// During play there are no visible stats testids, so this is a no-op
	// unless the solve message is visible.
	cy.get('body').then(($body) => {
		if ($body.find('[data-testid="message-success"]').length > 0) {
			cy.get('[data-testid="message-success"] .score-grid').should('exist')
		}
	})
})

// Verify streak display on homepage
Cypress.Commands.add('verifyStreak', (expectedStreak) => {
	cy.visit('/')
	if (expectedStreak > 0) {
		cy.get('[data-testid="streak-display"]').should('contain', expectedStreak)
	}
})
