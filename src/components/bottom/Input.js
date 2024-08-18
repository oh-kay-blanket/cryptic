import React from "react";

const Input = ({ activeClue }) => {

	const inputWords = activeClue.solution.split(" ")

	const inputCells = inputWords.map(word => {
		const inputLetters = word.split('').map((letter, index) => <button key={index} className={`cell ${letter}`}></button>)
		return <span className='word'>{inputLetters}</span>
	})

	return(
		<div className='input'>
			<div className='container'>{inputCells}</div>
		</div>
	)
}

export default Input