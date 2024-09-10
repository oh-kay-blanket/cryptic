
// moves letters from movementLettersRef to solutionLettersRef
const highlightLetters = (indicatedLettersRef) => {
	
	indicatedLettersRef.forEach( ref => {
		ref.current.style.backgroundColor = '#FFCBAB'
	})

}

export default highlightLetters