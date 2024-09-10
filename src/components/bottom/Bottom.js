import React from 'react'

import ButtonContainer from '../ButtonContainer'
import Keyboard from './Keyboard'
import Message from './Message'

const Bottom = ({ showMessage, setShowMessage, activeClue, setclueId, nextHint, setNextHint, setMode, addCompletedClue, handleInput, input, setInput, checkAns, setCheckAns }) => {

	// set initial btns
	let btnArr = btnArr || [{ name:'Show hint', style: 'secondary', onClick: function(){setCheckAns(false);setShowMessage(true)} }]

	const reavealSolutionButton = [
		{ 
			name:'Reveal solution', 
			style: 'alt', 
			onClick: function() {
				setShowMessage(true)
				setInput([])
			} 
		}
	]

	const checkAnsButton = [
		{ 
			name:'Check answer', 
			style: 'primary', 
			onClick: function() {
				setCheckAns(true)
				setShowMessage(true)
			} 
		}
	]
	
	if (activeClue.hints[nextHint].type == 'solution') {
		btnArr = reavealSolutionButton
	}
	
	if (input.length === activeClue.solution.arr.length) {
		btnArr.push(...checkAnsButton)
	}

	return(
		<div className='bottom'>
			<div className='container'>				
				{showMessage ? 
					<Message
						setShowMessage={setShowMessage}
						activeClue={activeClue}
						setclueId={setclueId}
						nextHint={nextHint}
						setNextHint={setNextHint}
						setMode={setMode}
						input={input}
						checkAns={checkAns}
						setCheckAns={setCheckAns}
						addCompletedClue={addCompletedClue}
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