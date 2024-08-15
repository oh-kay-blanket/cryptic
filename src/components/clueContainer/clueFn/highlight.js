
// moves letters from movementLettersRef to solutionLettersRef
const highlight = (indicatedLettersRef) => {

	// console.log(indicatedLettersRef)
	
	indicatedLettersRef.forEach( ref => {
		ref.current.style.backgroundColor = '#FFCBAB'
	})

}

export default highlight