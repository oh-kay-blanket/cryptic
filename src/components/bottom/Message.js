import React from 'react'
import ButtonContainer from '../ButtonContainer';

const Message = ({ setShowMessage, activeClue, setclueId, nextHint, setNextHint, setMode, input, checkAns, setCheckAns, addCompletedClue }) => {

	const isCorrectAns = () => {
		return input.join('').toLowerCase() === activeClue.solution.arr.join('').toLowerCase()
	}

	// figure out which text to display
	const message = checkAns ? 
		isCorrectAns() ? 
			`<strong>${input.join("")}</strong> is correct.<br>Nice work!` :
			`<strong>${input.join("")}</strong> is not the correct answer.` :
		activeClue.hints[nextHint].message
	
	const continueButton = [
		{
			name: 'Continue',
			style: 'secondary',
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
				setclueId(false)
				setMode('archive')
			}
		}
	]
	
	// if current message displaying solution
	const isSolution = activeClue.hints[nextHint].type == 'solution' && !checkAns
	
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
			<div className={'message-copy'} dangerouslySetInnerHTML={{__html: message}}/>
			<ButtonContainer
				btnArr={messageButton}
				isSolution={isSolution}
				stack={isSolution}
			/>
		</div>
	)
}

export default Message