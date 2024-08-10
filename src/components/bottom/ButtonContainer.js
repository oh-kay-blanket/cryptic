import React from 'react';
import Button from './Button'

const ButtonContainer = ({ mode, setMode, activeClue, nextActiveClue, nextHint, showHint }) => {

	const getHint = {
		name: 'Get hint',
		btnStyle: 'secondary',
	}

	const solveClue = {
		name: 'Reveal solution',
		btnStyle: 'alt',
	}

  return(
	<div className='button-container'>
		{ nextHint < (activeClue.hints.length -1) ?
			<Button
				name={getHint.name}
				btnStyle={getHint.btnStyle}
				onClick={showHint}
				setMode={setMode}
				nextActiveClue={nextActiveClue}
			/> :
			<Button
				name={solveClue.name}
				btnStyle={solveClue.btnStyle}
				onClick={showHint}
				setMode={setMode}
				nextActiveClue={nextActiveClue}
			/>
		}
	</div>
  )
}

export default ButtonContainer