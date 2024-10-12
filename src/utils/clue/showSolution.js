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
			changeColor(activeClue.hints[nextHint-1].end.ref.splice(0, solIndex), '#ccc')
			changeColor(activeClue.hints[nextHint-1].end.ref.splice(activeClue.solution.arr.length), '#ccc')
			break
		case 'initialism':
			changeColor(activeClue.hints[nextHint-1].end.ref, '#ccc')
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

	setTimeout(revealSolution, 2000)
	setTimeout(revealSource, 2200)
}

export default showSolution