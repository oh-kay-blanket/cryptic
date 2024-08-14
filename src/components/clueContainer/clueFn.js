// import { useState } from 'react'

const clueFn = (clueLettersRef, solutionLettersRef, solutionLettersCount, solutionSection) => {

	const fixLetters = () => {
		// clue
		clueLettersRef.current.forEach( ref => {
			let left = ref.current.getBoundingClientRect().left
			let top = ref.current.getBoundingClientRect().top
			ref.current.style.left = `${left}px`
			ref.current.style.top = `${top}px`
			return [left, top]
		})

		// solutionLettersCount
		solutionLettersCount.current.style.left = `${solutionLettersCount.current.getBoundingClientRect().left}px`
		solutionLettersCount.current.style.top = `${solutionLettersCount.current.getBoundingClientRect().top}px`

		// fix positions
		clueLettersRef.current.forEach( ref => {
			ref.current.style.position = 'fixed'
		})
		solutionLettersCount.current.style.position = 'fixed'
		
		// solution
		solutionLettersRef.current.forEach( ref => {
			let left = ref.current.getBoundingClientRect().left
			let top = ref.current.getBoundingClientRect().top
			ref.current.style.left = `${left}px`
			ref.current.style.top = `${top}px`
			return [left, top]
		})
		
		solutionLettersRef.current.forEach( ref => {
			ref.current.style.position = 'fixed'
		})

		solutionSection.current.style.transform = 'none'
	}



	return { fixLetters }
}

export default clueFn