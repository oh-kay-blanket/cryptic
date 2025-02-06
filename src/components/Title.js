import React from 'react';
import ButtonContainer from './bottom/ButtonContainer';

import logo from '../assets/img/favicon.png';
import gif from '../assets/img/learn-cryptic.gif';

const Title = ({ setMode, clues, setclueId, completedClues }) => {

	const knownUser = (completedClues && completedClues.length > 0) ? true : false

	const avgGuesses = (completedClues.reduce((sum, item) => sum + item.guesses, 0)/completedClues.length).toFixed(0);
	const avgHints = (completedClues.reduce((sum, item) => sum + item.hints, 0)/completedClues.length).toFixed(0);

	const stats = <div className='title-stats'>
		<p className='stats-clues'>Clues completed: <span>{completedClues.length}</span></p>
		<p className='stats-guesses'>Average guesses: <span>{avgGuesses}</span></p>
		<p className='stats-hints'>Average hints: <span>{avgHints}</span></p>
	</div>

	const intro = <div className='title-intro'>
		<p>Learn Cryptic is a tool to help you learn about, practice and solve cryptic crossword clues.</p>
	</div>

	// Today clue
	const today = new Date();
	const todayClue = clues.find(clue => {

		const date1 = new Date(clue.release);
		const date2 = new Date();

		// Strip time part by setting hours, minutes, seconds, and milliseconds to zero
		const d1 = new Date(date1.getFullYear(), date1.getMonth(), date1.getDate());
		const d2 = new Date(date2.getFullYear(), date2.getMonth(), date2.getDate());

		return d1.getTime() === d2.getTime()
	})

	// buttons
	const btnArr = todayClue ? [
		{
			name: "Today's clue",
			style: 'primary',
			onClick: function() {
				setclueId(todayClue.id)
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
	] :
	[
		{
			name: "View clues",
			style: 'primary',
			onClick: function() {
				setMode('archive')
			}
		},
	]

  return(
	<div className='title container'>
		{/* <img className='title-logo' src={logo} /> */}
		<img className='title-gif' src={gif} />
		{knownUser ? stats : intro}
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