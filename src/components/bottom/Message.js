import React from 'react'
import ButtonContainer from './ButtonContainer';

const Message = ({ setShowMessage, activeClue, nextHint, setNextHint, setMode, input, checkAns, setCheckAns }) => {

	const checkAnsFn = (input, activeClue) => {
		return input.join('').toLowerCase() === activeClue.solArr.join('').toLowerCase() ? "You got it. Nice work!" : `"${input.join("")}" is not the correct answer.`
	}

	const message = checkAns ? checkAnsFn(input, activeClue) : activeClue.hints[nextHint].message
	
	const continueButton = [
		{
			name: 'Continue',
			style: 'gray',
			onClick: function(){
				setShowMessage(false)
				!checkAns && setNextHint(nextHint + 1)
				setCheckAns(false)
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
	const isSolution = activeClue.hints[nextHint].hintType == 'solution' && !checkAns
	
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