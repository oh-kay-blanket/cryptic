import React, { useState } from 'react'

// components
import Title from './components/Title'
import TopBar from './components/TopBar'
import ClueContainer from './components/clueContainer/ClueContainer'
import Bottom from './components/bottom/Bottom'
import Archive from './components/Archive'

// hooks
import useActiveClue from './hooks/useActiveClue'
import useNextHint from './hooks/useNextHint'

const App = () => {

	// set mode & clue
	let { activeClue, nextActiveClue, filteredClues, completedClues, addCompletedClue } = useActiveClue()	
	let { nextHint, setNextHint, showMessage, setShowMessage, btnArr } = useNextHint(activeClue)
	const [mode, setMode] = useState('title');

    return (
		<>
			{ mode == 'title' ? 
				<Title
					setMode={setMode}
					nextActiveClue={nextActiveClue}
				/> : mode == 'archive' ?
				<>
					<TopBar
						setMode={setMode}
					/>
					<Archive
						filteredClues={filteredClues}
						nextActiveClue={nextActiveClue}
						setMode={setMode}
						completedClues={completedClues}
					/>
				</>:
				<>
					<TopBar
						setMode={setMode}
					/>
					<ClueContainer 
						activeClue={activeClue}
						nextHint={nextHint}
						showMessage={showMessage}
					/>
					<Bottom
						showMessage={showMessage}
						setShowMessage={setShowMessage}
						btnArr={btnArr}
						nextHint={nextHint}
						setNextHint={setNextHint}
						activeClue={activeClue}
						nextActiveClue={nextActiveClue}
						setMode={setMode}
						addCompletedClue={addCompletedClue}
					/>
				</>
			}
		</>
	)
}

export default App