import React from 'react'
import ButtonContainer from './ButtonContainer';

const Message = ({ setShowMessage, activeClue, nextHint, setNextHint, nextActiveClue, setMode }) => {

	const message = activeClue.hints[nextHint].message
	
	const continueButton = [
		{
			name: 'Continue',
			style: 'gray',
			onClick: function(){
				setShowMessage(false)
				setNextHint(nextHint + 1)
			}
		}
	]
	
	const clueEndButton = [
		{
			name: 'Home',
			style: 'primary',
			onClick: function(){
				setShowMessage(false)
				setNextHint(0)
				setMode('title')
			}
		},
		{
			name: 'Archive',
			style: 'secondary',
			onClick: function(){
				setShowMessage(false)
				setNextHint(0)
				setMode('archive')
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
				isSolution={isSolution}
				stack={isSolution}
			/>
		</div>
	)
}

export default Message