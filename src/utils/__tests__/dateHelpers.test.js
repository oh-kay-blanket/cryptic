/**
 * Tests for date utility functions
 *
 * LEARNING GUIDE:
 * This file demonstrates testing PURE FUNCTIONS - functions that:
 * - Always return the same output for the same input
 * - Have no side effects (don't modify external state)
 * - Are the easiest type of function to test
 *
 * Testing Pattern:
 * 1. Arrange: Set up test data
 * 2. Act: Call the function
 * 3. Assert: Check the result
 */

import {
	stripTime,
	isSameDay,
	isTodayClue,
	daysBetween,
	shouldResetStreak,
	formatTime,
	formatTimeForShare,
} from '../dateHelpers'

/**
 * describe() groups related tests together
 * Each describe block focuses on one function
 */
describe('dateHelpers', () => {
	/**
	 * FUNCTION: stripTime()
	 * Purpose: Remove time component from dates
	 */
	describe('stripTime', () => {
		/**
		 * it() or test() defines a single test case
		 * Use descriptive names that explain WHAT is being tested
		 */
		it('should strip time from a Date object', () => {
			// Arrange: Create test data
			const date = new Date('2024-01-15T14:30:45.123')

			// Act: Call the function
			const result = stripTime(date)

			// Assert: Check the result
			expect(result.getHours()).toBe(0)
			expect(result.getMinutes()).toBe(0)
			expect(result.getSeconds()).toBe(0)
			expect(result.getMilliseconds()).toBe(0)
			expect(result.getDate()).toBe(15)
			expect(result.getMonth()).toBe(0) // January = 0
			expect(result.getFullYear()).toBe(2024)
		})

		it('should handle date strings', () => {
			const dateString = '2024-12-25T23:59:59'
			const result = stripTime(dateString)

			expect(result.getHours()).toBe(0)
			expect(result.getDate()).toBe(25)
			expect(result.getMonth()).toBe(11) // December = 11
		})

		it('should handle dates already at midnight', () => {
			const midnight = new Date('2024-01-15T00:00:00')
			const result = stripTime(midnight)

			expect(result.getTime()).toBe(midnight.getTime())
		})
	})

	/**
	 * FUNCTION: isSameDay()
	 * Purpose: Compare dates ignoring time
	 */
	describe('isSameDay', () => {
		it('should return true for same day at different times', () => {
			const morning = new Date('2024-01-15T09:00:00')
			const evening = new Date('2024-01-15T18:30:00')

			expect(isSameDay(morning, evening)).toBe(true)
		})

		it('should return false for different days', () => {
			const today = new Date('2024-01-15T12:00:00')
			const tomorrow = new Date('2024-01-16T12:00:00')

			expect(isSameDay(today, tomorrow)).toBe(false)
		})

		it('should handle date strings', () => {
			expect(isSameDay('2024-01-15T00:00:00', '2024-01-15T23:59:59')).toBe(true)
			expect(isSameDay('2024-01-15T00:00:00', '2024-01-16T00:00:00')).toBe(false)
		})

		/**
		 * Edge case testing: Important for date logic!
		 * Test month boundaries, year boundaries, etc.
		 */
		it('should handle month boundaries correctly', () => {
			const endOfMonth = new Date('2024-01-31T23:59:59')
			const startOfNextMonth = new Date('2024-02-01T00:00:01')

			expect(isSameDay(endOfMonth, startOfNextMonth)).toBe(false)
		})

		it('should handle year boundaries correctly', () => {
			const endOfYear = new Date('2024-12-31T23:59:59')
			const startOfNewYear = new Date('2025-01-01T00:00:01')

			expect(isSameDay(endOfYear, startOfNewYear)).toBe(false)
		})
	})

	/**
	 * FUNCTION: isTodayClue()
	 * Purpose: Check if clue is today's clue
	 *
	 * LEARNING: Testing with dynamic data (current date)
	 * We use beforeEach to set up consistent test environment
	 */
	describe('isTodayClue', () => {
		/**
		 * Mock the current date for consistent testing
		 * This ensures tests pass regardless of when they're run
		 */
		beforeEach(() => {
			// Mock Date to always return Jan 15, 2024
			jest.useFakeTimers()
			jest.setSystemTime(new Date('2024-01-15T12:00:00'))
		})

		afterEach(() => {
			// Clean up mocks
			jest.useRealTimers()
		})

		it('should return true when clue release is today', () => {
			const clue = { release: '2024-01-15T09:00:00' }

			expect(isTodayClue(clue)).toBe(true)
		})

		it('should return false when clue release is yesterday', () => {
			const clue = { release: '2024-01-14T09:00:00' }

			expect(isTodayClue(clue)).toBe(false)
		})

		it('should return false when clue release is tomorrow', () => {
			const clue = { release: '2024-01-16T09:00:00' }

			expect(isTodayClue(clue)).toBe(false)
		})
	})

	/**
	 * FUNCTION: daysBetween()
	 * Purpose: Calculate days between two dates
	 */
	describe('daysBetween', () => {
		it('should return 0 for same day', () => {
			const date1 = new Date('2024-01-15T09:00:00')
			const date2 = new Date('2024-01-15T18:00:00')

			expect(daysBetween(date1, date2)).toBe(0)
		})

		it('should return 1 for consecutive days', () => {
			expect(daysBetween('2024-01-15', '2024-01-16')).toBe(1)
		})

		it('should return correct count for multiple days', () => {
			expect(daysBetween('2024-01-15', '2024-01-20')).toBe(5)
		})

		it('should return positive value regardless of date order', () => {
			const early = '2024-01-15'
			const late = '2024-01-20'

			expect(daysBetween(early, late)).toBe(5)
			expect(daysBetween(late, early)).toBe(5)
		})
	})

	/**
	 * FUNCTION: shouldResetStreak()
	 * Purpose: Determine if user streak should reset
	 *
	 * LEARNING: Testing complex business logic
	 * This is the most important function - it implements the core streak rules
	 */
	describe('shouldResetStreak', () => {
		beforeEach(() => {
			// Mock current date to Jan 15, 2024
			jest.useFakeTimers()
			jest.setSystemTime(new Date('2024-01-15T12:00:00'))
		})

		afterEach(() => {
			jest.useRealTimers()
		})

		/**
		 * Test the "happy path" - normal operation
		 */
		it('should NOT reset if solved today', () => {
			const lastSolved = '2024-01-15T09:00:00'
			const streak = 5

			expect(shouldResetStreak(lastSolved, streak)).toBe(false)
		})

		it('should NOT reset if solved yesterday', () => {
			const lastSolved = '2024-01-14T09:00:00'
			const streak = 5

			expect(shouldResetStreak(lastSolved, streak)).toBe(false)
		})

		it('should RESET if solved 2 days ago', () => {
			const lastSolved = '2024-01-13T09:00:00'
			const streak = 5

			expect(shouldResetStreak(lastSolved, streak)).toBe(true)
		})

		it('should RESET if solved 3+ days ago', () => {
			const lastSolved = '2024-01-10T09:00:00'
			const streak = 5

			expect(shouldResetStreak(lastSolved, streak)).toBe(true)
		})

		/**
		 * Test edge cases - boundary conditions and unusual inputs
		 */
		it('should NOT reset if no last solved date', () => {
			expect(shouldResetStreak(null, 5)).toBe(false)
			expect(shouldResetStreak(undefined, 5)).toBe(false)
			expect(shouldResetStreak('', 5)).toBe(false)
		})

		it('should NOT reset if streak is 0', () => {
			const lastSolved = '2024-01-10T09:00:00'

			expect(shouldResetStreak(lastSolved, 0)).toBe(false)
		})

		it('should handle missing streak parameter (default to 0)', () => {
			const lastSolved = '2024-01-10T09:00:00'

			expect(shouldResetStreak(lastSolved)).toBe(false)
		})

		/**
		 * Test month boundary edge case
		 */
		it('should handle month boundaries correctly', () => {
			jest.setSystemTime(new Date('2024-02-01T12:00:00'))

			const yesterday = '2024-01-31T09:00:00'
			const twoDaysAgo = '2024-01-30T09:00:00'

			expect(shouldResetStreak(yesterday, 5)).toBe(false)
			expect(shouldResetStreak(twoDaysAgo, 5)).toBe(true)
		})
	})

	/**
	 * FUNCTION: formatTime()
	 * Purpose: Format seconds to human-readable time string
	 */
	describe('formatTime', () => {
		it('should format times under 60 seconds with "sec" suffix', () => {
			expect(formatTime(0)).toBe('0 sec')
			expect(formatTime(1)).toBe('1 sec')
			expect(formatTime(45)).toBe('45 sec')
			expect(formatTime(59)).toBe('59 sec')
		})

		it('should format times at or above 60 seconds as M:SS', () => {
			expect(formatTime(60)).toBe('1:00')
			expect(formatTime(90)).toBe('1:30')
			expect(formatTime(125)).toBe('2:05')
			expect(formatTime(165)).toBe('2:45')
		})

		it('should pad seconds with leading zero', () => {
			expect(formatTime(61)).toBe('1:01')
			expect(formatTime(69)).toBe('1:09')
			expect(formatTime(600)).toBe('10:00')
		})

		it('should return empty string for null or undefined', () => {
			expect(formatTime(null)).toBe('')
			expect(formatTime(undefined)).toBe('')
		})

		it('should handle large times', () => {
			expect(formatTime(3600)).toBe('60:00')
			expect(formatTime(3661)).toBe('61:01')
		})
	})

	/**
	 * FUNCTION: formatTimeForShare()
	 * Purpose: Format seconds to share-safe string that won't trigger iOS/Android data detectors
	 */
	describe('formatTimeForShare', () => {
		// Zero-width space (U+200B) is inserted between numbers and units
		// to prevent iOS/Android data detectors from recognizing durations
		const ZWS = '\u200B'

		it('should format times under 60 seconds with "s" suffix', () => {
			expect(formatTimeForShare(0)).toBe(`0${ZWS}s`)
			expect(formatTimeForShare(1)).toBe(`1${ZWS}s`)
			expect(formatTimeForShare(45)).toBe(`45${ZWS}s`)
			expect(formatTimeForShare(59)).toBe(`59${ZWS}s`)
		})

		it('should format times at or above 60 seconds as Xm Ys', () => {
			expect(formatTimeForShare(90)).toBe(`1${ZWS}m 30${ZWS}s`)
			expect(formatTimeForShare(125)).toBe(`2${ZWS}m 5${ZWS}s`)
			expect(formatTimeForShare(165)).toBe(`2${ZWS}m 45${ZWS}s`)
		})

		it('should omit seconds when exactly on the minute', () => {
			expect(formatTimeForShare(60)).toBe(`1${ZWS}m`)
			expect(formatTimeForShare(120)).toBe(`2${ZWS}m`)
			expect(formatTimeForShare(600)).toBe(`10${ZWS}m`)
		})

		it('should return empty string for null or undefined', () => {
			expect(formatTimeForShare(null)).toBe('')
			expect(formatTimeForShare(undefined)).toBe('')
		})

		it('should handle large times', () => {
			expect(formatTimeForShare(3600)).toBe(`60${ZWS}m`)
			expect(formatTimeForShare(3661)).toBe(`61${ZWS}m 1${ZWS}s`)
		})

		it('should contain zero-width spaces to break data detection', () => {
			const result = formatTimeForShare(90)
			expect(result).toContain('\u200B')
			expect(result.replace(/\u200B/g, '')).toBe('1m 30s')
		})
	})
})
