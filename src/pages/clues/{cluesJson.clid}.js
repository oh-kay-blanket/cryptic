import React, { useContext, useState, useEffect, useRef } from 'react'
import { graphql } from 'gatsby'
import { UserContext } from '../../utils/UserContext'
import Layout from '../../components/layout'
import Bottom from '../../components/Bottom'
import Tooltip from '../../components/Tooltip'
import prepClue from '../../utils/clue/usePrepClue'
import manageClue from '../../utils/clue/useManageClue'
import { isTodayClue } from '../../utils/dateHelpers'

import eyeOpen from '../../assets/img/eye--open.svg'
import eyeClosed from '../../assets/img/eye--closed.svg'
import d1 from '../../assets/img/difficulty/1.svg'
import d2 from '../../assets/img/difficulty/2.svg'
import d3 from '../../assets/img/difficulty/3.svg'
import d4 from '../../assets/img/difficulty/4.svg'

const CluePage = ({ data }) => {
	const dataClue = data.cluesJson
	const [showDifficultyTooltip, setShowDifficultyTooltip] = useState(false)
	const [revealPopupPosition, setRevealPopupPosition] = useState(null)
	const revealPopupRef = useRef(null)

	// Add fixed-page class to prevent scrolling
	useEffect(() => {
		if (typeof window !== 'undefined') {
			document.body.classList.add('fixed-page')
			return () => {
				document.body.classList.remove('fixed-page')
			}
		}
	}, [])

	// Track when users start today's daily clue
	useEffect(() => {
		if (isTodayClue(dataClue) && typeof window.gtag !== 'undefined') {
			window.gtag('event', 'started_daily_clue', {
				clid: dataClue.clid,
				difficulty: dataClue.difficulty,
				streak: streak,
			})
		}
	}, [dataClue.clid, dataClue.release, dataClue.difficulty, streak])

	// Helper functions for difficulty
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

	const getDifficultyText = (difficulty) => {
		switch (Number(difficulty)) {
			case 1:
				return 'Easy'
			case 2:
				return 'Moderate'
			case 3:
				return 'Difficult'
			case 4:
				return 'Very Difficult'
			default:
				return 'Easy'
		}
	}
	const {
		addCompletedClue,
		showType,
		setShowType,
		returnLearn,
		setReturnLearn,
		streak,
	} = useContext(UserContext)

	// Set up activeClue
	let { activeClue } = prepClue(dataClue)
	let {
		stats,
		setStats,
		input,
		setInput,
		handleInput,
		nextHint,
		setNextHint,
		showMessage,
		setShowMessage,
		checkAns,
		setCheckAns,
		showLogic,
		setShowLogic,
		revealedLetters,
		showRevealPrompt,
		setShowRevealPrompt,
		revealPromptIndex,
		handleRevealLetter,
		handleSquareClick,
	} = manageClue(activeClue)

	// Calculate popup position when reveal prompt is shown
	useEffect(() => {
		if (showRevealPrompt && revealPromptIndex !== null) {
			const element = document.getElementById(`i${revealPromptIndex}`)
			if (element) {
				const rect = element.getBoundingClientRect()
				setRevealPopupPosition({
					top: rect.top,
					left: rect.left + rect.width / 2
				})
			}
		} else {
			setRevealPopupPosition(null)
		}
	}, [showRevealPrompt, revealPromptIndex])

	// Close reveal popup when clicking outside
	useEffect(() => {
		if (!showRevealPrompt) return

		const handleClickOutside = (e) => {
			if (revealPopupRef.current && !revealPopupRef.current.contains(e.target)) {
				setShowRevealPrompt(false)
			}
		}

		document.addEventListener('click', handleClickOutside, true)
		return () => document.removeEventListener('click', handleClickOutside, true)
	}, [showRevealPrompt, setShowRevealPrompt])

	// type HTML
	const pillList = activeClue.type.map((t, index) => (
		<li
			key={`type_${index}`}
			className='type-pill tooltip-parent bg-purple-200 dark:!bg-[#4A3F6B] dark:!text-white'
			aria-describedby='tooltip-id'
		>
			{t}
			<Tooltip text={t} />
		</li>
	))

	const typeInsert = showType ? (
		<>
			<li className='eyecon'>
				<button aria-label='Hide type' onClick={() => setShowType(false)}>
					<img src={eyeClosed} alt='' />
				</button>
			</li>
			{pillList}
		</>
	) : (
		<>
			<li className='eyecon'>
				<button onClick={() => setShowType(true)} aria-label='Show type'>
					<img src={eyeOpen} alt='' />
				</button>
			</li>
			<li className='type-text'>
				<button onClick={() => setShowType(true)} aria-label='Expand type'>
					See type
				</button>
			</li>
		</>
	)

	// stats HTML
	const statsInsert = (
		<>
			<div className='clue-stats'>
				<span className='stat-hints dark:!bg-[#4A3F6B] dark:!text-white' data-testid='stat-hints'>
					<span className='stat'>{stats.hints}</span>&nbsp;
					{stats.hints === 1 ? 'hint' : 'hints'}
				</span>
				<span className='stat-guesses dark:!bg-[rgb(120,70,45)] dark:!text-white' data-testid='stat-guesses'>
					<span className='stat'>{stats.guesses}</span>&nbsp;
					{stats.guesses === 1 ? 'guess' : 'guesses'}
				</span>
			</div>
		</>
	)

	// clue HTML
	const clueInsert = activeClue.clue.arr.map((letter, index) => (
		<span
			key={`cluearr_${index}`}
			ref={activeClue.clue.ref.current[index]}
			className='letter'
		>
			{letter}
		</span>
	))

	// addLetters HTML
	let addInsert = []
	activeClue.hints.forEach((hint, parentIndex) => {
		if (
			hint.type === 'indicator' &&
			!!hint.addLetters &&
			!!hint.addLetters.value
		) {
			const lettersInsert = hint.addLetters.value.map((letter, childIndex) => (
				<span
					key={`${parentIndex}_${childIndex}`}
					ref={activeClue.addLetters.ref.current[parentIndex][childIndex]}
					className='letter'
				>
					{letter}
				</span>
			))

			const brCats = [
				'container',
				'reversal',
				'ag-2',
				'lb-2',
				'hw-2',
				'spoonerism',
			]
			const addBr = brCats.includes(hint.category)
			const br = (
				<span key={`br_${parentIndex}`} style={{ flexBasis: '100%' }}></span>
			)

			const addSpoon = hint.category === 'spoonerism'
			const spoon = (
				<>
					<svg
						key={`svg_${parentIndex}`}
						xmlns='http://www.w3.org/2000/svg'
						viewBox='0 0 512 512'
						width='20px'
						height='20px'
						ref={activeClue.spoon}
					>
						<path d='M245.8 220.9c-14.5-17.6-21.8-39.2-21.8-60.8C224 80 320 0 416 0c53 0 96 43 96 96c0 96-80 192-160.2 192c-21.6 0-43.2-7.3-60.8-21.8L54.6 502.6c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L245.8 220.9z' />
					</svg>
					<span style={{ flexBasis: '100%' }}></span>
				</>
			)

			addBr && addInsert.push(br)
			addSpoon && addInsert.push(spoon)
			addInsert.push(
				<span
					key={`${parentIndex}_word`}
					ref={hint.addLetters.wordRef}
					className='word'
				>
					{lettersInsert}&nbsp;
				</span>
			)
		}
	})

	// Find the first empty, non-revealed position for the cursor
	const getCursorPosition = () => {
		for (let i = 0; i < activeClue.solution.arr.length; i++) {
			if ((!input[i] || input[i] === '') && !revealedLetters.includes(i)) {
				return i
			}
		}
		return activeClue.solution.arr.length
	}
	const cursorPosition = showMessage ? -1 : getCursorPosition()

	// solution HTML
	const solInsert = activeClue.solution.arr.map((letter, index) => {
		const isActive = index === cursorPosition
		const isRevealed = revealedLetters.includes(index)
		const isEmpty = !input[index] || input[index] === ''
		const wouldBeLastLetter = revealedLetters.length >= activeClue.solution.arr.length - 1
		const canReveal = isEmpty && !isRevealed && !showMessage && !wouldBeLastLetter

		let cursor = 'default'

		if (canReveal) {
			cursor = 'pointer'
		}

		const squareStyle = {
			borderWidth: '0.75px',
			cursor,
			pointerEvents: canReveal ? 'auto' : 'none',
			...(isActive && { backgroundColor: 'var(--lc-highlight-bg)' })
		}

		return (
			<span
				key={`solarr_${index}`}
				id={`i${index}`}
				className='letter border-neutral-900 dark:!border-white'
				style={squareStyle}
				onClick={() => handleSquareClick(index)}
				onKeyDown={(e) => {
					if (e.key === 'Enter' || e.key === ' ') {
						e.preventDefault()
						handleSquareClick(index)
					}
				}}
				role={canReveal ? 'button' : 'presentation'}
				tabIndex={canReveal ? 0 : -1}
				aria-label={canReveal ? `Reveal letter ${index + 1}` : undefined}
				data-testid={`solution-square-${index}`}
				data-revealed={isRevealed ? 'true' : 'false'}
			>
				<span
					id={`sl${index}`}
					ref={activeClue.solution.ref.current[index]}
					className='solLetter'
				>
					{letter}
				</span>
				<span
					className='typeLetter'
					style={isRevealed ? { color: 'var(--lc-highlight-text)' } : {}}
				>
					{input[index]}
				</span>
			</span>
		)
	})

	// solution length
	const solLength = (
		<span
			id='solLengthRef'
			ref={activeClue.solution.length.ref}
			className='solution-letters'
			data-testid='solution-length'
		>
			&nbsp;{activeClue.solution.length.value}
		</span>
	)

	// source HTML
	const sourceInsert = activeClue.source.href ? (
		<a target='_blank' rel='noreferrer' href={activeClue.source.href}>
			{activeClue.source.value}
		</a>
	) : (
		<span>{activeClue.source.value}</span>
	)

	return (
		<Layout>
			<div className='clue-page'>
				<div id='clue-container' className='clue lc-container' data-testid='clue-container'>
					<ul className='type'>{typeInsert}</ul>
					{statsInsert}
					<div
						id='clueSectionRef'
						ref={activeClue.clue.sectionRef}
						className='clue'
						data-testid='clue-text'
					>
						<div>
							{clueInsert} {solLength}
						</div>
					</div>
					<div className='addLetters'>{addInsert}</div>
					<div style={{ position: 'relative' }} className='sol-section'>
						<div
							id='solSectionRef'
							ref={activeClue.solution.sectionRef}
							className='solution'
						>
							{solInsert}
						</div>
						<div id='sourceRef' ref={activeClue.source.ref} className='source'>
							by {sourceInsert}
						</div>
					</div>
					<div className='clue-difficulty'>
						<button
							className='difficulty-button'
							aria-label={`Difficulty: ${getDifficultyText(
								dataClue.difficulty
							)}`}
							onMouseEnter={() => setShowDifficultyTooltip(true)}
							onMouseLeave={() => setShowDifficultyTooltip(false)}
							onClick={() => setShowDifficultyTooltip(!showDifficultyTooltip)}
							onKeyDown={(e) => {
								if (e.key === 'Enter' || e.key === ' ') {
									e.preventDefault()
									setShowDifficultyTooltip(!showDifficultyTooltip)
								}
							}}
						>
							<img
								className='difficulty-icon'
								src={getImg(dataClue.difficulty)}
								alt={`Difficulty level ${dataClue.difficulty}`}
							/>
						</button>
						{showDifficultyTooltip && (
							<div className='difficulty-tooltip'>
								{getDifficultyText(dataClue.difficulty)}
							</div>
						)}
					</div>
				</div>
				<Bottom
					showMessage={showMessage}
					setShowMessage={setShowMessage}
					nextHint={nextHint}
					setNextHint={setNextHint}
					activeClue={activeClue}
					addCompletedClue={addCompletedClue}
					input={input}
					setInput={setInput}
					handleInput={handleInput}
					checkAns={checkAns}
					setCheckAns={setCheckAns}
					stats={stats}
					setStats={setStats}
					returnLearn={returnLearn}
					setReturnLearn={setReturnLearn}
					showLogic={showLogic}
					setShowLogic={setShowLogic}
					revealedLetters={revealedLetters}
				/>
			</div>

			{showRevealPrompt && revealPromptIndex !== null && revealPopupPosition && (
				<div
					ref={revealPopupRef}
					className='reveal-popup'
					style={{
						position: 'fixed',
						top: revealPopupPosition.top - 10,
						left: revealPopupPosition.left,
						transform: 'translate(-50%, -100%)',
						zIndex: 100,
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'center',
						padding: '0.75rem 1rem 0.5rem'
					}}
					role='dialog'
					aria-modal='true'
					aria-labelledby='reveal-letter-title'
				>
					<p id='reveal-letter-title' style={{ margin: '0 0 0.5rem 0', fontSize: '0.8rem' }}>Reveal letter?</p>
					<button
						className='bg-purple-200 dark:!bg-[#4A3F6B] dark:!text-white'
						style={{ padding: '0.35rem 0.75rem', borderRadius: '50px', border: 'none', cursor: 'pointer', fontSize: '0.8rem' }}
						onClick={() => handleRevealLetter(revealPromptIndex)}
						data-testid='modal-reveal-confirm'
					>
						Reveal
					</button>
					<div className='popup-arrow' />
				</div>
			)}
		</Layout>
	)
}

export const query = graphql`
	query ($id: String) {
		cluesJson(id: { eq: $id }) {
			id
			clid
			clue {
				value
			}
			release
			difficulty
			dow
			type
			definition
			hints {
				category
				value
				explainer
				end {
					value
				}
			}
			solution {
				value
			}
			source {
				value
			}
		}
	}
`

export default CluePage

export const Head = ({ data }) => {
	const clue = data.cluesJson
	const clueDate = new Date(clue.release).toLocaleDateString('en-US', {
		year: 'numeric',
		month: 'long',
		day: 'numeric'
	})
	
	return (
		<>
			<title>{`Cryptic Clue #${clue.clid} - ${clueDate} | Learn Cryptic`}</title>
			<meta name="description" content={`Solve today's cryptic crossword clue: "${clue.clue.value}". Interactive hints and explanations to help you learn cryptic crossword techniques.`} />
			<link rel="canonical" href={`https://learncryptic.com/clues/${clue.clid}`} />
			<script type="application/ld+json">
				{JSON.stringify({
					"@context": "https://schema.org",
					"@type": "Question",
					"name": `Cryptic Clue #${clue.clid}`,
					"text": clue.clue.value,
					"datePublished": clue.release,
					"author": {
						"@type": "Organization",
						"name": "Learn Cryptic"
					},
					"acceptedAnswer": {
						"@type": "Answer",
						"text": clue.solution.value
					},
					"difficulty": clue.difficulty,
					"about": {
						"@type": "Thing",
						"name": "Cryptic Crossword",
						"description": "A type of crossword puzzle where each clue is a word puzzle in itself"
					}
				})}
			</script>
		</>
	)
}
