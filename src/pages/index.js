import React, { useContext, useEffect } from 'react'
import { graphql } from 'gatsby'
import ButtonContainer from '../components/bottom/ButtonContainer'
import logo from '../assets/img/logo.png'
import { UserContext } from '../utils/UserContext'
import Layout from '../components/layout'

const Title = ({ data }) => {
	const cluesData = data.allCluesJson.nodes
	const { completedClues, streak } = useContext(UserContext)
	const completedGuess = completedClues.filter((clue) => clue.how === 'g')
	const knownUser = completedGuess && completedGuess.length > 0 ? true : false

	// Today clue
	const todayClue = cluesData.find((clue) => {
		const date1 = new Date(clue.release)
		const date2 = new Date()

		// Strip time part by setting hours, minutes, seconds, and milliseconds to zero
		const d1 = new Date(date1.getFullYear(), date1.getMonth(), date1.getDate())
		const d2 = new Date(date2.getFullYear(), date2.getMonth(), date2.getDate())

		return d1.getTime() === d2.getTime()
	})
	const todayCompleted =
		todayClue && completedGuess.find((clue) => clue.clid === todayClue.clid)
			? true
			: false

	const todayGuesses = completedGuess.find(
		(clue) => clue.clid === todayClue.clid
	)?.guesses
	const todayHints = completedGuess.find(
		(clue) => clue.clid === todayClue.clid
	)?.hints

	// Add loading state to prevent flicker
	const [isContextLoaded, setIsContextLoaded] = React.useState(false)

	React.useEffect(() => {
		// Set context as loaded after a brief delay to ensure localStorage has been read
		const timer = setTimeout(() => {
			setIsContextLoaded(true)
		}, 100)

		return () => clearTimeout(timer)
	}, [])

	// Add fixed-page class to prevent scrolling
	useEffect(() => {
		if (typeof window !== 'undefined') {
			document.body.classList.add('fixed-page')
			return () => {
				document.body.classList.remove('fixed-page')
			}
		}
	}, [])

	// buttons
	const buttons = {
		learnNew: {
			path: '/learn',
			name: 'Learn about cryptics',
			style: 'tertiary',
		},
		learn: {
			path: '/learn',
			name: 'Learn about cryptics',
			style: 'tertiary',
		},
		todayClue: {
			path: `/clues/${todayClue.clid}`,
			name: "Play today's clue",
			style: 'primary',
		},
		allClues: {
			path: '/clues',
			name: 'See all clues',
			style: 'secondary',
		},
		viewClues: {
			path: '/clues',
			name: 'View clues',
			style: 'primary',
		},
	}

	let getTitleContent = () => {
		if (knownUser && todayCompleted) {
			// User has completed today's clue
			return (
				<>
					<div className='title-intro text-center'>
						<p>
							You've completed today's clue with{' '}
							<span className='highlight-guesses'>
								{todayGuesses} {todayGuesses === 1 ? 'guess' : 'guesses'}
							</span>{' '}
							and{' '}
							<span className='highlight-hints'>
								{todayHints} {todayHints === 1 ? 'hint' : 'hints'}
							</span>
							{todayGuesses === 1 && todayHints === 0 ? ' 🥇' : '🎉'}
						</p>
						<p>
							Current streak:{' '}
							<span>
								{streak} {streak === 1 ? 'day' : 'days'}
								{streak > 10 ? ' 😎' : streak > 1 ? ' 🔥' : ''}
							</span>
						</p>
					</div>
					<div className='title-actions'>
						<ButtonContainer
							btnArr={[buttons.allClues, buttons.learn]}
							stack={true}
						/>
					</div>
				</>
			)
		} else if (knownUser && !todayCompleted && todayClue && streak > 0) {
			// User has completed a clue but not today's and has a streak
			return (
				<>
					<div className='title-intro'>
						<p>Welcome back!</p>
						<p>
							You're on a {streak}-day streak! Keep it up by playing today's
							clue.
						</p>
					</div>
					<div className='title-actions'>
						<ButtonContainer
							btnArr={[buttons.todayClue, buttons.learn]}
							stack={true}
						/>
					</div>
				</>
			)
		} else if (knownUser && !todayCompleted && todayClue && streak === 0) {
			// User has completed a clue but not today's and has no streak
			return (
				<>
					<div className='title-intro'>
						<p>Welcome back!</p>
						<p>
							You've completed {completedGuess.length}{' '}
							{completedGuess.length === 1 ? 'clue' : 'clues'} so far. Keep it
							up by playing today's clue.
						</p>
					</div>
					<div className='title-actions'>
						<ButtonContainer
							btnArr={[buttons.todayClue, buttons.learn]}
							stack={true}
						/>
					</div>
				</>
			)
		} else {
			// New user
			return (
				<>
					<div className='title-intro'>
						<p>
							Welcome to Learn Cryptic — a daily game to help you learn about,
							practice, and solve cryptic crossword clues.
						</p>
						<p>
							This is for both beginners who are wanting to learn about cryptic
							crosswords and those already familiar with this wonderful form of
							wordplay.
						</p>
					</div>
					<div className='title-actions'>
						<ButtonContainer
							btnArr={[buttons.todayClue, buttons.learnNew]}
							stack={true}
						/>
					</div>
				</>
			)
		}
	}

	// Don't render conditional content until context is loaded
	if (!isContextLoaded) {
		return (
			<Layout>
				<div className='title lc-container h-full'>
					<img className='title-img' src={logo} alt='' />
					<div className='title-actions' style={{ visibility: 'hidden' }}>
						<ButtonContainer
							btnArr={[buttons.learnNew, buttons.todayClue]}
							stack={true}
						/>
					</div>
				</div>
			</Layout>
		)
	}

	return (
		<Layout>
			<div className='title lc-container h-full'>
				<img className='title-img' src={logo} alt='' />
				{getTitleContent()}
			</div>
		</Layout>
	)
}

export default Title

export { Head } from '../components/Head'

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
