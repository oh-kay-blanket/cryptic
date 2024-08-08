import React from 'react';
import Anagram from '../clues/Anagram'

const ClueContainer = ({ activeClue, solution }) => {


	function checkClueType(type){
		switch(type){
			case 'Anagram':
				return <Anagram activeClue={activeClue} solution={solution} />
			default: 
				return `Clue type ${type} not found`;
		}
	}
	
	const clueType = checkClueType(activeClue.type[0].name);

	let className = 'clue container';
	if (solution) className += ' solution'; 

	return(
		<div id='clue-container' className={className}>{clueType}</div>
	)
}

export default ClueContainer;