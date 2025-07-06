import React, {
	useRef,
	createRef,
	useContext,
	useState,
	useEffect,
} from 'react'
import { Link, graphql } from 'gatsby'
import Layout from '../components/layout'
import { UserContext } from '../utils/UserContext'

import d1 from '../assets/img/difficulty/1.svg'
import d2 from '../assets/img/difficulty/2.svg'
import d3 from '../assets/img/difficulty/3.svg'
import d4 from '../assets/img/difficulty/4.svg'

const Clues = ({ data }) => {
	const cluesData = data.allCluesJson.nodes
	const { completedClues } = useContext(UserContext)

	// Track dark mode state
	const [isDarkMode, setIsDarkMode] = useState(false)
	const [hoveredClue, setHoveredClue] = useState(null)
	const [hoveredRelease, setHoveredRelease] = useState(null)

	useEffect(() => {
		if (typeof window !== 'undefined') {
			// Initial check
			setIsDarkMode(document.documentElement.classList.contains('dark'))

			// Watch for dark mode changes
			const observer = new MutationObserver((mutations) => {
				mutations.forEach((mutation) => {
					if (mutation.attributeName === 'class') {
						setIsDarkMode(document.documentElement.classList.contains('dark'))
					}
				})
			})

			observer.observe(document.documentElement, {
				attributes: true,
				attributeFilter: ['class'],
			})

			return () => observer.disconnect()
		}
	}, [])

	let tilesRef = useRef(cluesData.map(() => createRef()))

	// only past clues
	let archiveTiles = cluesData.filter((clue) => {
		function isTodayOrBefore(date1Str) {
			const date1 = new Date(date1Str)
			const date2 = new Date()

			// Strip time part by setting hours, minutes, seconds, and milliseconds to zero
			const d1 = new Date(
				date1.getFullYear(),
				date1.getMonth(),
				date1.getDate()
			)
			const d2 = new Date(
				date2.getFullYear(),
				date2.getMonth(),
				date2.getDate()
			)

			// Compare the two dates
			if (d1.getTime() === d2.getTime()) {
				return true // Same day
			} else if (d1.getTime() < d2.getTime()) {
				return true // date1 is before date2
			} else {
				return false // date1 is after date2
			}
		}

		return isTodayOrBefore(clue.release)
	})

	archiveTiles = archiveTiles.map((clue, index) => {
		const getRelease = (release) => new Date(release)

		const getImg = (difficulty) => {
			switch (Number(difficulty)) {
				case 1:
					return d1
				case 2:
					return d2
				case 3:
					return d3
				case 4:
					return d4
				default:
					return d1
			}
		}

		const completedClue = completedClues.find(
			(c) => c.id === clue.clid || c.clid === clue.clid
		)

		const stats = completedClue && (
			<>
				<div className='tile-stats'>
					<span className='stat-hints dark:!bg-[#4A3F6B] dark:!text-white'>
						<span className='stat'>{completedClue.hints}</span>&nbsp;
						{completedClue.hints === 1 ? 'hint' : 'hints'}
					</span>
					<span className='stat-guesses dark:!bg-[rgb(120,70,45)] dark:!text-white'>
						<span className='stat'>{completedClue.guesses}</span>&nbsp;
						{completedClue.guesses === 1 ? 'guess' : 'guesses'}
					</span>
				</div>
			</>
		)

		const isHovered = hoveredClue === clue.clid
		const isReleaseHovered = hoveredRelease === clue.clid
		const completionText =
			completedClue && completedClue.how === 'g' ? 'Solved' : 'Not solved'

		return (
			<div
				className={`archive-clue${
					!!completedClue && completedClue.how === 'g' ? ' completed' : ''
				} ${
					!!completedClue && completedClue.how === 'g' ? completedClue.how : ''
				}`}
				key={clue.id}
			>
				<div
					className={`archive-release ${
						isReleaseHovered ? 'archive-release-hovered' : ''
					}`}
					style={{
						cursor: 'pointer',
						'--hover-bg': isDarkMode ? '#404040' : '#ddd',
						'--hover-border': isDarkMode ? '#404040' : '#ddd',
						...(completedClue
							? {
									'--archive-bg': isDarkMode
										? completedClue.how === 'g'
											? 'rgb(120, 70, 45)'
											: '#4A3F6B'
										: completedClue.how === 'g'
										? '#FFCBAB'
										: '#eae4ff',
							  }
							: {}),
					}}
					onMouseEnter={() => {
						setHoveredClue(clue.clid)
						setHoveredRelease(clue.clid)
					}}
					onMouseLeave={() => {
						setHoveredClue(null)
						setHoveredRelease(null)
					}}
					onClick={(e) => {
						e.preventDefault()
						e.stopPropagation()
						setHoveredClue(hoveredClue === clue.clid ? null : clue.clid)
					}}
				>
					<span>
						<span>
							{getRelease(clue.release).toLocaleString('en-us', {
								month: 'short',
							})}
						</span>
						&nbsp;
						<span>{getRelease(clue.release).getDate()}</span>
					</span>
					<br></br>
					<span>{getRelease(clue.release).getFullYear()}</span>
				</div>
				<Link
					to={`/clues/${clue.clid}`}
					className='archive-tile-link'
					onClick={() => {
						window.scrollTo(0, 0)
					}}
				>
					<div
						id={clue.id}
						className={`archive-tile border border-[#ddd] dark:!border-[#404040] hover:dark:!bg-neutral-700 hover:dark:!border-neutral-800 `}
						ref={tilesRef.current[index]}
						style={{
							...(isHovered && !!completedClue && completedClue.how === 'g'
								? {
										backgroundColor: isDarkMode
											? 'rgb(120, 70, 45)'
											: '#4A3F6B',
										color: isDarkMode ? 'white' : 'black',
								  }
								: {}),
							...(isReleaseHovered &&
							!!completedClue &&
							completedClue.how === 'g'
								? {
										// For completed clues: match the archive-release color
										backgroundColor: isDarkMode
											? 'rgb(120, 70, 45)'
											: '#FFCBAB',
										color: isDarkMode ? 'white' : 'black',
								  }
								: {}),
							...(isReleaseHovered &&
							(!completedClue || completedClue.how !== 'g')
								? {
										// For incomplete clues: subtle gray background
										backgroundColor: isDarkMode ? '#404040' : '#ddd',
								  }
								: {}),
						}}
					>
						<div className='tile-img-stats'>
							{!isHovered &&
								!!completedClue &&
								completedClue.how === 'g' &&
								stats}
							{!isHovered && (
								<img
									className='tile-difficulty'
									src={getImg(clue.difficulty)}
									title={clue.difficulty}
									aria-label='difficulty'
								/>
							)}
						</div>
						{isHovered ? (
							<div className='tile-info'>
								<span className='text-md'>
									{completionText} • Clue #{clue.clid} • by{' '}
									{clue.source?.value || 'Unknown'}
								</span>
							</div>
						) : (
							<span className='tile-name'>{clue.clue.value}</span>
						)}
					</div>
				</Link>
			</div>
		)
	})

	return (
		<Layout>
			<div className='clues lc-container'>{archiveTiles}</div>
		</Layout>
	)
}

export default Clues

export const query = graphql`
	query {
		allCluesJson {
			nodes {
				clue {
					value
				}
				source {
					value
				}
				difficulty
				release
				clid
				id
			}
		}
	}
`
