import React from 'react'
import { isTodayClue, formatTime } from '../dateHelpers'

const prepBottom = (
	activeClue,
	nextHint,
	setNextHint,
	input,
	setInput,
	setShowMessage,
	stats,
	setStats,
	addCompletedClue,
	returnLearn,
	setReturnLearn,
	checkAns,
	setCheckAns,
	showLogic,
	setShowLogic,
	revealedLetters = [],
	getSolveTime = null,
	setClueSolvedTime = null
) => {
	// Check if this is today's clue
	const isTodaysClue = () => isTodayClue(activeClue)
	const shareScore = async (solveTime = null) => {
		const date = new Date(activeClue.release)
		const dateFormatted = new Intl.DateTimeFormat('en-US', {
			month: 'short',
			day: 'numeric',
		}).format(date)

		const perfectEmojis = [
			'🤩',
			'🚀',
			'😎',
			'💪🏿',
			'🤯',
			'🫨',
			'😻',
			'🏆',
			'🪩',
			'🪅',
		]

		const emoji =
			stats.guesses === 1 && stats.hints === 0
				? perfectEmojis[Math.floor(Math.random() * perfectEmojis.length)]
				: '🎉'

		// Build stats line - prioritize stats over metadata
		const guessText = `${stats.guesses} ${stats.guesses === 1 ? 'guess' : 'guesses'}`
		const hintText = `${stats.hints} ${stats.hints === 1 ? 'hint' : 'hints'}`
		const timeText = solveTime != null ? formatTime(solveTime) : null

		const statsLine = timeText
			? `${emoji} ${guessText} • ${hintText} • ${timeText}`
			: `${emoji} ${guessText} • ${hintText}`

		const scoreText = `${statsLine}\nLearn Cryptic #${activeClue.clid} • ${dateFormatted}\nlearncryptic.com`

		const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent)

		if (isMobile && navigator.share) {
			try {
				await navigator.share({
					title: 'Clue Score',
					text: scoreText,
				})
				console.log('Shared successfully')
			} catch (err) {
				if (err.name !== 'AbortError') {
					console.error('Share failed:', err)
					alert('Could not share your score.')
				}
			}
		} else {
			// Desktop or fallback
			try {
				await navigator.clipboard.writeText(scoreText)
				alert('Score copied to clipboard!')
			} catch (err) {
				console.error('Clipboard copy failed:', err)
				alert('Could not copy your score.')
			}
		}
	}

	// buttons
	const buttons = {
		showHint: {
			name: 'Show hint',
			style: 'secondary',
			onClick: function () {
				setStats((prevStats) => ({ ...prevStats, hints: prevStats.hints + 1 }))
				setCheckAns(false)
				setShowMessage(true)
			},
		},
		revealSolution: {
			name: 'Reveal solution',
			style: 'alt',
			onClick: function () {
				// addCompletedClue(activeClue, stats, 'h')
				// setStats((prevStats) => ({ ...prevStats, hints: prevStats.hints + 1 }))
				setShowMessage(true)
				setInput([])
			},
		},
		checkAnswer: {
			name: 'Check answer',
			style: 'primary',
			onClick: function () {
				let correct =
					input.join('').toUpperCase() ===
					activeClue.solution.arr.join('').toUpperCase()
				if (correct) {
					const solveTime = getSolveTime ? getSolveTime() : null
					addCompletedClue(activeClue, stats, 'g', solveTime)
					// Stop the timer by setting the final solve time
					if (setClueSolvedTime && solveTime != null) {
						setClueSolvedTime(solveTime)
					}
					setStats((prevStats) => ({
						...prevStats,
						guesses: prevStats.guesses + 1,
					}))
					// Show source when correctly guessed
					if (activeClue.source?.ref?.current) {
						activeClue.source.ref.current.classList.add('show')
					}
				} else {
					setStats((prevStats) => ({
						...prevStats,
						guesses: prevStats.guesses + 1,
					}))
				}
				setCheckAns(true)
				setShowMessage(true)
			},
		},
		continue: {
			name: 'Continue',
			style: 'primary',
			onClick: function () {
				setShowMessage(false)
				!checkAns && setNextHint(nextHint + 1)
				setCheckAns(false)
			},
		},
		tryAgain: {
			name: 'Try again',
			style: 'secondary',
			onClick: function () {
				setShowMessage(false)
				setCheckAns(false)
			},
		},
		endClueHint: {
			path: '/clues',
			name: 'Play more',
			img: (
				<svg
					xmlns='http://www.w3.org/2000/svg'
					width='24'
					height='24'
					fill='currentColor'
					viewBox='0 0 24 24'
				>
					<rect x='3' y='3' width='3' height='3' rx='1' />
					<rect x='3' y='10.5' width='3' height='3' rx='1' />
					<rect x='3' y='18' width='3' height='3' rx='1' />
					<rect x='8' y='3' width='13' height='3' rx='1' />
					<rect x='8' y='10.5' width='13' height='3' rx='1' />
					<rect x='8' y='18' width='13' height='3' rx='1' />
				</svg>
			),
			style: 'secondary',
			onClick: function () {
				setReturnLearn(false)
				setStats({ guesses: 0, hints: 0, how: '' })
			},
		},
		endClueGuess: {
			path: '/clues',
			name: 'Play more',
			img: (
				<svg
					xmlns='http://www.w3.org/2000/svg'
					width='24'
					height='24'
					fill='currentColor'
					viewBox='0 0 24 24'
				>
					<rect x='3' y='3' width='3' height='3' rx='1' />
					<rect x='3' y='10.5' width='3' height='3' rx='1' />
					<rect x='3' y='18' width='3' height='3' rx='1' />
					<rect x='8' y='3' width='13' height='3' rx='1' />
					<rect x='8' y='10.5' width='13' height='3' rx='1' />
					<rect x='8' y='18' width='13' height='3' rx='1' />
				</svg>
			),
			style: 'secondary',
			onClick: function () {
				setReturnLearn(false)
				setStats({ guesses: 0, hints: 0, how: '' })
			},
		},
		shareScore: {
			name: `Share score`,
			img: (
				<svg
					xmlns='http://www.w3.org/2000/svg'
					width='24'
					height='24'
					fill='none'
					stroke='currentColor'
					strokeWidth='2'
					strokeLinecap='round'
					strokeLinejoin='round'
					viewBox='0 0 24 24'
				>
					<circle cx='6' cy='12' r='2' />
					<circle cx='18' cy='6' r='2' />
					<circle cx='18' cy='18' r='2' />
					<line x1='8' y1='11' x2='16' y2='7' />
					<line x1='8' y1='13' x2='16' y2='17' />
				</svg>
			),
			style: 'secondary',
			onClick: function () {
				const solveTime = getSolveTime ? getSolveTime() : null
				shareScore(solveTime)
			},
		},
		endClueShowLogic: {
			name: 'Show logic',
			img: (
				<svg
					xmlns='http://www.w3.org/2000/svg'
					width='24'
					height='24'
					fill='none'
					stroke='currentColor'
					strokeWidth='2'
					strokeLinecap='round'
					strokeLinejoin='round'
					viewBox='0 0 24 24'
				>
					<path d='M9 18h6' />
					<path d='M10 22h4' />
					<path d='M15.09 14c.18-.98.65-1.74 1.41-2.5A4.65 4.65 0 0 0 18 8 6 6 0 0 0 6 8c0 1 .23 2.23 1.5 3.5A4.61 4.61 0 0 1 8.91 14' />
				</svg>
			),
			style: 'secondary',
			onClick: function () {
				setShowLogic(true)
				setCheckAns(false)
				setShowMessage(true)
			},
		},
		nextLogic: {
			name: 'Next',
			style: 'secondary',
			onClick: function () {
				setNextHint(nextHint + 1)
				setCheckAns(false)
				setShowMessage(true)
			},
		},
		returnLearn: {
			path: `/learn/${returnLearn}#next`,
			name: 'Return',
			style: 'secondary',
			onClick: function () {
				setReturnLearn(false)
				setStats({ guesses: 0, hints: 0, how: '' })
			},
		},
	}

	// No buttons needed - hint icon with confirmation handles reveal
	let btnArr = []

	// Check if all positions are filled (either typed or revealed)
	const allPositionsFilled = activeClue.solution.arr.every((_, index) => {
		return input[index] && input[index] !== ''
	})

	const isCorrectAns =
		input.join('').toUpperCase() ===
		activeClue.solution.arr.join('').toUpperCase()
	const isSolution = activeClue.hints.length - 1 === nextHint && !checkAns

	return { buttons, btnArr, checkAns, setCheckAns, isSolution, isCorrectAns, allPositionsFilled, checkAnswer: buttons.checkAnswer.onClick }
}

export default prepBottom
