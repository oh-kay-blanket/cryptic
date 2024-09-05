import moveLetters from "./moveLetters"
import colorChange from './colorChange'
import removeSpecial from "./removeSpecial"

const showSolution = (clue, movementLettersRef, solLettersRef, solSectionRef, indicatedLettersRef) => {

	if (clue.type.length == 1) {
		
		switch(clue.type[0].name) { 
			case 'Anagram':
				moveLetters(movementLettersRef, solLettersRef, solSectionRef)
				break 
			case 'Hidden word':

				// get index of solution within indicated
				let solIndex = removeSpecial(clue.hints.find(hint => hint.hintType == 'indicated').value[0]).indexOf(clue.solution)

				indicatedLettersRef = removeSpecial(indicatedLettersRef)
				colorChange(indicatedLettersRef.splice(0, solIndex), '#ccc')
				colorChange(indicatedLettersRef.splice(clue.solution.length), '#ccc')
				break 
			default: 
				break 
		}
	}
	
	// reveal solution large
	const revealSolutionLarge = () => {
		solSectionRef.current.classList.add('hide-input')
		solSectionRef.current.classList.add('reveal-solution')
	}

	setTimeout(revealSolutionLarge, 4000)
}

export default showSolution