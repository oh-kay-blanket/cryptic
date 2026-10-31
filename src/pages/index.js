import React, { useContext, useEffect, useState } from 'react'
import { Link, graphql } from 'gatsby'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import creators from '../assets/data/creators.json'
import ButtonContainer from '../components/bottom/ButtonContainer'
import logo from '../assets/img/logo.png'
import { UserContext } from '../utils/UserContext'
import Layout from '../components/layout'
import { isTodayClue, buildShareText } from '../utils/dateHelpers'
import ScoreGrid from '../components/ScoreGrid'
import AchievementIcon from '../components/AchievementIcon'
import { migrateCompletedCluesDifficulty } from '../utils/migrateCompletedClues'
import { migrateAchievements } from '../utils/achievements'
import { selectHomepageMotivation } from '../utils/homepageMotivation'

const Title = ({ data }) => {
	const cluesData = data.allCluesJson.nodes
	const {
		completedClues,
		streak,
		longestStreak,
		achievements,
		setOpenStatsWithTab,
		refreshFromStorage,
	} = useContext(UserContext)
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

	// Creator image lookup
	const creatorImages = data?.allFile?.nodes || []
	const getCreatorImage = (creatorName) => {
		if (!creatorName) return null
		const creator = creators.find(
			(c) => c.nom === creatorName || c.name === creatorName
		)
		const namesToMatch = [
			creatorName,
			creator?.nom,
			creator?.name,
		].filter(Boolean)

		for (const name of namesToMatch) {
			const fileName = name
				.toLowerCase()
				.replace(/[,.']/g, '')
				.replace(/\s+/g, '-')
			const imageNode = creatorImages.find(
				(node) =>
					node.name?.toLowerCase() === fileName ||
					node.name?.toLowerCase() === name.toLowerCase()
			)
			if (imageNode) {
				return getImage(imageNode.childImageSharp)
			}
		}
		return null
	}
	const todayCreatorImage = getCreatorImage(todayClue?.source?.value)

	const renderAuthor = () => {
		if (!todayClue) return null
		return (
			<span className='clue-meta-author'>
				<span>by</span>
				<Link to='/creators' className='source-author'>
					{todayCreatorImage && (
						<GatsbyImage
							image={todayCreatorImage}
							alt=''
							className='source-author-image'
							imgStyle={{ borderRadius: '50%' }}
						/>
					)}
					<span className='source-author-name'>{todayClue.source?.value}</span>
				</Link>
			</span>
		)
	}

	const renderClueMeta = (dateText) => {
		if (!todayClue) return null
		return (
			<div className='clue-meta'>
				<span className='clue-meta-date'>{dateText}</span>
				{renderAuthor()}
			</div>
		)
	}

	// Add loading state to prevent flicker
	const [isContextLoaded, setIsContextLoaded] = useState(false)

	useEffect(() => {
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

	// Run one-time migration to backfill difficulty data
	useEffect(() => {
		const migrated = migrateCompletedCluesDifficulty(cluesData)
		if (migrated) {
			refreshFromStorage()
		}
	}, [cluesData, refreshFromStorage])

	// Run one-time achievement migration for existing users
	useEffect(() => {
		if (!isContextLoaded) return

		const result = migrateAchievements(cluesData)
		if (result && result.migrated) {
			refreshFromStorage()
		}
	}, [cluesData, refreshFromStorage, isContextLoaded])

	// Hand-drawn icon components
	const PlayIcon = (
		<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='currentColor' stroke='currentColor' strokeWidth='1.5' strokeLinecap='round' strokeLinejoin='round'>
			{/* Hand-drawn play triangle with organic edges */}
			<path d='M7.2 4.2 Q7.1 12.1 7.3 19.7 Q13.2 15.9 19.2 12.1 Q13.3 8.2 7.2 4.2'/>
		</svg>
	)

	const BookIcon = (
		<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='1.5' strokeLinecap='round'>
			<path d='M5.1 19.2c.4-.6 1.1-.9 1.8-.9 4.2.1 8.5-.1 12.7.1'/>
			<path d='M6.2 2.1c4.4.1 8.9-.1 13.3.1.5.1.9.5.9 1-.1 5.4.1 10.9-.1 16.3-.1.5-.5.9-1 .9-4.2-.1-8.5.1-12.7-.1-1.1-.1-2.1.5-2.6 1.5.1-6.4-.1-12.9.1-19.3.1-.3.4-.5.7-.5'/>
		</svg>
	)

	const ListIcon = (
		<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none'>
			<path d='M3.5 4.8c.6-.2 1.3.2 1.5.8.3.6 0 1.3-.5 1.6-.6.3-1.3.1-1.6-.5-.4-.6-.1-1.4.6-1.9' fill='currentColor' />
			<path d='M3.6 11.4c.6-.2 1.3.1 1.6.6.3.6.1 1.3-.4 1.7-.6.3-1.3.1-1.7-.5-.3-.6-.1-1.3.5-1.8' fill='currentColor' />
			<path d='M3.5 17.8c.6-.2 1.3.1 1.6.7.3.6 0 1.3-.5 1.6-.6.3-1.3 0-1.6-.6-.3-.6 0-1.3.5-1.7' fill='currentColor' />
			<path d='M8.2 5.9c4.4.1 8.8-.1 13.2.1' stroke='currentColor' strokeWidth='2.5' strokeLinecap='round' />
			<path d='M8.1 12.1c4.4-.1 8.9.1 13.3-.1' stroke='currentColor' strokeWidth='2.5' strokeLinecap='round' />
			<path d='M8.2 18.2c4.4.1 8.8-.1 13.2.1' stroke='currentColor' strokeWidth='2.5' strokeLinecap='round' />
		</svg>
	)

	const ShareIcon = (
		<svg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round'>
			<path d='M17.8 4.2c.5-.2 1 0 1.4.3.4.4.6.9.5 1.4-.1.5-.5 1-1 1.2-.5.2-1.1.1-1.5-.3-.4-.4-.5-.9-.4-1.5.1-.5.5-.9 1-1.1' fill='currentColor'/>
			<path d='M17.9 17.1c.5-.1 1 .1 1.4.4.4.4.5.9.4 1.4-.2.5-.6.9-1.1 1.1-.5.1-1.1 0-1.4-.4-.4-.4-.5-1-.3-1.5.2-.5.5-.9 1-1' fill='currentColor'/>
			<path d='M5.8 10.2c.5-.2 1.1 0 1.4.4.4.4.5 1 .3 1.5-.2.5-.6.9-1.1 1-.5.2-1.1 0-1.5-.4-.3-.4-.4-1-.2-1.5.2-.5.6-.9 1.1-1' fill='currentColor'/>
			<path d='M7.9 10.8c2.8-1.4 5.7-2.9 8.5-4.3'/>
			<path d='M7.8 13.1c2.9 1.5 5.8 2.8 8.7 4.2'/>
		</svg>
	)

	// Share score function
	const handleShareScore = async () => {
		const scoreText = buildShareText({
			clid: todayClue.clid,
			solveTime: todaySolveTime,
			guesses: todayGuesses,
			hints: todayHints,
		})

		const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent)

		if (isMobile && navigator.share) {
			try {
				await navigator.share({ title: 'Clue Score', text: scoreText })
			} catch (err) {
				if (err.name !== 'AbortError') {
					alert('Could not share your score.')
				}
			}
		} else {
			try {
				await navigator.clipboard.writeText(scoreText)
				alert('Score copied to clipboard!')
			} catch (err) {
				alert('Could not copy your score.')
			}
		}
	}

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
			style: 'primary',
			img: PlayIcon,
		},
		allClues: {
			path: '/clues',
			name: 'All clues',
			style: 'secondary',
			img: ListIcon,
		},
		browse: {
			path: '/clues',
			name: 'Browse clues',
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
							<span className='streak-label'>day streak</span>
						</div>
						<p className='stats-label'>Today's clue</p>
						<div className='stats-row'>
							<ScoreGrid
								solveTime={todaySolveTime}
								guesses={todayGuesses}
								hints={todayHints}
								size='lg'
								showLabels
							/>
							<button
								onClick={handleShareScore}
								className='share-icon-btn'
								aria-label='Share score'
							>
								{ShareIcon}
							</button>
						</div>
						<div className='clue-meta'>
							{renderAuthor()}
						</div>
					</div>
					<div className='title-actions'>
						<ButtonContainer btnArr={[buttons.browse]} />
					</div>
				</>
			)
		} else if (knownUser && !todayCompleted && todayClue && streak > 0) {
			// User has completed a clue but not today's and has a streak
			const releaseDate = new Date(todayClue.release)
			const formattedDate = releaseDate.toLocaleDateString('en-US', {
				month: 'long',
				day: 'numeric',
				year: 'numeric',
			})
			return (
				<>
					<div className='title-intro text-center' data-testid='title-intro'>
						<div className='streak-display' data-testid='streak-display'>
							<span className='streak-number'>{streak}</span>
							<span className='streak-label'>day streak</span>
						</div>
					</div>
					<div className='title-actions'>
						<p className='cta-text'>Keep it going</p>
						<ButtonContainer btnArr={[buttons.play]} />
						{renderClueMeta(formattedDate)}
					</div>
				</>
			)
		} else if (knownUser && !todayCompleted && todayClue && streak === 0) {
			// User has completed a clue but not today's and has no streak
			const releaseDate = new Date(todayClue.release)
			const formattedDate = releaseDate.toLocaleDateString('en-US', {
				month: 'long',
				day: 'numeric',
				year: 'numeric',
			})
			const motivation = selectHomepageMotivation({
				completedClues,
				achievements,
				longestStreak,
				todayClue,
			})
			return (
				<>
					<div className='title-intro text-center' data-testid='title-intro'>
						<div className='motivation-display' data-testid='motivation-display'>
							<button
								type='button'
								className={`motivation-badge ${motivation.unlocked ? 'unlocked' : 'locked'}`}
								onClick={() => setOpenStatsWithTab(motivation.tab || 'achievements')}
								aria-label={`View ${motivation.title} in ${motivation.tab || 'achievements'}`}
							>
								<AchievementIcon icon={motivation.icon} />
							</button>
							<span className='motivation-title'>{motivation.title}</span>
							<span className='motivation-subtitle'>{motivation.subtitle}</span>
						</div>
					</div>
					<div className='title-actions'>
						<p className='cta-text'>{motivation.cta}</p>
						<ButtonContainer btnArr={[buttons.play]} />
						{renderClueMeta(formattedDate)}
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
						{renderClueMeta(formattedDate)}
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
				difficulty
				type
				source {
					value
				}
			}
		}
		allFile(
			filter: {
				sourceInstanceName: { eq: "images" }
				relativeDirectory: { eq: "creators" }
				extension: { in: ["jpg", "jpeg", "png"] }
			}
		) {
			nodes {
				name
				childImageSharp {
					gatsbyImageData(
						width: 64
						height: 64
						placeholder: BLURRED
						formats: [AUTO, WEBP, AVIF]
					)
				}
			}
		}
	}
`
