
// moves letters from movementLettersRef to solutionLettersRef
const underlineLetters = (defintionLettersRef) => {
	
	defintionLettersRef.forEach( ref => {
		ref.current.classList.add('underline')
	})

}

export default underlineLetters