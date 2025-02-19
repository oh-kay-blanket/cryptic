import React from 'react'

import ButtonContainer from '../bottom/ButtonContainer'

const Charade = ({ setLearnType, setclueId,	setInput, setCheckAns, setMode }) => {

	const backButton = <svg onClick={()=>setLearnType('learn')} xmlns="http://www.w3.org/2000/svg" width='25px' height='25px' viewBox="0 0 448 512"><path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.2 288 416 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-306.7 0L214.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z"/></svg>

	// buttons
	const buttons = {
		easyClue: {
			name: "Play a charade clue",
			style: 'primary',
			onClick: function() {
				setclueId(163)
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
	const btnArr = [buttons.return, buttons.easyClue]
	
	return(
		<div className='learn container'>
			{backButton}

			<div className='learn-section'>
				<h1>Charade</h1>
				<p>In a clue with a charade, the solution is broken into parts that are clued separately and arranged in order.</p>
			</div>

			<div className='learn-section'>
				<h2>Examples</h2>
				<div className='example-container'>
					<p className='example'>Come to AT&T objective (6)</p>
					<div className='explanation'>
						<ul className='mt-0'>
							<li>The definition is <strong>Come to</strong></li>
							<li><strong>att</strong> is used</li>
							<li><strong>objective</strong> can be <strong>end</strong></li>
						</ul>
						<p className='text-center'><strong>att</strong> + <strong>end</strong> = <strong>attend</strong></p>
						<div className='solution'>
							<span className='letter'>a</span>
							<span className='letter'>t</span>
							<span className='letter'>t</span>
							<span className='letter'>e</span>
							<span className='letter'>n</span>
							<span className='letter'>d</span>
						</div>
					</div>
				</div>

				<div className='example-container'>
					<p className='example'>Digests runny cheese on Friday and Saturday (6)</p>
					<div className='explanation'>
						<ul className='mt-0'>
							<li>The definition is <strong>Digests</strong></li>
							<li><strong>runny cheese</strong> can be <strong>brie</strong></li>
							<li><strong>Friday</strong> can be <strong>f</strong></li>
							<li><strong>Saturday</strong> can be <strong>s</strong></li>
						</ul>
						<p className='text-center'><strong>brie</strong> + <strong>f</strong> + <strong>s</strong> = <strong>briefs</strong></p>
						<div className='solution'>
							<span className='letter'>b</span>
							<span className='letter'>r</span>
							<span className='letter'>i</span>
							<span className='letter'>e</span>
							<span className='letter'>f</span>
							<span className='letter'>s</span>
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

export default Charade;