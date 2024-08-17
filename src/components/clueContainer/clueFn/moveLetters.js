import removeSpecial from "./removeSpecial"

// moves letters from movementLettersRef to solutionLettersRef
const moveLetters = (movementLettersRef, solutionLettersRef, solutionSection) => {

	// console.log(movementLettersRef)
	
	movementLettersRef = removeSpecial(movementLettersRef)
	
	movementLettersRef.forEach( ref => {
		const currentSol = solutionLettersRef.current.find(sol => {
			return sol.current.textContent.toLowerCase() == ref.current.textContent.toLowerCase()
		})
		const solIndex = solutionLettersRef.current.findIndex(sol => sol.current.textContent.toLowerCase() == ref.current.textContent.toLowerCase())
		solutionLettersRef.current.splice(solIndex, 1)
		ref.current.style.top = `${Number(currentSol.current.style.top.slice(0,-2)) + 4}px`
		ref.current.style.left = `${Number(currentSol.current.style.left.slice(0,-2)) + 4}px`
		ref.current.style.transitionDelay = `${(750 * Math.random()) + 250}ms`
		ref.current.style.textTransform = 'lowercase'
	})

	const morphToUppercase = () => {
		movementLettersRef.forEach( ref => {
			ref.current.style.opacity = 0
		})
		// clueSection.current.style.opacity = 0
		solutionSection.current.style.opacity = 1
	}

	setTimeout(morphToUppercase, 4000)
}

export default moveLetters