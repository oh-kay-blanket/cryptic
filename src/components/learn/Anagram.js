import React from 'react'

import ButtonContainer from '../bottom/ButtonContainer'

const Anagram = ({ setLearnType, setclueId,	setInput, setCheckAns, setMode, setReturnLearn }) => {

	const backButton = <svg className='back-button' onClick={()=>setLearnType('learn')} xmlns="http://www.w3.org/2000/svg" width='25px' height='25px' viewBox="0 0 448 512"><path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.2 288 416 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-306.7 0L214.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z"/></svg>

	// buttons
	const buttons = {
		easyClue: {
			name: "Play an anagram clue",
			style: 'primary',
			onClick: function() {
				setclueId(97)
				setInput([])
				setCheckAns(false)
				setReturnLearn(true)
				setMode('playing')
			}
		},
		return: {
			name: "Return",
			style: 'secondary',
			onClick: function() {
				setLearnType('learn')
			}
		}
	}
	const btnArr = [buttons.return, buttons.easyClue]

	const indicatorArr = ["new", "broken", "mad", "crazy", "wild", "scrambled", "mixed", "shaken", "rearranged", "confused", "odd", "unusual", "off", "dancing", "rocky", "stirred"]
	const indicators = indicatorArr.map(indicator => <li className='indicator'>{indicator.toLowerCase()}</li>)
	
	return(
		<div className='learn container'>
			{backButton}

			<div className='learn-section'>
				<h1>Anagram</h1>
				<p>In a clue with an anagram, a word or words are reordered to make a new word or words.</p>
			</div>

			<div className='learn-section'>
				<h2>Indicators</h2>
				<p>Clues with anagrams will always have an indicator word to let you know there will be an anagram. Common indicators include:</p>
				<ul className='indicators mt-3'>{indicators}</ul>
			</div>

			<div className='learn-section'>
				<h2>Examples</h2>
				<div className='example-container'>
					<p className='example'>One unusual role in "The Matrix" (3)</p>
					<div className='explanation'>
						<ul className='mt-0'>
							<li>The definition is <strong>role in "The Matrix"</strong></li>
							<li><strong>unusual</strong> indicates that <strong>One</strong> is an anagram</li>
						</ul>
						<p className='text-center'><strong>neo</strong> → <strong>one</strong></p>
						<div className='solution'>
							<span className='letter'>n</span>
							<span className='letter'>e</span>
							<span className='letter'>o</span>
						</div>
					</div>
				</div>

				<div className='example-container'>
					<p className='example'>Altering odd three-sided figure (8)</p>
					<div className='explanation'>
						<ul className='mt-0'>
							<li>The definition is <strong>three-sided figure</strong></li>
							<li><strong>odd</strong> indicates that <strong>Altering</strong> is an anagram</li>
						</ul>
						<p className='text-center'><strong>altering</strong> → <strong>triangle</strong></p>
						<div className='solution'>
							<span className='letter'>t</span>
							<span className='letter'>r</span>
							<span className='letter'>i</span>
							<span className='letter'>a</span>
							<span className='letter'>n</span>
							<span className='letter'>g</span>
							<span className='letter'>l</span>
							<span className='letter'>e</span>
						</div>
					</div>
				</div>
			</div>

			<div className='learn-section'>
				<ButtonContainer
					btnArr={btnArr}
				/>
			</div>
		</div>
	)
}

export default Anagram;