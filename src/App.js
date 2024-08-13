import React, { useState } from 'react'

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
	let { nextHint, setNextHint, showMessage, setShowMessage, btnArr } = useNextHint(activeClue)
	const [mode, setMode] = useState('titl');

	console.log(activeClue)

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
						showMessage={showMessage}
						setShowMessage={setShowMessage}
						btnArr={btnArr}
						nextHint={nextHint}
						setNextHint={setNextHint}
						activeClue={activeClue}
						nextActiveClue={nextActiveClue}
					/>
				</>
			}
		</>
	)
}

export default App