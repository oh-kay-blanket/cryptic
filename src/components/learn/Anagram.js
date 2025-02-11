import React from 'react'

import ButtonContainer from '../bottom/ButtonContainer'
import earhole from '../../assets/img/learn/anagram/earhole.gif'

const Anagram = ({ setLearnType }) => {

	const backButton = <svg onClick={()=>setLearnType('learn')} xmlns="http://www.w3.org/2000/svg" width='25px' height='25px' viewBox="0 0 448 512"><path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.2 288 416 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-306.7 0L214.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z"/></svg>

	// buttons
	const buttons = {
		return: {
			name: "Return",
			style: 'secondary',
			onClick: function() {
				setLearnType('learn')
			}
		}
	}
	const btnArr = [buttons.return]

	const indicatorArr = ["new", "broken", "mad", "crazy", "wild", "scrambled", "mixed", "shaken", "rearranged", "confused"]
	const indicators = indicatorArr.map(indicator => <li className='indicator'>{indicator}</li>)
	
	return(
		<div className='learn container'>
			{backButton}

			<div className='learn-section'>
				<h1>Anagram</h1>
				<p>In a clue with an anagram, a word or words are reordered to make a new word or words.</p>
			</div>

			<div className='learn-section'>
				<h3>Indicators</h3>
				<p>Common indicators for an anagram are:</p>
				<ul className='indicators'>{indicators}</ul>
			</div>

			<div className='learn-section'>
				<h3>Examples</h3>
				<p className='example'><span className='purple'>Hear Leo</span>'s <span className='highlight'>wonky</span> audio receiver (7)</p>
				<p>Here, "wonky" is indicating that "Hear Leo" will be an anagram.</p>
				<img src={earhole}/>
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