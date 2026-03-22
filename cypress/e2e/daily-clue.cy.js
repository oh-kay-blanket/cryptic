import { TEST_DATES, SAMPLE_CLUES } from '../support/constants'

describe('Daily Clue Solving Flow', () => {
	const TEST_DATE = TEST_DATES.BASE // '2026-04-02'
	const TEST_CLUE = SAMPLE_CLUES.NEON // { id: '495', answer: 'NEON' }

	beforeEach(() => {
		// Set consistent date before visiting any page
		cy.setSystemDate(TEST_DATE)
		// Visit homepage first, then clear state and dismiss cookie banner
		cy.visit('/')
		cy.clearAppState()
	})

	afterEach(() => {
		cy.restoreSystemDate()
	})

	describe('New User Flow', () => {
		it('should show welcome message to new user', () => {
			// Reload after clearing state so homepage picks up clean state
			cy.visit('/')

			cy.get('[data-testid="title-intro"]')
				.should('be.visible')
				.should('contain', 'Master the art of cryptic crosswords')

			cy.get('[data-testid="play"]')
				.should('be.visible')
		})

		it('should solve daily clue with correct answer on first try', () => {
			// Navigate to today's clue
			cy.visit('/')
			cy.get('[data-testid="play"]').click()
			cy.url().should('include', '/clues/')

			// Verify clue loaded
			cy.get('[data-testid="clue-text"]').should('be.visible')
			cy.get('[data-testid="solution-length"]').should('be.visible')

			// Type correct answer
			cy.typeAnswer(TEST_CLUE.answer)

			// Submit
			cy.submitAnswer()

			// Verify success
			cy.verifyClueSolved()

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
				expect(state.streak).to.equal(1)
				expect(state.longestStreak).to.equal(1)
			})
		})

		it('should track incorrect guesses', () => {
			cy.visit(`/clues/${TEST_CLUE.id}`)
			cy.get('[data-testid="clue-container"]', { timeout: 10000 }).should('be.visible')

			// First wrong guess
			cy.typeAnswer('WRONG')
			cy.submitAnswer()
			cy.get('[data-testid="message-error"]').should('be.visible')
			cy.get('[data-testid="message-error"]').should('contain', 'not the correct')

			// Close error message and try again
			cy.get('[data-testid="try again"]').click()

			// Clear and try again
			cy.clearAnswer()

			// Second wrong guess
			cy.typeAnswer('NOPE')
			cy.submitAnswer()
			cy.get('[data-testid="message-error"]').should('be.visible')

			// Close error message
			cy.get('[data-testid="try again"]').click()

			// Clear and submit correct answer
			cy.clearAnswer()
			cy.typeAnswer(TEST_CLUE.answer)
			cy.submitAnswer()
			cy.verifyClueSolved()

			// Verify guess count in localStorage
			cy.window().then((win) => {
				const state = JSON.parse(win.localStorage.getItem('lcState'))
				expect(state.completedClues[0].guesses).to.equal(3)
			})
		})
	})

	describe('Returning User Flow', () => {
		it('should show streak for user with active streak', () => {
			// Use local-time date string to avoid UTC timezone shift issues
			const yesterdayStr = '4/1/2026'

			cy.window().then((win) => {
				win.localStorage.setItem('lcState', JSON.stringify({
					completedClues: [{ clid: '494', guesses: 2, hints: 1, how: 'g' }],
					streak: 5,
					longestStreak: 5,
					lastSolved: yesterdayStr,
					showType: true,
					darkMode: null,
					hasSeenOnboarding: true,
					hasSeenOnboardingPrompt: true,
					hasSeenSyncAnnouncement: true,
					achievements: { unlocked: {}, hasSeenAchievementsIntro: false },
				}))
			})

			cy.visit('/')

			cy.get('[data-testid="streak-display"]', { timeout: 10000 })
				.should('be.visible')
				.should('contain', '5')
				.should('contain', 'day streak')
		})

		it('should show streak after completing today\'s clue', () => {
			cy.window().then((win) => {
				win.localStorage.setItem('lcState', JSON.stringify({
					completedClues: [
						{ clid: TEST_CLUE.id, guesses: 2, hints: 1, how: 'g' },
					],
					streak: 6,
					longestStreak: 6,
					lastSolved: TEST_DATE,
					showType: true,
					darkMode: null,
					hasSeenOnboarding: true,
					hasSeenOnboardingPrompt: true,
					hasSeenSyncAnnouncement: true,
					achievements: { unlocked: {}, hasSeenAchievementsIntro: false },
				}))
			})

			cy.visit('/')

			cy.get('[data-testid="streak-display"]', { timeout: 10000 })
				.should('be.visible')
				.should('contain', '6')
				.should('contain', 'day streak')
		})

		it('should maintain streak when solving consecutive days', () => {
			// Use local-time date string to avoid UTC timezone shift issues
			const yesterdayStr = '4/1/2026'

			cy.window().then((win) => {
				win.localStorage.setItem('lcState', JSON.stringify({
					completedClues: [{ clid: '494', guesses: 1, hints: 0, how: 'g' }],
					streak: 1,
					longestStreak: 1,
					lastSolved: yesterdayStr,
					showType: true,
					darkMode: null,
					hasSeenOnboarding: true,
					hasSeenOnboardingPrompt: true,
					hasSeenSyncAnnouncement: true,
					achievements: { unlocked: {}, hasSeenAchievementsIntro: false },
				}))
			})

			cy.visit('/')

			// Verify streak is shown
			cy.get('[data-testid="streak-display"]', { timeout: 10000 })
				.should('be.visible')
				.should('contain', '1')

			// Solve today's clue
			cy.visit(`/clues/${TEST_CLUE.id}`)
			cy.get('[data-testid="clue-container"]', { timeout: 10000 }).should('be.visible')
			cy.typeAnswer(TEST_CLUE.answer)
			cy.submitAnswer()
			cy.verifyClueSolved()

			// Go back to homepage and verify streak increased
			cy.visit('/')
			cy.get('[data-testid="streak-display"]', { timeout: 10000 })
				.should('be.visible')
				.should('contain', '2')
		})
	})

	describe('Navigation', () => {
		it('should navigate to today\'s clue from homepage', () => {
			cy.visit('/')
			cy.get('[data-testid="play"]').click()
			cy.url().should('include', `/clues/${TEST_CLUE.id}`)
			cy.get('[data-testid="clue-container"]').should('be.visible')
		})

		it('should navigate back to homepage after solving', () => {
			cy.visit(`/clues/${TEST_CLUE.id}`)
			cy.get('[data-testid="clue-container"]', { timeout: 10000 }).should('be.visible')
			cy.typeAnswer(TEST_CLUE.answer)
			cy.submitAnswer()
			cy.verifyClueSolved()

			// Click a link back to homepage
			cy.get('a[href="/"]').first().click()
			cy.url().should('eq', Cypress.config().baseUrl + '/')
		})
	})
})
