import React, { useState, useEffect, useRef, act } from 'react'
import ClueContainer from './components/ClueContainer'
import TopBar from './components/TopBar'
import Bottom from './components/bottom/Bottom'

import clues from './clues.json';

const App = () => {

	// state
	const [solution, setSolution] = useState(false);
	const [activeClue, setActiveClue] = useState(clues[3]);

	// get solution letters
	const getSolutionLetters = solution => `(${solution.split(' ').map(word => word.length).join(' ')})`
	activeClue.solutionLetters = getSolutionLetters(activeClue.solution)

	console.log(activeClue);

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