import underlineLetters from './underlineLetters'
import highlightLetters from './highlightLetters'
import changeColor from './changeColor'
import showSolution from './showSolution'

const handleHint = (activeClue, nextHint, showMessage, checkAns) => {

	if (showMessage && !checkAns) {

		const hint = activeClue.hints[nextHint]

		switch(hint.type) {

			case 'definition':
				underlineLetters(hint.ref)
				break

			case 'indicator': 
				switch(hint.category) {
					case 'charade':
					case 'symbol':
					case 'synonym':
						highlightLetters(hint.ref)
						changeColor(hint.addLetters.ref.current)
						break
					case 'direct':
						changeColor(hint.ref, '#ccc')
						changeColor(hint.addLetters.ref.current)
						break
					case 'initialism':
						highlightLetters(hint.ref)
						changeColor(hint.end.ref)
						// changeColor(hint.addLetters.ref.current)
						break
					case 'anagram':
						highlightLetters(hint.ref)
						changeColor(hint.end.ref, '#ccc')
						changeColor(hint.addLetters.ref.current.slice(0,hint.end.value[0].length))
						break
					case 'particle':
						highlightLetters(hint.ref)
						changeColor(hint.end.ref, '#ccc')
						changeColor(hint.addLetters.ref.current)
						break
					default:
						highlightLetters(hint.ref)
						changeColor(hint.end.ref)
						break
				}
				break
			case 'solution':
				showSolution(activeClue, nextHint)
				break
			default: 
				break
		}
	} else if (!showMessage) {
		// change last hint to gray
		if (nextHint > 1){
			try {
				highlightLetters(activeClue.hints[nextHint - 1].ref, false, true)
				changeColor(activeClue.hints[nextHint - 1].end.ref, false, true)
				changeColor(activeClue.hints[nextHint - 1].addLetters.ref.current, false, true)
			} catch(err) {
				console.log(err)
			}
		}
	}
}

export default handleHint