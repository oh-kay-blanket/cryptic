import React, { useRef } from 'react'
import ButtonContainer from './ButtonContainer';

import getMessage from '../../utils/bottom/getMessage';

const Message = ({ activeClue, nextHint, input, checkAns, isCorrectAns, isSolution, returnLearn, buttons }) => {

	const msgContainer = useRef()	

	// figure out which text to display
	const message = checkAns ? 
		isCorrectAns ? 
			<><strong>{input.join("").toUpperCase()}</strong> is correct.<br/>Nice work!</> :
			<><strong>{input.join("").toUpperCase()}</strong> is not the correct answer.</> :
			getMessage(activeClue.hints[nextHint])
		

	const explainer = activeClue.hints[nextHint].explainer ? activeClue.hints[nextHint].explainer : false
	
	// choose message button
	let messageButton = isSolution ? [buttons.endClueHint] : checkAns && isCorrectAns ? [buttons.endClueGuess] : [buttons.continue]

	if (returnLearn && (isSolution || checkAns && isCorrectAns)) {
		messageButton = [buttons.returnLearn]
	}
	
	// style message
	let messageStyle = isSolution ? 
		'solution' :
		checkAns && isCorrectAns ?
			'is-correct-ans' :
			'continue'

	return(
		<div className={`message ${messageStyle}`} ref={msgContainer}>
			{message && <div className={'message-copy'}>
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