import React from 'react'

import ButtonContainer from '../bottom/ButtonContainer'

const LetterBank = ({ setLearnType, setclueId, setInput, setCheckAns, setMode }) => {

	const backButton = <svg onClick={()=>setLearnType('learn')} xmlns="http://www.w3.org/2000/svg" width='25px' height='25px' viewBox="0 0 448 512"><path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.2 288 416 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-306.7 0L214.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z"/></svg>

	// buttons
	const buttons = {
		easyClue: {
			name: "Play a container clue",
			style: 'secondary',
			onClick: function() {
				setclueId(50)
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

	const indicatorArr = ['missing', 'minus', 'without', 'even', 'odd', 'hollow', 'middle', 'endless', 'headless', 'short', 'empty', 'outskirts', 'outside', 'inside', 'a couple']
	const indicators = indicatorArr.map(indicator => <li className='indicator'>{indicator.toLowerCase()}</li>)
	
	return(
		<div className='learn container'>
			{backButton}

			<div className='learn-section'>
				<h1>Letter Bank</h1>
				<p>In a clue with a letter bank, remove a letter or set of letters from the beginning, middle, or end of a word.</p>
			</div>

			<div className='learn-section'>
				<h2>Indicators</h2>
				<p>Common letter bank indicators include:</p>
				<ul className='indicators'>{indicators}</ul>
			</div>

			<div className='learn-section'>
				<h2>Examples</h2>
				<div className='example-container'>
					<p className='example'>Repeatedly retain host (11)</p>
					<div className='explanation'>
						<ul className='mt-0'>
							<li>The definition is <strong>brand of yogurt</strong></li>
							<li><strong>eats</strong> indicates a letter bank</li>
						</ul>
						<p className='text-center'><strong>d</strong>(<strong>ann</strong>)<strong>on</strong> = <strong>dannon</strong></p>
						<div className='solution'>
							<span className='letter'>d</span>
							<span className='letter'>a</span>
							<span className='letter'>n</span>
							<span className='letter'>n</span>
							<span className='letter'>o</span>
							<span className='letter'>n</span>
						</div>
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

export default LetterBank;