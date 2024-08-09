import React, { useState } from 'react'

import clues from '../clues.json';

const useActiveClue = () => {
	// state
	const [activeClue, setActiveClue] = useState(clues[7]);
	const [solution, setSolution] = useState(false);


	// clean active clue //

	// get solution letters
	const getSolutionLetters = solution => `(${solution.split(' ').map(word => word.length).join(' ')})`
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


	// build hintOrder //
	
	activeClue.hintOrder = []
	activeClue.definition.forEach(def => activeClue.hintOrder.push({ hintType: 'definition', value: def }))
	activeClue.type.forEach(type => {
		type.indicator.forEach((ind) => {
			activeClue.hintOrder.push({ hintType: 'indicator', value: ind.start, hintCategory: type.name })
			ind.end.length > 0 && activeClue.hintOrder.push({ hintType: 'indicated', value: ind.end, hintCategory: type.name })
		})
	})

	activeClue.hintOrder.push({ hintType: 'solution', value: activeClue.solution })

	console.log(activeClue)

	return { activeClue, setActiveClue, solution, setSolution }
}

export default useActiveClue