import React, { useContext, useEffect } from 'react'
import { graphql } from 'gatsby'
import ButtonContainer from '../components/bottom/ButtonContainer'
import logo from '../assets/img/logo.png'
import { UserContext } from '../utils/UserContext'
import Layout from '../components/layout'
import { Link } from 'gatsby'
import { isTodayClue } from '../utils/dateHelpers'

const Title = ({ data }) => {
	const cluesData = data.allCluesJson.nodes
	const { completedClues, streak } = useContext(UserContext)
	const completedGuess = completedClues.filter((clue) => clue.how === 'g')
	const knownUser = completedGuess && completedGuess.length > 0 ? true : false

	// Today clue
	const todayClue = cluesData.find(isTodayClue)
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
					<div className='title-intro text-center' data-testid='title-intro'>
						<p>
							You solved today's clue with <br />
							<span className='highlight-guesses whitespace-nowrap'>
								{todayGuesses} {todayGuesses === 1 ? 'guess' : 'guesses'}
							</span>{' '}
							and{' '}
							<span className='highlight-hints whitespace-nowrap'>
								{todayHints} {todayHints === 1 ? 'hint' : 'hints'}
							</span>
							{/* {todayGuesses === 1 && todayHints === 0 ? ' 🥇' : '🎉'} */}
						</p>
						<p data-testid='streak-display'>
							Streak:{' '}
							<span className='whitespace-nowrap'>
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
					<div className='title-intro text-center' data-testid='title-intro'>
						<p className=''>Welcome back 👋</p>
						<p data-testid='streak-display'>
							You're on a{' '}
							<span className='font-bold whitespace-nowrap'>
								{streak}-day streak
							</span>
							! Keep it up by solving today's clue 👇
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
					<div className='title-intro text-center' data-testid='title-intro'>
						<p>Welcome back 👋</p>
						<p>
							You have solved{' '}
							<span className='font-bold whitespace-nowrap'>
								{completedGuess.length}{' '}
								{completedGuess.length === 1 ? 'clue' : 'clues'}
							</span>
							.
						</p>
						<p>Keep it up by playing today's clue 👇</p>
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
					<div className='title-intro' data-testid='title-intro'>
						<p>
							Welcome to Learn Cryptic — a daily game to help you learn about,
							practice, and solve{' '}
							<Link to='/learn'>cryptic crossword clues</Link>.
						</p>
						<p>
							Learn Cryptic is for both beginners who are wanting to learn about
							cryptic crosswords and those already familiar with this wonderful
							form of wordplay.
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

export const Head = () => (
	<>
		<title>Learn Cryptic - Daily Cryptic Crossword Clues & Puzzles</title>
		<meta
			name='description'
			content='Master cryptic crosswords with our daily interactive clues. Perfect for beginners and experts. Learn wordplay techniques, practice with hints, and track your progress.'
		/>
		<link rel='canonical' href='https://learncryptic.com/' />
		<meta property='og:type' content='website' />
		<meta property='og:url' content='https://learncryptic.com/' />
		<meta property='og:title' content='Learn Cryptic - Daily Cryptic Crossword Clues & Puzzles' />
		<meta property='og:description' content='Master cryptic crosswords with our daily interactive clues. Perfect for beginners and experts.' />
		<meta property='og:image' content='https://learncryptic.com/social.jpg' />
		<meta property='twitter:card' content='summary_large_image' />
		<meta property='twitter:image' content='https://learncryptic.com/social.jpg' />
	</>
)

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
