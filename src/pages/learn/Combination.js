import React, { useContext, useEffect } from 'react'
import Layout from '../../components/layout'
import { UserContext } from '../../utils/UserContext'
import ButtonContainer from '../../components/bottom/ButtonContainer'

const Combination = () => {
	const { setReturnLearn, typeViewed, setTypeViewed } = useContext(UserContext)

	const hasBeenViewed = typeViewed.find((viewed) => viewed === 'combination')
	useEffect(() => {
		if (!hasBeenViewed && typeof setTypeViewed === 'function') {
			setTypeViewed('combination')
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
			path: '/clues/122',
			name: 'Play a combination clue',
			style: 'primary',
			onClick: function () {
				setReturnLearn('combination')
			},
		},
		return: {
			path: '/learn#learn-types',
			name: 'Back to Learn',
			style: 'secondary',
		},
	}
	const btnArr = [buttons.return, buttons.easyClue]

	// Handle anchor link
	useEffect(() => {
		if (typeof window !== 'undefined') {
			const hash = window.location.hash
			// Only proceed if hash exists and is not empty
			if (hash && hash.length > 1) {
				// slight delay ensures element is present
				setTimeout(() => {
					try {
						const el = document.querySelector(hash)
						if (el) {
							el.scrollIntoView({ behavior: 'instant' })
						}
					} catch (error) {
						// Silently handle any errors with scrollIntoView
						console.warn('Error scrolling to anchor:', error)
					}
				}, 10) // Increased timeout for better reliability
			}
		}
	}, [])

	return (
		<Layout>
			<div className='learn container'>
				{backButton}

				<div className='learn-section'>
					<h1>Combination</h1>
					<p>
						It's common for a clue to employ more than one type of wordplay—a
						single clue will often involve two, or sometimes even three (or
						more) varieties.
					</p>
				</div>

				<div className='learn-section'>
					<h2>Example</h2>
					<div className='example-container'>
						<p className='example'>
							Republican rejecting one city in Nevada (4)
						</p>
						<div className='explanation'>
							<p
								style={{
									fontWeight: '500',
									marginBottom: '0.5rem',
									fontStyle: 'italic',
								}}
							>
								This clue combines a charade with a reversal
							</p>
							<ul className='mt-0'>
								<li>
									The definition is <strong>CITY IN NEVADA</strong>
								</li>
								<li>
									<strong>REPUBLICAN</strong> can be <strong>R</strong>
								</li>
								<li>
									<strong>REJECTING</strong> indicates a reversal of{' '}
									<strong>ONE</strong>, giving us <strong>ENO</strong>
								</li>
							</ul>
							<p className='text-center'>
								<strong>R</strong> + <strong>ENO</strong> ={' '}
								<strong>RENO</strong>
							</p>
							<div className='solution'>
								<span className='letter'>t</span>
								<span className='letter'>o</span>
								<span className='letter'>n</span>
								<span className='letter'>a</span>
								<span className='letter'>l</span>
							</div>
						</div>
					</div>

					<div className='example-container'>
						<p className='example'>
							Caressed, Don excitedly bolted outside (7)
						</p>
						<div className='explanation'>
							<p
								style={{
									fontWeight: '500',
									marginBottom: '0.5rem',
									fontStyle: 'italic',
								}}
							>
								This clue combines an anagram with a container
							</p>
							<ul className='mt-0'>
								<li>
									The definition is <strong>Caressed</strong>
								</li>
								<li>
									<strong>bolted</strong> can be <strong>fled</strong>
								</li>
								<li>
									<strong>outside</strong> indicates a container involving{' '}
									<strong>fled</strong>
								</li>
								<li>
									<strong>excitedly</strong> indicates an anagram of{' '}
									<strong>don</strong>, giving us <strong>ond</strong>
								</li>
							</ul>
							<p className='text-center'>
								<strong>f</strong>(<strong>ond</strong>)<strong>led</strong> ={' '}
								<strong>fondled</strong>
							</p>
							<div className='solution'>
								<span className='letter'>f</span>
								<span className='letter'>o</span>
								<span className='letter'>n</span>
								<span className='letter'>d</span>
								<span className='letter'>l</span>
								<span className='letter'>e</span>
								<span className='letter'>d</span>
							</div>
						</div>
					</div>
				</div>

				<div className='learn-section'>
					<ButtonContainer btnArr={btnArr} />
				</div>
			</div>
		</Layout>
	)
}

export default Combination
