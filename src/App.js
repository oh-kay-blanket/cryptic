import React, { useState } from 'react'

// components
import Title from './components/Title'
import TopBar from './components/TopBar'
import ClueContainer from './components/Clue'
import Bottom from './components/bottom/Bottom'
import Archive from './components/Archive' 

// hooks
import manageClues from './utils/manageClues'
import manageHints from './utils/manageHints'
import manageInput from './utils/manageInput'

const App = () => {

	// set mode & clue
	const [mode, setMode] = useState('archive');
	let { clues, activeClue, setclueId, completedClues, addCompletedClue } = manageClues(mode)	
	let { nextHint, setNextHint, showMessage, setShowMessage, hintColor, setHintColor } = manageHints(activeClue, setCheckAns)
	let { input, setInput, handleInput, checkAns, setCheckAns } = manageInput(activeClue)


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
						hintColor={hintColor}
						setHintColor={setHintColor}
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