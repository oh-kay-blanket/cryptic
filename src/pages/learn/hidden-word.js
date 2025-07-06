import React, { useContext, useEffect } from 'react'
import Layout from '../../components/layout'
import { UserContext } from '../../utils/UserContext'
import ButtonContainer from '../../components/bottom/ButtonContainer'

const HiddenWord = () => {
	const { setReturnLearn, typeViewed, setTypeViewed } = useContext(UserContext)

	const hasBeenViewed = typeViewed.find((viewed) => viewed === 'hidden-word')
	useEffect(() => {
		if (!hasBeenViewed && typeof setTypeViewed === 'function') {
			setTypeViewed('hidden-word')
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
			path: '/clues/2',
			name: 'Play a hidden word clue',
			style: 'primary',
			onClick: function () {
				setReturnLearn('hidden-word')
			},
		},
		return: {
			path: '/learn#learn-types',
			name: 'Back to Learn',
			style: 'secondary',
		},
		next: {
			path: '/learn/homophone',
			name: 'Next (Homophone)',
			style: 'alt',
		},
	}
	const btnArr1 = [buttons.easyClue]
	const btnArr2 = [buttons.return, buttons.next]

	const indicatorArr = [
		'concealed',
		'within',
		'member',
		'held',
		'inside',
		'buried',
		'featured',
		'seen in',
		'stocks',
		'partly',
		'smuggled',
		'sheath',
	]
	const indicators = indicatorArr.map((indicator) => (
		<li className='indicator dark:!bg-[#47387b] dark:!text-white'>{indicator.toLowerCase()}</li>
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
					<h2 className='text-3xl font-bold my-4'>Hidden Word</h2>
					<p className='my-2'>
						The answer is a string of letters embedded in the clue.
					</p>
				</div>

				<div className='learn-section'>
					<h2 className='text-2xl font-bold my-4'>Indicators</h2>
					<p className='my-2'>Common hidden word indicators include:</p>
					<ul className='indicators'>{indicators}</ul>
				</div>

				<div className='learn-section'>
					<h2 className='text-2xl font-bold my-4'>Examples</h2>
					<div className='example-container'>
						<p className='example'>Field in Far East (4)</p>
						<div className='explanation dark:!bg-neutral-700 dark:!text-neutral-100'>
							<ul className='mt-0 list-disc my-3'>
								<li>
									The definition is <strong>Field</strong>
								</li>
								<li>
									<strong>in</strong> indicates a hidden word
								</li>
							</ul>
							<p className='text-center'>
								<strong>f</strong>(<strong>ar ea</strong>)<strong>st</strong>
							</p>
							<div className='solution'>
								<span className='letter'>a</span>
								<span className='letter'>r</span>
								<span className='letter'>e</span>
								<span className='letter'>a</span>
							</div>
						</div>
					</div>

					<div className='example-container'>
						<p className='example'>
							Focus too much on portion of job session (6)
						</p>
						<div className='explanation dark:!bg-neutral-700 dark:!text-neutral-100'>
							<ul className='mt-0 list-disc my-3'>
								<li>
									The definition is <strong>Focus too much on</strong>
								</li>
								<li>
									<strong>portion of</strong> indicates a hidden word
								</li>
							</ul>
							<p className='text-center'>
								<strong>j</strong>(<strong>ob sess</strong>)<strong>ion</strong>
							</p>
							<div className='solution'>
								<span className='letter'>o</span>
								<span className='letter'>b</span>
								<span className='letter'>s</span>
								<span className='letter'>e</span>
								<span className='letter'>s</span>
								<span className='letter'>s</span>
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

export default HiddenWord
