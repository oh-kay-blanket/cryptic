import React from 'react'
import { Link } from "react-router-dom";

import ButtonContainer from '../../components/bottom/ButtonContainer'

const Reversal = ({ setclueId, setInput, setCheckAns, setReturnLearn }) => {

	const backButton = <Link to="/learn"><svg className='back-button' xmlns="http://www.w3.org/2000/svg" width='25px' height='25px' viewBox="0 0 448 512"><path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.2 288 416 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-306.7 0L214.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z"/></svg></Link>

	// buttons
	const buttons = {
		easyClue: {
			path: '/clue',
			name: "Play a reversal clue",
			style: 'primary',
			onClick: function() {
				setclueId(208)
				setInput([])
				setCheckAns(false)
				setReturnLearn(true)
			}
		},
		return: {
			path: '/learn',
			name: "Return",
			style: 'secondary',
		}
	}
	const btnArr = [buttons.return, buttons.easyClue]

	const indicatorArr = ['returning', 'back', 'backwards', 'retrace', 'retreat', 'reverse', 'upon reflection', 'up', 'inverted']
	const indicators = indicatorArr.map(indicator => <li className='indicator'>{indicator.toLowerCase()}</li>)
	
	return(
		<div className='learn container'>
			{backButton}

			<div className='learn-section'>
				<h1>Reversal</h1>
				<p>In a clue with a reversal, reverse the letters to make a new word or words.</p>
			</div>

			<div className='learn-section'>
				<h2>Indicators</h2>
				<p>Common reversal indicators include:</p>
				<ul className='indicators'>{indicators}</ul>
			</div>

			<div className='learn-section'>
				<h2>Examples</h2>
				<div className='example-container'>
					<p className='example'>King with a golden touch is unhappy I'm returning (5)</p>
					<div className='explanation'>
						<ul className='mt-0'>
							<li>The definition is <strong>King with a golden touch</strong></li>
							<li><strong>unhappy</strong> can be <strong>sad</strong></li>
							<li><strong>I'm</strong> is used directly</li>
							<li><strong>returning</strong> indicates a reversal</li>
						</ul>
						<p className='text-center'><strong>sad Im</strong> → <strong>midas</strong></p>
						<div className='solution'>
							<span className='letter'>m</span>
							<span className='letter'>i</span>
							<span className='letter'>d</span>
							<span className='letter'>a</span>
							<span className='letter'>s</span>
						</div>
					</div>
				</div>

				<div className='example-container'>
					<p className='example'>Idly chat with actor Neeson, returning post office worker's sack (7)</p>
					<div className='explanation'>
						<ul className='mt-0'>
							<li>The definition is <strong>post office worker's sack</strong></li>
							<li><strong>Idly chat</strong> can be <strong>gab</strong></li>
							<li><strong>actor Neeson</strong> can be <strong>Liam</strong></li>
							<li><strong>returning</strong> indicates a reversal</li>
						</ul>
						<p className='text-center'><strong>gab liam</strong> → <strong>mailbag</strong></p>
						<div className='solution'>
							<span className='letter'>m</span>
							<span className='letter'>a</span>
							<span className='letter'>i</span>
							<span className='letter'>l</span>
							<span className='letter'>b</span>
							<span className='letter'>a</span>
							<span className='letter'>g</span>
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

export default Reversal;