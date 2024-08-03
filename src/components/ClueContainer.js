import React from 'react';
import C1 from '../clues/C1'

const ClueContainer = ({ solution }) => {

  return(
	<div id='clue-container'>
		<C1 
			solution={solution}
		/>
	</div>
  )
}

export default ClueContainer;