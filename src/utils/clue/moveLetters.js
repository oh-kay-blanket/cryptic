import removeSpecial from "./removeSpecialChar"

// moves letters from indicatedLettersRef to solLettersRef
const moveLetters = (indicatedLettersRef, solLettersRef) => {
	
	indicatedLettersRef = removeSpecial(indicatedLettersRef)
	
	indicatedLettersRef.forEach( ref => {
		const currentSol = solLettersRef.current.find(sol => {
			return sol.current.textContent.toLowerCase() == ref.current.textContent.toLowerCase()
		})
		const solIndex = solLettersRef.current.findIndex(sol => sol.current.textContent.toLowerCase() == ref.current.textContent.toLowerCase())
		solLettersRef.current.splice(solIndex, 1)
		ref.current.style.top = `${Number(currentSol.current.style.top.slice(0,-2))}px`
		ref.current.style.left = `${Number(currentSol.current.style.left.slice(0,-2))}px`
		ref.current.style.transition = `top 2.5s ease ${(750 * Math.random()) + 250}ms, left 2.5s ease ${(750 * Math.random()) + 250}ms`
		ref.current.style.textTransform = 'lowercase'
	})

	// reveal solution large 
	const revealSolutionLarge = () => {
		indicatedLettersRef.forEach( ref => {
			ref.current.style.opacity = 0
		})
	}

	setTimeout(revealSolutionLarge, 4000)
}

export default moveLetters