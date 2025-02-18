import React from 'react'

import ButtonContainer from '../bottom/ButtonContainer'
import an1 from '../../assets/img/learn/anagram/an1.gif'
import an3 from '../../assets/img/learn/anagram/an3.gif'

const Anagram = ({ setLearnType, setclueId,	setInput, setCheckAns, setMode }) => {

	const backButton = <svg className='back-button' onClick={()=>setLearnType('learn')} xmlns="http://www.w3.org/2000/svg" width='25px' height='25px' viewBox="0 0 448 512"><path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.2 288 416 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-306.7 0L214.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z"/></svg>

	// buttons
	const buttons = {
		easyClue: {
			name: "Play an anagram clue",
			style: 'secondary',
			onClick: function() {
				setclueId(97)
				setInput([])
				setCheckAns(false)
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
	const btnArr = [buttons.easyClue]

	const indicatorArr = ["new", "broken", "mad", "crazy", "wild", "scrambled", "mixed", "shaken", "rearranged", "confused"]
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
				<p>Common anagram indicators include:</p>
				<ul className='indicators mt-3'>{indicators}</ul>
			</div>

			<div className='learn-section'>
				<h2>Examples</h2>
				<div className='example-container'>
					<p className='example'>One unusual role in "The Matrix" (3)</p>
					<div className='explanation'>
						<ul className='mt-3'>
							<li><strong>role in "The Matrix"</strong> is the definition</li>
							<li><strong>unusual</strong> indicates that <strong>One</strong> is an anagram</li>
							<li><strong>Neo</strong> is the solution</li>
						</ul>
						<img src={an1}/>
					</div>
				</div>

				<div className='example-container'>
					<p className='example'>Altering odd three-sided figure (8)</p>
					<div className='explanation'>
						<ul className='mt-3'>
							<li><strong>three-sided figure</strong> is the definition</li>
							<li><strong>odd</strong> indicates that <strong>Altering</strong> is an anagram</li>
						</ul>
						<img src={an3}/>
					</div>
				</div>
			</div>

			<div className='learn-section'>
				<ButtonContainer
					btnArr={btnArr}
					stack={true}
				/>
			</div>
		</div>
	)
}

export default Anagram;