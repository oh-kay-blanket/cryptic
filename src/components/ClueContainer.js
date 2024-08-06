import React from 'react';
import Anagram from '../clues/Anagram'

const ClueContainer = ({ activeClue, solution }) => {


	function checkClueType(type){
		switch(type){
			case 'anagram':
				return <Anagram activeClue={activeClue} />
			default: 
				return `Clue type ${type} not found`;
		}
	}
	
	const clueType = checkClueType(activeClue.type.toLowerCase());

	let className = 'clue';
	if (solution) className += ' solution'; 

	return(
		<div id='clue-container' className={className}>{clueType}</div>
	)
}

export default ClueContainer;