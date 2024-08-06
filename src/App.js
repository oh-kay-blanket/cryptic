import React, { useState, useEffect, useRef, act } from 'react'
import ClueContainer from './components/ClueContainer'
import TopBar from './components/TopBar'
import Button from './components/Button'

const App = () => {

	const clues = [
		{
			clue: "Satin Raga Man",
			solution: "Its an Anagram",
			type: "anagram",
			range: [0,14],
			answerLetters: 12,
			id: 0
		}
	]

	// state
	const [solution, setSolution] = useState(false);
	const [activeClue, setActiveClue] = useState(clues[0]);

    return (
		<>
			<TopBar />
			<ClueContainer 
				activeClue={activeClue} 
				solution={solution} 
			/>
			<Button
				name={"Solve"}
				btnStyle={"alt"}
				solution={solution}
				setSolution={setSolution}
			/>
		</>
	)
}

export default App