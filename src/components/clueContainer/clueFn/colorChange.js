// moves letters from movementLettersRef to solutionLettersRef
const colorChange = (indicatorLettersRef) => {

	// console.log(indicatorLettersRef)
	
	indicatorLettersRef.forEach( ref => {
		ref.current.style.color = '#C94F03'
	})

}

export default colorChange