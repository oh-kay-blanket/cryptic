import React, { useContext, useEffect } from 'react'
import Layout from '../../components/layout'
import { UserContext } from '../../utils/UserContext'
import ButtonContainer from '../../components/bottom/ButtonContainer'

const Lit = () => {
	const { setReturnLearn, typeViewed, setTypeViewed } = useContext(UserContext)

	const hasBeenViewed = typeViewed.find((viewed) => viewed === 'lit')
	useEffect(() => {
		if (!hasBeenViewed && typeof setTypeViewed === 'function') {
			setTypeViewed('lit')
		}
	}, [hasBeenViewed, setTypeViewed])

	const backButton = (
		<button onClick={() => window.history.back()} aria-label='Go back'>
			<svg
				className='back-button fill-neutral-600 dark:fill-neutral-400'
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
			path: '/clues/232',
			name: 'Play an & Lit. clue',
			style: 'primary',
			onClick: function () {
				setReturnLearn('lit')
			},
		},
		return: {
			path: '/learn#learn-types',
			name: 'Back to Learn',
			style: 'secondary',
		},
		next: {
			path: '/learn/combination',
			name: 'Next (Combination)',
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
			<div className='learn lc-container'>
				{backButton}

				<div className='learn-section'>
					<h2 className='text-3xl font-bold my-4'>& Lit.</h2>
					<p className='my-2'>
						& Lit. is short for “and literally so,” because the entire clue
						functions as a definition.
					</p>
				</div>

				<div className='learn-section'>
					<h2 className='text-2xl font-bold my-4'>Indicators</h2>
					<p className='my-2'>
						& Lit. clues are always indicated by an exclamation mark (!) at the
						end of the clue. The wordplay element can be any of the other clue
						types (e.g. anagram, charade, container, etc.)
					</p>
				</div>

				<div className='learn-section'>
					<h2 className='text-2xl font-bold my-4'>Examples</h2>
					<div className='example-container'>
						<p className='example'>I only appear manipulated! (6, 5)</p>
						<div className='explanation dark:!bg-neutral-700 dark:!text-neutral-100'>
							<ul className='mt-0 list-disc my-3'>
								<li>
									The definition is <strong>I only appear manipulated</strong>
								</li>
								<li>
									<strong>manipulated</strong> indicates an anagram
								</li>
							</ul>
							<p className='text-center'>
								<strong>I only appear</strong> → <strong>player piano</strong>
							</p>
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
						<p className='example'>
							Starting with a core of knowledge, gain deeper understanding! (5)
						</p>
						<div className='explanation dark:!bg-neutral-700 dark:!text-neutral-100'>
							<ul className='mt-0 list-disc my-3'>
								<li>
									The definition is{' '}
									<strong>
										Starting with a core of knowledge, gain deeper understanding
									</strong>
								</li>
								<li>
									<strong>core of knowledge</strong> can be <strong>l</strong>
								</li>
								<li>
									<strong>gain</strong> can be <strong>earn</strong>
								</li>
							</ul>
							<p className='text-center'>
								<strong>l</strong> + <strong>earn</strong> ={' '}
								<strong>learn</strong>
							</p>
							<div className='solution'>
								<span className='letter'>l</span>
								<span className='letter'>e</span>
								<span className='letter'>a</span>
								<span className='letter'>r</span>
								<span className='letter'>n</span>
							</div>
						</div>
					</div>

					<div id='next' className='mt-4'>
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

export default Lit
