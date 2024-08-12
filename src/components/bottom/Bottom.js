import React from 'react'

import Input from './Input'
import ButtonContainer from './ButtonContainer'
import Keyboard from './Keyboard'
import Message from './Message'

const Bottom = ({ showMessage, setShowMessage, btnArr, activeClue, nextHint, setNextHint, nextActiveClue }) => {

	const reavealSolutionButton = [
		{ 
			name:'Reveal solution', 
			style: 'alt', 
			onClick: function() {
				setShowMessage(true)
			} 
		}
	]

	console.log(activeClue.hints[nextHint].hintType)
	
	btnArr = activeClue.hints[nextHint].hintType == 'solution' ? reavealSolutionButton : btnArr

	return(
		<div className='bottom'>
			<div className='container'>
				<Input />
				<ButtonContainer
					btnArr={btnArr}
				/>
				<Keyboard />
				{showMessage && 
					<Message
						setShowMessage={setShowMessage}
						activeClue={activeClue}
						nextHint={nextHint}
						setNextHint={setNextHint}
						nextActiveClue={nextActiveClue}
					/>
				}
			</div>
		</div>
	)
}

export default Bottom;