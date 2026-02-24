// Highlights letters in the clue by setting background color
const highlightLetters = (indicatedLettersRef, color = false, recheck) => {
	// Guard against undefined or empty arrays
	if (!indicatedLettersRef || !Array.isArray(indicatedLettersRef) || indicatedLettersRef.length === 0) return

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
		if (!ref || !ref.current) return
		if (recheck) {
			// Set to muted gray background to show previously highlighted
			ref.current.style.backgroundColor = getCSSVariable('--lc-bg-muted')
		} else {
			ref.current.style.backgroundColor = getBackgroundColor()
		}
	})

}

export default highlightLetters