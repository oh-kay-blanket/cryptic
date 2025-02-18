import React from 'react'

import ButtonContainer from '../bottom/ButtonContainer'

const Homophone = ({ setLearnType, setclueId, setInput, setCheckAns, setMode }) => {

	const backButton = <svg onClick={()=>setLearnType('learn')} xmlns="http://www.w3.org/2000/svg" width='25px' height='25px' viewBox="0 0 448 512"><path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.2 288 416 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-306.7 0L214.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z"/></svg>

	// buttons
	const buttons = {
		easyClue: {
			name: "Play a container clue",
			style: 'secondary',
			onClick: function() {
				setclueId(188)
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
				<h1>Homophone</h1>
				<p>In a clue with a homophone, remove a letter or set of letters from the beginning, middle, or end of a word.</p>
			</div>

			<div className='learn-section'>
				<h2>Indicators</h2>
				<p>Common homophone indicators include:</p>
				<ul className='indicators'>{indicators}</ul>
			</div>

			<div className='learn-section'>
				<h2>Examples</h2>
				<div className='example-container'>
					<p className='example'>Group of lions was snoopy, we hear (5)</p>
					<div className='explanation'>
						<ul className='mt-0'>
							<li>The definition is <strong>brand of yogurt</strong></li>
							<li><strong>eats</strong> indicates a homophone</li>
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

				<div className='example-container'>
					<p className='example'>Produced blooms covered with white powder, say (8)</p>
					<div className='explanation'>
						<ul className='mt-0'>
							<li>The definition is <strong>old people</strong></li>
							<li><strong>Spanish gentlemen</strong> can be <strong>senors</strong></li>
							<li><strong>interest</strong> can be <strong>i</strong></li>
							<li><strong>taking</strong> indicates a homophone</li>
						</ul>
						<p className='text-center'><strong>sen</strong>(<strong>i</strong>)<strong>ors</strong> = <strong>seniors</strong></p>
						<div className='solution'>
							<span className='letter'>s</span>
							<span className='letter'>e</span>
							<span className='letter'>n</span>
							<span className='letter'>i</span>
							<span className='letter'>o</span>
							<span className='letter'>r</span>
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

export default Homophone;