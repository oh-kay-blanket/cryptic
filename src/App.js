import React, { useState, useEffect, useRef, act } from 'react'
import ClueContainer from './components/ClueContainer'
import TopBar from './components/TopBar'
import Bottom from './components/bottom/Bottom'

import clues from './clues.json';

const App = () => {

	console.log(clues)

	// state
	const [solution, setSolution] = useState(false);
	const [activeClue, setActiveClue] = useState(clues[4]);

    return (
		<>
			<TopBar />
			<ClueContainer 
				activeClue={activeClue} 
				solution={solution} 
			/>
			<Bottom
				name={"Solve"}
				btnStyle={"alt"}
				solution={solution}
				setSolution={setSolution}
			/>
		</>
	)
}

export default App