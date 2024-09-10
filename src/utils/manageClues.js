import { useState, useEffect } from 'react'

import clues from '../assets/clues.json';

const manageClues = (mode) => {
	
	// state
	const [clueId, setclueId] = useState();
	const [completedClues, setCompletedClues] = useState([])

	let activeClue = !!clueId ? structuredClone(clues.find(clue => clue.id == clueId)) : false

	// fn to add new completed clue
	const addCompletedClue = (newID) => {
		setCompletedClues([...completedClues, Number(newID)])
	}

	// list activeClue
	if (activeClue) {

		// get solution letters
		const getSolutionLetters = solution => solution.value.split(' ').map(word => word.length)
		activeClue.solution.length = {
			value: `(${getSolutionLetters(activeClue.solution).join(', ')})`,
			arr: getSolutionLetters(activeClue.solution)
		}

		// build clue and solution arrays
		activeClue.clue.arr = activeClue.clue.value.split("")
		activeClue.solution.arr = activeClue.solution.value.split("")

		// trim definitions
		activeClue.definition = activeClue.definition.filter(def => def !== "")

		// trim hints
		activeClue.hints = activeClue.hints.filter(hint => hint.category !== "" && hint.value !== "")
		
		// trim indicator ends
		activeClue.hints.forEach(hint => {
			if (hint.end) hint.end.value = hint.end.value.filter(val => val !== "")
		})

		// add type
		activeClue.hints.map(hint => hint.type = 'indicator')

		// build hints //
		activeClue.hints.unshift({ type: 'definition', value: activeClue.definition })
		activeClue.hints.push({ type: 'solution', value: activeClue.solution.value })

		// hint message
		const getMessage = hint => {

			const vowels = ['a', 'e', 'i', 'o', 'u']

			let aAn = hint.category && hint.category.slice(0, 1).includes(vowels) ? 'a' : 'a'

			switch(hint.type) {
				case 'definition':
					// Single definition
					if (hint.value.length == 1) {
						return `<strong>${hint.value}</strong> is the definition`

						// Double definition
					} else {
						return `Both <strong>${hint.value[0]}</strong> and <strong>${hint.value[1]}</strong> are definitions`
					}
				case 'indicator':

					// One end point
					if (hint.end.value.length == 1) {
						return `<strong>${hint.value}</strong> incicates there is ${aAn} <em>${hint.category}</em> at <strong>${hint.end.value[0]}</strong>` 
						
						// Two end points
					} else {
						return `<strong>${hint.value}</strong> incicates there is ${aAn} </em>${hint.category}</em> at <strong>${hint.end.value[0]}</strong> and <strong>${hint.end.value[1]}</strong>` 
					}
				case 'solution':
					return `<strong>${hint.value}</strong> is the solution`
				default: 
					return hint.value
			}
		}

		activeClue.hints = activeClue.hints.map(hint => ({...hint, message: getMessage(hint)}))

	}

	useEffect(() => {
		activeClue && console.log(activeClue)
	}, [clueId]);

	return { clues, activeClue, setclueId, completedClues, addCompletedClue }
}

export default manageClues