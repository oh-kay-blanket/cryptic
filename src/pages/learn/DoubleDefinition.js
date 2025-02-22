import React from 'react'
import { Link } from "react-router-dom";

import ButtonContainer from '../../components/bottom/ButtonContainer'

const DoubleDefinition = ({ setReturnLearn }) => {

	const backButton = <Link to="/learn"><svg className='back-button' xmlns="http://www.w3.org/2000/svg" width='25px' height='25px' viewBox="0 0 448 512"><path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.2 288 416 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-306.7 0L214.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z"/></svg></Link>

	// buttons
	const buttons = {
		easyClue: {
			path: '/clues/101',
			name: "Play a double definition clue",
			style: 'primary',
			onClick: function() {
				setReturnLearn('double-definition')
			}
		},
		return: {
			path: '/learn',
			name: "Return",
			style: 'secondary',
		}
	}
	const btnArr = [buttons.return, buttons.easyClue]
	
	return(
		<div className='learn container'>
			{backButton}

			<div className='learn-section'>
				<h1>Double Definition</h1>
				<p>In a clue with a double definition, the clue can be split into two parts that each define the solution.</p>
			</div>

			<div className='learn-section'>
				<h2>Examples</h2>
				<div className='example-container'>
					<p className='example'>Tightens up verb forms (6)</p>
					<div className='explanation'>
						<ul className='mt-0'>
							<li>Both <strong>Tightens up</strong> and <strong>verb forms</strong> are definitions</li>
							<li><strong>Tightens up</strong> can be <strong>tenses</strong></li>
							<li><strong>verb forms</strong> can be <strong>tenses</strong></li>
						</ul>
						<div className='solution'>
							<span className='letter'>t</span>
							<span className='letter'>e</span>
							<span className='letter'>n</span>
							<span className='letter'>s</span>
							<span className='letter'>e</span>
							<span className='letter'>s</span>
						</div>
					</div>
				</div>

				<div className='example-container'>
					<p className='example'>Throw black goo (5)</p>
					<div className='explanation'>
						<ul className='mt-0'>
							<li>Both <strong>Throw</strong> and <strong>black goo</strong> are definitions</li>
							<li><strong>Throw</strong> can be <strong>pitch</strong></li>
							<li><strong>black goo</strong> can be <strong>pitch</strong></li>
						</ul>
						<div className='solution'>
							<span className='letter'>p</span>
							<span className='letter'>i</span>
							<span className='letter'>t</span>
							<span className='letter'>c</span>
							<span className='letter'>h</span>
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

export default DoubleDefinition;