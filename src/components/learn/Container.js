import React from 'react'

import ButtonContainer from '../bottom/ButtonContainer'
import ct1 from '../../assets/img/learn/container/ct1.gif'
import ct2 from '../../assets/img/learn/container/ct2.gif'

const Container = ({ setLearnType, setclueId,	setInput, setCheckAns, setMode }) => {

	const backButton = <svg onClick={()=>setLearnType('learn')} xmlns="http://www.w3.org/2000/svg" width='25px' height='25px' viewBox="0 0 448 512"><path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.2 288 416 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-306.7 0L214.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z"/></svg>

	// buttons
	const buttons = {
		easyClue: {
			name: "Play a container clue",
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

	const indicatorArr = [ "In", "Inside", "About", "Around", "Holding", "Containing", "Grasping", "Covering", "Enclosing", "Wrapped in", "Surrounding", "Encasing", "Embracing", "Included in", "Held by"]
	const indicators = indicatorArr.map(indicator => <li className='indicator'>{indicator.toLowerCase()}</li>)
	
	return(
		<div className='learn container'>
			{backButton}

			<div className='learn-section'>
				<h1>Container</h1>
				<p>In a clue with a container, a word or words are reordered to make a new word or words.</p>
			</div>

			<div className='learn-section'>
				<h2>Indicators</h2>
				<p>Common container indicators include:</p>
				<ul className='indicators'>{indicators}</ul>
			</div>

			<div className='learn-section'>
				<h2>Examples</h2>
				<div className='example-container'>
					<p className='example'>Don eats Ann's brand of yogurt (6)</p>
					<p><strong>eats</strong> indicates a container.</p>
					<img src={ct1}/>
				</div>

				<div className='example-container'>
					<p className='example'>Spanish gentlemen taking interest in old people (7)</p>
					<p><strong>taking</strong> indicates a container.</p>
					<img src={ct2}/>
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

export default Container;