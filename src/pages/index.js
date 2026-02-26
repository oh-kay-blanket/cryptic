import React, { useContext, useEffect } from 'react'
import { graphql } from 'gatsby'
import ButtonContainer from '../components/bottom/ButtonContainer'
import logo from '../assets/img/logo.png'
import { UserContext } from '../utils/UserContext'
import Layout from '../components/layout'
import { isTodayClue, formatTime } from '../utils/dateHelpers'

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
	const todaySolveTime = completedGuess.find(
		(clue) => clue.clid === todayClue.clid
	)?.solveTime

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

	// Icon components
	const PlayIcon = (
		<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='currentColor'>
			<path d='M8 5v14l11-7z'/>
		</svg>
	)

	const BookIcon = (
		<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'>
			<path d='M4 19.5A2.5 2.5 0 0 1 6.5 17H20'/>
			<path d='M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z'/>
		</svg>
	)

	const ListIcon = (
		<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='currentColor' viewBox='0 0 24 24'>
			<rect x='3' y='3' width='3' height='3' rx='1' />
			<rect x='3' y='10.5' width='3' height='3' rx='1' />
			<rect x='3' y='18' width='3' height='3' rx='1' />
			<rect x='8' y='3' width='13' height='3' rx='1' />
			<rect x='8' y='10.5' width='13' height='3' rx='1' />
			<rect x='8' y='18' width='13' height='3' rx='1' />
		</svg>
	)

	// buttons
	const buttons = {
		learnNew: {
			path: '/learn',
			name: 'Start here',
			style: 'alt',
			img: BookIcon,
		},
		learn: {
			path: '/learn',
			name: 'Learn',
			style: 'secondary',
			img: BookIcon,
		},
		todayClue: {
			path: `/clues/${todayClue.clid}`,
			name: "Play today's clue",
			style: 'primary',
			img: PlayIcon,
		},
		todayClueSecondary: {
			path: `/clues/${todayClue.clid}`,
			name: "Play today's clue",
			style: 'primary',
			img: PlayIcon,
		},
		play: {
			path: `/clues/${todayClue.clid}`,
			name: 'Play',
			style: 'primary big',
			img: PlayIcon,
			stack: true,
		},
		allClues: {
			path: '/clues',
			name: 'All clues',
			style: 'secondary',
			img: ListIcon,
		},
		viewClues: {
			path: '/clues',
			name: 'View clues',
			style: 'primary',
			img: ListIcon,
		},
	}

	let getTitleContent = () => {
		if (knownUser && todayCompleted) {
			// User has completed today's clue
			return (
				<>
					<div className='title-intro text-center' data-testid='title-intro'>
						<div className='streak-display' data-testid='streak-display'>
							<span className='streak-number'>{streak}</span>
							<span className='streak-label'>day streak{streak > 10 ? ' 😎' : streak > 1 ? ' 🔥' : ''}</span>
						</div>
						<p className='stats-label'>Today's clue</p>
						<div className='stats-row'>
							<span className='highlight-guesses'>
								{todayGuesses} {todayGuesses === 1 ? 'guess' : 'guesses'}
							</span>
							<span className='highlight-hints'>
								{todayHints} {todayHints === 1 ? 'hint' : 'hints'}
							</span>
							{todaySolveTime != null && (
								<span className='highlight-time'>
									{formatTime(todaySolveTime)}
								</span>
							)}
						</div>
					</div>
					<div className='title-actions'>
						<ButtonContainer
							btnArr={[buttons.allClues, buttons.learn]}
						/>
					</div>
				</>
			)
		} else if (knownUser && !todayCompleted && todayClue && streak > 0) {
			// User has completed a clue but not today's and has a streak
			return (
				<>
					<div className='title-intro text-center' data-testid='title-intro'>
						<div className='streak-display' data-testid='streak-display'>
							<span className='streak-number'>{streak}</span>
							<span className='streak-label'>day streak{streak > 10 ? ' 😎' : streak > 1 ? ' 🔥' : ''}</span>
						</div>
						<p>Keep it going! Solve today's clue 👇</p>
					</div>
					<div className='title-actions'>
						<ButtonContainer
							btnArr={[buttons.todayClue, buttons.learn]}
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
						/>
					</div>
				</>
			)
		} else {
			// New user
			const releaseDate = new Date(todayClue.release)
			const formattedDate = releaseDate.toLocaleDateString('en-US', {
				month: 'long',
				day: 'numeric',
				year: 'numeric',
			})
			return (
				<>
					<div className='title-intro text-center' data-testid='title-intro'>
						<p>Master the art of cryptic crosswords.</p>
					</div>
					<div className='title-actions' data-testid='title-actions'>
						<ButtonContainer btnArr={[buttons.play]} />
						<p className='clue-meta'>
							{formattedDate}
							<br />
							#{todayClue.clid} · by {todayClue.source?.value}
						</p>
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
				source {
					value
				}
			}
		}
	}
`
