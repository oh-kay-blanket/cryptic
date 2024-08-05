import React, { useState, useRef, createRef, useEffect } from 'react'

const C1 = ({ solution }) => {

	const [letterTop, setLetterTop] = useState(4);

	let clue = {
		w1: "Satin Raga Man".split(""),
		w2: "Its an Anagram".split(""),
		range: [0,14]
	}

	const elementsRef = useRef(clue.w1.map(() => createRef()));

	// useEffect(() => {
	// 	const lTop = elementsRef.current.map(
	// 	  ref => ref.current.getBoundingClientRect().y
	// 	)
	// 	setLetterTop(lTop);
	//   }, []);


	const w1Insert = clue.w1.map((letter, index) => <span key={index} ref={elementsRef.current[index]} className="letter">{`${letter} - top:${letterTop}  `}</span>)
	const w2Insert = clue.w2.map((letter, index) => (<span key={index} className="letter">{letter}</span>))

	let className = `clue`;
	if (solution) className += ' solution'; 

	return (
		<div className={className}>
			<div className='w2'>{w2Insert}</div>			
			<div className='w1'>{w1Insert}</div>
		</div>
	)
}

export default C1;