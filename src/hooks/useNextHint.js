import React, { useState } from 'react'

const useNextHint = activeClue => {

	// state
	const [nextHint, setNextHint] = useState(0);

	const showHint = () => {

		console.log(activeClue.hints[nextHint])

		const dialogueCopy = () => {

			switch(activeClue.hints[nextHint].hintType){
				case 'definition':
					return `"${activeClue.definition}" is the definition.`
				case 'indicator':
					return `"${activeClue.hints[nextHint].value}" incicates there is a/an ${activeClue.hints[nextHint].hintCategory}.`
				case 'indicated':
					return `"${activeClue.hints[nextHint].value[0]}" is where we will find the ${activeClue.hints[nextHint].hintCategory}.`
				case 'solution':
					return `"${activeClue.solution}" is the solution.`
				default: 
					return activeClue.hints[nextHint]
			}
		}

		alert(dialogueCopy())
		// showHintDialogue(dialogueCopy())
		setNextHint(nextHint + 1)
	}

	return { nextHint, showHint }
}

export default useNextHint