import React, { useRef } from 'react'
import ButtonContainer from './ButtonContainer'

import getMessage from '../../utils/bottom/getMessage'

const Message = ({
	activeClue,
	nextHint,
	input,
	checkAns,
	isCorrectAns,
	isSolution,
	returnLearn,
	buttons,
	showLogic,
	setShowLogic,
}) => {
	const msgContainer = useRef()

	// figure out which text to display
	const message = checkAns ? (
		isCorrectAns ? (
			<div data-testid='message-success'>
				<strong>{input.join('').toUpperCase()}</strong> is correct.
				<br />
				Nice work!
			</div>
		) : (
			<div data-testid='message-error'>
				<strong>{input.join('').toUpperCase()}</strong> is not the correct
				answer.
			</div>
		)
	) : (
		getMessage(activeClue.hints[nextHint])
	)

	const explainer = activeClue.hints[nextHint].explainer
		? activeClue.hints[nextHint].explainer
		: false

	// Prep message button
	let messageButton

	const checkIsTodayClue = (activeClue) => {
		const date1 = new Date(activeClue.release)
		const date2 = new Date()

		// Strip time part by setting hours, minutes, seconds, and milliseconds to zero
		const d1 = new Date(date1.getFullYear(), date1.getMonth(), date1.getDate())
		const d2 = new Date(date2.getFullYear(), date2.getMonth(), date2.getDate())

		return d1.getTime() === d2.getTime()
	}
	const isTodayClue = checkIsTodayClue(activeClue)

	// Completed with returnLearn == true
	if (isSolution && returnLearn) {
		messageButton = [buttons.returnLearn]

		// Completed with returnLearn == true
	} else if (checkAns && isCorrectAns && returnLearn) {
		messageButton = [buttons.endClueShowLogic, buttons.returnLearn]

		// Completed with guess and finished logic && today's clue
	} else if (isSolution && showLogic && isTodayClue) {
		messageButton = [buttons.shareScore, buttons.endClueHint]

		// Completed with guess and finished logic &&  is not today's clue
	} else if (isSolution && showLogic && !isTodayClue) {
		messageButton = [buttons.endClueHint]

		// Completed with guess, more clues && today's clue
	} else if (checkAns && isCorrectAns && isTodayClue) {
		messageButton = [
			buttons.endClueShowLogic,
			buttons.shareScore,
			buttons.endClueGuess,
		]

		// Completed with guess, more clues && is not today's clue
	} else if (checkAns && isCorrectAns && !isTodayClue) {
		messageButton = [buttons.endClueShowLogic, buttons.endClueGuess]

		// Continue showing logic
	} else if (showLogic && !activeClue.hints[nextHint].reveals) {
		messageButton = [buttons.nextLogic]

		// Completed with hint, more clues
	} else if (isSolution && !showLogic) {
		messageButton = [buttons.endClueHint]

		// Not complete, continue with game
	} else {
		messageButton = [buttons.continue]
	}

	// style message
	let messageStyle = isSolution
		? 'solution'
		: checkAns && isCorrectAns
		? 'is-correct-ans'
		: 'continue'

	return (
		<div className={`message ${messageStyle} bg-white dark:!bg-neutral-800 dark:!text-neutral-100`} ref={msgContainer}>
			{message && (
				<div className={'message-copy lc-container'}>
					{message}
					{explainer && (!checkAns || isCorrectAns) && <div className={'explainer'}>{explainer}</div>}
				</div>
			)}

			<ButtonContainer
				btnArr={messageButton}
				isSolution={isSolution}
				stack={isSolution}
			/>
		</div>
	)
}

export default Message
