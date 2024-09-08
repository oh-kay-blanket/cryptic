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
	const [mode, setMode] = useState('title');
	let { clues, activeClue, setclueId, completedClues, addCompletedClue } = useActiveClue(mode)	
	let { nextHint, setNextHint, showMessage, setShowMessage } = useNextHint(activeClue, setCheckAns)
	let { input, setInput, handleInput, checkAns, setCheckAns } = useInput(activeClue)


    return (
		<>	
			{ mode == 'title' && 
				<Title 
					setMode={setMode}
					clues={clues}
					setclueId={setclueId}
				/> 
			}
			<TopBar
				setMode={setMode}
				setShowMessage={setShowMessage}
				setNextHint={setNextHint}
				setclueId={setclueId}
				setInput={setInput}
			/>
			{ mode == 'archive' &&
				<>
					<Archive
						clues={clues}
						setclueId={setclueId}
						setMode={setMode}
						completedClues={completedClues}
						setInput={setInput}
						setCheckAns={setCheckAns}
					/>
				</>
			}
			{ mode == 'playing' &&
				<>
					<ClueContainer 
						clues={clues}
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
						setclueId={setclueId}
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