import React, { useRef, createRef, useEffect } from 'react'

import d1 from '../assets/img/difficulty/1.svg';
import d2 from '../assets/img/difficulty/2.svg';
import d3 from '../assets/img/difficulty/3.svg';
import d4 from '../assets/img/difficulty/4.svg';

const Archive = ({ clues, setclueId, setMode, completedClues, setInput, setCheckAns, setHintColor }) => {


	let tilesRef = useRef(clues.map(() => createRef()))

	const handleClick = (e) => {
		setclueId(e.current.id)
		setInput([])
		setHintColor(0)
		setCheckAns(false)
		setMode('playing')
	}

	// only past clues
	let archiveTiles = clues.filter(clue => {

		function isTodayOrBefore(date1Str) {

			const date1 = new Date(date1Str);
    		const date2 = new Date();

			// Strip time part by setting hours, minutes, seconds, and milliseconds to zero
			const d1 = new Date(date1.getFullYear(), date1.getMonth(), date1.getDate());
			const d2 = new Date(date2.getFullYear(), date2.getMonth(), date2.getDate());
		
			// Compare the two dates
			if (d1.getTime() === d2.getTime()) {
				return true; // Same day
			} else if (d1.getTime() < d2.getTime()) {
				return true; // date1 is before date2
			} else {
				return false; // date1 is after date2
			}
		}

		return isTodayOrBefore(clue.release)
	})

	archiveTiles = archiveTiles.map((clue, index) => {

		const getRelease = (release) => new Date(release)

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
		<div className={`archive-clue${isComplete}`} key={clue.id}>
			<div className='archive-release'>
				<span>
					<span>{getRelease(clue.release).toLocaleString('en-us', { month: 'short' })}</span>&nbsp;
					<span>{getRelease(clue.release).getDate()}</span>,
				</span>
				<br></br>
				<span>{getRelease(clue.release).getFullYear()}</span>
			</div>
			<div id={clue.id} className='archive-tile' ref={tilesRef.current[index]} onClick={()=>handleClick(tilesRef.current[index])}>
				<img className='tile-difficulty' src={getImg(clue.difficulty)} title={clue.difficulty} aria-label='difficulty' />
				<span className='tile-name'>{clue.clue.value}</span>
				<span className='tile-source'>{clue.source}</span>
			</div>
		</div>
		)
	})

	return(
		<div className='archive container'>
			{archiveTiles}
		</div>
	)
}

export default Archive;