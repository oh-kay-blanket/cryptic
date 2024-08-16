import moveLetters from "./moveLetters"
import colorChange from './colorChange'
import removeSpecial from "./removeSpecial"

const showSolution = (clue, movementLettersRef, solutionLettersRef, solutionSection, indicatedLettersRef) => {

	if (clue.type.length == 1) {

		switch(clue.type[0].name) {
			case 'Anagram':
				moveLetters(movementLettersRef, solutionLettersRef, solutionSection)
				return 
			case 'Hidden word':

				// get index of solution within indicated
				let solIndex = removeSpecial(clue.hints.find(hint => hint.hintType == 'indicated').value[0]).indexOf(clue.solution)

				indicatedLettersRef = removeSpecial(indicatedLettersRef)
				colorChange(indicatedLettersRef.splice(0, solIndex), '#ccc')
				colorChange(indicatedLettersRef.splice(clue.solution.length), '#ccc')
				return 
			default: 
				return 
		}
	}
}

export default showSolution