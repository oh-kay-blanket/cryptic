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
	let { nextHint, showHint, btnArr, setBtnArr, message, buttons } = useNextHint(activeClue)
	const [mode, setMode] = useState('title');

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
						message={message}
						btnArr={buttons}
					/>
				</>
			}
		</>
	)
}

export default App