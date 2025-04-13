import React, { useRef } from 'react'
import ButtonContainer from './ButtonContainer';

import getMessage from '../../utils/bottom/getMessage';

const Message = ({ activeClue, nextHint, input, checkAns, isCorrectAns, isSolution, returnLearn, buttons, showLogic, setShowLogic }) => {

	const msgContainer = useRef()	

	// figure out which text to display
	const message = checkAns ? 
		isCorrectAns ? 
			<><strong>{input.join("").toUpperCase()}</strong> is correct.<br/>Nice work!</> :
			<><strong>{input.join("").toUpperCase()}</strong> is not the correct answer.</> :
			getMessage(activeClue.hints[nextHint])
		

	const explainer = activeClue.hints[nextHint].explainer ? activeClue.hints[nextHint].explainer : false
	
	// choose message button
	// let messageButton = isSolution ? [buttons.endClueHint] : checkAns && isCorrectAns ? [buttons.endClueGuess] : [buttons.continue]

	let messageButton; 

	// Completed with hint, more clues
	if (isSolution) {
		messageButton = [buttons.endClueHint]
	
	// Completed with guess, more clues
	} else if (checkAns && isCorrectAns) {
		messageButton = [buttons.endClueShowLogic, buttons.endClueGuess]

	// Completed with returnLearn == true
	} else if ((isSolution || (checkAns && isCorrectAns)) && returnLearn) {
		messageButton = [buttons.endClueShowLogic, buttons.returnLearn]
	
	// Continue showing logic
	} else if (showLogic && !activeClue.hints[nextHint].reveals) {
		messageButton = [buttons.nextLogic]
		
	// Not complete, continue with game
	} else {
		messageButton = [buttons.continue]
	}
	
	// style message
	let messageStyle = isSolution ? 
		'solution' :
		checkAns && isCorrectAns ?
			'is-correct-ans' :
			'continue'

	return(
		<div className={`message ${messageStyle}`} ref={msgContainer}>
			{message && <div className={'message-copy container'}>
				{message}
				{explainer && <div className={'explainer'}>{explainer}</div>}
			</div>}
			
			<ButtonContainer
				btnArr={messageButton}
				isSolution={isSolution}
				stack={isSolution}
			/>
		</div>
	)
}

export default Message