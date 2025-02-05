import React, { useRef } from 'react'
import ButtonContainer from './ButtonContainer';

import getMessage from '../../utils/bottom/getMessage';

const Message = ({ setShowMessage, activeClue, setclueId, nextHint, setNextHint, setMode, input, checkAns, setCheckAns, addCompletedClue, isCorrectAns, isSolution, buttons }) => {

	const msgContainer = useRef()	

	// figure out which text to display
	const message = checkAns ? 
		isCorrectAns ? 
			<><strong>{input.join("").toUpperCase()}</strong> is correct.<br/>Nice work!</> :
			<><strong>{input.join("").toUpperCase()}</strong> is not the correct answer.</> :
			getMessage(activeClue.hints[nextHint])
		

	const explainer = activeClue.hints[nextHint].explainer ? activeClue.hints[nextHint].explainer : false
	
	// choose message button
	let messageButton = isSolution || (checkAns && isCorrectAns) ? [buttons.endClue] : [buttons.continue]
	
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