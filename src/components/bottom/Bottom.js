import React from 'react'

import ButtonContainer from './ButtonContainer'
import Keyboard from './Keyboard'
import Message from './Message'

const Bottom = ({ showMessage, setShowMessage, btnArr, activeClue, nextHint, setNextHint, nextActiveClue, setMode, addCompletedClue }) => {

	const reavealSolutionButton = [
		{ 
			name:'Reveal solution', 
			style: 'alt', 
			onClick: function() {
				setShowMessage(true)
				addCompletedClue(activeClue.id)
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
						nextActiveClue={nextActiveClue}
						setMode={setMode}
					/> :
					<>
						<ButtonContainer
							btnArr={btnArr}
						/>
						<Keyboard />
					</>
				}
			</div>
		</div>
	)
}

export default Bottom;