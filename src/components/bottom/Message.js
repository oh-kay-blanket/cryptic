import React from 'react'
import ButtonContainer from './ButtonContainer';

const Message = ({ setShowMessage, activeClue, nextHint, setNextHint, setMode, input, checkAns, setCheckAns, addCompletedClue }) => {

	const isCorrectAns = () => {
		return input.join('').toLowerCase() === activeClue.solArr.join('').toLowerCase()
	}

	// figure out which text to display
	const message = checkAns ? 
		isCorrectAns() ? 
			`"${input.join("")}" is the correct answer. Nice work!` :
			`"${input.join("")}" is not the correct answer.` :
		activeClue.hints[nextHint].message
	
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
			name: 'Play more',
			style: isCorrectAns() ? 'gray' : 'primary',
			onClick: function(){
				addCompletedClue(activeClue.id)
				setShowMessage(false)
				setNextHint(0)
				setMode('archive')
			}
		}
	]
	
	// if current message displaying solution
	const isSolution = activeClue.hints[nextHint].hintType == 'solution' && !checkAns
	
	// choose message button
	let messageButton = isSolution || (checkAns && isCorrectAns()) ? clueEndButton : continueButton
	
	// style message
	let messageStyle = isSolution ? 
		'solution' :
		checkAns && isCorrectAns() ?
			'is-correct-ans' :
			'continue'

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