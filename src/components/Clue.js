import React, { useRef, createRef, useEffect } from 'react'

import getTargetLetters from '../utils/clue/getTargetLetters'
import fixLetters from '../utils/clue/fixLetters'
import underlineLetters from '../utils/clue/underlineLetters'
import highlightLetters from '../utils/clue/highlightLetters'
import changeColor from '../utils/clue/changeColor'
import showSolution from '../utils/clue/showSolution'
import addLetters from '../utils/clue/addLetters'
import getLines from '../utils/clue/getLines'


const ClueContainer = ({ activeClue, nextHint, showMessage, input, checkAns, hintColor, setHintColor }) => {
	
	activeClue.clue.ref = useRef(activeClue.clue.arr.map(() => createRef())) // clue letter refs
	activeClue.clue.sectionRef = useRef() // clue section ref
	activeClue.solution.ref = useRef(activeClue.solution.arr.map(() => createRef())) // solution letter refs
	activeClue.solution.sectionRef = useRef() // solution section ref
	activeClue.solution.length.ref = useRef() // solution length ref
	
	// hint target refs
	activeClue.hints.forEach(hint => {
		
		// add extra letters needed
		addLetters(activeClue, hint)
		
		// indicator letters
		hint.ref = getTargetLetters(hint.value, activeClue, hint)
		
		// indicator end letters
		if (!!hint.end) {hint.end.ref = getTargetLetters(hint.end.value, activeClue, hint)}
	})
	
	
	// look for position once set
	useEffect(() => {
		activeClue.clue.lines = getLines(activeClue.clue.ref.current)		
		fixLetters(activeClue)
	}, []);
	
	// runs every change of showMessage
	useEffect(() => {

		if (showMessage && !checkAns) {
			switch(activeClue.hints[nextHint].type) {

				case 'definition':
					underlineLetters(activeClue.hints[nextHint].ref)
					break

				case 'indicator': 
					setHintColor(prevHintColor => prevHintColor +1)
					
					switch(activeClue.hints[nextHint].category) {
						case 'charade':
						case 'symbol':
						case 'synonym':
							highlightLetters(hintColor, activeClue.hints[nextHint].ref)
							changeColor(hintColor, activeClue.hints[nextHint].addLetters.ref.current)
							break
						case 'direct':
							changeColor(hintColor, activeClue.hints[nextHint].ref, '#ccc')
							changeColor(hintColor, activeClue.hints[nextHint].addLetters.ref.current)
							break
						case 'initialism':
							highlightLetters(hintColor, activeClue.hints[nextHint].ref)
							changeColor(hintColor, activeClue.hints[nextHint].end.ref)
							changeColor(hintColor, activeClue.hints[nextHint].addLetters.ref.current)
							break
						case 'anagram':
						case 'particle':
							highlightLetters(hintColor, activeClue.hints[nextHint].ref)
							changeColor(hintColor, activeClue.hints[nextHint].end.ref, '#ccc')
							changeColor(hintColor, activeClue.hints[nextHint].addLetters.ref.current)
							break
						default:
							highlightLetters(hintColor, activeClue.hints[nextHint].ref)
							changeColor(hintColor, activeClue.hints[nextHint].end.ref)
							break
					}
					break
				case 'solution':
					showSolution(activeClue, nextHint, hintColor)
					break
				default: 
					break
			}
		}
	}, [showMessage])

	// clue HTML
	const clueInsert = activeClue.clue.arr.map((letter, index) => (<span key={index} ref={activeClue.clue.ref.current[index]} className='letter'>{letter}</span>))

	// addLetters HTML
	const addInsert = activeClue.hints.map((hint, index) => {
			if (hint.type == 'indicator' && !!hint.addLetters && !!hint.addLetters.value) {
				const lettersInsert = hint.addLetters.value.map((letter, index) => (<span key={index} ref={hint.addLetters.ref.current[index]} className='letter'>{letter}</span>))

				return <span key={index} ref={hint.addLetters.wordRef} className='word'>{lettersInsert}</span>
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