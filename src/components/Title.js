import React from 'react';
import Button from './bottom/Button'
import logo from '../img/favicon.png';
import gif from '../img/learn-cryptic.gif';

const Title = ({ setMode, nextActiveClue }) => {

	// play archive
	const playArchive = {
		name: "Play today's clue",
		style: 'primary',
		onClick: function() {
			setMode('today')
			nextActiveClue()
		}
	}

  return(
	<div className='title container'>
			<img src={logo} />
			<img className='title-gif' src={gif} />
			<div className='button-container'>
			<Button
				btnInfo={playArchive}
			/>
		</div>
	</div>
  )
}

export default Title;