import React from 'react'
import { Link } from "react-router-dom";

import ButtonContainer from '../../components/bottom/ButtonContainer'

const Spoonerism = ({ setclueId, setInput, setCheckAns, setReturnLearn }) => {

	const backButton = <Link to="/learn"><svg className='back-button' xmlns="http://www.w3.org/2000/svg" width='25px' height='25px' viewBox="0 0 448 512"><path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.2 288 416 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-306.7 0L214.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z"/></svg></Link>

	// buttons
	const buttons = {
		easyClue: {
			path: '/clue',
			name: "Play a spoonerism clue",
			style: 'primary',
			onClick: function() {
				setclueId(192)
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
	
	return(
		<div className='learn container'>
			{backButton}

			<div className='learn-section'>
				<h1>Spoonerism</h1>
				<p>In a clue with a spoonerism, swap the sounds at beginnings of two words.</p>
			</div>

			<div className='learn-section'>
				<h2>Indicators</h2>
				<p>Spoonerisms will include some reference to a spoon or Reverand Spooner (the person who invented spoonerisms)</p>
			</div>

			<div className='learn-section'>
				<h2>Examples</h2>
				<div className='example-container'>
					<p className='example'>Clean up, shake a tower, then spoon (4,1,6)</p>
					<div className='explanation'>
						<ul className='mt-0'>
							<li>The definition is <strong>Clean up</strong></li>
							<li><strong>then spoon</strong> indicates a spoonerism</li>
						</ul>
						<p className='text-center'><strong>shake a tower</strong> → <strong>take a shower</strong></p>
						<div className='solution'>
							<span className='letter'>t</span>
							<span className='letter'>a</span>
							<span className='letter'>k</span>
							<span className='letter'>e</span>
							<span className='letter'>a</span>
							<span className='letter'>s</span>
							<span className='letter'>h</span>
							<span className='letter'>o</span>
							<span className='letter'>w</span>
							<span className='letter'>e</span>
							<span className='letter'>r</span>
						</div>
					</div>
				</div>

				<div className='example-container'>
					<p className='example'>Restaurant supervisors marry bigots, per Rev. Spooner (4,7)</p>
					<div className='explanation'>
						<ul className='mt-0'>
							<li>The definition is <strong>Restaurant supervisors</strong></li>
							<li><strong>marry</strong> can be <strong>wed</strong></li>
							<li><strong>bigots</strong> can be <strong>haters</strong></li>
							<li><strong>per Rev. Spooner</strong> indicates a spoonerism</li>
						</ul>
						<p className='text-center'><strong>wed haters</strong> → <strong>head waiters</strong></p>
						<div className='solution'>
							<span className='letter'>h</span>
							<span className='letter'>e</span>
							<span className='letter'>a</span>
							<span className='letter'>d</span>
							<span className='letter'>w</span>
							<span className='letter'>a</span>
							<span className='letter'>i</span>
							<span className='letter'>t</span>
							<span className='letter'>e</span>
							<span className='letter'>r</span>
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

export default Spoonerism;