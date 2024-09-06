// returns an array of refs for clue letter that match with a string or array of strings of target(s)
const getTargetLetters = (hint, clue, clueLettersRef) => {
	
	// If an array of values
	if (hint) {
		if (Array.isArray(hint.value)) {

	
			// Get each index in clue of val
			const targetLettersStartArr = hint.value.map(val => {
				return clue.clue.value.indexOf(val)
			})
	
			// get each range of clue refs
			let clueLetters = []
			targetLettersStartArr.forEach((targetLettersStart, index) => {
				clueLetters.push(...clueLettersRef.current.slice(targetLettersStart, (targetLettersStart + hint.value[index].length)))
			})
			return clueLetters 
	
		// Just a string value
		} else {
			const targetLettersStart = clue.clue.value.indexOf(hint.value)			
			return clueLettersRef.current.slice(targetLettersStart, (targetLettersStart + hint.value.length))
	
		}
	}
}

export default getTargetLetters