import React from 'react'

import ButtonContainer from './bottom/ButtonContainer'
import Keyboard from './bottom/Keyboard'
import Message from './bottom/Message'

import prepBottom from '../utils/bottom/prepBottom'

const Bottom = ({ activeClue, showMessage, setShowMessage, nextHint, setNextHint, addCompletedClue, handleInput, input, setInput, stats, setStats, returnLearn, setReturnLearn, checkAns, setCheckAns }) => {

	let { buttons, btnArr, isSolution, isCorrectAns } = prepBottom(activeClue, nextHint, setNextHint, input, setInput, setShowMessage, stats, setStats, addCompletedClue, setReturnLearn, checkAns, setCheckAns)

	return(
		<div className='bottom'>
			<div className='container px-0'>				
				{showMessage ? 
					<Message
						setShowMessage={setShowMessage}
						activeClue={activeClue}
						nextHint={nextHint}
						setNextHint={setNextHint}
						input={input}
						checkAns={checkAns}
						setCheckAns={setCheckAns}
						addCompletedClue={addCompletedClue}
						isCorrectAns={isCorrectAns}
						isSolution={isSolution}
						returnLearn={returnLearn}
						buttons={buttons}
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