import React from 'react'
import { isTodayClue, formatTimeForShare } from '../dateHelpers'

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
	setClueSolvedTime = null,
	clueSolvedTime = null
) => {
	// Check if this is today's clue
	const isTodaysClue = () => isTodayClue(activeClue)
	const shareScore = async (solveTime = null) => {
		// Build stats line - prioritize stats over metadata
		const guessText = `${stats.guesses} ${stats.guesses === 1 ? 'guess' : 'guesses'}`
		const hintText = `${stats.hints} ${stats.hints === 1 ? 'hint' : 'hints'}`
		const timeText = solveTime != null ? formatTimeForShare(solveTime) : null

		const statsLine = timeText
			? `${timeText} ${guessText} ${hintText}`
			: `${guessText} ${hintText}`

		const scoreText = `${statsLine}\nLearn Cryptic #${activeClue.clid}\nlearncryptic.com`

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

	// Icon components
	const hintIcon = (
		<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round' viewBox='0 0 24 24'>
			<path d='M9 18h6' />
			<path d='M10 22h4' />
			<path d='M15.09 14c.18-.98.65-1.74 1.41-2.5A4.65 4.65 0 0 0 18 8 6 6 0 0 0 6 8c0 1 .23 2.23 1.5 3.5A4.61 4.61 0 0 1 8.91 14' />
		</svg>
	)

	const checkIcon = (
		<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='none' stroke='currentColor' strokeWidth='2.5' strokeLinecap='round' strokeLinejoin='round' viewBox='0 0 24 24'>
			<polyline points='20 6 9 17 4 12' />
		</svg>
	)

	const arrowRightIcon = (
		<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round' viewBox='0 0 24 24'>
			<line x1='5' y1='12' x2='19' y2='12' />
			<polyline points='12 5 19 12 12 19' />
		</svg>
	)

	const refreshIcon = (
		<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round' viewBox='0 0 24 24'>
			<polyline points='23 4 23 10 17 10' />
			<path d='M20.49 15a9 9 0 1 1-2.12-9.36L23 10' />
		</svg>
	)

	const eyeIcon = (
		<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round' viewBox='0 0 24 24'>
			<path d='M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z' />
			<circle cx='12' cy='12' r='3' />
		</svg>
	)

	const listIcon = (
		<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='currentColor' viewBox='0 0 24 24'>
			<rect x='3' y='3' width='3' height='3' rx='1' />
			<rect x='3' y='10.5' width='3' height='3' rx='1' />
			<rect x='3' y='18' width='3' height='3' rx='1' />
			<rect x='8' y='3' width='13' height='3' rx='1' />
			<rect x='8' y='10.5' width='13' height='3' rx='1' />
			<rect x='8' y='18' width='13' height='3' rx='1' />
		</svg>
	)

	const shareIcon = (
		<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round' viewBox='0 0 24 24'>
			<circle cx='6' cy='12' r='2' />
			<circle cx='18' cy='6' r='2' />
			<circle cx='18' cy='18' r='2' />
			<line x1='8' y1='11' x2='16' y2='7' />
			<line x1='8' y1='13' x2='16' y2='17' />
		</svg>
	)

	// buttons
	const buttons = {
		showHint: {
			name: 'Show hint',
			style: 'secondary',
			img: hintIcon,
			onClick: function () {
				setStats((prevStats) => ({ ...prevStats, hints: prevStats.hints + 1 }))
				setCheckAns(false)
				setShowMessage(true)
			},
		},
		revealSolution: {
			name: 'Reveal solution',
			style: 'alt',
			img: eyeIcon,
			onClick: function () {
				// addCompletedClue(activeClue, stats, 'h')
				// setStats((prevStats) => ({ ...prevStats, hints: prevStats.hints + 1 }))
				setShowMessage(true)
				setInput([])
			},
		},
		checkAnswer: {
			name: 'Check',
			style: 'primary',
			img: checkIcon,
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
						solveTime: solveTime,
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
			img: arrowRightIcon,
			onClick: function () {
				setShowMessage(false)
				!checkAns && setNextHint(nextHint + 1)
				setCheckAns(false)
			},
		},
		tryAgain: {
			name: 'Try again',
			style: 'secondary',
			img: refreshIcon,
			onClick: function () {
				setShowMessage(false)
				setCheckAns(false)
			},
		},
		endClueHint: {
			path: '/clues',
			name: 'More clues',
			img: listIcon,
			style: 'secondary',
			onClick: function () {
				setReturnLearn(false)
				setStats({ guesses: 0, hints: 0, how: '' })
			},
		},
		endClueGuess: {
			path: '/clues',
			name: 'More clues',
			img: listIcon,
			style: 'secondary',
			onClick: function () {
				setReturnLearn(false)
				setStats({ guesses: 0, hints: 0, how: '' })
			},
		},
		shareScore: {
			name: 'Share',
			img: shareIcon,
			style: 'secondary',
			onClick: function () {
				// Use the stored solve time from when the clue was solved, not the current time
				shareScore(clueSolvedTime)
			},
		},
		endClueShowLogic: {
			name: 'Show logic',
			img: hintIcon,
			style: 'secondary',
			onClick: function () {
				setShowLogic(true)
				setCheckAns(false)
				setShowMessage(true)
			},
		},
		nextLogic: {
			name: 'Next',
			img: arrowRightIcon,
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
			img: arrowRightIcon,
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
