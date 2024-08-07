import React, { useState, useRef, createRef, useEffect } from 'react'

const Anagram = ({ activeClue, solution }) => {

	// make local clone of clue object
	let clue = structuredClone(activeClue)

	// split letters into array
	clue.clue = clue.clue.split("")
	clue.solution = clue.solution.split("")

	// set refs
	const clueLettersRef = useRef(clue.clue.map(() => createRef()))
	let clueAnagramLettersRef = clueLettersRef.current.slice(clue.range[0], clue.range[1]);
	const solutionLettersRef = useRef(clue.solution.map(() => createRef()))
	const clueSection = useRef()
	const solutionSection = useRef()
	
	// look for position once set
	useEffect(() => {

		// clue
		clueLettersRef.current.forEach( ref => {
			let left = ref.current.getBoundingClientRect().left
			let top = ref.current.getBoundingClientRect().top
			ref.current.style.left = `${left}px`
			ref.current.style.top = `${top}px`
			return [left, top]
		})

		clueLettersRef.current.forEach( ref => {
			ref.current.style.position = 'fixed'
		})
		
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
		
	}, []);	
	
	// move letters when solution is true
	useEffect(() => {

		clueAnagramLettersRef = clueAnagramLettersRef.filter(ref => {
			return ref.current.textContent !== " "
		})
		
		solution && clueAnagramLettersRef.forEach( ref => {
			const currentSol = solutionLettersRef.current.find(sol => {
				return sol.current.textContent.toLowerCase() == ref.current.textContent.toLowerCase()
			})
			const solIndex = solutionLettersRef.current.findIndex(sol => sol.current.textContent.toLowerCase() == ref.current.textContent.toLowerCase())
			solutionLettersRef.current.splice(solIndex, 1)

			ref.current.style.top = currentSol.current.style.top
			ref.current.style.left = currentSol.current.style.left
			ref.current.style.transitionDelay = `${(750 * Math.random()) + 250}ms`
			ref.current.style.textTransform = 'lowercase'
		})

		const morphToUppercase = () => {
			clueAnagramLettersRef.forEach( ref => {
				ref.current.style.opacity = 0
			})
			// clueSection.current.style.opacity = 0
			solutionSection.current.style.opacity = 1
		}

		solution && setTimeout(morphToUppercase, 4000)
	}, [solution]);

	// build clue HTML
	const clueInsert = clue.clue.map((letter, index) => {
		const withinRange = (index >= clue.range[0] && index < clue.range[1]) ? ' sol-anagram' : ''
		return <span key={index} ref={clueLettersRef.current[index]} className={`letter`}>{letter}</span>
	})

	// build solution HTML
	const solInsert = clue.solution.map((letter, index) => (<span key={index} ref={solutionLettersRef.current[index]} className="letter">{letter}</span>))

	return (
		<>
			<div className='solution' ref={solutionSection}>{solInsert}</div>			
			<div className='clue' ref={clueSection}>{clueInsert}</div>
		</>
	)
}

export default Anagram;