import React, { useState, useRef, createRef, useEffect } from 'react'

import getTargetLetters from '../utils/clue/getTargetLetters'
import fixLetters from '../utils/clue/fixLetters'
import addLetters from '../utils/clue/addLetters'
import getLines from '../utils/clue/getLines'
import handleHint from '../utils/clue/handleHint'

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
		handleHint(activeClue, nextHint, showMessage, checkAns)
	}, [showMessage])


	// type HTML
	const pillList = activeClue.type.map((t, index) => <li key={index} className='type-pill'>{t}</li>)
	const typeInsert = showType ? <><li onClick={()=>setShowType(false)}><img src={eyeClosed}/></li>{pillList}</> : 
		<><li onClick={()=>setShowType(true)}><img src={eyeOpen}/></li><li className='type-text' onClick={()=>setShowType(true)}>See type</li></>

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
			<div id='clueSectionRef' ref={activeClue.clue.sectionRef} className='clue'>
				<div>{clueInsert} {solLength}</div>
			</div>
			<div className='addLetters'>{addInsert}</div>
			<div style={{position:'relative'}} className='sol-section'>
				<div id='solSectionRef' ref={activeClue.solution.sectionRef} className='solution'>{solInsert}</div>
				<div id='sourceRef' ref={activeClue.source.ref} className='source'>by {sourceInsert}</div>
			</div>
		</div>
	)
}

export default ClueContainer;