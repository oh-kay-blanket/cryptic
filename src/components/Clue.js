import React, { useState, useRef, createRef, useEffect } from 'react'

import getTargetLetters from '../utils/clue/getTargetLetters'
import fixLetters from '../utils/clue/fixLetters'
import underlineLetters from '../utils/clue/underlineLetters'
import highlightLetters from '../utils/clue/highlightLetters'
import changeColor from '../utils/clue/changeColor'
import showSolution from '../utils/clue/showSolution'
import addLetters from '../utils/clue/addLetters'
import getLines from '../utils/clue/getLines'

import eyeOpen from '../assets/img/eye--open.svg';
import eyeClosed from '../assets/img/eye--closed.svg';


const ClueContainer = ({ activeClue, nextHint, showMessage, input, checkAns, showType, setShowType }) => {
	
	activeClue.clue.ref = useRef(activeClue.clue.arr.map(() => createRef())) // clue letter refs
	activeClue.clue.sectionRef = useRef() // clue section ref
	activeClue.solution.ref = useRef(activeClue.solution.arr.map(() => createRef())) // solution letter refs
	activeClue.solution.sectionRef = useRef() // solution section ref
	activeClue.solution.length.ref = useRef() // solution length ref
	activeClue.source.ref = useRef() // source ref
	
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
					switch(activeClue.hints[nextHint].category) {
						case 'charade':
						case 'symbol':
						case 'synonym':
							highlightLetters(activeClue.hints[nextHint].ref)
							changeColor(activeClue.hints[nextHint].addLetters.ref.current)
							break
						case 'direct':
							changeColor(activeClue.hints[nextHint].ref, '#ccc')
							changeColor(activeClue.hints[nextHint].addLetters.ref.current)
							break
						case 'initialism':
							highlightLetters(activeClue.hints[nextHint].ref)
							changeColor(activeClue.hints[nextHint].end.ref)
							changeColor(activeClue.hints[nextHint].addLetters.ref.current)
							break
						case 'anagram':
						case 'particle':
							highlightLetters(activeClue.hints[nextHint].ref)
							changeColor(activeClue.hints[nextHint].end.ref, '#ccc')
							changeColor(activeClue.hints[nextHint].addLetters.ref.current)
							break
						default:
							highlightLetters(activeClue.hints[nextHint].ref)
							changeColor(activeClue.hints[nextHint].end.ref)
							break
					}
					break
				case 'solution':
					showSolution(activeClue, nextHint)
					break
				default: 
					break
			}
		} else if (!showMessage) {
			// change last hint to gray
			if (nextHint > 1){
				try {
					highlightLetters(activeClue.hints[nextHint - 1].ref, false, true)
					changeColor(activeClue.hints[nextHint - 1].end.ref, false, true)
					changeColor(activeClue.hints[nextHint - 1].addLetters.ref.current, false, true)
				} catch(err) {
					console.log(err)
				}
			}
		}
	}, [showMessage])


	// type HTML
	const pillList = activeClue.type.map((t, index) => <li key={index} className='type-pill'>{t}</li>)

	const typeInsert = showType ? <><li onClick={()=>setShowType(false)}><img src={eyeClosed}/></li>{pillList}</> : 
		<li onClick={()=>setShowType(true)}><img src={eyeOpen}/></li>

	// clue HTML
	const clueInsert = activeClue.clue.arr.map((letter, index) => (<span key={index} ref={activeClue.clue.ref.current[index]} className='letter'>{letter}</span>))

	// addLetters HTML
	const addInsert = activeClue.hints.map((hint, index) => {
			if (hint.type == 'indicator' && !!hint.addLetters && !!hint.addLetters.value) {
				const lettersInsert = hint.addLetters.value.map((letter, index) => (<span key={index} ref={hint.addLetters.ref.current[index]} className='letter'>{letter}</span>))

				return <span key={index} ref={hint.addLetters.wordRef} className='word'>{lettersInsert}&nbsp;</span>
			}
		}
	)

	// solution HTML
	const solInsert = activeClue.solution.arr.map((letter, index) => (<span key={index} id={`i${index}`} className="letter"><span id={`sl${index}`} ref={activeClue.solution.ref.current[index]} className='solLetter'>{letter}</span><span className='typeLetter'>{input[index]}</span></span>))

	// solution length
	const solLength = <span id='solLengthRef' ref={activeClue.solution.length.ref} className='solution-letters'>&nbsp;{activeClue.solution.length.value}</span>

	// source HTML
	const sourceInsert = activeClue.source.href ? 
		<a target='_blank' href={activeClue.source.href} >{activeClue.source.value}</a> : <span>{activeClue.source.value}</span>

	return(
		<div id='clue-container' className='clue container'>
			<ul className='type'>{typeInsert}</ul>
			<div id='clueSectionRef' ref={activeClue.clue.sectionRef} className='clue'>{clueInsert} {solLength}</div>
			<div className='addLetters'>{addInsert}</div>
			<div style={{position:'relative'}}>
				<div id='solSectionRef' ref={activeClue.solution.sectionRef} className='solution'>{solInsert}</div>
				<div id='sourceRef' ref={activeClue.source.ref} className='source'>by {sourceInsert}</div>
			</div>
		</div>
	)
}

export default ClueContainer;