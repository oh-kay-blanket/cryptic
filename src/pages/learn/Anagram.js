import React, { useContext, useEffect } from 'react'
import Layout from '../../components/layout'
import { UserContext } from '../../utils/UserContext'
import ButtonContainer from '../../components/bottom/ButtonContainer'

const Anagram = () => {
	const { setReturnLearn, typeViewed, setTypeViewed } = useContext(UserContext)

	const hasBeenViewed = typeViewed.find((viewed) => viewed === 'anagram')
	useEffect(() => {
		if (!hasBeenViewed && typeof setTypeViewed === 'function') {
			setTypeViewed('anagram')
		}
	}, [hasBeenViewed, setTypeViewed])

	const backButton = (
		<button onClick={() => window.history.back()} aria-label='Go back'>
			<svg
				className='back-button'
				xmlns='http://www.w3.org/2000/svg'
				width='25px'
				height='25px'
				viewBox='0 0 448 512'
			>
				<path d='M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.2 288 416 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-306.7 0L214.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z' />
			</svg>
		</button>
	)

	// buttons
	const buttons = {
		easyClue: {
			path: '/clues/97',
			name: 'Play an anagram clue',
			style: 'primary',
			onClick: function () {
				setReturnLearn('anagram')
			},
		},
		return: {
			path: '/learn#learn-types',
			name: 'Back to Learn',
			style: 'secondary',
		},
		next: {
			path: '/learn/charade',
			name: 'Next (Charade)',
			style: 'alt',
		},
	}
	const btnArr1 = [buttons.easyClue]
	const btnArr2 = [buttons.return, buttons.next]

	const indicatorArr = [
		'new',
		'broken',
		'mad',
		'crazy',
		'wild',
		'scrambled',
		'mixed',
		'shaken',
		'rearranged',
		'confused',
		'odd',
		'unusual',
		'off',
		'dancing',
		'rocky',
		'stirred',
	]
	const indicators = indicatorArr.map((indicator, index) => (
		<li key={index} className='indicator'>
			{indicator.toLowerCase()}
		</li>
	))

	// Handle anchor link
	// useEffect(() => {
	// if (typeof window !== 'undefined') {
	// 	const hash = window.location.hash
	// 	// Only proceed if hash exists and is not empty
	// 	if (hash && hash.length > 1) {
	// 		// slight delay ensures element is present
	// 		setTimeout(() => {
	// 			try {
	// 				const el = document.querySelector(hash)
	// 				if (el) {
	// 					el.scrollIntoView({ behavior: 'instant' })
	// 				}
	// 			} catch (error) {
	// 				// Silently handle any errors with scrollIntoView
	// 				console.warn('Error scrolling to anchor:', error)
	// 			}
	// 		}, 10) // Increased timeout for better reliability
	// 	}
	// }
	// }, [])

	return (
		<Layout>
			<div className='learn container'>
				{backButton}

				<div className='learn-section'>
					<h1>Anagram</h1>
					<p>
						Reorder the letters of a given word (or words) to make a new word
						(or words).
					</p>
				</div>

				<div className='learn-section'>
					<h2>Indicators</h2>
					<p>
						An indicator will tip you off to the presence of an anagram. Common
						indicators include:
					</p>
					<ul className='indicators mt-3'>{indicators}</ul>
				</div>

				<div className='learn-section'>
					<h2>Examples</h2>
					<div className='example-container'>
						<p className='example'>One unusual role in "The Matrix" (3)</p>
						<div className='explanation'>
							<ul className='mt-0'>
								<li>
									The definition is <strong>role in "The Matrix"</strong>
								</li>
								<li>
									<strong>unusual</strong> is a signal to anagram the letters in{' '}
									<strong>One</strong>
								</li>
							</ul>
							<p className='text-center'>
								<strong>neo</strong> → <strong>one</strong>
							</p>
							<div className='solution'>
								<span className='letter'>n</span>
								<span className='letter'>e</span>
								<span className='letter'>o</span>
							</div>
						</div>
					</div>

					<div className='example-container'>
						<p className='example'>Altering odd three-sided figure (8)</p>
						<div className='explanation'>
							<ul className='mt-0'>
								<li>
									The definition is <strong>three-sided figure</strong>
								</li>
								<li>
									<strong>odd</strong> indicates that <strong>Altering</strong>{' '}
									is an anagram
								</li>
							</ul>
							<p className='text-center'>
								<strong>altering</strong> → <strong>triangle</strong>
							</p>
							<div className='solution'>
								<span className='letter'>t</span>
								<span className='letter'>r</span>
								<span className='letter'>i</span>
								<span className='letter'>a</span>
								<span className='letter'>n</span>
								<span className='letter'>g</span>
								<span className='letter'>l</span>
								<span className='letter'>e</span>
							</div>
						</div>
					</div>
					<div id='next'>
						<ButtonContainer btnArr={btnArr1} />
					</div>
				</div>

				<div className='learn-section'>
					<ButtonContainer btnArr={btnArr2} />
				</div>
			</div>
		</Layout>
	)
}

export default Anagram
