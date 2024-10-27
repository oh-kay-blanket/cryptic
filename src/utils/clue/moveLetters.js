import removeSpecial from "./removeSpecialChar"
 
// moves letters from movingLettersRef to destLettersRef
const moveLetters = (movingLettersRef, destLettersRef, shuffle = true) => {
	movingLettersRef = removeSpecial(movingLettersRef)
	
	movingLettersRef.forEach(ref => {
		const currentDestLetter = destLettersRef.find(destLetter => {
			return destLetter.current.textContent.toLowerCase() == ref.current.textContent.toLowerCase()
		})

		const destIndex = destLettersRef.findIndex(destLetter => destLetter.current.textContent.toLowerCase() == ref.current.textContent.toLowerCase())
		destLettersRef.splice(destIndex, 1)

		ref.current.style.textTransform = 'lowercase'
		ref.current.style.top = `${Number(currentDestLetter.current.style.top.slice(0,-2))}px`
		ref.current.style.left = `${Number(currentDestLetter.current.style.left.slice(0,-2))}px`
		ref.current.style.transition = shuffle ? `top 2.5s ease ${(750 * Math.random()) + 250}ms, left 2.5s ease ${(750 * Math.random()) + 250}ms` : `top 2.5s ease, left 2.5s ease`
	})
}

export default moveLetters