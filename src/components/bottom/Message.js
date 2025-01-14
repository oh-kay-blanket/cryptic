import React from 'react'
import ButtonContainer from '../ButtonContainer';

const Message = ({ setShowMessage, activeClue, setclueId, nextHint, setNextHint, setMode, input, checkAns, setCheckAns, addCompletedClue }) => {

	const isCorrectAns = () => {
		return input.join('').toLowerCase() === activeClue.solution.arr.join('').toLowerCase()
	}

	// hint message
	const getMessage = hint => {

		const vowels = ['a', 'e', 'i', 'o', 'u']

		let aAn = hint.category && hint.category.slice(0, 1).includes(vowels) ? 'a' : 'a'

		switch(hint.type) {
			case 'definition':
				if (hint.value.length == 1) { // Single definition
					return <><strong>{hint.value}</strong> is the definition</>
				} else { // Double definition
					return <>Both <strong>{hint.value[0]}</strong> and <strong>{hint.value[1]}</strong> are definitions</>
				}
			case 'indicator':
				switch(hint.category) {
					case 'anagram':
						return <><strong>{hint.value}</strong> indicates an anagram</>
					case 'charade':
						return <><strong>{hint.value}</strong> can be <strong>{hint.end.value[0]}</strong></>
					case 'container':
						return <><strong>{hint.value}</strong>, indicates a container</>
					case 'deletion':
						return <><strong>{hint.value}</strong>, indicates a deletion</>
					case 'direct':
						return <><strong>{hint.value}</strong> is used</>
					case 'hidden word':
						return <><strong>{hint.value}</strong> indicates a hidden word</>
					case 'homophone':
						return <><strong>{hint.value}</strong> indicates a homophone</>
					case 'initialism':
						return <><strong>{hint.value}</strong> indicates the beginning of one or more words</>
					case 'letter bank':
						return <><strong>{hint.value}</strong> indicates a letter bank</>
					case 'particle':
						return <><strong>{hint.value}</strong> can be <strong>{hint.end.value[0]}</strong></>
					case 'reversal':
						return <><strong>{hint.value}</strong>, indicates a reversal on <strong>{hint.end.value[0]}</strong>, making it <strong>{hint.end.value[1]}</strong></>
					case 'synonym':
						return <><strong>{hint.value}</strong> can be <strong>{hint.end.value[0]}</strong></>
					case 'symbol':
						return <><strong>{hint.value}</strong> can be <strong>{hint.end.value[0]}</strong></>
					default:
						// One end point
						if (hint.end.value.length == 1) {
							return <><strong>{hint.value}</strong> incicates {aAn} {hint.category} at <strong>{hint.end.value[0]}</strong></> 
							
							// Two end points
						} else {
							return <><strong>{hint.value}</strong> incicates {aAn} {hint.category} at <strong>{hint.end.value[0]}</strong> and <strong>{hint.end.value[1]}</strong></> 
						}
				}
				
			case 'solution':
				return false
			default: 
				return hint.value
		}
	}

	// figure out which text to display
	const message = checkAns ? 
		isCorrectAns() ? 
			<><strong>{input.join("")}</strong> is correct.<br/>Nice work!</> :
			<><strong>{input.join("")}</strong> is not the correct answer.</> :
		getMessage(activeClue.hints[nextHint])
	
	const explainer = activeClue.hints[nextHint].explainer ? activeClue.hints[nextHint].explainer : false
	
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
			style: isCorrectAns() ? 'gray' : 'secondary',
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
	const isSolution = (activeClue.hints[nextHint].type == 'solution' || activeClue.hints[nextHint].reveals) && !checkAns
	
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
			{message && <div className={'message-copy'}>
				{message}
				{explainer && <div className={'explainer'}>{explainer}</div>}
			</div>}
			
			<ButtonContainer
				btnArr={messageButton}
				isSolution={isSolution}
				stack={isSolution}
			/>
		</div>
	)
}

export default Message