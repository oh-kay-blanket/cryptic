import { TEST_DATES, SAMPLE_CLUES } from '../support/constants'

describe('Hint System & Letter Reveal', () => {
	const TEST_DATE = TEST_DATES.BASE // '2026-04-02'
	const TEST_CLUE = SAMPLE_CLUES.NEON // { id: '495', answer: 'NEON' }

	beforeEach(() => {
		cy.setSystemDate(TEST_DATE)
		// Visit a page first so cy.window() works, then clear state
		cy.visit('/')
		cy.clearAppState()
		cy.visitClue(TEST_CLUE.id)
	})

	afterEach(() => {
		cy.restoreSystemDate()
	})

	describe('Letter Reveal Feature', () => {
		it('should reveal individual letters and count as hints', () => {
			// Click on first empty square to reveal
			cy.revealLetter(0)

			// Verify letter appears and is marked revealed
			cy.get('[data-testid="solution-square-0"]')
				.should('have.attr', 'data-revealed', 'true')

			// Solve (N already revealed, type E, O, N)
			cy.typeAnswer('EON')
			cy.submitAnswer()
			cy.verifyClueSolved()

			cy.window().then((win) => {
				const state = JSON.parse(win.localStorage.getItem('lcState'))
				expect(state.completedClues[0].hints).to.equal(1)
			})
		})

		it('should not allow revealing the last unrevealed letter', () => {
			const answerLength = TEST_CLUE.answer.length // 4 for NEON

			// Reveal all but two letters
			for (let i = 0; i < answerLength - 2; i++) {
				cy.revealLetter(i)
			}

			// Reveal one more (now only 1 unrevealed remains)
			cy.revealLetter(answerLength - 2)

			// Try to click the last letter with force since it has pointer-events: none
			cy.get(`[data-testid="solution-square-${answerLength - 1}"]`).click({ force: true })

			// Confirm popup should not appear
			cy.get('[data-testid="modal-reveal-confirm"]').should('not.exist')
		})

		it('should skip revealed letters when typing', () => {
			// Reveal letter at index 1 (E in NEON)
			cy.revealLetter(1)

			// Type the remaining letters (N, O, N - skipping revealed E)
			cy.typeAnswer('NON')

			// Submit and verify
			cy.submitAnswer()
			cy.verifyClueSolved()

			cy.window().then((win) => {
				const state = JSON.parse(win.localStorage.getItem('lcState'))
				expect(state.completedClues[0].hints).to.equal(1) // 1 reveal
				expect(state.completedClues[0].guesses).to.equal(1)
			})
		})

		it('should maintain revealed state through incorrect guesses', () => {
			// Reveal first letter
			cy.revealLetter(0)

			// Type wrong answer
			cy.typeAnswer('ZZZ')
			cy.submitAnswer()

			cy.get('[data-testid="message-error"]').should('be.visible')
			cy.get('[data-testid="try again"]').click()

			// Clear typed letters
			cy.clearAnswer()

			// Revealed letter should still be revealed
			cy.get('[data-testid="solution-square-0"]')
				.should('have.attr', 'data-revealed', 'true')

			// Try correct answer (N already revealed at 0)
			cy.typeAnswer('EON')
			cy.submitAnswer()

			cy.verifyClueSolved()

			cy.window().then((win) => {
				const state = JSON.parse(win.localStorage.getItem('lcState'))
				expect(state.completedClues[0].hints).to.equal(1)
				expect(state.completedClues[0].guesses).to.equal(2)
			})
		})
	})

	describe('Hint Button', () => {
		it('should show hint button on clue page', () => {
			cy.get('button[aria-label="Show hint"]').should('be.visible')
		})

		it('should hide hint button when all letters are filled', () => {
			cy.typeAnswer(TEST_CLUE.answer)
			cy.get('button[aria-label="Show hint"]').should('not.exist')
		})
	})
})
