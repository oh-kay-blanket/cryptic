import React from 'react'
import { Link } from "react-router-dom";

import ButtonContainer from '../../components/bottom/ButtonContainer'

const Initialism = ({ setReturnLearn }) => {

	const backButton = <Link to="/learn"><svg className='back-button' xmlns="http://www.w3.org/2000/svg" width='25px' height='25px' viewBox="0 0 448 512"><path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.2 288 416 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-306.7 0L214.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z"/></svg></Link>

	// buttons
	const buttons = {
		easyClue: {
			path: '/clues/324',
			name: "Play an initialism clue",
			style: 'primary',
			onClick: function() {
				setReturnLearn('initialism')
			}
		},
		return: {
			path: '/learn',
			name: "Return",
			style: 'secondary',
		}
	}
	const btnArr = [buttons.return, buttons.easyClue]

	const indicatorArr = ['starts', 'beginnings', 'first', 'early', 'middle', 'center', 'core', 'ends', 'final', 'last', 'ultimate']
	const indicators = indicatorArr.map(indicator => <li className='indicator'>{indicator.toLowerCase()}</li>)
	
	return(
		<div className='learn container'>
			{backButton}

			<div className='learn-section'>
				<h1>Initialism</h1>
				<p>In a clue with initialism, the first (or last, or even middle) letters of series of words form the answer.</p>
			</div>

			<div className='learn-section'>
				<h2>Indicators</h2>
				<p>Common initialism indicators include:</p>
				<ul className='indicators'>{indicators}</ul>
			</div>

			<div className='learn-section'>
				<h2>Examples</h2>
				<div className='example-container'>
					<p className='example'>Starts to dream about living large amid suburban Texas metropolis (6)</p>
					<div className='explanation'>
						<ul className='mt-0'>
							<li>The definition is <strong>Texas metropolis</strong></li>
							<li><strong>Starts to</strong> indicates initialism</li>
						</ul>
						<p className='text-center'><strong>d</strong>ream <strong>a</strong>bout <strong>l</strong>iving <strong>l</strong>arge <strong>a</strong>mid <strong>s</strong>uburban</p>
						<div className='solution'>
							<span className='letter'>d</span>
							<span className='letter'>a</span>
							<span className='letter'>l</span>
							<span className='letter'>l</span>
							<span className='letter'>a</span>
							<span className='letter'>s</span>
						</div>
					</div>
				</div>

				<div className='example-container'>
					<p className='example'>European capital starts to open some legislative offices (4)</p>
					<div className='explanation'>
						<ul className='mt-0'>
							<li>The definition is <strong>European capital</strong></li>
							<li><strong>starts to</strong> indicates initialism</li>
						</ul>
						<p className='text-center'><strong>o</strong>pen <strong>s</strong>ome <strong>l</strong>egislative <strong>o</strong>ffices</p>
						<div className='solution'>
							<span className='letter'>o</span>
							<span className='letter'>s</span>
							<span className='letter'>l</span>
							<span className='letter'>o</span>
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

export default Initialism;