import React from 'react'

import ButtonContainer from '../bottom/ButtonContainer'

const Combination = ({ setLearnType, setclueId, setInput, setCheckAns, setMode, setReturnLearn }) => {

	const backButton = <svg onClick={()=>setLearnType('learn')} xmlns="http://www.w3.org/2000/svg" width='25px' height='25px' viewBox="0 0 448 512"><path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.2 288 416 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-306.7 0L214.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z"/></svg>

	// buttons
	const buttons = {
		easyClue: {
			name: "Play a combination clue",
			style: 'primary',
			onClick: function() {
				setclueId(122)
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
	
	return(
		<div className='learn container'>
			{backButton}

			<div className='learn-section'>
				<h1>Combination</h1>
				<p>Many of the more-advanced clues in cryptics employ multiple levels of wordplay. Combination clues can include any combination of the other forms of wordplay featured in Learn Cryptic.</p>
			</div>

			<div className='learn-section'>
				<h2>Examples</h2>
				<div className='example-container'>
					<p className='example'>Boosting not nearly all of a musical sound (5)</p>
					<div className='explanation'>
						<ul className='mt-0'>
							<li>The definition is <strong>of a musical sound</strong></li>
							<li>A clue like this would be used in a Down crossword clue. <strong>Boosting</strong> instructs us to write <strong>not</strong> upward (a reversal), giving us <strong>ton</strong></li>
							<li><strong>nearly</strong> indicates a deletion on <strong>all</strong>, giving us <strong>al</strong></li>
						</ul>
						<p className='text-center'><strong>ton</strong> + <strong>al</strong> = <strong>tonal</strong></p>
						<div className='solution'>
							<span className='letter'>t</span>
							<span className='letter'>o</span>
							<span className='letter'>n</span>
							<span className='letter'>a</span>
							<span className='letter'>l</span>
						</div>
					</div>
				</div>

				<div className='example-container'>
					<p className='example'>Caressed, Don excitedly bolted outside (7)</p>
					<div className='explanation'>
						<ul className='mt-0'>
							<li>The definition is <strong>Caressed</strong></li>
							<li><strong>bolted</strong> can be <strong>fled</strong></li>
							<li><strong>outside</strong> indicates a container on <strong>fled</strong></li>
							<li><strong>excitedly</strong> indicates an anagram on <strong>don</strong>, giving us <strong>ond</strong></li>
						</ul>
						<p className='text-center'><strong>f</strong>(<strong>ond</strong>)<strong>led</strong> = <strong>fondled</strong></p>
						<div className='solution'>
							<span className='letter'>f</span>
							<span className='letter'>o</span>
							<span className='letter'>n</span>
							<span className='letter'>d</span>
							<span className='letter'>l</span>
							<span className='letter'>e</span>
							<span className='letter'>d</span>
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

export default Combination;