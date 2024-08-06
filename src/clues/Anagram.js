import React, { useState, useRef, createRef, useEffect } from 'react'

const Anagram = ({ activeClue, solution }) => {

	// make local clone of clue object
	let clue = structuredClone(activeClue)

	// set up state
	const [clueLPos, setClueLPos] = useState(null)
	const [solLPos, setSolLPos] = useState(null)

	// split letters into array
	clue.clue = clue.clue.split("")
	clue.solution = clue.solution.split("")

	// set refs
	const clueLettersRef = useRef(clue.clue.map(() => createRef()))
	const solutionLettersRef = useRef(clue.solution.map(() => createRef()))

	// look for position once set
	useEffect(() => {

		// clue
		const getClueLPos = clueLettersRef.current.forEach( ref => {
			let left = ref.current.getBoundingClientRect().left
			let top = ref.current.getBoundingClientRect().top
			ref.current.style.left = `${left}px`
			ref.current.style.top = `${top}px`
			return [left, top]
		})
		setClueLPos(getClueLPos);

		clueLettersRef.current.forEach( ref => {
			ref.current.style.position = 'fixed'
		})
		
		// solution
		const getSolLPos = solutionLettersRef.current.forEach( ref => {
			let left = ref.current.getBoundingClientRect().left
			let top = ref.current.getBoundingClientRect().top
			ref.current.style.left = `${left}px`
			ref.current.style.top = `${top}px`
			return [left, top]
		})
		setSolLPos(getSolLPos);
		
		solutionLettersRef.current.forEach( ref => {
			ref.current.style.position = 'fixed'
		})
		
	}, []);	
	
	useEffect(() => {
		clueLettersRef.current.forEach( ref => {
			ref.current.style.top = '380px'
		})
	}, [solution]);	

	// build clue HTML
	const clueInsert = clue.clue.map((letter, index) => <span key={index} ref={clueLettersRef.current[index]} className="letter">{letter}</span>)

	// build solution HTML
	const solInsert = clue.solution.map((letter, index) => (<span key={index} ref={solutionLettersRef.current[index]} className="letter">{letter}</span>))

	return (
		<>
			<div className='solution'>{solInsert}</div>			
			<div className='clue'>{clueInsert}</div>
		</>
	)
}

export default Anagram;