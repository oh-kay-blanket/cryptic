import React from 'react'

// components
import TopBar from './components/TopBar'
import ClueContainer from './components/clueContainer/ClueContainer'
import Bottom from './components/bottom/Bottom'

// hooks
import useActiveClue from './hooks/useActiveClue'

const App = () => {
	let { activeClue, solution, setSolution } = useActiveClue()	

    return (
		<>
			<TopBar />
			<ClueContainer 
				activeClue={activeClue} 
				solution={solution} 
			/>
			<Bottom
				name={"Reveal solution"}
				btnStyle={"alt"}
				solution={solution}
				setSolution={setSolution}
			/>
		</>
	)
}

export default App