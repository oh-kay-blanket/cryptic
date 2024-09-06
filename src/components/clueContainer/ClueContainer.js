import React, { useRef, createRef, useEffect } from 'react'

import getTargetLetters from './clueFn/getTargetLetters'
import fixLetters from './clueFn/fixLetters'
import underline from './clueFn/underline'
import highlight from './clueFn/highlight'
import colorChange from './clueFn/colorChange'
import showSolution from './clueFn/showSolution'


const ClueContainer = ({ activeClue, nextHint, showMessage, input, checkAns }) => {
	console.log(activeClue)
	
	// make local clone of clue object
	let clue = activeClue
	
	// set refs
	let clueLettersRef = useRef(clue.clue.arr.map(() => createRef()))
	// build refs for each hint value
	clue.hints.forEach(hint => {
		hint.ref = getTargetLetters(hint, clue, clueLettersRef)

		if (!!hint.end) {
			hint.end.ref = getTargetLetters(hint.end, clue, clueLettersRef)
		}
	})
	let solLettersRef = useRef(clue.solution.arr.map(() => createRef()))
	let solSectionRef = useRef()
	let solLengthRef = useRef()
	let clueSectionRef = useRef()
	
	// look for position once set
	useEffect(() => {
		fixLetters(clueLettersRef, solLettersRef, solLengthRef, solSectionRef)
	}, []);	
	
	// runs every change of showMessage
	useEffect(() => {

		if (showMessage && !checkAns) {
			switch(clue.hints[nextHint].type) {
				case 'definition':
					return underline(clue.hints[nextHint].ref)
				case 'indicator':
					return highlight(clue.hints[nextHint].ref), colorChange(clue.hints[nextHint].end.ref)
				case 'solution':
					return showSolution(clue, nextHint, solLettersRef, solSectionRef)
				default: 
					return 
				}
		}

	}, [showMessage])

	// clue HTML
	const clueInsert = clue.clue.arr.map((letter, index) => (<span key={index} ref={clueLettersRef.current[index]} className='letter'>{letter}</span>))

	// solution HTML
	const solInsert = clue.solution.arr.map((letter, index) => (<span key={index} id={`i${index}`} className="letter"><span id={`sl${index}`} ref={solLettersRef.current[index]} className='solLetter'>{letter}</span><span className='typeLetter'>{input[index]}</span></span>))

	// solution length
	const solLength = <span id='solLengthRef' ref={solLengthRef} className='solution-letters'>&nbsp;{clue.solution.length.value}</span>
	

	return(
		<div id='clue-container' className='clue container'>
			<div id='clueSectionRef' ref={clueSectionRef} className='clue'>{clueInsert} {solLength}</div>
			<div id='solSectionRef' ref={solSectionRef} className='solution'>{solInsert}</div>
		</div>
	)
}

export default ClueContainer;