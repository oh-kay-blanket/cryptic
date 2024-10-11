
// moves letters from movementLettersRef to solutionLettersRef
const highlightLetters = (indicatedLettersRef, color = false, recheck) => {

	const getHex = () => {
		if (color) {
			return color
		} else {
			return '#FFCBAB'
		}
	}
	
	indicatedLettersRef.forEach( ref => {
		if (recheck) {
			if (ref.current.style.backgroundColor == 'rgb(255, 203, 171)') ref.current.style.backgroundColor = '#E2E2E2'
		} else {
			ref.current.style.backgroundColor = getHex()
		}
	})

}

export default highlightLetters