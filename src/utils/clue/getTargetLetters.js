// returns an array of refs for clue letter that match with a string or array of strings of target(s)
const getTargetLetters = (hint, activeClue) => {
	
	// If an array of values
	if (hint) {
		if (Array.isArray(hint.value)) {

	
			// Get each index in clue of val
			const targetLettersStartArr = hint.value.map(val => {
				return activeClue.clue.value.indexOf(val)
			})
	
			// get each range of clue refs
			let clueLetters = []
			targetLettersStartArr.forEach((targetLettersStart, index) => {
				clueLetters.push(...activeClue.clue.ref.current.slice(targetLettersStart, (targetLettersStart + hint.value[index].length)))
			})
			return clueLetters 
	
		// Just a string value
		} else {
			const targetLettersStart = activeClue.clue.value.indexOf(hint.value)			
			return activeClue.clue.ref.current.slice(targetLettersStart, (targetLettersStart + hint.value.length))
	
		}
	}
}

export default getTargetLetters