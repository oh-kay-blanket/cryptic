// returns an array of refs for clue letter that match with a string or array of strings of target(s)
const getTargetLetters = (letters, activeClue, hint) => {
	
	// If an array of values
		if (Array.isArray(letters)) {
	
			// Get each index in clue of val
			const targetLettersStartArr = letters.map(val => {
				return activeClue.clue.value.indexOf(val)
			})
			
			// Special case where ref is not part of clue
			if ((hint.category == 'particle' || hint.category == 'container' || hint.category == 'anagram' || hint.category == 'letter bank') && Array.isArray(targetLettersStartArr) && targetLettersStartArr[0] == -1) {
				activeClue.hints.find(h => {
					if (!!h.end && h.end.value[0] === letters[0]) {
						return h.addLetters.ref.current
					}
				})
				
				// Ref found in clue
			} else {
				// get each range of clue refs
				let clueLetters = []
				targetLettersStartArr.forEach((targetLettersStart, index) => {
					clueLetters.push(...activeClue.clue.ref.current.slice(targetLettersStart, (targetLettersStart + letters[index].length)))
				})
				return clueLetters 
			}
	
	
		// Just a string value
		} else {
			const targetLettersStart = activeClue.clue.value.indexOf(letters)
			const strSlice = activeClue.clue.ref.current.slice(targetLettersStart, (targetLettersStart + letters.length))
			// console.log(letters, hint, strSlice)			
			return strSlice
	
		}
}

export default getTargetLetters