import React from 'react'

import ButtonContainer from './bottom/ButtonContainer'
import Keyboard from './bottom/Keyboard'
import Message from './bottom/Message'

import prepBottom from '../utils/bottom/prepBottom'

const Bottom = ({ activeClue, showMessage, setShowMessage, nextHint, setNextHint, addCompletedClue, handleInput, input, setInput, stats, setStats, returnLearn, setReturnLearn, checkAns, setCheckAns, showLogic, setShowLogic, revealedLetters, solutionRevealedViaHint }) => {

	let { buttons, btnArr, isSolution, isCorrectAns, allPositionsFilled, checkAnswer } = prepBottom(activeClue, nextHint, setNextHint, input, setInput, setShowMessage, stats, setStats, addCompletedClue, returnLearn, setReturnLearn, checkAns, setCheckAns, showLogic, setShowLogic, revealedLetters)

	// Show Message component for completion states (correct answer, incorrect answer feedback, solution revealed, or show logic mode)
	const showCompletionMessage = checkAns || isSolution || showLogic

	return(
		<div className='bottom bg-white dark:!bg-neutral-800 border-t border-neutral-200 dark:!border-neutral-700'>
			{showCompletionMessage && showMessage ?
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
					showLogic={showLogic}
					setShowLogic={setShowLogic}
					solutionRevealedViaHint={solutionRevealedViaHint}
					stats={stats}
				/> :
				<>
					<ButtonContainer
						btnArr={btnArr}
					/>
					<Keyboard
						handleInput={handleInput}
						onEnter={checkAnswer}
						canCheckAnswer={allPositionsFilled}
					/>
				</>
			}
		</div>
	)
}

export default Bottom
