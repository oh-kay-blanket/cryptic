/**
 * Tests for UserContext
 *
 * LEARNING GUIDE:
 * This file demonstrates testing REACT CONTEXT - more complex than pure functions
 *
 * New Concepts:
 * - Rendering React components in tests
 * - Using testing-library queries
 * - Mocking localStorage
 * - Testing state changes over time
 * - Testing side effects (useEffect)
 */

import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import { UserContext, UserProvider } from '../UserContext'

/**
 * Helper component to access context values in tests
 * This is a common testing pattern for Context
 */
const TestComponent = () => {
	const context = React.useContext(UserContext)

	return (
		<div>
			<div data-testid="streak">{context.streak}</div>
			<div data-testid="longest-streak">{context.longestStreak}</div>
			<div data-testid="completed-count">{context.completedClues.length}</div>
			<button
				data-testid="add-clue-btn"
				onClick={() =>
					context.addCompletedClue(
						{
							clid: 'test-1',
							release: new Date().toISOString(),
						},
						{ guesses: 1, hints: 0 },
						'g'
					)
				}
			>
				Add Clue
			</button>
		</div>
	)
}

describe('UserContext', () => {
	/**
	 * beforeEach runs before each test
	 * Use it to reset state and mocks
	 */
	beforeEach(() => {
		// Recreate localStorage mocks fresh for each test
		Object.defineProperty(global, 'localStorage', {
			value: {
				getItem: jest.fn(),
				setItem: jest.fn(),
				removeItem: jest.fn(),
				clear: jest.fn(),
			},
			writable: true
		})

		// Set consistent date for testing
		jest.useFakeTimers()
		jest.setSystemTime(new Date('2024-01-15T12:00:00'))
	})

	afterEach(() => {
		jest.useRealTimers()
	})

	/**
	 * BASIC RENDERING TESTS
	 * Verify Context provides initial state correctly
	 */
	describe('initialization', () => {
		it('should provide default values when localStorage is empty', () => {
			// Arrange: Mock empty localStorage
			localStorage.getItem.mockReturnValue(null)

			// Act: Render component with provider
			render(
				<UserProvider>
					<TestComponent />
				</UserProvider>
			)

			// Assert: Check default values
			expect(screen.getByTestId('streak')).toHaveTextContent('0')
			expect(screen.getByTestId('longest-streak')).toHaveTextContent('0')
			expect(screen.getByTestId('completed-count')).toHaveTextContent('0')
		})

		it('should load saved state from localStorage', () => {
			// Arrange: Mock localStorage with saved state
			const savedState = {
				completedClues: [{ clid: 'clue-1', guesses: 2, hints: 1, how: 'g' }],
				streak: 5,
				longestStreak: 10,
				showType: true,
								lastSolved: '2024-01-14T12:00:00',
				darkMode: null,
			}
			localStorage.getItem.mockReturnValue(JSON.stringify(savedState))

			// Act: Render
			render(
				<UserProvider>
					<TestComponent />
				</UserProvider>
			)

			// Assert: Verify loaded state
			expect(screen.getByTestId('streak')).toHaveTextContent('5')
			expect(screen.getByTestId('longest-streak')).toHaveTextContent('10')
			expect(screen.getByTestId('completed-count')).toHaveTextContent('1')
		})
	})

	/**
	 * STREAK RESET LOGIC
	 * Testing the complex shouldResetStreak logic
	 */
	describe('streak reset on mount', () => {
		it('should maintain streak if solved yesterday', async () => {
			// Arrange: User solved yesterday
			const savedState = {
				completedClues: [],
				streak: 5,
				longestStreak: 5,
				lastSolved: '2024-01-14T12:00:00', // Yesterday
				showType: true,
								darkMode: null,
			}
			localStorage.getItem.mockReturnValue(JSON.stringify(savedState))

			// Act: Render
			render(
				<UserProvider>
					<TestComponent />
				</UserProvider>
			)

			// Assert: Streak should be maintained
			/**
			 * waitFor() is needed because useEffect runs after render
			 * It repeatedly checks until condition is true or timeout
			 */
			await waitFor(() => {
				expect(screen.getByTestId('streak')).toHaveTextContent('5')
			})
		})

		it('should reset streak if solved 2 days ago', async () => {
			// Arrange: User solved 2 days ago
			const savedState = {
				completedClues: [],
				streak: 5,
				longestStreak: 5,
				lastSolved: '2024-01-13T12:00:00', // 2 days ago
				showType: true,
								darkMode: null,
			}
			localStorage.getItem.mockReturnValue(JSON.stringify(savedState))

			// Act: Render
			render(
				<UserProvider>
					<TestComponent />
				</UserProvider>
			)

			// Assert: Streak should be reset to 0
			await waitFor(() => {
				expect(screen.getByTestId('streak')).toHaveTextContent('0')
			})
		})

		it('should NOT reset if streak is already 0', async () => {
			// Arrange: No active streak
			const savedState = {
				completedClues: [],
				streak: 0,
				longestStreak: 5,
				lastSolved: '2024-01-10T12:00:00', // 5 days ago
				showType: true,
								darkMode: null,
			}
			localStorage.getItem.mockReturnValue(JSON.stringify(savedState))

			// Act & Assert
			render(
				<UserProvider>
					<TestComponent />
				</UserProvider>
			)

			await waitFor(() => {
				expect(screen.getByTestId('streak')).toHaveTextContent('0')
			})
		})
	})

	/**
	 * ADD COMPLETED CLUE LOGIC
	 * Testing streak increment when completing clues
	 */
	describe('addCompletedClue', () => {
		it("should increment streak when completing today's clue", async () => {
			// Arrange: Initial state with existing streak
			const savedState = {
				completedClues: [],
				streak: 3,
				longestStreak: 3,
				lastSolved: '2024-01-14T12:00:00', // Yesterday
				showType: true,
								darkMode: null,
			}
			localStorage.getItem.mockReturnValue(JSON.stringify(savedState))

			// Act: Render and complete today's clue
			const { getByTestId } = render(
				<UserProvider>
					<TestComponent />
				</UserProvider>
			)

			// Simulate completing today's clue
			const addButton = getByTestId('add-clue-btn')
			addButton.click()

			// Assert: Streak should increment
			await waitFor(() => {
				expect(getByTestId('streak')).toHaveTextContent('4')
				expect(getByTestId('completed-count')).toHaveTextContent('1')
			})
		})

		it('should update longestStreak when current streak exceeds it', async () => {
			// Arrange: Current streak about to exceed longest
			const savedState = {
				completedClues: [],
				streak: 5,
				longestStreak: 5,
				lastSolved: '2024-01-14T12:00:00',
				showType: true,
								darkMode: null,
			}
			localStorage.getItem.mockReturnValue(JSON.stringify(savedState))

			// Act: Complete today's clue
			const { getByTestId } = render(
				<UserProvider>
					<TestComponent />
				</UserProvider>
			)

			getByTestId('add-clue-btn').click()

			// Assert: Both streak and longestStreak should be 6
			await waitFor(() => {
				expect(getByTestId('streak')).toHaveTextContent('6')
				expect(getByTestId('longest-streak')).toHaveTextContent('6')
			})
		})

		it('should NOT increment streak for non-today clues', async () => {
			// Arrange
			const savedState = {
				completedClues: [],
				streak: 3,
				longestStreak: 5,
				lastSolved: '2024-01-14T12:00:00',
				showType: true,
								darkMode: null,
			}
			localStorage.getItem.mockReturnValue(JSON.stringify(savedState))

			// Create a custom test component that adds a non-today clue
			const CustomTest = () => {
				const context = React.useContext(UserContext)
				return (
					<div>
						<div data-testid="streak">{context.streak}</div>
						<button
							data-testid="add-old-clue"
							onClick={() =>
								context.addCompletedClue(
									{
										clid: 'old-1',
										release: '2024-01-10T12:00:00', // 5 days ago
									},
									{ guesses: 1, hints: 0 },
									'g'
								)
							}
						>
							Add Old Clue
						</button>
					</div>
				)
			}

			// Act
			const { getByTestId } = render(
				<UserProvider>
					<CustomTest />
				</UserProvider>
			)

			getByTestId('add-old-clue').click()

			// Assert: Streak should remain unchanged
			await waitFor(() => {
				expect(getByTestId('streak')).toHaveTextContent('3')
			})
		})

		it('should prevent duplicate clue completions', async () => {
			// Arrange: Already completed clue
			const savedState = {
				completedClues: [{ clid: 'test-1', guesses: 1, hints: 0, how: 'g' }],
				streak: 3,
				longestStreak: 5,
				lastSolved: '2024-01-15T10:00:00',
				showType: true,
								darkMode: null,
			}
			localStorage.getItem.mockReturnValue(JSON.stringify(savedState))

			// Act: Try to add same clue again
			const { getByTestId } = render(
				<UserProvider>
					<TestComponent />
				</UserProvider>
			)

			getByTestId('add-clue-btn').click()

			// Assert: Count should not increase
			await waitFor(() => {
				expect(getByTestId('completed-count')).toHaveTextContent('1')
			})
		})
	})

	/**
	 * LOCALSTORAGE PERSISTENCE
	 * Testing that state saves to localStorage
	 */
	describe('localStorage persistence', () => {
		it('should save state to localStorage when completing a clue', async () => {
			// Arrange
			localStorage.getItem.mockReturnValue(null)

			// Act
			const { getByTestId } = render(
				<UserProvider>
					<TestComponent />
				</UserProvider>
			)

			getByTestId('add-clue-btn').click()

			// Assert: localStorage.setItem should be called
			await waitFor(() => {
				expect(localStorage.setItem).toHaveBeenCalled()

				// Verify the saved data structure
				const lastCall =
					localStorage.setItem.mock.calls[
						localStorage.setItem.mock.calls.length - 1
					]
				expect(lastCall[0]).toBe('lcState')

				const savedData = JSON.parse(lastCall[1])
				expect(savedData).toHaveProperty('completedClues')
				expect(savedData).toHaveProperty('streak')
				expect(savedData.completedClues.length).toBe(1)
			})
		})
	})
})
