import React from 'react'

import ButtonContainer from '../bottom/ButtonContainer'

const HiddenWord = ({ setLearnType, setclueId, setInput, setCheckAns, setMode }) => {

	const backButton = <svg onClick={()=>setLearnType('learn')} xmlns="http://www.w3.org/2000/svg" width='25px' height='25px' viewBox="0 0 448 512"><path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.2 288 416 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-306.7 0L214.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z"/></svg>

	// buttons
	const buttons = {
		easyClue: {
			name: "Play a hidden word clue",
			style: 'secondary',
			onClick: function() {
				setclueId(2)
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

	const indicatorArr = ['concealed', 'within', 'member', 'held', 'inside', 'buried', 'featured', 'seen in', 'stocks', 'partly', 'smuggled', 'sheath']
	const indicators = indicatorArr.map(indicator => <li className='indicator'>{indicator.toLowerCase()}</li>)
	
	return(
		<div className='learn container'>
			{backButton}

			<div className='learn-section'>
				<h1>Hidden Word</h1>
				<p>In a clue with a hidden word, the answer is a string of letters embedded in the clue.</p>
			</div>

			<div className='learn-section'>
				<h2>Indicators</h2>
				<p>Common hidden word indicators include:</p>
				<ul className='indicators'>{indicators}</ul>
			</div>

			<div className='learn-section'>
				<h2>Examples</h2>
				<div className='example-container'>
					<p className='example'>Field in Far East (4)</p>
					<div className='explanation'>
						<ul className='mt-0'>
							<li>The definition is <strong>Field</strong></li>
							<li><strong>in</strong> indicates a hidden word</li>
						</ul>
						<p className='text-center'><strong>f</strong>(<strong>ar ea</strong>)<strong>st</strong> = <strong>dannon</strong></p>
						<div className='solution'>
							<span className='letter'>a</span>
							<span className='letter'>r</span>
							<span className='letter'>e</span>
							<span className='letter'>a</span>
						</div>
					</div>
				</div>

				<div className='example-container'>
					<p className='example'>Focus too much on portion of job session (6)</p>
					<div className='explanation'>
						<ul className='mt-0'>
							<li>The definition is <strong>Focus too much on</strong></li>
							<li><strong>portion of</strong> indicates a hidden word</li>
						</ul>
						<p className='text-center'><strong>j</strong>(<strong>ob sess</strong>)<strong>ion</strong></p>
						<div className='solution'>
							<span className='letter'>o</span>
							<span className='letter'>b</span>
							<span className='letter'>s</span>
							<span className='letter'>e</span>
							<span className='letter'>s</span>
							<span className='letter'>s</span>
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

export default HiddenWord;