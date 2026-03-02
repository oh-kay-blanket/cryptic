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

	// Hand-drawn icon components
	const hintIcon = (
		<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='1.5' strokeLinecap='round'>
			<path d='M9.1 17.9c2-.1 3.9.1 5.9-.1' />
			<path d='M10.2 21.8c1.2.1 2.5-.1 3.7.1' />
			<path d='M15.2 14.1c.2-1 .7-1.8 1.5-2.6.9-.9 1.4-2.1 1.4-3.4 0-2.8-2.4-5.2-5.3-5.6-2.9-.4-5.6 1.4-6.4 4.1-.5 1.7-.1 3.5 1 4.9.8 1 1.3 1.8 1.5 2.6' />
		</svg>
	)

	const checkIcon = (
		<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2.5' strokeLinecap='round'>
			<path d='M4.1 12.2c1.6 1.5 3.1 3.2 4.7 4.8 3.7-3.8 7.5-7.5 11.2-11.3' />
		</svg>
	)

	const arrowRightIcon = (
		<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='1.5' strokeLinecap='round'>
			<path d='M5.2 12.1c4.5-.1 9 .1 13.5-.1' />
			<path d='M12.8 5.2c2 2.2 4.1 4.4 6.1 6.6-2.1 2.3-4.2 4.5-6.3 6.8' />
		</svg>
	)

	const refreshIcon = (
		<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='1.5' strokeLinecap='round'>
			<path d='M22.8 4.2c.1 1.8-.1 3.7.1 5.5-1.8.1-3.7-.1-5.5.1' />
			<path d='M20.2 15.1c-1.2 2.4-3.3 4.2-5.8 5-2.6.8-5.4.5-7.8-.8-2.4-1.3-4.1-3.5-4.8-6.1-.7-2.6-.3-5.4 1.1-7.7 1.4-2.3 3.7-3.9 6.3-4.5 2.1-.5 4.4-.3 6.3.6 1.6.7 3 1.9 4.1 3.3.8 1 2 2.4 3.2 4.8' />
		</svg>
	)

	const eyeIcon = (
		<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='1.5' strokeLinecap='round'>
			<path d='M2.2 12.1c1.8-2.4 4.1-4.5 6.8-5.8 1.9-.9 4.1-1.3 6.2-1 2.1.3 4.1 1.2 5.8 2.6 1.4 1.2 2.6 2.6 3.5 4.2-1.7 2.3-3.9 4.3-6.5 5.6-2 1-4.2 1.4-6.4 1.1-2.1-.3-4.1-1.2-5.8-2.5-1.4-1.2-2.7-2.6-3.6-4.2' />
			<path d='M12.1 8.2c1.1.1 2.1.6 2.8 1.4.7.8 1.1 1.8 1 2.9-.1 1-.5 2-1.3 2.7-.8.7-1.8 1.1-2.9 1-1-.1-2-.5-2.7-1.3-.7-.8-1-1.8-.9-2.9.1-1 .6-1.9 1.3-2.6.8-.7 1.7-1.1 2.7-1.2' />
		</svg>
	)

	const listIcon = (
		<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none'>
			<path d='M3.5 4.8c.6-.2 1.3.2 1.5.8.3.6 0 1.3-.5 1.6-.6.3-1.3.1-1.6-.5-.4-.6-.1-1.4.6-1.9' fill='currentColor' />
			<path d='M3.6 11.4c.6-.2 1.3.1 1.6.6.3.6.1 1.3-.4 1.7-.6.3-1.3.1-1.7-.5-.3-.6-.1-1.3.5-1.8' fill='currentColor' />
			<path d='M3.5 17.8c.6-.2 1.3.1 1.6.7.3.6 0 1.3-.5 1.6-.6.3-1.3 0-1.6-.6-.3-.6 0-1.3.5-1.7' fill='currentColor' />
			<path d='M8.2 5.9c4.4.1 8.8-.1 13.2.1' stroke='currentColor' strokeWidth='2.5' strokeLinecap='round' />
			<path d='M8.1 12.1c4.4-.1 8.9.1 13.3-.1' stroke='currentColor' strokeWidth='2.5' strokeLinecap='round' />
			<path d='M8.2 18.2c4.4.1 8.8-.1 13.2.1' stroke='currentColor' strokeWidth='2.5' strokeLinecap='round' />
		</svg>
	)

	const shareIcon = (
		<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round'>
			<path d='M17.8 4.2c.5-.2 1 0 1.4.3.4.4.6.9.5 1.4-.1.5-.5 1-1 1.2-.5.2-1.1.1-1.5-.3-.4-.4-.5-.9-.4-1.5.1-.5.5-.9 1-1.1' fill='currentColor'/>
			<path d='M17.9 17.1c.5-.1 1 .1 1.4.4.4.4.5.9.4 1.4-.2.5-.6.9-1.1 1.1-.5.1-1.1 0-1.4-.4-.4-.4-.5-1-.3-1.5.2-.5.5-.9 1-1' fill='currentColor'/>
			<path d='M5.8 10.2c.5-.2 1.1 0 1.4.4.4.4.5 1 .3 1.5-.2.5-.6.9-1.1 1-.5.2-1.1 0-1.5-.4-.3-.4-.4-1-.2-1.5.2-.5.6-.9 1.1-1' fill='currentColor'/>
			<path d='M7.9 10.8c2.8-1.4 5.7-2.9 8.5-4.3'/>
			<path d='M7.8 13.1c2.9 1.5 5.8 2.8 8.7 4.2'/>
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
