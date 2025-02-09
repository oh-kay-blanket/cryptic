import { useState, useEffect } from 'react'

import clues from '../../assets/clues.json'
import prepActiveClue from './prepActiveClue'

const manageState = () => {

	window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
	
	// state
	const [clueId, setclueId] = useState()
	const [mode, setMode] = useState('learn');
	const [stats, setStats] = useState({ guesses: 0, hints: 0, how: '' })

	// manage lcState
	const [lcState, setLcState] = useState(() => {
		// Check if localStorage has the item
		const storedState = localStorage.getItem("lcState")
		if (storedState) {
			return JSON.parse(storedState); // Parse and use the stored value
		} else {
			// Return a default value if it doesn't exist
			return { completedClues: [], showType: true }
		}
	})

	// Variables
	let completedClues = lcState.completedClues
	let showType = lcState.showType


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

		// Reset stats
		setStats({ guesses: 0, hints: 0, how: '' });
	}

	const setShowType = (newType) => {
		setLcState({
			...lcState,
			showType: newType
		})
	}

	// make copy of clue to modify & prep
	let activeClue = !!clueId ? structuredClone(clues.find(clue => clue.id == clueId)) : false
	activeClue && prepActiveClue(activeClue, completedClues)
	
	useEffect(() => {
		activeClue && console.log(activeClue)
	}, [clueId]);

	return { clues, activeClue, setclueId, completedClues, addCompletedClue, mode, setMode, showType, setShowType, stats, setStats }
}

export default manageState