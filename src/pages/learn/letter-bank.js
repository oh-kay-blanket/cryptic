import React, { useContext } from 'react'
import { Link } from "gatsby";
import Layout from '../../components/layout'
import { UserContext } from '../../utils/UserContext'
import ButtonContainer from '../../components/bottom/ButtonContainer'

const LetterBank = () => {

	const { setReturnLearn } = useContext(UserContext);

	const backButton = <Link to="/learn"><svg className='back-button' xmlns="http://www.w3.org/2000/svg" width='25px' height='25px' viewBox="0 0 448 512"><path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.2 288 416 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-306.7 0L214.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z"/></svg></Link>

	// buttons
	const buttons = {
		easyClue: {
			path: '/clues/50',
			name: "Play a letter bank clue",
			style: 'primary',
			onClick: function() {
				setReturnLearn("letter-bank")
			}
		},
		return: {
			path: '/learn',
			name: "Return",
			style: 'secondary',
		}
	}
	const btnArr = [buttons.return, buttons.easyClue]

	const indicatorArr = ['repeatedly', 'often', 'recurring', 'looping', 'cyclical', 'over and over']
	const indicators = indicatorArr.map(indicator => <li className='indicator'>{indicator.toLowerCase()}</li>)
	
	return(
		<Layout>
			<div className='learn container'>
				{backButton}

				<div className='learn-section'>
					<h1>Letter Bank</h1>
					<p>In a clue with a letter bank, letters are rearranged like in an anagram, but the letters in the source word(s) can be repeated.</p>
				</div>

				<div className='learn-section'>
					<h2>Indicators</h2>
					<p>Common letter bank indicators include:</p>
					<ul className='indicators'>{indicators}</ul>
				</div>

				<div className='learn-section'>
					<h2>Examples</h2>
					<div className='example-container'>
						<p className='example'>Repeatedly retain host (11)</p>
						<div className='explanation'>
							<ul className='mt-0'>
								<li>The definition is <strong>host</strong></li>
								<li><strong>Repeatedly</strong> indicates a letter bank</li>
							</ul>
							<p className='text-center'><strong>retain</strong> → <strong>entertainer</strong></p>
							<div className='solution'>
								<span className='letter'>e</span>
								<span className='letter'>n</span>
								<span className='letter'>t</span>
								<span className='letter'>e</span>
								<span className='letter'>r</span>
								<span className='letter'>t</span>
								<span className='letter'>a</span>
								<span className='letter'>i</span>
								<span className='letter'>n</span>
								<span className='letter'>e</span>
								<span className='letter'>r</span>
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
		</Layout>
	)
}

export default LetterBank;