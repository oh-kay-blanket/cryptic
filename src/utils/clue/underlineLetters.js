
// moves letters from movementLettersRef to solutionLettersRef
const underlineLetters = (defintionLettersRef) => {
	
	defintionLettersRef.forEach( ref => {
		ref.current.style.textDecoration = 'underline'
	})

}

export default underlineLetters