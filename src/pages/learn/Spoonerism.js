import React, { useContext, useEffect } from 'react'
import Layout from '../../components/layout'
import { UserContext } from '../../utils/UserContext'
import ButtonContainer from '../../components/bottom/ButtonContainer'

const Spoonerism = () => {
	const { typeViewed, setTypeViewed, setReturnLearn } = useContext(UserContext)

	const hasBeenViewed = typeViewed.find((viewed) => viewed === 'spoonerism')
	useEffect(() => {
		if (!hasBeenViewed && typeof setTypeViewed === 'function') {
			setTypeViewed('spoonerism')
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
			path: '/clues/192',
			name: 'Play a spoonerism clue',
			style: 'primary',
			onClick: function () {
				setReturnLearn('spoonerism')
			},
		},
		return: {
			path: '/learn#learn-types',
			name: 'Back to Learn',
			style: 'secondary',
		},
		next: {
			path: '/learn/lit',
			name: 'Next (& Lit.)',
			style: 'alt',
		},
	}
	const btnArr1 = [buttons.easyClue]
	const btnArr2 = [buttons.return, buttons.next]

	// Handle anchor link
	useEffect(() => {
		if (
			typeof window !== 'undefined' &&
			window.location.hash &&
			window.location.hash.length > 1
		) {
			const hash = window.location.hash

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
		} else {
			document.body.scrollTo(0, 0)
		}
	}, [])

	return (
		<Layout>
			<div className='learn container'>
				{backButton}

				<div className='learn-section'>
					<h1>Spoonerism</h1>
					<p>
						Swap the sounds at beginnings of two words. Named for a British
						Oxford don, Reverend William Archibald Spooner (1844–1930), who was
						reputed to make this speaking error with some frequency. A
						spoonerism clue will make reference to Reverend Spooner.
					</p>
				</div>

				<div className='learn-section'>
					<h2>Example</h2>

					<div className='example-container'>
						<p className='example'>
							Restaurant supervisors marry bigots, per Rev. Spooner (4,7)
						</p>
						<div className='explanation'>
							<ul className='mt-0'>
								<li>
									The definition is <strong>Restaurant supervisors</strong>
								</li>
								<li>
									<strong>marry</strong> can be <strong>wed</strong>
								</li>
								<li>
									<strong>bigots</strong> can be <strong>haters</strong>
								</li>
								<li>
									<strong>per Rev. Spooner</strong> indicates a spoonerism
								</li>
							</ul>
							<p className='text-center'>
								<strong>wed haters</strong> → <strong>head waiters</strong>
							</p>
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

export default Spoonerism
