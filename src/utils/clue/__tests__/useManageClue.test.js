/**
 * Tests for useManageClue hook
 *
 * LEARNING GUIDE:
 * This file demonstrates testing CUSTOM REACT HOOKS
 *
 * New Concepts:
 * - Using renderHook from testing-library
 * - Testing hook state changes
 * - Testing hook functions
 * - Creating mock clue data
 */

import { renderHook, act } from '@testing-library/react'
import useManageClue from '../useManageClue'

/**
 * Mock activeClue data
 * In real tests, you often need to create mock data
 * that matches your expected data structure
 */
const createMockClue = () => ({
	clid: 'test-1',
	release: '2024-01-15',
	solution: {
		arr: ['T', 'E', 'S', 'T'], // 4-letter word "TEST"
	},
	hints: [
		{ category: 'definition', value: 'examination' },
		{ category: 'anagram', value: 'stet', reveals: false },
	],
})

describe('useManageClue', () => {
	/**
	 * INITIAL STATE
	 * Verify hook returns correct initial values
	 */
	describe('initialization', () => {
		it('should initialize with empty input and zero stats', () => {
			// Arrange
			const mockClue = createMockClue()

			// Act: renderHook is like render() but for hooks
			const { result } = renderHook(() => useManageClue(mockClue))

			// Assert
			expect(result.current.input).toEqual([])
			expect(result.current.stats).toEqual({
				guesses: 0,
				hints: 0,
				how: '',
			})
			expect(result.current.nextHint).toBe(0)
			expect(result.current.showMessage).toBe(false)
			expect(result.current.revealedLetters).toEqual([])
		})
	})

	/**
	 * INPUT HANDLING
	 * Test the handleInput function
	 */
	describe('handleInput', () => {
		it('should add letters to input in sequence', () => {
			// Arrange
			const mockClue = createMockClue()
			const { result } = renderHook(() => useManageClue(mockClue))

			/**
			 * act() is required when updating state
			 * It ensures React processes the state update before assertions
			 */
			act(() => {
				result.current.handleInput('T')
			})
			expect(result.current.input).toEqual(['T'])

			act(() => {
				result.current.handleInput('E')
			})
			expect(result.current.input).toEqual(['T', 'E'])

			act(() => {
				result.current.handleInput('S')
			})
			expect(result.current.input).toEqual(['T', 'E', 'S'])
		})

		it('should delete from the end with "del" command', () => {
			// Arrange
			const mockClue = createMockClue()
			const { result } = renderHook(() => useManageClue(mockClue))

			// Add some letters
			act(() => {
				result.current.handleInput('T')
				result.current.handleInput('E')
				result.current.handleInput('S')
			})

			// Act: Delete one
			act(() => {
				result.current.handleInput('del')
			})

			// Assert
			expect(result.current.input).toEqual(['T', 'E'])
		})

		it('should not exceed solution length', () => {
			// Arrange
			const mockClue = createMockClue()
			const { result } = renderHook(() => useManageClue(mockClue))

			// Act: Try to add 5 letters (solution is only 4)
			act(() => {
				result.current.handleInput('T')
				result.current.handleInput('E')
				result.current.handleInput('S')
				result.current.handleInput('T')
				result.current.handleInput('X') // Should be ignored
			})

			// Assert
			expect(result.current.input.length).toBe(4)
		})

		it('should handle empty input when deleting', () => {
			// Arrange
			const mockClue = createMockClue()
			const { result } = renderHook(() => useManageClue(mockClue))

			// Act: Try to delete from empty input
			act(() => {
				result.current.handleInput('del')
			})

			// Assert: Should remain empty, not crash
			expect(result.current.input).toEqual([])
		})
	})

	/**
	 * REVEALED LETTERS
	 * Test the letter revealing feature
	 */
	describe('revealed letters', () => {
		it('should reveal a letter and increment hints', () => {
			// Arrange
			const mockClue = createMockClue()
			const { result } = renderHook(() => useManageClue(mockClue))

			// Act: Reveal first letter
			act(() => {
				result.current.handleRevealLetter(0)
			})

			// Assert
			expect(result.current.revealedLetters).toEqual([0])
			expect(result.current.input[0]).toBe('T')
			expect(result.current.stats.hints).toBe(1)
		})

		it('should not allow revealing last remaining letter', () => {
			// Arrange
			const mockClue = createMockClue()
			const { result } = renderHook(() => useManageClue(mockClue))

			// Act: Reveal 3 out of 4 letters one at a time
			act(() => {
				result.current.handleRevealLetter(0)
			})

			act(() => {
				result.current.handleRevealLetter(1)
			})

			act(() => {
				result.current.handleRevealLetter(2)
			})

			// Try to reveal the last letter
			const hintsBefore = result.current.stats.hints
			act(() => {
				result.current.handleRevealLetter(3)
			})

			// Assert: Last letter should NOT be revealed
			expect(result.current.revealedLetters).toEqual([0, 1, 2])
			expect(result.current.stats.hints).toBe(hintsBefore) // Hints unchanged
		})

		it('should skip revealed positions when typing', () => {
			// Arrange
			const mockClue = createMockClue()
			const { result } = renderHook(() => useManageClue(mockClue))

			// Reveal positions 0 and 2
			act(() => {
				result.current.handleRevealLetter(0)
				result.current.handleRevealLetter(2)
			})

			// Act: Type some letters
			act(() => {
				result.current.handleInput('X') // Should go to position 1
				result.current.handleInput('Y') // Should go to position 3
			})

			// Assert
			expect(result.current.input[0]).toBe('T') // Revealed, unchanged
			expect(result.current.input[1]).toBe('X') // User typed
			expect(result.current.input[2]).toBe('S') // Revealed, unchanged
			expect(result.current.input[3]).toBe('Y') // User typed
		})

		it('should not delete revealed letters', () => {
			// Arrange
			const mockClue = createMockClue()
			const { result } = renderHook(() => useManageClue(mockClue))

			// Reveal first letter, then type more
			act(() => {
				result.current.handleRevealLetter(0)
				result.current.handleInput('E')
				result.current.handleInput('S')
			})

			// Act: Delete twice
			act(() => {
				result.current.handleInput('del') // Deletes 'S'
				result.current.handleInput('del') // Deletes 'E'
			})

			// Assert: Revealed 'T' should remain
			expect(result.current.input[0]).toBe('T')
			expect(result.current.input.length).toBe(1)
		})
	})

	/**
	 * STATS MANAGEMENT
	 * Test stats tracking
	 */
	describe('stats', () => {
		it('should allow manual stats updates', () => {
			// Arrange
			const mockClue = createMockClue()
			const { result } = renderHook(() => useManageClue(mockClue))

			// Act: Update stats
			act(() => {
				result.current.setStats({
					guesses: 3,
					hints: 2,
					how: 'g',
				})
			})

			// Assert
			expect(result.current.stats).toEqual({
				guesses: 3,
				hints: 2,
				how: 'g',
			})
		})
	})
})
