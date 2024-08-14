import React, { useRef, createRef, useEffect } from 'react';

import clueFn from './clueFn';

const ClueContainer = ({ activeClue, nextHint, showMessage }) => {

	
	// make local clone of clue object
	let clue = activeClue
	
	const getMovementLetters = () => {
		
		let movementLetters = clue.hints.find(hint => hint.hintType == "indicated").value[0]
		
		const movementLettersStart = clue.clue.indexOf(movementLetters)
		
		return movementLetters ? clueLettersRef.current.slice(movementLettersStart, movementLetters.length
		) : false
		
	}
	
	// set refs
	let clueLettersRef = useRef(clue.clueArr.map(() => createRef()))
	let clueMovementLettersRef = getMovementLetters()
	let solutionLettersRef = useRef(clue.solArr.map(() => createRef()))
	let solutionSection = useRef()
	let solutionLettersCount = useRef()
	let clueSection = useRef()

	let { fixLetters } = clueFn(clueLettersRef, solutionLettersRef, solutionLettersCount, solutionSection)
	
	// look for position once set
	useEffect(() => {
		fixLetters()
	}, []);	
	
	// move letters when solution is true
	useEffect(() => {

		const underline = () => {

		}

		const highLight = () => {

		}

		const changeLetterColor = () => {

		}

		const moveLetters = () => {
			clueMovementLettersRef = clueMovementLettersRef.filter(ref => {
				return ref.current.textContent !== " "
			})
			
			clueMovementLettersRef.forEach( ref => {
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
				clueMovementLettersRef.forEach( ref => {
					ref.current.style.opacity = 0
				})
				clueSection.current.style.opacity = 0
				solutionSection.current.style.opacity = 1
			}
	
			setTimeout(morphToUppercase, 4000)
		}

		if (showMessage) {
			switch(clue.hints[nextHint].hintType) {
				case 'definition':
					return underline()
				case 'indicator':
					return highLight()
				case 'indicated':
					return changeLetterColor()
				case 'solution':
					return moveLetters()
				default: 
					return 
			}
		}

	}, [showMessage])

	// useEffect(() => {
		// set refs
		// clueLettersRef = useRef(clue.clueArr.map(() => createRef()))
		// clueMovementLettersRef = clueLettersRef.current.slice(clue.range[0], clue.range[1])
		// solutionLettersRef = useRef(clue.solArr.map(() => createRef()))
		// solutionSection = useRef()
		// solutionLettersCount = useRef()
		// clueSection = useRef()
	// },[activeClue])

	// build clue HTML
	const clueInsert = clue.clueArr.map((letter, index) => {
		return <span key={index} ref={clueLettersRef.current[index]} className={`letter`}>{letter}</span>
	})

	// build solution HTML
	const solInsert = clue.solArr.map((letter, index) => (<span key={index} ref={solutionLettersRef.current[index]} className="letter">{letter}</span>))

	// add solution letters
	const solutionLetters = <span className='solution-letters' ref={solutionLettersCount}>&nbsp;{clue.solArrLetters}</span>
	

	return(
		<div id='clue-container' className='clue container'>
			<div className='clue' ref={clueSection}>{clueInsert} {solutionLetters}</div>
			<div className='solution' ref={solutionSection}>{solInsert}</div>
		</div>
	)
}

export default ClueContainer;