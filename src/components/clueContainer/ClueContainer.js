import React from 'react';
import Anagram from './clues/Anagram'

const ClueContainer = ({ activeClue, nextHint }) => {

	console.log(activeClue.hints[nextHint])


	// function checkClueType(type){
	// 	switch(type){
	// 		case 'Anagram':
	// 			return <Anagram activeClue={activeClue} />
	// 		default: 
	// 			return `${activeClue.clue} ${activeClue.solutionLetters}`;
	// 	}
	// }
	
	// const clueType = checkClueType(activeClue.type[0].name);

	return(
		<div id='clue-container' className='clue container'>{activeClue.clue} {activeClue.solutionLetters}</div>
	)
}

export default ClueContainer;