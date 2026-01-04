import { TEST_DATES, SAMPLE_CLUES, ANIMATION_DELAY } from '../support/constants'

describe('Hint System & Letter Reveal', () => {
	const TEST_DATE = TEST_DATES.BASE // '2025-12-23'
	const TEST_CLUE = SAMPLE_CLUES.MCAT // { id: '387', answer: 'MCAT' }

	beforeEach(() => {
		cy.setSystemDate(TEST_DATE)
		cy.clearAppState()
		cy.visitClue(TEST_CLUE.id)
	})

	afterEach(() => {
		cy.restoreSystemDate()
	})

	describe('Hint Progression', () => {
		it('should display hints sequentially', () => {
			// Initial state - no hints used
			cy.verifyStats(0, 0)

			// Request first hint
			cy.requestHint()
			cy.verifyStats(0, 1)

			// Request second hint
			cy.requestHint()
			cy.verifyStats(0, 2)

			// Request third hint
			cy.requestHint()
			cy.verifyStats(0, 3)
		})

		it('should increment hints counter when using hints', () => {
			// Use 2 hints
			cy.requestHint()
			cy.requestHint()

			// Solve with hints used
			cy.typeAnswer(TEST_CLUE.answer)
			cy.submitAnswer()

			cy.verifyClueSolved()
			cy.verifyStats(1, 2)

			// Verify in localStorage
			cy.window().then((win) => {
				const state = JSON.parse(win.localStorage.getItem('lcState'))
				expect(state.completedClues[0]).to.deep.include({
					clid: TEST_CLUE.id,
					hints: 2,
					how: 'h', // Solved via hint
				})
			})
		})

		it('should allow solving with multiple hints', () => {
			// Use 3 hints
			cy.requestHint()
			cy.requestHint()
			cy.requestHint()

			// Still able to type and submit
			cy.typeAnswer(TEST_CLUE.answer)
			cy.submitAnswer()

			cy.verifyClueSolved()
			cy.verifyStats(1, 3)
		})
	})

	describe('Letter Reveal Feature', () => {
		it('should reveal individual letters and count as hints', () => {
			// Click on first empty square to reveal
			cy.revealLetter(0)

			// Verify letter appears
			cy.get('[data-testid="solution-square-0"]')
				.should('have.attr', 'data-revealed', 'true')
				.find('.typeLetter')
				.should('not.be.empty')

			// Verify hint counter incremented
			cy.verifyStats(0, 1)
		})

		it('should not allow revealing if only one letter remains unrevealed', () => {
			const answerLength = TEST_CLUE.answer.length // 4 for MCAT

			// Reveal all but one letter
			for (let i = 0; i < answerLength - 1; i++) {
				cy.revealLetter(i)
			}

			// Try to reveal the last letter - modal should not confirm
			cy.get(`[data-testid="solution-square-${answerLength - 1}"]`).click()

			// Modal should not appear (or if it appears, confirm should be disabled)
			cy.get('[data-testid="modal-reveal-confirm"]').should('not.exist')
		})

		it('should skip revealed letters when typing', () => {
			// Reveal letter at index 1 (C in MCAT)
			cy.revealLetter(1)

			// Type the answer - should only need to type M, A, T (3 letters)
			cy.typeAnswer('MAT')

			// Verify all 4 positions are filled
			cy.get('[data-testid="solution-square-0"]').should('have.class', 'letter')
			cy.get('[data-testid="solution-square-1"]')
				.should('have.attr', 'data-revealed', 'true')
			cy.get('[data-testid="solution-square-2"]').should('have.class', 'letter')
			cy.get('[data-testid="solution-square-3"]').should('have.class', 'letter')

			// Submit and verify
			cy.submitAnswer()
			cy.verifyClueSolved()
			cy.verifyStats(1, 1) // 1 guess, 1 hint (from reveal)
		})

		it('should allow canceling letter reveal', () => {
			// Click square to open modal
			cy.get('[data-testid="solution-square-0"]').click()

			// Modal appears
			cy.get('[data-testid="modal-reveal-confirm"]').should('be.visible')

			// Cancel
			cy.get('[data-testid="modal-reveal-cancel"]').click()

			// Verify letter not revealed
			cy.get('[data-testid="solution-square-0"]').should(
				'have.attr',
				'data-revealed',
				'false'
			)

			// Hint counter unchanged
			cy.verifyStats(0, 0)
		})

		it('should maintain revealed state through incorrect guesses', () => {
			// Reveal first letter
			cy.revealLetter(0)

			// Type wrong answer (the revealed letter should remain)
			cy.typeAnswer('CAT')
			cy.submitAnswer()

			cy.get('[data-testid="message-error"]').should('be.visible')
			cy.get('[data-testid="continue"]').click()

			// Clear typed letters
			cy.clearAnswer()

			// Revealed letter should still be revealed
			cy.get('[data-testid="solution-square-0"]')
				.should('have.attr', 'data-revealed', 'true')
				.find('.typeLetter')
				.should('not.be.empty')

			// Try correct answer
			cy.typeAnswer('CAT') // M is already revealed
			cy.submitAnswer()

			cy.verifyClueSolved()
			cy.verifyStats(2, 1) // 2 guesses, 1 hint
		})
	})

	describe('Combined Hints and Reveals', () => {
		it('should track both hint types in stats', () => {
			// Use 2 regular hints
			cy.requestHint()
			cy.requestHint()

			// Reveal 1 letter
			cy.revealLetter(0)

			// Verify total hint count
			cy.verifyStats(0, 3)

			// Solve
			cy.typeAnswer('CAT') // M is revealed
			cy.submitAnswer()

			cy.verifyClueSolved()
			cy.verifyStats(1, 3) // 3 total hints (2 regular + 1 reveal)

			// Verify in localStorage
			cy.window().then((win) => {
				const state = JSON.parse(win.localStorage.getItem('lcState'))
				expect(state.completedClues[0].hints).to.equal(3)
				expect(state.completedClues[0].how).to.equal('h')
			})
		})

		it('should allow mixing hints and reveals in any order', () => {
			// Request hint
			cy.requestHint()

			// Reveal letter
			cy.revealLetter(2) // Reveal A in MCAT

			// Request another hint
			cy.requestHint()

			// Reveal another letter
			cy.revealLetter(3) // Reveal T in MCAT

			// Verify stats
			cy.verifyStats(0, 4)

			// Type remaining letters (M and C)
			cy.typeAnswer('MC')

			// Submit
			cy.submitAnswer()
			cy.verifyClueSolved()
		})
	})

	describe('Hint Animations', () => {
		it('should wait for hint animations to complete', () => {
			// Request hint
			cy.get('[data-testid="show hint"]').click()

			// Animation should be happening
			cy.wait(ANIMATION_DELAY)

			// Should be able to continue
			cy.get('[data-testid="continue"]').should('be.visible')
			cy.get('[data-testid="continue"]').click()

			// Stats should be updated
			cy.verifyStats(0, 1)
		})
	})
})
