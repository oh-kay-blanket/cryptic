import React, { useRef, createRef, useEffect } from 'react'

import getTargetLetters from './clueFn/getTargetLetters'
import fixLetters from './clueFn/fixLetters'
import underline from './clueFn/underline'
import highlight from './clueFn/highlight'
import colorChange from './clueFn/colorChange'
import showSolution from './clueFn/showSolution'


const ClueContainer = ({ activeClue, nextHint, showMessage }) => {

	
	// make local clone of clue object
	let clue = activeClue
	
	// set refs
	let clueLettersRef = useRef(clue.clueArr.map(() => createRef()))
	let defintionLettersRef = getTargetLetters('definition', clue, clueLettersRef)
	let indicatorLettersRef = getTargetLetters('indicator', clue, clueLettersRef)
	let indicatedLettersRef = getTargetLetters('indicated', clue, clueLettersRef)
	let movementLettersRef = getTargetLetters('indicated', clue, clueLettersRef)
	let solutionLettersRef = useRef(clue.solArr.map(() => createRef()))
	let solutionSection = useRef()
	let solutionLettersCount = useRef()
	let clueSection = useRef()
	
	// look for position once set
	useEffect(() => {
		fixLetters(clueLettersRef, solutionLettersRef, solutionLettersCount, solutionSection)
	}, []);	
	
	// runs every change of showMessage
	useEffect(() => {

		if (showMessage) {
			switch(clue.hints[nextHint].hintType) {
				case 'definition':
					return underline(defintionLettersRef)
				case 'indicator':
					return highlight(indicatorLettersRef)
				case 'indicated':
					return colorChange(indicatedLettersRef)
				case 'solution':
					return showSolution(clue, movementLettersRef, solutionLettersRef, solutionSection, indicatedLettersRef)
				default: 
					return 
				}
		}

	}, [showMessage])

	// build clue HTML
	const clueInsert = clue.clueArr.map((letter, index) => {
		return <span key={index} ref={clueLettersRef.current[index]} className='letter'>{letter}</span>
	})

	// build solution HTML
	const solInsert = clue.solArr.map((letter, index) => (<span key={index} ref={solutionLettersRef.current[index]} className="letter"><span className='solLetter'>{letter}</span>
	<span className='typeLetter'></span></span>))

	// add solution letters
	const solutionLetters = <span className='solution-letters' ref={solutionLettersCount}>&nbsp;{clue.solutionLetters.str}</span>
	

	return(
		<div id='clue-container' className='clue container'>
			<div className='clue' ref={clueSection}>{clueInsert} {solutionLetters}</div>
			<div className='solution' ref={solutionSection}>{solInsert}</div>
		</div>
	)
}

export default ClueContainer;