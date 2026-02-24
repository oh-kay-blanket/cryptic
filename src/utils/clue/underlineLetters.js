// Underlines definition letters using inline styles
// Using inline styles instead of classList to prevent React from overwriting on re-render
const underlineLetters = (definitionLettersRef) => {
	if (!definitionLettersRef || !Array.isArray(definitionLettersRef)) return

	definitionLettersRef.forEach(ref => {
		if (ref && ref.current) {
			ref.current.style.textDecoration = 'underline'
		}
	})
}

export default underlineLetters