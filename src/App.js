import React from 'react'

// components
import Title from './components/Title'
import TopBar from './components/TopBar'
import Learn from './components/Learn'
import ClueContainer from './components/Clue'
import Bottom from './components/bottom/Bottom'
import Archive from './components/Archive' 

// hooks
import manageState from './utils/state/manageState'
import manageHints from './utils/state/manageHints'
import manageInput from './utils/state/manageInput'

const App = () => {

	let { clues, activeClue, setclueId, completedClues, addCompletedClue, mode, setMode, showType, setShowType, stats, setStats } = manageState()
	let { nextHint, setNextHint, showMessage, setShowMessage } = manageHints(activeClue, setCheckAns)
	let { input, setInput, handleInput, checkAns, setCheckAns } = manageInput(activeClue)


    return (
		<>	
			{ mode == 'title' ?
				<Title 
					clues={clues}
					setMode={setMode}
					setclueId={setclueId}
					completedClues={completedClues}
				/> :
				<TopBar
					setMode={setMode}
					setShowMessage={setShowMessage}
					setNextHint={setNextHint}
					setclueId={setclueId}
					setInput={setInput}
				/>
			}
			{ mode == 'learn' &&
				<>
					<Learn
						clues={clues}
						setMode={setMode}
						setclueId={setclueId}
					/>
				</>
			}
			{ mode == 'archive' &&
				<>
					<Archive
						clues={clues}
						setclueId={setclueId}
						setMode={setMode}
						completedClues={completedClues}
						setInput={setInput}
						setCheckAns={setCheckAns}
						stats={stats}
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
						showType={showType}
						setShowType={setShowType}
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
						stats={stats}
						setStats={setStats}
					/>
				</>
			}
		</>
	)
}

export default App