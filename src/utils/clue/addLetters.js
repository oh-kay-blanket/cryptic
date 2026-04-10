import removeSpecial from "./removeSpecialChar"

// adds letters that will be needed as either duplicates or are not within the original clue
const addLetters = (activeClue, hint) => {

	if (hint && hint.type === 'indicator') {
		hint.addLetters = { ref: { current: [] } }

		if (!hint.end || !hint.end.value) {
			hint.addLetters.value = []
			return
		}

		switch(hint.category) {
			case 'anagram':
			case 'hidden word':
			case 'letter bank':
			case 'particle':
			case 'symbol':
				hint.addLetters.value = hint.end.value[0] ? removeSpecial(hint.end.value[0], true).split('') : []
				break

			case 'synonym':
				hint.addLetters.value = []
				break

			case 'sy-2':
				hint.addLetters.value = hint.end.value[0] ? removeSpecial(hint.end.value[0], true).split('') : []
				break

			case 'container':
				hint.addLetters.value = hint.end.value.length > 0 ? [...hint.end.value.map(v => removeSpecial(v, true)).join("").split(''), ...hint.end.value.map(v => removeSpecial(v, true)).join(" ").split('')] : []
				break

			case 'lb-2':
				hint.addLetters.value = hint.end.value[1] ? [...removeSpecial(hint.end.value[1], true), ...removeSpecial(hint.end.value[1], true)] : []
				break

			case 'direct':
				hint.addLetters.value = removeSpecial(hint.value, true).split('')
				break

			case 'homophone':
				hint.addLetters.value = ['homophone-icon', activeClue.solution.value]
				break

			case 'spoonerism':
				hint.addLetters.value = ['spoonerism-icon']
				break

			case 'sp-2':
				hint.addLetters.value = hint.end.value[1] ? removeSpecial(hint.end.value[1], true).split('') : []
				break

			case 'hw-2':
				hint.addLetters.value = hint.end.value[1] ? removeSpecial(hint.end.value[1]).split('') : []
				break

			case 'initialism':
				hint.addLetters.value = hint.end.value.length > 0 ? hint.end.value.map(endPt => {
					return endPt ? endPt.split(' ').map(word => word.split('')[0]).flat() : []
				}).flat() : []
				break

			case 'ag-2':
			case 'reversal':
				hint.addLetters.value = hint.end.value.length > 0 ? hint.end.value.map(endPt => endPt ? removeSpecial(endPt, true).split('') : []).flat() : []
				break

			case 'dd-2': {
				const solLetters = activeClue.solution.arr
				hint.addLetters.value = [
					'dd-def-0',
					'dd-icon',
					...solLetters,
					'dd-def-1',
					'dd-icon',
					...solLetters,
				]
				hint.addLetters.solLength = solLetters.length
				break
			}

			default:
				break
		}
	}
}

export default addLetters
