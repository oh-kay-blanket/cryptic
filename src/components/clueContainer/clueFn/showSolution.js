import moveLetters from "./moveLetters"
import colorChange from './colorChange'
import removeSpecial from "./removeSpecial"

const showSolution = (clue, nextHint, solLettersRef, solSectionRef) => {
		
	switch(clue.hints[nextHint-1].category) { 
		case 'Anagram':
			
			moveLetters(clue.hints[nextHint-1].end.ref, solLettersRef, solSectionRef)
			break 
		case 'Hidden word':

			// get index of solution within indicated
			let solIndex = removeSpecial(clue.hints.find(hint => hint.type == 'indicator').end.value[0]).indexOf(clue.solution.value)				
			
			clue.hints[nextHint-1].end.ref = removeSpecial(clue.hints[nextHint-1].end.ref)
			colorChange(clue.hints[nextHint-1].end.ref.splice(0, solIndex), '#ccc')
			colorChange(clue.hints[nextHint-1].end.ref.splice(clue.solution.length), '#ccc')
			break 
		default: 
			break 
	}
	
	// reveal solution large
	const revealSolutionLarge = () => {
		solSectionRef.current.classList.add('hide-input')
		solSectionRef.current.classList.add('reveal-solution')
	}

	setTimeout(revealSolutionLarge, 4000)
}

export default showSolution