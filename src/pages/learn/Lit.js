import React from 'react'
import { Link } from "react-router-dom";

import ButtonContainer from '../../components/bottom/ButtonContainer'

const Lit = ({ setclueId, setInput, setCheckAns, setReturnLearn }) => {

	const backButton = <Link to="/learn"><svg className='back-button' xmlns="http://www.w3.org/2000/svg" width='25px' height='25px' viewBox="0 0 448 512"><path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.2 288 416 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-306.7 0L214.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z"/></svg></Link>

	// buttons
	const buttons = {
		easyClue: {
			path: '/clue',
			name: "Play an & Lit. clue",
			style: 'primary',
			onClick: function() {
				setclueId(232)
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
				<h1>& Lit.</h1>
				<p>In an & Lit. clue, the entire clue functions as a definition.</p>
			</div>

			<div className='learn-section'>
				<h2>Indicators</h2>
				<p>& Lit. clues are indicated by the presence of an exclamation mark (!) at the end of the clue. They typically also contain another form of wordplay, such as an anagram or deletion.</p>
			</div>

			<div className='learn-section'>
				<h2>Examples</h2>
				<div className='example-container'>
					<p className='example'>I only appear manipulated! (6, 5)</p>
					<div className='explanation'>
						<ul className='mt-0'>
							<li>The definition is <strong>I only appear manipulated</strong></li>
							<li><strong>manipulated</strong> indicates an anagram</li>
						</ul>
						<p className='text-center'><strong>I only appear</strong> → <strong>player piano</strong></p>
						<div className='solution'>
							<span className='letter'>p</span>
							<span className='letter'>l</span>
							<span className='letter'>a</span>
							<span className='letter'>y</span>
							<span className='letter'>e</span>
							<span className='letter'>r</span>
							<span className='letter'>p</span>
							<span className='letter'>i</span>
							<span className='letter'>a</span>
							<span className='letter'>n</span>
							<span className='letter'>o</span>
						</div>
					</div>
				</div>

				<div className='example-container'>
					<p className='example'>Starting with a core of knowledge, gain deeper understanding! (5)</p>
					<div className='explanation'>
						<ul className='mt-0'>
							<li>The definition is <strong>Starting with a core of knowledge, gain deeper understanding</strong></li>
							<li><strong>core of knowledge</strong> can be <strong>l</strong></li>
							<li><strong>gain</strong> can be <strong>earn</strong></li>
						</ul>
						<p className='text-center'><strong>l</strong> + <strong>earn</strong> = <strong>learn</strong></p>
						<div className='solution'>
							<span className='letter'>l</span>
							<span className='letter'>e</span>
							<span className='letter'>a</span>
							<span className='letter'>r</span>
							<span className='letter'>n</span>
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

export default Lit;