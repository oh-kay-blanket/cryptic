
// moves letters from movementLettersRef to solutionLettersRef
const highlightLetters = (indicatedLettersRef, color = false, recheck) => {

	const getHex = () => {
		if (color) {
			return color
		} else {
			return '#E1D8FF'
		}
	}
	
	indicatedLettersRef.forEach( ref => {
		if (recheck) {
			if (ref.current.style.backgroundColor == 'rgb(225, 216, 255)') ref.current.style.backgroundColor = '#E2E2E2'
		} else {
			ref.current.style.backgroundColor = getHex()
		}
	})

}

export default highlightLetters