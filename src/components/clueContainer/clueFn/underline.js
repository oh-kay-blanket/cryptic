
// moves letters from movementLettersRef to solutionLettersRef
const underline = (defintionLettersRef) => {

	// console.log(defintionLettersRef)
	
	defintionLettersRef.forEach( ref => {
		ref.current.style.textDecoration = 'underline'
	})

}

export default underline