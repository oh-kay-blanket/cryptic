import React, { useContext, useEffect } from 'react'
import { Link } from "gatsby";
import Layout from '../../components/Layout'
import { UserContext } from '../../utils/UserContext'
import ButtonContainer from '../../components/bottom/ButtonContainer'

const Container = () => {

	const { setReturnLearn, typeViewed, setTypeViewed } = useContext(UserContext);
		
	const hasBeenViewed = typeViewed.find(viewed => viewed === 'container')
	!hasBeenViewed && setTypeViewed('container')

	const backButton = <button onClick={() => window.history.back()}><svg className='back-button' xmlns="http://www.w3.org/2000/svg" width='25px' height='25px' viewBox="0 0 448 512"><path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.2 288 416 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-306.7 0L214.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z"/></svg></button>

	// buttons
	const buttons = {
		easyClue: {
			path: '/clues/306',
			name: "Play a container clue",
			style: 'primary',
			onClick: function() {
				setReturnLearn('container')
			}
		},
		return: {
			path: '/learn#learn-types',
			name: "Back to Learn",
			style: 'secondary'
		},
		next: {
			path: '/learn/deletion',
			name: "Next (Deletion)",
			style: 'alt'
		}
	}
	const btnArr1 = [buttons.easyClue]
	const btnArr2 = [buttons.return, buttons.next]

	const indicatorArr = [ "In", "Inside", "About", "Around", "Holding", "Containing", "Grasping", "Covering", "Enclosing", "Wrapped in", "Surrounding", "Encasing", "Embracing", "Included in", "Held by"]
	const indicators = indicatorArr.map(indicator => <li className='indicator'>{indicator.toLowerCase()}</li>)
	
	// Handle anchor link
	useEffect(() => {
		if (typeof window !== 'undefined') {
			const hash = window.location.hash
			if (hash) {
			// slight delay ensures element is present
			setTimeout(() => {
				const el = document.querySelector(hash)
				if (el) {
				el.scrollIntoView({ behavior: 'instant' })
				}
			}, 1)
			}
		}
	}, [])

	return(
		<Layout>
			<div className='learn container'>
				{backButton}

				<div className='learn-section'>
					<h1>Container</h1>
					<p>In a clue with a container, a word goes inside of another to make a new word.</p>
				</div>

				<div className='learn-section'>
					<h2>Indicators</h2>
					<p>Common container indicators include:</p>
					<ul className='indicators'>{indicators}</ul>
				</div>

				<div className='learn-section'>
					<h2>Examples</h2>
					<div className='example-container'>
						<p className='example'>Don eats Ann's brand of yogurt (6)</p>
						<div className='explanation'>
							<ul className='mt-0'>
								<li>The definition is <strong>brand of yogurt</strong></li>
								<li><strong>eats</strong> indicates a container</li>
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
						<p className='example'>Spanish gentlemen taking interest in old people (7)</p>
						<div className='explanation'>
							<ul className='mt-0'>
								<li>The definition is <strong>old people</strong></li>
								<li><strong>Spanish gentlemen</strong> can be <strong>senors</strong></li>
								<li><strong>interest</strong> can be <strong>i</strong></li>
								<li><strong>taking</strong> indicates a container</li>
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

					<div id='next'>
						<ButtonContainer
							btnArr={btnArr1}
						/>
					</div>
				</div>

				<div className='learn-section'>
					<ButtonContainer
						btnArr={btnArr2}
					/>
				</div>
			</div>
		</Layout>
	)
}

export default Container;