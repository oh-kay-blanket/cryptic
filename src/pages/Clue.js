import React, { useState } from 'react'
// import { createPortal } from 'react-dom';

import Tooltip from '../components/Tooltip';

import loadClue from '../utils/clue/loadClue'
import eyeOpen from '../assets/img/eye--open.svg'
import eyeClosed from '../assets/img/eye--closed.svg'


const ClueContainer = ({ activeClue, nextHint, showMessage, input, checkAns, showType, setShowType, stats }) => {
	
	loadClue(activeClue, nextHint, showMessage, checkAns)

	// type HTML
	const pillList = activeClue.type.map((t, index) => <li key={index} className='type-pill tooltip-parent' aria-describedby="tooltip-id">
		{t}
		<Tooltip text={t} />
	</li>)

	const typeInsert = showType ? <><li onClick={()=>setShowType(false)}><img src={eyeClosed}/></li>{pillList}</> : 
		<><li onClick={()=>setShowType(true)}><img src={eyeOpen}/></li><li className='type-text' onClick={()=>setShowType(true)}>See type</li></>

	// stats HTML
	stats = <><div className="clue-stats"><span className='stat-hints'><span className="stat">{stats.hints}</span>&nbsp;h</span><span className='stat-guesses'><span className="stat">{stats.guesses}</span>&nbsp;g</span></div></>

	// clue HTML
	const clueInsert = activeClue.clue.arr.map((letter, index) => (<span key={index} ref={activeClue.clue.ref.current[index]} className='letter'>{letter}</span>))

	// addLetters HTML
	const addInsert = activeClue.hints.map((hint, parentIndex) => {
		if (hint.type == 'indicator' && !!hint.addLetters && !!hint.addLetters.value) {
			const lettersInsert = hint.addLetters.value.map((letter, childIndex) => (<span key={`${parentIndex}_${childIndex}`} ref={hint.addLetters.ref.current[childIndex]} className='letter'>{letter}</span>))
			
			const brCats = ['container', 'reversal', 'ag-2', 'lb-2', 'hw-2', 'spoonerism']
			const addBr = brCats.includes(hint.category)

			const addSpoon = hint.category == 'spoonerism'
			const spoon = <>
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="20px" height="20px" ref={activeClue.spoon}><path d="M245.8 220.9c-14.5-17.6-21.8-39.2-21.8-60.8C224 80 320 0 416 0c53 0 96 43 96 96c0 96-80 192-160.2 192c-21.6 0-43.2-7.3-60.8-21.8L54.6 502.6c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L245.8 220.9z"/></svg>
				<span key={`br_${parentIndex}`} style={{flexBasis: '100%'}}></span>
			</>

			return <>
				{addBr && <span key={`br_${parentIndex}`} style={{flexBasis: '100%'}}></span>}
				{addSpoon && spoon}
				<span key={`word_${parentIndex}`} ref={hint.addLetters.wordRef} className='word'>{lettersInsert}&nbsp;</span>
			</>
		}
	})

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
			{stats}
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