import React, { useRef, createRef, useEffect } from 'react'

import d1 from '../img/difficulty/1.svg';
import d2 from '../img/difficulty/2.svg';
import d3 from '../img/difficulty/3.svg';
import d4 from '../img/difficulty/4.svg';

const Archive = ({ clues, setclueId, setMode, completedClues, setInput, setCheckAns }) => {


	let tilesRef = useRef(clues.map(() => createRef()))

	const handleClick = (e) => {
		setclueId(e.current.id)
		setInput([])
		setCheckAns(false)
		setMode('playing')
	}

	const archiveTiles = clues.map((clue, index) => {

		const getRelease = (release) => {

		}

		const getImg = (difficulty) => {
			switch (Number(difficulty)) {
				case 1:
				  return d1
				case 2:
					return d2
				case 3:
					return d3
				case 4:
					return d4
				default:
					return d1
			  }
		}

		const isComplete = completedClues.includes(Number(clue.id)) ? ' completed' : ''

		return (
		<div className='archive-clue' key={clue.id}>
			<div className='archive-release'>{clue.release}</div>
			<div id={clue.id} className={`archive-tile${isComplete}`} ref={tilesRef.current[index]} onClick={()=>handleClick(tilesRef.current[index])}>
				<span className='tile-name'>{clue.clue.value}</span>
				<div className='tile-info'>
					<img className='tile-difficulty' src={getImg(clue.difficulty)} />
					<span className='tile-source'>{clue.source}</span>
				</div>
			</div>
		</div>
		)
	})

	return(
		<div className='archive container'>
				<h1>All clues</h1>
				{archiveTiles}
		</div>
	)
}

export default Archive;