import React from 'react'

import ButtonContainer from './bottom/ButtonContainer'
import Keyboard from './bottom/Keyboard'
import Message from './bottom/Message'

const Bottom = ({ showMessage, setShowMessage, activeClue, nextHint, setNextHint, addCompletedClue, handleInput, input, setInput, checkAns, setCheckAns, stats, setStats, returnLearn, setReturnLearn }) => {
	
	// buttons
	const buttons = {
		showHint: {
			name:'Show hint',
			style: 'secondary',
			onClick: function() {
				setStats(prevStats => ({ ...prevStats, hints: prevStats.hints + 1}));
				setCheckAns(false)
				setShowMessage(true)
			}
		},
		revealSolution: { 
			name:'Reveal solution', 
			style: 'alt', 
			onClick: function() {
				addCompletedClue(activeClue, stats, 'h')
				setStats(prevStats => ({ ...prevStats, hints: prevStats.hints + 1 }));
				setShowMessage(true)
				setInput([])
			} 
		},
		checkAnswer: { 
			name:'Check answer', 
			style: 'primary', 
			onClick: function() {
				let correct = input.join('').toUpperCase() === activeClue.solution.arr.join('').toUpperCase();
				if (correct) {
					addCompletedClue(activeClue, stats, 'g');
					setStats(prevStats => ({ ...prevStats, guesses: prevStats.guesses + 1 }));
				} else {
					setStats(prevStats => ({ ...prevStats, guesses: prevStats.guesses + 1 }));
				}
				setCheckAns(true);
				setShowMessage(true);
			} 
		},
		continue: {
			name: 'Continue',
			style: 'secondary',
			onClick: function(){
				setShowMessage(false)
				!checkAns && setNextHint(nextHint + 1)
				setCheckAns(false)
			} 
		},
		endClueHint: {
			path: '/clues',
			name: 'Play more',
			style: 'secondary',
			onClick: function(){
				setReturnLearn(false)
				setStats({ guesses: 0, hints: 0, how: '' });
			}
		},
		endClueGuess: {
			path: '/clues',
			name: 'Play more',
			style: 'gray',
			onClick: function(){
				setReturnLearn(false)
				setStats({ guesses: 0, hints: 0, how: '' });
			}
		},
		returnLearn: {
			path: '/learn',
			name: 'Return',
			style: 'alt',
			onClick: function(){
				setReturnLearn(false)
				setStats({ guesses: 0, hints: 0, how: '' });
			}
		}
	}

	let btnArr = btnArr || [buttons.showHint]
	
	if (activeClue.hints[nextHint].reveals) { btnArr = [buttons.revealSolution] }
	
	if (input.length === activeClue.solution.arr.length) { btnArr.push(buttons.checkAnswer) }

	const isCorrectAns = input.join('').toUpperCase() === activeClue.solution.arr.join('').toUpperCase()
	const isSolution = (activeClue.hints.length - 1 == nextHint) && !checkAns

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