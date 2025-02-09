import React from 'react'

import ButtonContainer from './bottom/ButtonContainer';

import typePill from '../assets/img/learn/type-pill-reveal.png';
import showHint from '../assets/img/learn/show-hint.png';

const Learn = ({ clues, setMode, setclueId }) => {

	const todayClue = clues.find(clue => {

		const date1 = new Date(clue.release);
		const date2 = new Date();

		// Strip time part by setting hours, minutes, seconds, and milliseconds to zero
		const d1 = new Date(date1.getFullYear(), date1.getMonth(), date1.getDate());
		const d2 = new Date(date2.getFullYear(), date2.getMonth(), date2.getDate());

		return d1.getTime() === d2.getTime()
	})

	// buttons
	const buttons = {
		todayClue: {
			name: "Play today's clue",
			style: 'primary',
			onClick: function() {
				setclueId(todayClue.id)
				setMode('playing')
			}
		},
		allClues: {
			name: "See all clues",
			style: 'secondary',
			onClick: function() {
				setMode('archive')
			}
		},
		viewClues: {
			name: "View clues",
			style: 'primary',
			onClick: function() {
				setMode('archive')
			}
		}
	}

	const btnArr = todayClue ? [buttons.todayClue] : [buttons.viewClues]

	return (
		<div className='learn container'>

			<div className='learn-section'>
				<p className='learn-question'>What is a cryptic crossword?</p>
				<p className='learn-answer'>A cryptic crossword is a type of crossword in which each clue is a word in itself, often involving wordplay, anagrams, homophones, hidden words, or other linguistic tricks. Unlike standard crosswords, where clues are straightforward definitions, cryptic clues typically have two parts:</p>
				<ul>
					<li><strong>Definition</strong><br></br> A straight or slightly disguised definition of the answer. <br></br>In a cryptic, this will <span className='disclaimer'>always be at the beginning or end of the clue.</span></li>
					<li><strong>Wordplay</strong><br></br> A cryptic hint involving anagrams, reversals, hidden words, homophones, or other forms of word manipulation.</li>
				</ul>
			</div>

			<div className='learn-section'>
				<p className='learn-question'>What is Learn Cryptic?</p>
				<p className='learn-answer'>Learn Cryptic is designed to help you learn to understand and solve cryptic clues. There are two ways you can get help with solving clues:</p>
				<ul>
					<li><strong>Clue types</strong><br></br> At the top of each clue you will see purple 'pills' indicating the clue type(s). If you tap on these, they will provide helpful information about the type of clue your are working with.<br></br><img className='' src={typePill} /></li>
					<li><strong>Hints</strong><br></br> The "Show Hint" and "Reveal Solution" buttons in the clue provide guidance as to what steps you will need to take to find the solution.<br></br><img className='' src={showHint} /></li>
				</ul>
			</div>

			<div className='learn-section'>
				<p className='learn-question'>What do I need to know before I start?</p>
				<p className='learn-answer'>There's a lot to learn about cryptics along the way, but the best way to learn is to dive in and try a few! Make sure to use the type pills and hints to help you out along the way.</p>
			</div>

			<div className='learn-section'>
				<ButtonContainer
					btnArr={btnArr}
					stack={true}
				/>
			</div>
		</div>
	)
}


export default Learn;