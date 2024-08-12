import React from 'react';
import ButtonContainer from './bottom/ButtonContainer';

import logo from '../img/favicon.png';
import gif from '../img/learn-cryptic.gif';

const Title = ({ setMode, nextActiveClue }) => {

	// buttons
	const btnArr = [{
		name: "Play today's clue",
		style: 'primary',
		onClick: function() {
			setMode('today')
			nextActiveClue()
		}
	}]

  return(
	<div className='title container'>
			<img src={logo} />
			<img className='title-gif' src={gif} />
			<div className='button-container'>
			<ButtonContainer
				btnArr={btnArr}
			/>
		</div>
	</div>
  )
}

export default Title;