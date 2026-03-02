const changeColor = (toChange, color = false, recheck = false) => {
	// Guard against undefined or null
	if (!toChange) return

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
				case '#222':
					return getCSSVariable('--lc-text-handwritten')
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
			if (!ref || !ref.current) return
			if (recheck) {
				// Reset to handwritten font color (matches solution section)
				ref.current.style.color = getCSSVariable('--lc-text-handwritten')
			} else {
				ref.current.style.color = getColor()
				ref.current.style.opacity = 1
			}
		})
	} else {
		if (!toChange || !toChange.current) return
		if (recheck) {
			// Reset to handwritten font color (matches solution section)
			toChange.current.style.color = getCSSVariable('--lc-text-handwritten')
		} else {
			toChange.current.style.color = getColor()
			toChange.current.style.opacity = 1
		}
	}
}

export default changeColor