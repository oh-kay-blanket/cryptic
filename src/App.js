import React, { useState, useEffect, useRef, act } from 'react'
import ClueContainer from './components/ClueContainer'
import TopBar from './components/TopBar'
import Bottom from './components/Bottom'

const App = () => {

	const clues = [
		{
			clue: "Satin Raga Man",
			solution: "It's an Anagram",
			type: "anagram",
			range: [0,14],
			answerLetters: 12,
			id: 0
		},
		{
			clue: "Hear Leo's wonky audio receiver",
			solution: "earhole",
			type: "anagram",
			range: [0,8],
			answerLetters: 7,
			id: 1
		},
	]

	// state
	const [solution, setSolution] = useState(false);
	const [activeClue, setActiveClue] = useState(clues[1]);

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