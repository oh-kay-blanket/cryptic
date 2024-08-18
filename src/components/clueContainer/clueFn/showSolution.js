import moveLetters from "./moveLetters"
import colorChange from './colorChange'
import removeSpecial from "./removeSpecial"

const showSolution = (clue, movementLettersRef, solutionLettersRef, solutionSection, indicatedLettersRef) => {

	if (clue.type.length == 1) {
		
		switch(clue.type[0].name) { 
			case 'Anagram':
				moveLetters(movementLettersRef, solutionLettersRef, solutionSection)
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
	console.log('revealing')

	// reveal solution large
	const revealSolutionLarge = () => {
		solutionSection.current.style.opacity = 1
	}

	setTimeout(revealSolutionLarge, 4000)
}

export default showSolution