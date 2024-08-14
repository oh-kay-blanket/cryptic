import React from 'react'
import ButtonContainer from './ButtonContainer';

const Message = ({ setShowMessage, activeClue, nextHint, setNextHint, nextActiveClue }) => {

	const message = activeClue.hints[nextHint].message
	
	const continueButton = [
		{
			name: 'Continue',
			style: 'gray',
			onClick: function(){
				// console.log(activeClue.hints[nextHint])
				setShowMessage(false)
				setNextHint(nextHint + 1)
			}
		}
	]
	
	const clueEndButton = [
		{
			name: 'Come back later for more',
			style: 'primary',
			onClick: function(){
				// console.log(activeClue.hints[nextHint])
				// setShowMessage(false)
				// setNextHint(0)
				// nextActiveClue(activeClue)
			}
		}
	]
	
	// if current message displaying solution
	const isSolution = activeClue.hints[nextHint].hintType == 'solution'
	
	// choose message button
	let messageButton = isSolution ? clueEndButton : continueButton	
	
	// style message
	let messageStyle = isSolution? 'solution' : 'continue'

	return(
		<div className={`message ${messageStyle}`}>
			<div className={'message-copy'}>{message}</div>
			<ButtonContainer
				btnArr={messageButton}
			/>
		</div>
	)
}

export default Message