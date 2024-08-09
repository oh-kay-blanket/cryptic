import React, { useState } from 'react'

import clues from '../clues.json';

const useActiveClue = () => {
	// state
	const [activeClue, setActiveClue] = useState(clues[3]);
	const [solution, setSolution] = useState(false);

	const cleanActiveClue = activeClue => {
		
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

		
	}
	cleanActiveClue(activeClue)

	return { activeClue, setActiveClue, solution, setSolution }
}

export default useActiveClue