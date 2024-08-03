import React, { useState, useEffect, useRef } from 'react'
import ClueContainer from './components/ClueContainer'
import TopBar from './components/TopBar'
import Button from './components/Button'
import solveAnagram from './fn/SolveAnagram'
import solveInitialism from './fn/solveInitialism'

const App = () => {

	// state
	const [solution, setSolution] = useState(false);

	const buttonClick = () => {
		solveAnagram();
		setSolution(true);
	}

    return (
		<>
			<TopBar />
			<ClueContainer solution={solution} />
			<Button
				name={"Solve"}
				btnStyle={"alt"}
				solution={solution}
				buttonClick={() => buttonClick()}
			/>
		</>
	)
}

export default App