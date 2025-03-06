import removeSpecial from "./removeSpecialChar"

// adds letters that will be needed as either duplicates or are not within the original clue
const addLetters = (activeClue, hint) => {
	
	if (hint && hint.type === 'indicator') { 
		hint.addLetters = { ref: { current: [] } }

		switch(hint.category) {
			case 'anagram':
			case 'hidden word':
			case 'letter bank':
			case 'particle':
			case 'synonym':
			case 'symbol':
				hint.addLetters.value = hint.end.value[0].split('')
				break

			case 'container':
				hint.addLetters.value = [...hint.end.value.join("").split(''), ...hint.end.value.join(" ").split('')]
				break

			case 'lb-2':
				hint.addLetters.value = [...hint.end.value[1], ...hint.end.value[1]]
				break

			case 'direct':
				hint.addLetters.value = hint.value.split('')
				break

			case 'homophone':
				hint.addLetters.value = ['= ', activeClue.solution.value]
				break

			case 'hw-2':
				hint.addLetters.value = removeSpecial(hint.end.value[1]).split('')
				break

			case 'initialism':
				hint.addLetters.value = hint.end.value.map(endPt => {
					return endPt.split(' ').map(word => word.split('')[0]).flat()
				}).flat()
				break

			case 'ag-2':
			case 'reversal':
				hint.addLetters.value = hint.end.value.map(endPt => endPt.split('')).flat()
				break

			case 'spoonerism':
				hint.addLetters.value = hint.end.value[1].split('')
				break

			default:
				break
		}
	}
}

export default addLetters