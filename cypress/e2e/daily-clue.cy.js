import { TEST_DATES, SAMPLE_CLUES } from '../support/constants'

describe('Daily Clue Solving Flow', () => {
	const TEST_DATE = TEST_DATES.BASE // '2025-12-23'
	const TEST_CLUE = SAMPLE_CLUES.MCAT // { id: '387', answer: 'MCAT' }

	beforeEach(() => {
		// Set consistent date
		cy.setSystemDate(TEST_DATE)
		cy.clearAppState()
		cy.visit('/')
	})

	afterEach(() => {
		cy.restoreSystemDate()
	})

	describe('New User Flow', () => {
		it('should show welcome message to new user', () => {
			cy.get('[data-testid="title-intro"]')
				.should('be.visible')
				.should('contain', 'Welcome to Learn Cryptic')

			cy.get('[data-testid="play today\'s clue"]')
				.should('be.visible')
				.should('contain', "Play today's clue")
		})

		it('should solve daily clue with correct answer on first try', () => {
			// Start clue
			cy.visitTodaysClue()

			// Verify clue loaded
			cy.get('[data-testid="clue-text"]').should('be.visible')
			cy.get('[data-testid="solution-length"]').should('be.visible')

			// Verify initial stats are 0
			cy.verifyStats(0, 0)

			// Type correct answer
			cy.typeAnswer(TEST_CLUE.answer)

			// Submit
			cy.submitAnswer()

			// Verify success
			cy.verifyClueSolved()
			cy.verifyStats(1, 0)

			// Verify state persisted
			cy.verifyUserState({
				completedClues: Cypress.sinon.match.array,
				streak: 1,
				longestStreak: 1,
			})

			// Verify the completed clue has correct data
			cy.window().then((win) => {
				const state = JSON.parse(win.localStorage.getItem('lcState'))
				expect(state.completedClues).to.have.length(1)
				expect(state.completedClues[0]).to.deep.include({
					clid: TEST_CLUE.id,
					guesses: 1,
					hints: 0,
					how: 'g',
				})
			})
		})

		it('should track incorrect guesses', () => {
			cy.visitTodaysClue()

			// First wrong guess
			cy.typeAnswer('WRONGANS')
			cy.submitAnswer()
			cy.get('[data-testid="message-error"]').should('be.visible')
			cy.get('[data-testid="message-error"]').should('contain', 'not the correct')
			cy.verifyStats(1, 0)

			// Close error message
			cy.get('[data-testid="continue"]').click()

			// Clear and try again
			cy.clearAnswer()

			// Second wrong guess
			cy.typeAnswer('NOPE')
			cy.submitAnswer()
			cy.get('[data-testid="message-error"]').should('be.visible')
			cy.verifyStats(2, 0)

			// Close error message
			cy.get('[data-testid="continue"]').click()

			// Clear and submit correct answer
			cy.clearAnswer()
			cy.typeAnswer(TEST_CLUE.answer)
			cy.submitAnswer()
			cy.verifyClueSolved()
			cy.verifyStats(3, 0)
		})
	})

	describe('Returning User Flow', () => {
		it('should show streak encouragement for user with active streak', () => {
			const yesterday = new Date(TEST_DATE)
			yesterday.setDate(yesterday.getDate() - 1)
			const yesterdayStr = yesterday.toISOString().split('T')[0]

			cy.setUserState({
				completedClues: [{ clid: '379', guesses: 2, hints: 1, how: 'g' }],
				streak: 5,
				longestStreak: 5,
				lastSolved: yesterdayStr,
				showType: true,
				typeViewed: [],
				darkMode: null,
			})

			cy.visit('/')

			cy.get('[data-testid="title-intro"]')
				.should('be.visible')
				.should('contain', 'Welcome back')

			cy.get('[data-testid="streak-display"]')
				.should('be.visible')
				.should('contain', '5-day streak')
		})

		it('should show completion stats after solving today\'s clue', () => {
			cy.setUserState({
				completedClues: [
					{ clid: TEST_CLUE.id, guesses: 2, hints: 1, how: 'g' },
				],
				streak: 6,
				longestStreak: 6,
				lastSolved: TEST_DATE,
				showType: true,
				typeViewed: [],
				darkMode: null,
			})

			cy.visit('/')

			cy.get('[data-testid="title-intro"]')
				.should('be.visible')
				.should('contain', 'You solved today\'s clue')
				.should('contain', '2 guesses')
				.should('contain', '1 hint')

			cy.get('[data-testid="streak-display"]')
				.should('be.visible')
				.should('contain', '6 days')
		})

		it('should maintain streak when solving consecutive days', () => {
			// Solve yesterday's clue
			const yesterday = new Date(TEST_DATE)
			yesterday.setDate(yesterday.getDate() - 1)
			const yesterdayStr = yesterday.toISOString().split('T')[0]

			cy.setUserState({
				completedClues: [{ clid: '385', guesses: 1, hints: 0, how: 'g' }],
				streak: 1,
				longestStreak: 1,
				lastSolved: yesterdayStr,
				showType: true,
				typeViewed: [],
				darkMode: null,
			})

			cy.visit('/')

			// Verify streak is shown
			cy.get('[data-testid="streak-display"]')
				.should('be.visible')
				.should('contain', '1-day streak')

			// Solve today's clue
			cy.visitTodaysClue()
			cy.typeAnswer(TEST_CLUE.answer)
			cy.submitAnswer()
			cy.verifyClueSolved()

			// Go back to homepage and verify streak increased
			cy.visit('/')
			cy.get('[data-testid="streak-display"]')
				.should('be.visible')
				.should('contain', '2 days')
		})
	})

	describe('Navigation', () => {
		it('should navigate to today\'s clue from homepage', () => {
			cy.get('[data-testid="play today\'s clue"]').click()
			cy.url().should('include', `/clues/${TEST_CLUE.id}`)
			cy.get('[data-testid="clue-container"]').should('be.visible')
		})

		it('should navigate back to homepage after solving', () => {
			cy.visitTodaysClue()
			cy.typeAnswer(TEST_CLUE.answer)
			cy.submitAnswer()

			// Click "See all clues" or similar button to go back
			// (This depends on what buttons are shown after completion)
			cy.get('a[href="/"]').first().click()
			cy.url().should('eq', Cypress.config().baseUrl + '/')
		})
	})
})
