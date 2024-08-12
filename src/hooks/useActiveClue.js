import React, { useState, useEffect } from 'react'

import clues from '../clues.json';

const useActiveClue = () => {
	
	// state
	const [activeClue, setActiveClue] = useState(clues[3]);
	
	const nextActiveClue = activeClue => {
		const rndm = Math.floor(Math.random() * clues.length)
		setActiveClue(clues[rndm])
	}

	if (activeClue) {
		// clean active clue //

		// get solution letters
		const getSolutionLetters = solution => `(${solution.split(' ').map(word => word.length).join(', ')})`
		activeClue.solutionLetters = getSolutionLetters(activeClue.solution)

		// trim definitions
		activeClue.definition = activeClue.definition.filter(def => def !== "")

		// trim types
		activeClue.type = activeClue.type.filter(ty => ty.name !== "")

		// trim type indicators
		activeClue.type.forEach(ty => ty.indicator = ty.indicator.filter(ind => ind.start !== ""))
		// activeClue.type = activeClue.type.forEach(ty => ty.indicator.filter(ind => ind.start !== ""))
		
		// trim indicator ends
		activeClue.type.forEach(ty => ty.indicator.forEach(ind => ind.end = ind.end.filter(end => end !== "")))


		// build hints //
		
		activeClue.hints = []
		activeClue.definition.forEach(def => activeClue.hints.push({ hintType: 'definition', value: def }))
		activeClue.type.forEach(type => {
			type.indicator.forEach((ind) => {
				activeClue.hints.push({ hintType: 'indicator', value: ind.start, hintCategory: type.name })
				ind.end.length > 0 && activeClue.hints.push({ hintType: 'indicated', value: ind.end, hintCategory: type.name })
			})
		})

		activeClue.hints.push({ hintType: 'solution', value: activeClue.solution })

		// hint message
		const getMessage = hint => {

			switch(hint.hintType){
				case 'definition':
					return `"${hint.value}" is the definition.`
				case 'indicator':
					return `"${hint.value}" incicates there is a/an ${hint.hintCategory}.`
				case 'indicated':
					return `"${hint.value[0]}" is where we will find the ${hint.hintCategory}.`
				case 'solution':
					return `"${hint.value}" is the solution.`
				default: 
					return hint.value
			}
		}

		activeClue.hints = activeClue.hints.map(hint => ({...hint, message: getMessage(hint)}))
	}

	// list activeClue
	useEffect(() => {
		console.log(activeClue ? activeClue : mode)
	}, [activeClue])

	return { activeClue, nextActiveClue }
}

export default useActiveClue