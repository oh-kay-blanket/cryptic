import React, { useState } from 'react'

import Button from '../components/bottom/Button'

const useNextHint = activeClue => {

	// state
	const [nextHint, setNextHint] = useState(0)
	const [message, setMessage] = useState('')
	const [btnArr, setBtnArr] = useState([{ name:'Show hint', style: 'secondary', onClick: function(){showHint()} }])

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

	const buttons = btnArr.map((btnInfo, index) => <Button key={index} btnInfo={btnInfo} />)

	return { nextHint, showHint, btnArr, setBtnArr, message, buttons }
}

export default useNextHint