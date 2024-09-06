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
import useInput from './hooks/useInput'

const App = () => {

	// set mode & clue
	let { activeClue, nextActiveClue, filteredClues, completedClues, addCompletedClue } = useActiveClue()	
	let { nextHint, setNextHint, showMessage, setShowMessage } = useNextHint(activeClue, setCheckAns)
	let { input, setInput, handleInput, checkAns, setCheckAns } = useInput(activeClue)

	const [mode, setMode] = useState('title');

    return (
		<>
			{ mode == 'title' ? 
				<Title
					setMode={setMode}
					nextActiveClue={nextActiveClue}
					setInput={setInput}
					setCheckAns={setCheckAns}
				/> : mode == 'archive' ?
				<>
					<TopBar
						setMode={setMode}
						setShowMessage={setShowMessage}
						setNextHint={setNextHint}
					/>
					<Archive
						filteredClues={filteredClues}
						nextActiveClue={nextActiveClue}
						setMode={setMode}
						completedClues={completedClues}
						setInput={setInput}
						setCheckAns={setCheckAns}
					/>
				</>:
				<>
					<TopBar
						setMode={setMode}
						setShowMessage={setShowMessage}
						setNextHint={setNextHint}
					/>
					<ClueContainer 
						activeClue={activeClue}
						nextHint={nextHint}
						showMessage={showMessage}
						input={input}
						checkAns={checkAns}
					/>
					<Bottom
						showMessage={showMessage}
						setShowMessage={setShowMessage}
						nextHint={nextHint}
						setNextHint={setNextHint}
						activeClue={activeClue}
						nextActiveClue={nextActiveClue}
						setMode={setMode}
						addCompletedClue={addCompletedClue}
						handleInput={handleInput}
						input={input}
						setInput={setInput}
						checkAns={checkAns}
						setCheckAns={setCheckAns}
					/>
				</>
			}
		</>
	)
}

export default App