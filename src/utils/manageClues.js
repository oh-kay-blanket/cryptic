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
		activeClue.solution.arr = activeClue.solution.arr.filter(ltr => ltr !== " ")

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
					switch(hint.category) {
						case 'charade':
							return `<strong>${hint.value}</strong> can give us <strong>${hint.end.value[0]}</strong>`
						case 'container':
							return `<strong>${hint.value}</strong>, indicates <strong>${hint.end.value[1]}</strong>, will go inside <strong>${hint.end.value[0]}</strong>`
						case 'deletion':
							return `<strong>${hint.value}</strong>, indicates a deletion on <strong>${hint.end.value[0]}</strong>, giving us <strong>${hint.end.value[1]}</strong>`
						case 'direct':
							return `<strong>${hint.value}</strong> is part of the answer`
						case 'hidden word':
							return `<strong>${hint.value}</strong> indicates a hidden word within <strong>${hint.end.value[0]}</strong>`
						case 'homophone':

							// indicator only
							if (hint.end.value.length == 0) {
								return `<strong>${hint.value}</strong> indicates there is a homophone`

							// indicate and reveal
							} else if (hint.end.value.length == 2) {
								return `<strong>${hint.end.value[0]}</strong> is a homophone for <strong>${hint.end.value[1]}</strong>`
							
							// multiple end points
							} else {
								return `<strong>${hint.end.value[0]}</strong> + <strong>${hint.end.value[1]}</strong> = <strong>${hint.end.value[2]}</strong>`
							}
						case 'initialism':
							return `<strong>${hint.value}</strong> indicates we should take the beginning of one or more words`
						case 'letter bank':
							return `<strong>${hint.value}</strong> indicates <strong>${hint.end.value[0]}</strong> is a letter bank<br><em class='helper'>(an anagram where letters can be used more than once)</em>`
						case 'particle':
							return `<strong>${hint.value}</strong>, when applied to <strong>${hint.end.value[0]}</strong>, can give us <strong>${hint.end.value[1]}</strong>`
						case 'reversal':
							return `<strong>${hint.value[0]}</strong>, indicates a reversal on <strong>${hint.end.value[1]}</strong>, giving us <strong>${hint.end.value[2]}</strong>`
						case 'synonym':
							return `Another word for <strong>${hint.value}</strong> can be <strong>${hint.end.value[0]}</strong>`
						case 'symbol':
							return `<strong>${hint.value}</strong> can give us <strong>${hint.end.value[0]}</strong>`
						default:
							// One end point
							if (hint.end.value.length == 1) {
								return `<strong>${hint.value}</strong> incicates ${aAn} ${hint.category} at <strong>${hint.end.value[0]}</strong>` 
								
								// Two end points
							} else {
								return `<strong>${hint.value}</strong> incicates ${aAn} ${hint.category} at <strong>${hint.end.value[0]}</strong> and <strong>${hint.end.value[1]}</strong>` 
							}
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