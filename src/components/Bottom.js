import React from 'react'

import ButtonContainer from './bottom/ButtonContainer'
import Keyboard from './bottom/Keyboard'
import Message from './bottom/Message'

const Bottom = ({ showMessage, setShowMessage, activeClue, setclueId, nextHint, setNextHint, setMode, addCompletedClue, handleInput, input, setInput, checkAns, setCheckAns, stats, setStats }) => {
	
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
			name: 'Play more',
			style: 'secondary',
			onClick: function(){
				setShowMessage(false)
				setNextHint(0)
				setclueId(false)
				setMode('archive')
			}
		},
		endClueGuess: {
			name: 'Play more',
			style: 'gray',
			onClick: function(){
				setShowMessage(false)
				setNextHint(0)
				setclueId(false)
				setMode('archive')
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
						isCorrectAns={isCorrectAns}
						isSolution={isSolution}
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