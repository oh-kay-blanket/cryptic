import React from 'react'

import ButtonContainer from './ButtonContainer'
import Keyboard from './Keyboard'
import Message from './Message'

const Bottom = ({ showMessage, setShowMessage, btnArr, activeClue, nextHint, setNextHint, setMode, addCompletedClue, handleInput, setInput }) => {

	const reavealSolutionButton = [
		{ 
			name:'Reveal solution', 
			style: 'alt', 
			onClick: function() {
				setShowMessage(true)
				addCompletedClue(activeClue.id)
				setInput([])
			} 
		}
	]
	
	btnArr = activeClue.hints[nextHint].hintType == 'solution' ? reavealSolutionButton : btnArr

	return(
		<div className='bottom'>
			<div className='container'>				
				{showMessage ? 
					<Message
						setShowMessage={setShowMessage}
						activeClue={activeClue}
						nextHint={nextHint}
						setNextHint={setNextHint}
						setMode={setMode}
					/> :
					<>
						<ButtonContainer
							btnArr={btnArr}
						/>
						<Keyboard
							handleInput={handleInput}
						/>
					</>
				}
			</div>
		</div>
	)
}

export default Bottom;