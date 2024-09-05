import React, { useRef, createRef, useEffect } from 'react'

import getTargetLetters from './clueFn/getTargetLetters'
import fixLetters from './clueFn/fixLetters'
import underline from './clueFn/underline'
import highlight from './clueFn/highlight'
import colorChange from './clueFn/colorChange'
import showSolution from './clueFn/showSolution'


const ClueContainer = ({ activeClue, nextHint, showMessage, input }) => {

	
	// make local clone of clue object
	let clue = activeClue
	
	// set refs
	let clueLettersRef = useRef(clue.clueArr.map(() => createRef()))
	let defintionLettersRef = getTargetLetters('definition', clue, clueLettersRef)
	let indicatorLettersRef = getTargetLetters('indicator', clue, clueLettersRef)
	let indicatedLettersRef = getTargetLetters('indicated', clue, clueLettersRef)
	let movementLettersRef = getTargetLetters('indicated', clue, clueLettersRef)
	let solLettersRef = useRef(clue.solArr.map(() => createRef()))
	let solSectionRef = useRef()
	let solLengthRef = useRef()
	let clueSectionRef = useRef()
	
	// look for position once set
	useEffect(() => {
		fixLetters(clueLettersRef, solLettersRef, solLengthRef, solSectionRef)
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
					return showSolution(clue, movementLettersRef, solLettersRef, solSectionRef, indicatedLettersRef)
				default: 
					return 
				}
		}

	}, [showMessage])

	// clue HTML
	const clueInsert = clue.clueArr.map((letter, index) => (<span key={index} ref={clueLettersRef.current[index]} className='letter'>{letter}</span>))

	// solution HTML
	const solInsert = clue.solArr.map((letter, index) => (<span key={index} id={`i${index}`} className="letter"><span id={`sl${index}`} ref={solLettersRef.current[index]} className='solLetter'>{letter}</span><span className='typeLetter'>{input[index]}</span></span>))

	// solution length
	const solLength = <span id='solLengthRef' ref={solLengthRef} className='solution-letters'>&nbsp;{clue.solLength.str}</span>
	

	return(
		<div id='clue-container' className='clue container'>
			<div id='clueSectionRef' ref={clueSectionRef} className='clue'>{clueInsert} {solLength}</div>
			<div id='solSectionRef' ref={solSectionRef} className='solution'>{solInsert}</div>
		</div>
	)
}

export default ClueContainer;