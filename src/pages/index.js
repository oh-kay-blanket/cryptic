import React, { useContext } from 'react'
import { graphql } from 'gatsby'
import ButtonContainer from '../components/bottom/ButtonContainer'
import logo from '../assets/img/logo.png'
import { UserContext } from '../utils/UserContext'

const Title = ({ data }) => {

	const cluesData = data.allCluesJson.nodes
	const { completedClues } = useContext(UserContext)

	const completedGuess = completedClues.filter(clue => clue.how === 'g')

	const knownUser = (completedGuess && completedGuess.length > 0) ? true : false
	const avgGuesses = knownUser ? (completedGuess.reduce((sum, item) => sum + item.guesses, 0) / completedGuess.length).toFixed(0) : 0
	const avgHints = knownUser ? (completedGuess.reduce((sum, item) => sum + item.hints, 0) / completedGuess.length).toFixed(0) : 0

	const stats = <div className='title-stats'>
		<p className='stats-clues'>Clues solved: <span>{completedGuess.length}</span></p>
		<p className='stats-guesses'>Average guesses: <span>{avgGuesses}</span></p>
		<p className='stats-hints'>Average hints: <span>{avgHints}</span></p>
	</div>

	const intro = <div className='title-intro'>
		<p>Learn Cryptic is a daily game to help you learn about, practice, and solve cryptic crossword clues.</p>
		<p>This is for both beginners who are wanting to learn about cryptic crosswords and those already familiar with this wonderful form of wordplay.</p>
	</div>

	// Today clue
	const todayClue = cluesData.find(clue => {

		const date1 = new Date(clue.release)
		const date2 = new Date()

		// Strip time part by setting hours, minutes, seconds, and milliseconds to zero
		const d1 = new Date(date1.getFullYear(), date1.getMonth(), date1.getDate())
		const d2 = new Date(date2.getFullYear(), date2.getMonth(), date2.getDate())

		return d1.getTime() === d2.getTime()
	})

	// buttons
	const buttons = {
		learnNew: {
			path: '/learn',
			name: "Learn about cryptics",
			style: 'alt'
		},
		learn: {
			path: '/learn',
			name: "Learn about cryptics",
			style: 'secondary'
		},
		todayClue: {
			path: `/clues/${todayClue.clid}`,
			name: "Play today's clue",
			style: 'primary',
		},
		allClues: {
			path: '/clues',
			name: "See all clues",
			style: 'secondary',
		},
		viewClues: {
			path: '/clues',
			name: "View clues",
			style: 'primary'
		}
	}

	let btnArr = []
	
	if (knownUser) {
		btnArr = todayClue ? [buttons.todayClue, buttons.allClues, buttons.learn] : [buttons.viewClues, buttons.learn]
	} else {
		btnArr = todayClue ? [buttons.learnNew, buttons.todayClue] : [buttons.learn, buttons.viewClues]
	}

  return (
	<div className='title container'>
		<img className='title-gif' src={logo} alt="" />
		{knownUser ? stats : intro}
		<div className='title-actions'>
			<ButtonContainer
				btnArr={btnArr}
				stack={true}
			/>
		</div>
	</div>
  )
}

export default Title

export { Head } from "../components/Head"

export const query = graphql`
	query {
		allCluesJson {
			nodes {
				release
				clid
				id
			}
		}
	}
`