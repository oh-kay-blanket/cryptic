import React from 'react';
import ButtonContainer from './bottom/ButtonContainer';

import logo from '../img/favicon.png';
import gif from '../img/learn-cryptic.gif';

const Title = ({ setMode, nextActiveClue, setCheckAns }) => {

	// buttons
	const btnArr = [
		{
			name: "Play today's clue",
			style: 'primary',
			onClick: function() {
				setMode('today')
				setInput([])
				setCheckAns(false)
				nextActiveClue('random')
			}
		},
		{
			name: "Archive",
			style: 'secondary',
			onClick: function() {
				setMode('archive')
			}
		},
	]

  return(
	<div className='title container'>
			<img src={logo} />
			<img className='title-gif' src={gif} />
			<div className='button-container'>
			<ButtonContainer
				btnArr={btnArr}
				stack={true}
			/>
		</div>
	</div>
  )
}

export default Title;