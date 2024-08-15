// returns an array of refs for clue letter that match with a string or array of strings of target(s)
const getTargetLetters = (hType, clue, clueLettersRef) => {
		
	// let targetLetters = clue.hints.find(hint => hint.hintType == hType).value[0]
	let targetLetters = clue.hints.find(hint => hint.hintType == hType)
	
	// If an array of values
	if (Array.isArray(targetLetters.value)) {

		// Get each index in clue of val
		const targetLettersStartArr = targetLetters.value.map(val => {
			return clue.clue.indexOf(val)
		})

		// get each range of clue refs
		let clueLetters = []
		targetLettersStartArr.forEach((targetLettersStart, index) => {
			clueLetters.push(...clueLettersRef.current.slice(targetLettersStart, (targetLettersStart + targetLetters.value[index].length)))
		})
		return clueLetters 

	// Just a string value
	} else {
		const targetLettersStart = clue.clue.indexOf(targetLetters.value)			
		return clueLettersRef.current.slice(targetLettersStart, (targetLettersStart + targetLetters.value.length))

	}
}

export default getTargetLetters