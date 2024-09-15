
// moves letters from movementLettersRef to solutionLettersRef
const highlightLetters = (hintColor, indicatedLettersRef, color = false) => {

	const getHex = () => {
		if (color) {
			return color
		} else {
			switch(hintColor) {
				case 0:
					return '#FFCBAB'
				case 1:
					return '#e1d8ff'
				case 2:
					return '#febde3'
				case 3:
					return '#bcdbfb'
				default: 
					return '#FFCBAB'
			}
		}
	}
	
	indicatedLettersRef.forEach( ref => {
		ref.current.style.backgroundColor = getHex()
	})

}

export default highlightLetters