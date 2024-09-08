import React from 'react';
import ButtonContainer from './bottom/ButtonContainer';

import logo from '../img/favicon.png';
import gif from '../img/learn-cryptic.gif';

const Title = ({ setMode, clues, setclueId }) => {

	const today = new Date();

	const todayClue = clues.find(clue => {

		const date1 = new Date(clue.release);
		const date2 = new Date();

		// Strip time part by setting hours, minutes, seconds, and milliseconds to zero
		const d1 = new Date(date1.getFullYear(), date1.getMonth(), date1.getDate());
		const d2 = new Date(date2.getFullYear(), date2.getMonth(), date2.getDate());

		return d1.getTime() === d2.getTime()
	}).id

	// buttons
	const btnArr = [
		{
			name: "Today's clue",
			style: 'primary',
			onClick: function() {
				setclueId(todayClue)
				setMode('playing')
			}
		},
		{
			name: "All clues",
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
		<div className='title-actions'>
			<div className='title-date'>
				<span>{today.toLocaleString('en-us', { month: 'long' })}</span>&nbsp;
				<span>{today.getDate()}</span>,&nbsp;
				<span>{today.getFullYear()}</span>
			</div>
			<ButtonContainer
				btnArr={btnArr}
				stack={true}
			/>
		</div>
	</div>
  )
}

export default Title;