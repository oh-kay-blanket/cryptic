import React from 'react';
import Button from './Button'

const ButtonContainer = ({ mode, setMode, activeClue, nextActiveClue, nextHint, setNextHint }) => {

	// console.log(nextHint, activeClue.hints.length)

	const getHint = {
		name: 'Get hint',
		btnStyle: 'secondary',
		onClick: function() {
			setNextHint(nextHint + 1)
		}
	}

	const solveClue = {
		name: 'Reveal solution',
		btnStyle: 'alt',
		onClick: function() {
			setNextHint(nextHint + 1)
		}
	}

  return(
	<div className='button-container'>
		{ nextHint < (activeClue.hints.length -1) ?
			<Button
				name={getHint.name}
				btnStyle={getHint.btnStyle}
				onClick={getHint.onClick}
				setMode={setMode}
				nextActiveClue={nextActiveClue}
			/> :
			<Button
				name={solveClue.name}
				btnStyle={solveClue.btnStyle}
				onClick={solveClue.onClick}
				setMode={setMode}
				nextActiveClue={nextActiveClue}
			/>
		}
	</div>
  )
}

export default ButtonContainer