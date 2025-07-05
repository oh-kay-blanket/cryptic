import React, { createContext, useState, useEffect, useMemo } from 'react'

export const UserContext = createContext({
	completedClues: [],
	showType: true,
	typeViewed: [],
	returnLearn: false,
})

export const UserProvider = ({ children }) => {
	const [returnLearn, setReturnLearn] = useState(false)

	// manage lcState
	const [lcState, setLcState] = useState(() => {
		if (typeof window !== 'undefined') {
			const storedState = localStorage.getItem('lcState')
			if (storedState) {
				return JSON.parse(storedState)
			}
		}
		return {
			completedClues: [],
			showType: true,
			typeViewed: [],
			streak: 0,
			longestStreak: 0,
			lastSolved: '',
		}
	})

	// Variables
	let completedClues = lcState.completedClues
	let showType = lcState.showType
	let typeViewed = lcState.typeViewed
	let streak = lcState.streak
	let longestStreak = lcState.longestStreak

	useEffect(() => {
		const checkStreak = () => {
			function shouldResetStreak(lastSolvedDate) {
				if (!lastSolvedDate || lcState.streak === 0) {
					return false
				}

				const lastSolved = new Date(lastSolvedDate)
				const now = new Date()

				// Set both dates to start of day for proper comparison
				const lastSolvedDay = new Date(
					lastSolved.getFullYear(),
					lastSolved.getMonth(),
					lastSolved.getDate()
				)
				const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
				const yesterday = new Date(today)
				yesterday.setDate(yesterday.getDate() - 1)

				// Calculate the difference in days
				const daysDifference = Math.floor(
					(today - lastSolvedDay) / (1000 * 60 * 60 * 24)
				)

				// Reset streak only if more than 1 day has passed
				// (0 = today, 1 = yesterday, 2+ = streak should break)
				return daysDifference > 1
			}

			console.log('lastSolved', lcState.lastSolved)
			console.log('streak', lcState.streak)

			if (shouldResetStreak(lcState.lastSolved)) {
				console.log(
					'streak broken, resetting - more than 1 day since last solve'
				)
				setLcState((prevState) => ({
					...prevState,
					streak: 0,
				}))
			} else {
				console.log('streak intact, retaining')
			}
		}

		checkStreak()
		localStorage.setItem('lcState', JSON.stringify(lcState))
	}, [lcState.lastSolved, lcState.streak]) // Only depend on the specific values that matter

	// Functions
	const addCompletedClue = (activeClue, stats, type) => {
		const guesses = type === 'g' ? stats.guesses + 1 : stats.guesses
		const hints = type === 'h' ? stats.hints + 1 : stats.hints
		const repeat = completedClues.find(
			(completed) => completed.clid === activeClue.clid
		)
		const knownUser = completedClues && completedClues.length > 0
		let streak = lcState.streak == null ? 0 : lcState.streak
		let longestStreak =
			lcState.longestStreak == null ? 0 : lcState.longestStreak

		const isTodayClue = (activeClue) => {
			const date1 = new Date(activeClue.release)
			const date2 = new Date()

			// Strip time part by setting hours, minutes, seconds, and milliseconds to zero
			const d1 = new Date(
				date1.getFullYear(),
				date1.getMonth(),
				date1.getDate()
			)
			const d2 = new Date(
				date2.getFullYear(),
				date2.getMonth(),
				date2.getDate()
			)

			return d1.getTime() === d2.getTime()
		}

		isTodayClue(activeClue) && streak++

		// Update longest streak if current streak is longer
		if (streak > longestStreak) {
			longestStreak = streak
		}

		// Only update if not already in completedClues
		if (!repeat) {
			setLcState({
				...lcState,
				streak: streak,
				longestStreak: longestStreak,
				lastSolved: activeClue.release,
				completedClues: [
					...lcState.completedClues,
					{
						clid: activeClue.clid,
						guesses: guesses,
						hints: hints,
						how: type,
					},
				],
			})
		} else {
			console.log('clue locked, no update to stats')
		}

		// GA event
		if (typeof window.gtag !== 'undefined') {
			window.gtag('event', 'completed_clue', {
				clid: activeClue.clid,
				hints: hints,
				guesses: guesses,
				how: type,
				total_completed: knownUser && completedClues.length + 1,
				repeat: !!repeat,
				known_user: knownUser,
				avg_guesses: (
					completedClues.reduce((sum, item) => sum + item.guesses, 0) /
					completedClues.length
				).toFixed(1),
				avg_hints: (
					completedClues.reduce((sum, item) => sum + item.hints, 0) /
					completedClues.length
				).toFixed(1),
			})
		}
	}

	// Whether or not to show type pills in clue container
	const setShowType = (newType) => {
		setLcState({
			...lcState,
			showType: newType,
		})
	}

	// List of types viewed in Learn module
	const setTypeViewed = (newType) => {
		setLcState({
			...lcState,
			typeViewed: [...lcState.typeViewed, newType],
		})
	}

	const contextValue = useMemo(
		() => ({
			completedClues,
			addCompletedClue,
			streak,
			longestStreak,
			showType,
			setShowType,
			typeViewed,
			setTypeViewed,
			returnLearn,
			setReturnLearn,
		}),
		[completedClues, streak, longestStreak, showType, typeViewed, returnLearn]
	)

	return (
		<UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
	)
}
