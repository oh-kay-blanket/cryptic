import removeSpecial from "./removeSpecial"

// moves letters from movementLettersRef to solLettersRef
const moveLetters = (movementLettersRef, solLettersRef, solutionSection) => {
	
	movementLettersRef = removeSpecial(movementLettersRef)
	
	movementLettersRef.forEach( ref => {
		const currentSol = solLettersRef.current.find(sol => {
			return sol.current.textContent.toLowerCase() == ref.current.textContent.toLowerCase()
		})
		const solIndex = solLettersRef.current.findIndex(sol => sol.current.textContent.toLowerCase() == ref.current.textContent.toLowerCase())
		solLettersRef.current.splice(solIndex, 1)
		ref.current.style.top = `${Number(currentSol.current.style.top.slice(0,-2)) + 4}px`
		ref.current.style.left = `${Number(currentSol.current.style.left.slice(0,-2)) + 4}px`
		ref.current.style.transitionDelay = `${(750 * Math.random()) + 250}ms`
		ref.current.style.textTransform = 'lowercase'
	})

	// reveal solution large
	const revealSolutionLarge = () => {
		movementLettersRef.forEach( ref => {
			ref.current.style.opacity = 0
		})
	}

	setTimeout(revealSolutionLarge, 4000)
}

export default moveLetters