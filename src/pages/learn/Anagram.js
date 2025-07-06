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
		<li key={index} className='indicator dark:!bg-[#47387b] dark:!text-white'>
			{indicator.toLowerCase()}
		</li>
	))

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
					<h2 className='text-4xl font-bold my-4'>Anagram</h2>
					<p className='my-2'>
						Reorder the letters of a given word (or words) to make a new word
						(or words).
					</p>
				</div>

				<div className='learn-section'>
					<h2 className='text-2xl font-bold my-4'>Indicators</h2>
					<p className='my-2'>
						An indicator will tip you off to the presence of an anagram. Common
						indicators include:
					</p>
					<ul className='indicators mt-3'>{indicators}</ul>
				</div>

				<div className='learn-section'>
					<h2 className='text-2xl font-bold my-4'>Examples</h2>
					<div className='example-container'>
						<p className='example'>One unusual role in "The Matrix" (3)</p>
						<div className='explanation dark:!bg-neutral-700 dark:!text-neutral-100'>
							<ul className='mt-0 list-disc my-3'>
								<li>
									The definition is <strong>role in "The Matrix"</strong>
								</li>
								<li>
									<strong>unusual</strong> is a signal to anagram the letters in{' '}
									<strong>One</strong>
								</li>
							</ul>
							<p className='text-center'>
								<strong>one</strong> → <strong>neo</strong>
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
						<div className='explanation dark:!bg-neutral-700 dark:!text-neutral-100'>
							<ul className='mt-0 list-disc my-3'>
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

export default Anagram
