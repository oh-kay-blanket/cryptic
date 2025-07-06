const changeColor = (toChange, color = false, recheck = false) => {

	// Helper function to get CSS custom property values
	const getCSSVariable = (variable) => {
		return getComputedStyle(document.documentElement).getPropertyValue(variable).trim()
	}

	const getColor = () => {
		if (color) {
			// Map hardcoded colors to CSS custom properties
			switch (color) {
				case '#7457D6':
					return getCSSVariable('--lc-highlight-text')
				case '#0B0B0B':
				case '#0b0b0b':
					return getCSSVariable('--lc-text-primary')
				case '#222':
					return getCSSVariable('--lc-text-secondary')
				case '#ccc':
					return getCSSVariable('--lc-text-muted')
				default:
					return color
			}
		} else {
			return getCSSVariable('--lc-highlight-text')
		}
	}

	if (Array.isArray(toChange)) {
		toChange.forEach( ref => {

			if (recheck) {
				// Reset to primary text color
				ref.current.style.color = getCSSVariable('--lc-text-primary')
			} else {
				ref.current.style.color = getColor()
				ref.current.style.opacity = 1
			}
		})
	} else {
		if (recheck) {
			// Reset to primary text color
			toChange.current.style.color = getCSSVariable('--lc-text-primary')
		} else {
			toChange.current.style.color = getColor()
			toChange.current.style.opacity = 1
		}
	}
}

export default changeColor