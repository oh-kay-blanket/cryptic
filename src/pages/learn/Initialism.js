import React, { useContext, useEffect } from 'react'
import Layout from '../../components/layout'
import { UserContext } from '../../utils/UserContext'
import ButtonContainer from '../../components/bottom/ButtonContainer'

const Initialism = () => {
	const { setReturnLearn, typeViewed, setTypeViewed } = useContext(UserContext)

	const hasBeenViewed = typeViewed.find((viewed) => viewed === 'initialism')
	useEffect(() => {
		if (!hasBeenViewed && typeof setTypeViewed === 'function') {
			setTypeViewed('initialism')
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
			path: '/clues/324',
			name: 'Play an initialism clue',
			style: 'primary',
			onClick: function () {
				setReturnLearn('initialism')
			},
		},
		return: {
			path: '/learn#learn-types',
			name: 'Back to Learn',
			style: 'secondary',
		},
		next: {
			path: '/learn/letter-bank',
			name: 'Next (Letter Bank)',
			style: 'alt',
		},
	}
	const btnArr1 = [buttons.easyClue]
	const btnArr2 = [buttons.return, buttons.next]

	const indicatorArr = [
		'starts',
		'beginnings',
		'first',
		'early',
		'middle',
		'center',
		'core',
		'ends',
		'final',
		'last',
		'ultimate',
	]
	const indicators = indicatorArr.map((indicator) => (
		<li className='indicator'>{indicator.toLowerCase()}</li>
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
					<h2 className='text-3xl font-bold my-4'>Initialism</h2>
					<p className='my-2'>
						The first (or last, or even middle) letters of series of words form
						the answer.
					</p>
				</div>

				<div className='learn-section'>
					<h2 className='text-2xl font-bold my-4'>Indicators</h2>
					<p className='my-2'>Common initialism indicators include:</p>
					<ul className='indicators'>{indicators}</ul>
				</div>

				<div className='learn-section'>
					<h2 className='text-2xl font-bold my-4'>Examples</h2>
					<div className='example-container'>
						<p className='example'>
							Starts to dream about living large amid suburban Texas metropolis
							(6)
						</p>
						<div className='explanation'>
							<ul className='mt-0 list-disc my-3'>
								<li>
									The definition is <strong>Texas metropolis</strong>
								</li>
								<li>
									<strong>Starts to</strong> indicates initialism
								</li>
							</ul>
							<p className='text-center'>
								<strong>d</strong>ream <strong>a</strong>bout <strong>l</strong>
								iving <strong>l</strong>arge <strong>a</strong>mid{' '}
								<strong>s</strong>uburban
							</p>
							<div className='solution'>
								<span className='letter'>d</span>
								<span className='letter'>a</span>
								<span className='letter'>l</span>
								<span className='letter'>l</span>
								<span className='letter'>a</span>
								<span className='letter'>s</span>
							</div>
						</div>
					</div>

					<div className='example-container'>
						<p className='example'>
							European capital starts to open some legislative offices (4)
						</p>
						<div className='explanation'>
							<ul className='mt-0 list-disc my-3'>
								<li>
									The definition is <strong>European capital</strong>
								</li>
								<li>
									<strong>starts to</strong> indicates initialism
								</li>
							</ul>
							<p className='text-center'>
								<strong>o</strong>pen <strong>s</strong>ome <strong>l</strong>
								egislative <strong>o</strong>ffices
							</p>
							<div className='solution'>
								<span className='letter'>o</span>
								<span className='letter'>s</span>
								<span className='letter'>l</span>
								<span className='letter'>o</span>
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

export default Initialism
