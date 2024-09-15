import  { useRef, createRef } from 'react'

import removeSpecial from './removeSpecialChar'

// adds letters that will be needed as either duplicates or are not within the original clue
const addLetters = (activeClue, hint) => {

	if (hint && hint.type == 'indicator') {
		hint.addLetters = {}

		switch(hint.category) {
			case 'hidden word':
			case 'particle':
				hint.addLetters.value = hint.end.value[1].split('')
				break
			case 'direct':
				hint.addLetters.value = hint.value.split('')
				break
			case 'initialism':
				hint.addLetters.value = hint.end.value.map(endPt => {
					return endPt.split(' ').map(word => word.split('')[0]).flat()
				}).flat()
				break
			case 'deletion':
				break
			default:
				hint.addLetters.value = hint.end.value.map(endPt => endPt.split('')).flat()
				break
		}

		if (hint.addLetters.value) {
			hint.addLetters.ref = useRef(hint.addLetters.value.map(() => createRef()))
			hint.addLetters.wordRef = useRef()
		}
	}
}

export default addLetters