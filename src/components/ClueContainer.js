import React from 'react';
import Anagram from '../clues/Anagram'

const ClueContainer = ({ activeClue, solution }) => {


	function checkClueType(type){
		switch(type){
			case 'anagram':
				return <Anagram activeClue={activeClue} solution={solution} />
			default: 
				return `Clue type ${type} not found`;
		}
	}
	
	const clueType = checkClueType(activeClue.type.toLowerCase());

	let className = 'clue container';
	if (solution) className += ' solution'; 

	return(
		<div id='clue-container' className={className}>{clueType}</div>
	)
}

export default ClueContainer;