import React, { useRef, createRef, useEffect } from 'react'

const Archive = ({ filteredClues, nextActiveClue, setMode }) => {

	let tilesRef = useRef(filteredClues.map(() => createRef()))

	const handleClick = (e) => {
		nextActiveClue(e.current.id)
		setMode('playing')
	}

	const archiveTiles = filteredClues.map((clue, index) => {
		return <div key={clue.id} id={clue.id} className='archive-tile' ref={tilesRef.current[index]} onClick={()=>handleClick(tilesRef.current[index])}>
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