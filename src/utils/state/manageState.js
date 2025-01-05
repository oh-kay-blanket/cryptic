import { useState, useEffect } from 'react'

import clues from '../../assets/clues.json'
import prepActiveClue from './prepActiveClue'

const manageState = () => {
	
	// state
	const [clueId, setclueId] = useState()
	const [mode, setMode] = useState('archive');

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
	const addCompletedClue = (newID) => {
		setLcState({
			...lcState,
			completedClues: [...lcState.completedClues, Number(newID)]
		})
	}

	const setShowType = (newType) => {
		setLcState({
			...lcState,
			showType: newType
		})
	}

	// make copy of clue to modify & prep
	let activeClue = !!clueId ? structuredClone(clues.find(clue => clue.id == clueId)) : false
	activeClue && prepActiveClue(activeClue)

	useEffect(() => {
		activeClue && console.log(activeClue)
	}, [clueId]);

	return { clues, activeClue, setclueId, completedClues, addCompletedClue, mode, setMode, showType, setShowType }
}

export default manageState