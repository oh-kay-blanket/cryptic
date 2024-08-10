import React, { useState, useEffect } from 'react'

// components
import Title from './components/Title'
import TopBar from './components/TopBar'
import ClueContainer from './components/clueContainer/ClueContainer'
import Bottom from './components/bottom/Bottom'

// hooks
import useActiveClue from './hooks/useActiveClue'
import useNextHint from './hooks/useNextHint'

const App = () => {

	// set mode & clue
	let { activeClue, nextActiveClue } = useActiveClue()	
	let { nextHint, showHint } = useNextHint(activeClue)
	const [mode, setMode] = useState('title');

	useEffect(() => {
		console.log(activeClue ? activeClue : mode)
	}, [])

	// const [completedClues, setCompletedClues] = useState([]);
	// const [openClues, setOpenClues] = useState([]);

    return (
		<>
			{ mode == 'title' ? 
				<Title
					setMode={setMode}
					nextActiveClue={nextActiveClue}
				/> :
				<>
					<TopBar />
					<ClueContainer 
						activeClue={activeClue}
						nextHint={nextHint}
					/>
					<Bottom
						mode={mode}
						setMode={setMode}
						nextActiveClue={nextActiveClue}
						activeClue={activeClue}
						nextHint={nextHint}
						showHint={showHint}
					/>
				</>
			}
		</>
	)
}

export default App