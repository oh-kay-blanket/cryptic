import React, { useState, useRef, createRef, useEffect } from 'react'

const Anagram = ({ activeClue, solution }) => {

	// make local clone of clue object
	let clue = structuredClone(activeClue)
	
	// get range of anagram letters
	clue.range = [clue.clue.indexOf(clue.type[0].indicator[0].end[0]), clue.type[0].indicator[0].end[0].length]
	console.log(clue.range)

	// split letters into array
	clue.clue = clue.clue.split("")
	clue.solution = clue.solution.split("")


	// set refs
	const clueLettersRef = useRef(clue.clue.map(() => createRef()))
	let clueAnagramLettersRef = clueLettersRef.current.slice(clue.range[0], clue.range[1]);
	const solutionLettersRef = useRef(clue.solution.map(() => createRef()))
	const clueSection = useRef()
	const solutionSection = useRef()
	const solutionLettersCount = useRef()
	
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
			ref.current.style.top = `${Number(currentSol.current.style.top.slice(0,-2))+8}px`
			ref.current.style.left = `${Number(currentSol.current.style.left.slice(0,-2))+8}px`
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

	// add solution letters
	const solutionLetters = <span className='solution-letters' ref={solutionLettersCount}>&nbsp;{clue.solutionLetters}</span>

	return (
		<>
			<div className='clue' ref={clueSection}>{clueInsert}{solutionLetters}</div>
			<div className='solution' ref={solutionSection}>{solInsert}</div>			
		</>
	)
}

export default Anagram;