import React, { useContext } from 'react'
import { graphql } from 'gatsby'
import { UserContext } from '../../utils/UserContext'
import Layout from '../../components/Layout'
import Bottom from '../../components/Bottom'
import Tooltip from '../../components/Tooltip'
import prepClue from '../../utils/clue/usePrepClue'
import manageClue from '../../utils/clue/useManageClue'

import eyeOpen from '../../assets/img/eye--open.svg'
import eyeClosed from '../../assets/img/eye--closed.svg'


const CluePage = ({ data }) => {
	
	const dataClue = data.cluesJson
	const { addCompletedClue, showType, setShowType, returnLearn, setReturnLearn } = useContext(UserContext)

	// Set up activeClue
	let { activeClue } = prepClue(dataClue)
	let { stats, setStats, input, setInput, handleInput, nextHint, setNextHint, showMessage, setShowMessage, checkAns, setCheckAns } = manageClue(activeClue)

	// type HTML
	const pillList = activeClue.type.map((t, index) => <li key={`type_${index}`} className='type-pill tooltip-parent' aria-describedby="tooltip-id">{t}<Tooltip text={t} /></li>)

	const typeInsert = showType ? <><li className='eyecon'><button aria-label="Hide type" onClick={()=>setShowType(false)}><img src={eyeClosed} alt="" /></button></li>{pillList}</> : 
		<><li className='eyecon'><button onClick={()=>setShowType(true)} aria-label="Show type"><img src={eyeOpen} alt="" /></button></li><li className='type-text'><button onClick={()=>setShowType(true)} aria-label="Expand type">See type</button></li></>

	// stats HTML
	const statsInsert = <><div className="clue-stats"><span className='stat-hints'><span className="stat">{stats.hints}</span>&nbsp;h</span><span className='stat-guesses'><span className="stat">{stats.guesses}</span>&nbsp;g</span></div></>

	// clue HTML
	const clueInsert = activeClue.clue.arr.map((letter, index) => <span key={`cluearr_${index}`} ref={activeClue.clue.ref.current[index]} className='letter'>{letter}</span>)

	// addLetters HTML
	const addInsert = activeClue.hints.map((hint, parentIndex) => {
		if (hint.type === 'indicator' && !!hint.addLetters && !!hint.addLetters.value) {
			const lettersInsert = hint.addLetters.value.map((letter, childIndex) => <span key={`${parentIndex}_${childIndex}`} ref={activeClue.addLetters.ref.current[parentIndex][childIndex]} className='letter'>{letter}</span>)
			
			const brCats = ['container', 'reversal', 'ag-2', 'lb-2', 'hw-2', 'spoonerism']
			const addBr = brCats.includes(hint.category)

			const addSpoon = hint.category === 'spoonerism'
			const spoon = <>
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="20px" height="20px" ref={activeClue.spoon}><path d="M245.8 220.9c-14.5-17.6-21.8-39.2-21.8-60.8C224 80 320 0 416 0c53 0 96 43 96 96c0 96-80 192-160.2 192c-21.6 0-43.2-7.3-60.8-21.8L54.6 502.6c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L245.8 220.9z"/></svg>
				<span style={{flexBasis: '100%'}}></span>
			</>

			return <span key={`add_${parentIndex}`}>
				{addBr && <span style={{flexBasis: '100%'}}></span>}
				{addSpoon && spoon}
				<span ref={hint.addLetters.wordRef} className='word'>{lettersInsert}&nbsp;</span>
			</span>
		}
	})

	// solution HTML
	const solInsert = activeClue.solution.arr.map((letter, index) => <span key={`solarr_${index}`} id={`i${index}`} className="letter"><span id={`sl${index}`} ref={activeClue.solution.ref.current[index]} className='solLetter'>{letter}</span><span className='typeLetter'>{input[index]}</span></span>)

	// solution length
	const solLength = <span id='solLengthRef' ref={activeClue.solution.length.ref} className='solution-letters'>&nbsp;{activeClue.solution.length.value}</span>

	// source HTML
	const sourceInsert = activeClue.source.href ? 
		<a target='_blank' rel="noreferrer" href={activeClue.source.href} >{activeClue.source.value}</a> : <span>{activeClue.source.value}</span>

	return(
		<Layout>
			<div id='clue-container' className='clue container'>
				<ul className='type'>{typeInsert}</ul>
				{statsInsert}
				<div id='clueSectionRef' ref={activeClue.clue.sectionRef} className='clue'>
					<div>{clueInsert} {solLength}</div>
				</div>
				<div className='addLetters'>{addInsert}</div>
				<div style={{position:'relative'}} className='sol-section'>
					<div id='solSectionRef' ref={activeClue.solution.sectionRef} className='solution'>{solInsert}</div>
					<div id='sourceRef' ref={activeClue.source.ref} className='source'>by {sourceInsert}</div>
				</div>
			</div>
			<Bottom
				showMessage={showMessage}
				setShowMessage={setShowMessage}
				nextHint={nextHint}
				setNextHint={setNextHint}
				activeClue={activeClue}
				addCompletedClue={addCompletedClue}
				input={input}
				setInput={setInput}
				handleInput={handleInput}
				checkAns={checkAns}
				setCheckAns={setCheckAns}
				stats={stats}
				setStats={setStats}
				returnLearn={returnLearn}
				setReturnLearn={setReturnLearn}
			/>
		</Layout>
	)
}

export const query = graphql`
	query($id: String) {
    	cluesJson(id: { eq: $id }) {
	  		id
			clid
			clue {
				value
			}
			release
			difficulty
			ready
			type
			definition
			hints {
				category
				value
				end {
					value
				}
			}
			solution {
				value
			}
			source {
				value
			}
		}
	}
`

export default CluePage
