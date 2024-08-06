import React, { useState, useRef, createRef, useEffect } from 'react'

const Anagram = ({ activeClue }) => {

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
	const clueRef = useRef(null)
	const solRef = useRef(null)

	// look for position once set
	useEffect(() => {

		// clue
		const getClueLPos = clueLettersRef.current.map( ref => {
			let x = ref.current.getBoundingClientRect().x
			let y = ref.current.getBoundingClientRect().y
			ref.current.style.left = `${x}px`
			ref.current.style.top = `${y}px`
			return [ref.current.left, ref.current.top]
		})
		setClueLPos(getClueLPos);

		// solution
		const getSolLPos = solutionLettersRef.current.map( ref => {
			let x = ref.current.getBoundingClientRect().x
			let y = ref.current.getBoundingClientRect().y
			ref.current.style.left = `${x}px`
			ref.current.style.top = `${y}px`
			return [ref.current.left, ref.current.top]
		})
		setSolLPos(getSolLPos);

	}, []);	

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