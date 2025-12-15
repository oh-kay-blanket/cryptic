/**
 * Date utility functions for Learn Cryptic
 *
 * These utilities handle date comparisons with proper time-stripping
 * to ensure accurate day-level comparisons regardless of time zones.
 */

/**
 * Strips time component from a date, returning midnight of that day
 *
 * @param {Date|string} date - Date object or date string
 * @returns {Date} Date object set to midnight (00:00:00.000)
 *
 * @example
 * const date = new Date('2024-01-15T14:30:00')
 * const stripped = stripTime(date)
 * // Returns: Date('2024-01-15T00:00:00.000')
 */
export const stripTime = (date) => {
	const d = new Date(date)
	return new Date(d.getFullYear(), d.getMonth(), d.getDate())
}

/**
 * Compares two dates for equality at the day level (ignoring time)
 *
 * @param {Date|string} date1 - First date to compare
 * @param {Date|string} date2 - Second date to compare
 * @returns {boolean} True if dates are the same day
 *
 * @example
 * isSameDay('2024-01-15T09:00:00', '2024-01-15T18:30:00') // true
 * isSameDay('2024-01-15', '2024-01-16') // false
 */
export const isSameDay = (date1, date2) => {
	const d1 = stripTime(date1)
	const d2 = stripTime(date2)
	return d1.getTime() === d2.getTime()
}

/**
 * Checks if a clue's release date is today
 *
 * @param {Object} clue - Clue object with release property
 * @returns {boolean} True if clue was released today
 *
 * @example
 * const clue = { release: '2024-01-15' }
 * isTodayClue(clue) // true if today is Jan 15, 2024
 */
export const isTodayClue = (clue) => {
	return isSameDay(clue.release, new Date())
}

/**
 * Calculates the number of days between two dates
 *
 * @param {Date|string} date1 - Earlier date
 * @param {Date|string} date2 - Later date
 * @returns {number} Number of days between dates (always positive)
 *
 * @example
 * daysBetween('2024-01-15', '2024-01-18') // 3
 * daysBetween('2024-01-18', '2024-01-15') // 3
 */
export const daysBetween = (date1, date2) => {
	const d1 = stripTime(date1)
	const d2 = stripTime(date2)
	const diffMs = Math.abs(d2.getTime() - d1.getTime())
	return Math.floor(diffMs / (1000 * 60 * 60 * 24))
}

/**
 * Checks if a streak should be reset based on last solved date
 *
 * Streak resets only if MORE than 1 day has passed since last solve
 * - 0 days (today): Keep streak
 * - 1 day (yesterday): Keep streak
 * - 2+ days: Reset streak
 *
 * @param {string} lastSolvedDate - ISO date string of last solve
 * @param {number} currentStreak - Current streak value
 * @returns {boolean} True if streak should be reset
 *
 * @example
 * // If today is Jan 15:
 * shouldResetStreak('2024-01-15', 5) // false (solved today)
 * shouldResetStreak('2024-01-14', 5) // false (solved yesterday)
 * shouldResetStreak('2024-01-13', 5) // true (2 days ago)
 * shouldResetStreak(null, 0) // false (no streak to reset)
 */
export const shouldResetStreak = (lastSolvedDate, currentStreak = 0) => {
	// No reset needed if no streak or no last solved date
	if (!lastSolvedDate || currentStreak === 0) {
		return false
	}

	const today = stripTime(new Date())
	const lastSolved = stripTime(lastSolvedDate)

	// Calculate days since last solve
	const daysDifference = Math.floor(
		(today.getTime() - lastSolved.getTime()) / (1000 * 60 * 60 * 24)
	)

	// Reset only if more than 1 day has passed
	// 0 = today, 1 = yesterday, 2+ = streak broken
	return daysDifference > 1
}
