
// moves letters from movementLettersRef to solutionLettersRef
const highlightLetters = (indicatedLettersRef, color = false, recheck) => {

	// Helper function to get CSS custom property values
	const getCSSVariable = (variable) => {
		return getComputedStyle(document.documentElement).getPropertyValue(variable).trim()
	}

	const getBackgroundColor = () => {
		if (color) {
			// Map hardcoded colors to CSS custom properties
			switch (color) {
				case '#E1D8FF':
					return getCSSVariable('--lc-highlight-bg')
				case '#E2E2E2':
					return getCSSVariable('--lc-bg-muted')
				default:
					return color
			}
		} else {
			return getCSSVariable('--lc-highlight-bg')
		}
	}
	
	indicatedLettersRef.forEach( ref => {
		if (recheck) {
			// Set to muted gray background to show previously highlighted
			ref.current.style.backgroundColor = getCSSVariable('--lc-bg-muted')
		} else {
			ref.current.style.backgroundColor = getBackgroundColor()
		}
	})

}

export default highlightLetters