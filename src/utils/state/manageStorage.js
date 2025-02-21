import { useState, useEffect } from 'react'

const manageStorage = () => {

	window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
	
	// state
	const [stats, setStats] = useState({ guesses: 0, hints: 0, how: '' })
	const [returnLearn, setReturnLearn] = useState(false)

	// manage lcState
	const [lcState, setLcState] = useState(() => {
		// Check if localStorage has the item
		const storedState = localStorage.getItem("lcState")
		if (storedState) {
			return JSON.parse(storedState); // Parse and use the stored value
		} else {
			// Return a default value if it doesn't exist
			return { completedClues: [], showType: true, typeViewed: [] }
		}
	})

	// Variables
	let completedClues = lcState.completedClues
	let showType = lcState.showType
	let typeViewed = lcState.typeViewed


	// Persist state to localStorage whenever it changes
	useEffect(() => {
		localStorage.setItem("lcState", JSON.stringify(lcState))
	}, [lcState])

	// Functions
	const addCompletedClue = (activeClue, stats, type) => {
		const guesses = type == 'g' ? stats.guesses + 1 : stats.guesses
		const hints = type == 'h' ? stats.hints + 1 : stats.hints
		const repeat = completedClues.find(completed => completed.id == activeClue.id)
		const knownUser = completedClues && completedClues.length > 0

		// Only update if not already in completedClues
		if (!repeat) {
			setLcState({
				...lcState,
				completedClues: [...lcState.completedClues, { 
					id: activeClue.id,
					guesses: guesses,
					hints: hints,
					how: type 
				}]
			})
		} else {
			console.log('clue locked, no update to stats')
		}

		// GA event
		gtag('event', 'completed_clue', {
			'id': activeClue.id,
			'hints': hints,
			'guesses': guesses,
			'how': type,
			'total_completed': knownUser && completedClues.length +1,
			'repeat': !!repeat,
			'known_user': knownUser,
			'avg_guesses': (completedClues.reduce((sum, item) => sum + item.guesses, 0)/completedClues.length).toFixed(0),
			'avg_hints': (completedClues.reduce((sum, item) => sum + item.hints, 0)/completedClues.length).toFixed(0)
		})
	}

	// Whether or not to show type pills in clue container
	const setShowType = (newType) => {
		setLcState({
			...lcState,
			showType: newType
		})
	}

	// List of types viewed in Learn module
	const setTypeViewed = (newType) => {
		setLcState({
			...lcState,
			typeViewed: [...lcState.typeViewed,newType]
		})
	}

	return { completedClues, addCompletedClue, showType, setShowType, stats, setStats, typeViewed, setTypeViewed, returnLearn, setReturnLearn }
}

export default manageStorage