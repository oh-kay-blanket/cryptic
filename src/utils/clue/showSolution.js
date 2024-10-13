import moveLetters from "./moveLetters"
import changeColor from './changeColor'
import removeSpecial from "./removeSpecialChar"

const showSolution = (activeClue, nextHint) => {
		
	switch(activeClue.hints[nextHint-1].category) { 
		case 'anagram':
			moveLetters(activeClue.hints[nextHint-1].end.ref, activeClue.solution.ref, activeClue.solution.sectionRef)
			break 
		case 'hidden word':
			// get index of solution within indicated
			let solIndex = removeSpecial(activeClue.hints.find(hint => hint.type == 'indicator').end.value[0]).indexOf(activeClue.solution.value)

			activeClue.hints[nextHint-1].end.ref = removeSpecial(activeClue.hints[nextHint-1].end.ref)
			changeColor(activeClue.hints[nextHint-1].end.ref, '#ccc')
			changeColor(activeClue.hints[nextHint-1].end.ref.splice(solIndex, activeClue.solution.arr.length))
			break
		case 'initialism':
			changeColor(activeClue.hints[nextHint-1].end.ref, '#ccc')
			// build arrary of first letters
			let firstLetters = activeClue.hints[nextHint-1].end.value[0].split(' ').map(wrd => wrd.length +1)
			firstLetters.pop()
			firstLetters = [0, ...firstLetters]

			firstLetters.forEach(startLetter => {
				changeColor(activeClue.hints[nextHint-1].end.ref[startLetter])
				activeClue.hints[nextHint-1].end.ref.splice(0, startLetter)
			})
		default: 
			break 
	}
	
	// reveal solution
	const revealSolution = () => {
		activeClue.solution.sectionRef.current.classList.add('hide-input')
		activeClue.solution.sectionRef.current.classList.add('reveal-solution')
	}

	// reveal solution
	const revealSource = () => {
		activeClue.source.ref.current.classList.add('show')
	}

	revealSolution()
	setTimeout(revealSource, 1000)
}

export default showSolution