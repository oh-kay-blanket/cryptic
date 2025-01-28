import React, { useRef } from 'react'
import ButtonContainer from './ButtonContainer';

const Message = ({ setShowMessage, activeClue, setclueId, nextHint, setNextHint, setMode, input, checkAns, setCheckAns, addCompletedClue }) => {

	const msgContainer = useRef()

	const isCorrectAns = () => {
		return input.join('').toUpperCase() === activeClue.solution.arr.join('').toUpperCase()
	}

	// hint message
	const getMessage = hint => {

		const vowels = ['a', 'e', 'i', 'o', 'u']

		let aAn = hint.category && hint.category.slice(0, 1).includes(vowels) ? 'a' : 'a'

		switch(hint.type) {
			case 'definition':
				if (hint.value.length == 1) { // Single definition
					return <><strong>{hint.value[0].toUpperCase()}</strong> is the definition</>
				} else { // Double definition
					return <>Both <strong>{hint.value[0].toUpperCase()}</strong> and <strong>{hint.value[1].toUpperCase()}</strong> are definitions</>
				}
			case 'indicator':
				switch(hint.category) {
					case 'anagram':
						return <><strong>{hint.value.toUpperCase()}</strong> indicates an anagram on <strong>{hint.end.value[0].toUpperCase()}</strong></>
					case 'ag-2':
						return <><strong>{hint.end.value[1].toUpperCase()}</strong> is an anagram of <strong>{hint.end.value[0].toUpperCase()}</strong></>
					case 'charade':
						return <><strong>{hint.value.toUpperCase()}</strong> can be <strong>{hint.end.value[0].toUpperCase()}</strong></>
					case 'container':
						return <><strong>{hint.value.toUpperCase()}</strong>, indicates a container</>
					case 'deletion':
						return <><strong>{hint.value.toUpperCase()}</strong>, indicates a deletion</>
					case 'direct':
						return <><strong>{hint.value.toUpperCase()}</strong> is used</>
					case 'hidden word':
						return <><strong>{hint.value.toUpperCase()}</strong> indicates a hidden word at <strong>{hint.end.value[0].toUpperCase()}</strong></>
					case 'hw-2':
						return <><strong>{hint.end.value[1].toUpperCase()}</strong> is hidden within <strong>{hint.end.value[0].toUpperCase()}</strong></>
					case 'homophone':
						return <><strong>{hint.value.toUpperCase()}</strong> indicates a homophone</>
					case 'initialism':
						return <><strong>{hint.value.toUpperCase()}</strong> indicates the beginning of one or more words</>
					case 'letter bank':
						return <><strong>{hint.value.toUpperCase()}</strong> indicates a letter bank</>
					case 'particle':
						return <><strong>{hint.value.toUpperCase()}</strong> can be <strong>{hint.end.value[0].toUpperCase()}</strong></>
					case 'reversal':
						return <><strong>{hint.value.toUpperCase()}</strong>, indicates a reversal on <strong>{hint.end.value[0].toUpperCase()}</strong>, making it <strong>{hint.end.value[1].toUpperCase()}</strong></>
					case 'synonym':
						return <><strong>{hint.value.toUpperCase()}</strong> can be <strong>{hint.end.value[0].toUpperCase()}</strong></>
					case 'symbol':
						return <><strong>{hint.value.toUpperCase()}</strong> can be <strong>{hint.end.value[0].toUpperCase()}</strong></>
					default:
						// One end point
						if (hint.end.value.length == 1) {
							return <><strong>{hint.value.toUpperCase()}</strong> incicates {aAn} {hint.category} at <strong>{hint.end.value[0].toUpperCase()}</strong></> 
							
							// Two end points
						} else {
							return <><strong>{hint.value.toUpperCase()}</strong> incicates {aAn} {hint.category} at <strong>{hint.end.value[0].toUpperCase()}</strong> and <strong>{hint.end.value[1].toUpperCase()}</strong></> 
						}
				}
			default: 
				return hint.value
		}
	}

	// figure out which text to display
	const message = checkAns ? 
		isCorrectAns() ? 
			<><strong>{input.join("").toUpperCase()}</strong> is correct.<br/>Nice work!</> :
			<><strong>{input.join("").toUpperCase()}</strong> is not the correct answer.</> :
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
	const isSolution = (activeClue.hints.length - 1 == nextHint) && !checkAns
	
	// choose message button
	let messageButton = isSolution || (checkAns && isCorrectAns()) ? clueEndButton : continueButton
	
	// style message
	let messageStyle = isSolution ? 
		'solution' :
		checkAns && isCorrectAns() ?
			'is-correct-ans' :
			'continue'

	return(
		<div className={`message ${messageStyle}`} ref={msgContainer}>
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