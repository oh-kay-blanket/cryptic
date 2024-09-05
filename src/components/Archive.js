import React, { useRef, createRef, useEffect } from 'react'

const Archive = ({ filteredClues, nextActiveClue, setMode, completedClues, setInput }) => {

	let tilesRef = useRef(filteredClues.map(() => createRef()))

	const handleClick = (e) => {
		nextActiveClue(e.current.id)
		setInput([])
		setMode('playing')
	}

	const archiveTiles = filteredClues.map((clue, index) => {

		const isComplete = completedClues.includes(Number(clue.id)) ? ' completed' : ''

		return <div key={clue.id} id={clue.id} className={`archive-tile${isComplete}`} ref={tilesRef.current[index]} onClick={()=>handleClick(tilesRef.current[index])}>
			<span className='tile-name'>{clue.clue}</span>
		</div>
	})

	return(
		<div className='archive container'>
				<h1>Archive</h1>
				{archiveTiles}
		</div>
	)
}

export default Archive;