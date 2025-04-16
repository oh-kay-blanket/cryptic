import React from "react"

const prepBottom = (activeClue, nextHint, setNextHint, input, setInput, setShowMessage, stats, setStats, addCompletedClue, returnLearn, setReturnLearn, checkAns, setCheckAns, showLogic, setShowLogic) => {
	
	const shareScore = async () => {
		const date = new Date(activeClue.release) // or your clue.date
		const dateFormatted = new Intl.DateTimeFormat('en-US', {
			month: 'long',
			day: 'numeric',
			year: 'numeric',
		}).format(date)

		const perfectEmojis = ['🤩', '🚀', '😎', '💪🏿', '🤯', '🫨', '😻', '🏆', '🪩', '🪅']

		const emoji = (stats.guesses == 1 && stats.hints == 0) ? perfectEmojis[Math.floor(Math.random() * perfectEmojis.length)] : '🎉'

		const scoreText = `Learn Cryptic #${activeClue.clid}\n${dateFormatted}\n${emoji} ${stats.guesses} ${stats.guesses == 1 ? 'guess' : 'guesses'}, ${stats.hints} ${stats.hints == 1 ? 'hint' : 'hints'}\nlearncryptic.com`.trim()

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
			name:'Show hint',
			style: 'secondary',
			onClick: function() {
				setStats(prevStats => ({ ...prevStats, hints: prevStats.hints + 1}))
				setCheckAns(false)
				setShowMessage(true)
			}
		},
		revealSolution: { 
			name:'Reveal solution', 
			style: 'alt', 
			onClick: function() {
				addCompletedClue(activeClue, stats, 'h')
				setStats(prevStats => ({ ...prevStats, hints: prevStats.hints + 1 }))
				setShowMessage(true)
				setInput([])
			} 
		},
		checkAnswer: { 
			name:'Check answer', 
			style: 'primary', 
			onClick: function() {
				let correct = input.join('').toUpperCase() === activeClue.solution.arr.join('').toUpperCase()
				if (correct) {
					addCompletedClue(activeClue, stats, 'g')
					setStats(prevStats => ({ ...prevStats, guesses: prevStats.guesses + 1 }))
				} else {
					setStats(prevStats => ({ ...prevStats, guesses: prevStats.guesses + 1 }))
				}
				setCheckAns(true)
				setShowMessage(true)
			} 
		},
		continue: {
			name: 'Continue',
			style: 'secondary',
			onClick: function(){
				setShowMessage(false)
				!checkAns && setNextHint(nextHint + 1)
				setCheckAns(false)
			} 
		},
		endClueHint: {
			path: '/clues',
			name: 'Play more',
			style: 'secondary',
			onClick: function(){
				setReturnLearn(false)
				setStats({ guesses: 0, hints: 0, how: '' })
			}
		},
		endClueGuess: {
			path: '/clues',
			name: 'Play more',
			style: 'secondary',
			onClick: function(){
				setReturnLearn(false)
				setStats({ guesses: 0, hints: 0, how: '' })
			}
		},
		shareScore: {
			name: `Share score`,
			img: (
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="24"
					height="24"
					fill="none"
					stroke="currentColor"
					strokeWidth="2"
					strokeLinecap="round"
					strokeLinejoin="round"
					viewBox="0 0 24 24"
				>
					<circle cx="6" cy="12" r="2" />
					<circle cx="18" cy="6" r="2" />
					<circle cx="18" cy="18" r="2" />
					<line x1="8" y1="11" x2="16" y2="7" />
					<line x1="8" y1="13" x2="16" y2="17" />
				</svg>
			),
			style: 'secondary',
			onClick: function(){
				shareScore()
			}
		},
		endClueShowLogic: {
			name: 'Show logic',
			style: 'alt',
			onClick: function() {
				setShowLogic(true)
				setCheckAns(false)
				setShowMessage(true)
			}
		},
		nextLogic: {
			name: 'Next',
			style: 'alt',
			onClick: function() {
				setNextHint(nextHint + 1)
				setCheckAns(false)
				setShowMessage(true)
			}
		},
		returnLearn: {
			path: `/learn/${returnLearn}#next`,
			name: 'Return',
			style: 'secondary',
			onClick: function(){
				setReturnLearn(false)
				setStats({ guesses: 0, hints: 0, how: '' })
			}
		}
	}

	let btnArr = [buttons.showHint]
	
	if (activeClue.hints[nextHint].reveals) { btnArr = [buttons.revealSolution] }
	
	if (input.length === activeClue.solution.arr.length) { btnArr.push(buttons.checkAnswer) }

	const isCorrectAns = input.join('').toUpperCase() === activeClue.solution.arr.join('').toUpperCase()
	const isSolution = (activeClue.hints.length - 1 === nextHint) && !checkAns


    return { buttons, btnArr, checkAns, setCheckAns, isSolution, isCorrectAns }
}

export default prepBottom