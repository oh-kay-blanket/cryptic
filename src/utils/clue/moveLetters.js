import removeSpecial from "./removeSpecialChar"
 
// moves letters from movingLettersRef to destLettersRef
const moveLetters = (movingLettersRef, destLettersRef, timing = 'shuffle', reverse = false) => {
	movingLettersRef = removeSpecial(movingLettersRef)

	if (reverse) {
		movingLettersRef = movingLettersRef.reverse()
	}
	
	movingLettersRef.forEach((ref, index) => {
		const currentDestLetter = destLettersRef.find(destLetter => {
			return destLetter.current.textContent == ref.current.textContent
		})

		const destIndex = destLettersRef.findIndex(destLetter => destLetter.current.textContent == ref.current.textContent)
		destLettersRef.splice(destIndex, 1)

		// ref.current.style.textTransform = 'lowercase'
		ref.current.style.top = `${Number(currentDestLetter.current.style.top.slice(0,-2))}px`
		ref.current.style.left = `${Number(currentDestLetter.current.style.left.slice(0,-2))}px`

		switch(timing) {
			case 'shuffle':
				ref.current.style.transition = `top 2.5s ease ${(750 * Math.random()) + 250}ms, left 2.5s ease ${(750 * Math.random()) + 250}ms`
				break
			case 'sequence':
				ref.current.style.transition = `top 1.5s ease ${200 * index}ms, left 1.5s ease ${200 * index}ms`
				break
			default:
				ref.current.style.transition = `top 2.5s ease, left 2.5s ease`
				break

		}
	})
}

export default moveLetters