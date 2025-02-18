import React from 'react'

import ButtonContainer from '../bottom/ButtonContainer'
import ch1 from '../../assets/img/learn/charade/ch1.gif'
import ch2 from '../../assets/img/learn/charade/ch2.gif'

const Charade = ({ setLearnType, setclueId,	setInput, setCheckAns, setMode }) => {

	const backButton = <svg onClick={()=>setLearnType('learn')} xmlns="http://www.w3.org/2000/svg" width='25px' height='25px' viewBox="0 0 448 512"><path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.2 288 416 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-306.7 0L214.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z"/></svg>

	// buttons
	const buttons = {
		easyClue: {
			name: "Play a charade clue",
			style: 'secondary',
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
	const btnArr = [buttons.easyClue]
	
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
					<p><strong>att</strong> + <strong>end</strong> = <strong>attend</strong>.</p>
					<img src={ch2}/>
				</div>

				<div className='example-container'>
					<p className='example'>Digests runny cheese on Friday and Saturday (6)</p>
					<p><strong>brie</strong> + <strong>f</strong> + <strong>s</strong> = <strong>briefs</strong>.</p>
					<img src={ch1}/>
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

export default Charade;