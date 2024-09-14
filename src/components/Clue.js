import React, { useRef, createRef, useEffect } from 'react'

import getTargetLetters from '../utils/clue/getTargetLetters'
import fixLetters from '../utils/clue/fixLetters'
import underlineLetters from '../utils/clue/underlineLetters'
import highlightLetters from '../utils/clue/highlightLetters'
import changeColor from '../utils/clue/changeColor'
import showSolution from '../utils/clue/showSolution'
import addLetters from '../utils/clue/addLetters'


const ClueContainer = ({ activeClue, nextHint, showMessage, input, checkAns }) => {
	
	// clue letter refs
	activeClue.clue.ref = useRef(activeClue.clue.arr.map(() => createRef()))

	// hint target refs
	activeClue.hints.forEach(hint => {

		// add extra letters needed
		addLetters(activeClue, hint)

		// indicator letters
		hint.ref = getTargetLetters(hint, activeClue)

		// indicator end letters
		if (!!hint.end) {hint.end.ref = getTargetLetters(hint.end, activeClue)}
	})

	// clue section ref
	activeClue.clue.sectionRef = useRef()

	// solution letter refs
	activeClue.solution.ref = useRef(activeClue.solution.arr.map(() => createRef()))

	// solution section ref
	activeClue.solution.sectionRef = useRef()

	// solution length ref
	activeClue.solution.length.ref = useRef()
	
	// look for position once set
	useEffect(() => {
		fixLetters(activeClue)
	}, []);
	
	// runs every change of showMessage
	useEffect(() => {

		if (showMessage && !checkAns) {
			switch(activeClue.hints[nextHint].type) {
				case 'definition':
					return underlineLetters(activeClue.hints[nextHint].ref)
				case 'indicator': 
					switch(activeClue.hints[nextHint].category) {
						case 'anagram':
							console.log('anagram')
							return highlightLetters(activeClue.hints[nextHint].ref), changeColor(activeClue.hints[nextHint].end.ref)
						default:
							return highlightLetters(activeClue.hints[nextHint].ref), changeColor(activeClue.hints[nextHint].end.ref)
					}
				case 'solution':
					return showSolution(activeClue, nextHint)
				default: 
					return false
				}
		}

	}, [showMessage])

	// clue HTML
	const clueInsert = activeClue.clue.arr.map((letter, index) => (<span key={index} ref={activeClue.clue.ref.current[index]} className='letter'>{letter}</span>))

	// addLetters HTML
	const addInsert = activeClue.hints.map(hint => {
			if (hint.type == 'indicator' && !!hint.addLetters) {
				return hint.addLetters.value.map((letter, index) => (<span key={index} ref={hint.addLetters.ref.current[index]} className='letter'>{letter}</span>))
			}
		}
	)

	// solution HTML
	const solInsert = activeClue.solution.arr.map((letter, index) => (<span key={index} id={`i${index}`} className="letter"><span id={`sl${index}`} ref={activeClue.solution.ref.current[index]} className='solLetter'>{letter}</span><span className='typeLetter'>{input[index]}</span></span>))

	// solution length
	const solLength = <span id='solLengthRef' ref={activeClue.solution.length.ref} className='solution-letters'>&nbsp;{activeClue.solution.length.value}</span>
	

	return(
		<div id='clue-container' className='clue container'>
			<div id='clueSectionRef' ref={activeClue.clue.sectionRef} className='clue'>{clueInsert} {solLength}</div>
			<div className='addLetters'>{addInsert}</div>
			<div id='solSectionRef' ref={activeClue.solution.sectionRef} className='solution'>{solInsert}</div>
		</div>
	)
}

export default ClueContainer;