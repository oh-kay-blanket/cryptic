import React, { useRef, createRef, useEffect } from 'react'

const Archive = ({ clues, setclueId, setMode, completedClues, setInput, setCheckAns }) => {

	let tilesRef = useRef(clues.map(() => createRef()))

	const handleClick = (e) => {
		setclueId(e.current.id)
		setInput([])
		setCheckAns(false)
		setMode('playing')
	}

	const archiveTiles = clues.map((clue, index) => {

		const isComplete = completedClues.includes(Number(clue.id)) ? ' completed' : ''

		return <div key={clue.id} id={clue.id} className={`archive-tile${isComplete}`} ref={tilesRef.current[index]} onClick={()=>handleClick(tilesRef.current[index])}>
			<span className='tile-name'>{clue.clue.value}</span>
			<span className='tile-source'>{clue.source}</span>
		</div>
	})

	return(
		<div className='archive container'>
				<h1>All clues</h1>
				{archiveTiles}
		</div>
	)
}

export default Archive;