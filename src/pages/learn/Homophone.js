import React, { useContext, useEffect } from 'react'
import Layout from '../../components/layout'
import { UserContext } from '../../utils/UserContext'
import ButtonContainer from '../../components/bottom/ButtonContainer'

const Homophone = () => {
	const { setReturnLearn, typeViewed, setTypeViewed } = useContext(UserContext)

	const hasBeenViewed = typeViewed.find((viewed) => viewed === 'homophone')
	useEffect(() => {
		if (!hasBeenViewed && typeof setTypeViewed === 'function') {
			setTypeViewed('homophone')
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
			path: '/clues/188',
			name: 'Play a homophone clue',
			style: 'primary',
			onClick: function () {
				setReturnLearn('homophone')
			},
		},
		return: {
			path: '/learn#learn-types',
			name: 'Back to Learn',
			style: 'secondary',
		},
		next: {
			path: '/learn/initialism',
			name: 'Next (Initialism)',
			style: 'alt',
		},
	}
	const btnArr1 = [buttons.easyClue]
	const btnArr2 = [buttons.return, buttons.next]

	const indicatorArr = ['sounds like', 'we hear', 'say', 'said', 'speak']
	const indicators = indicatorArr.map((indicator) => (
		<li className='indicator'>{indicator.toLowerCase()}</li>
	))

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

	return (
		<Layout>
			<div className='learn container'>
				{backButton}

				<div className='learn-section'>
					<h1>Homophone</h1>
					<p>
						Clued words and/or letter(s) sound like the solution when spoken
						aloud.
					</p>
				</div>

				<div className='learn-section'>
					<h2>Indicators</h2>
					<p>Common homophone indicators include:</p>
					<ul className='indicators'>{indicators}</ul>
				</div>

				<div className='learn-section'>
					<h2>Examples</h2>
					<div className='example-container'>
						<p className='example'>Group of lions was snoopy, we hear (5)</p>
						<div className='explanation'>
							<ul className='mt-0'>
								<li>
									The definition is <strong>Group of lions</strong>
								</li>
								<li>
									<strong>we hear</strong> indicates a homophone
								</li>
								<li>
									<strong>was snoopy</strong> can be <strong>pried</strong>
								</li>
							</ul>
							<p className='text-center'>
								<strong>pried</strong> sounds like <strong>pride</strong>
							</p>
							<div className='solution'>
								<span className='letter'>p</span>
								<span className='letter'>r</span>
								<span className='letter'>i</span>
								<span className='letter'>d</span>
								<span className='letter'>e</span>
							</div>
						</div>
					</div>

					<div className='example-container'>
						<p className='example'>
							Produced blooms covered with white powder, say (8)
						</p>
						<div className='explanation'>
							<ul className='mt-0'>
								<li>
									The definition is <strong>Produced blooms</strong>
								</li>
								<li>
									<strong>say</strong> indicates a homophone
								</li>
								<li>
									<strong>covered with white powder</strong> can be{' '}
									<strong>floured</strong>
								</li>
							</ul>
							<p className='text-center'>
								<strong>floured</strong> sounds like <strong>flowered</strong>
							</p>
							<div className='solution'>
								<span className='letter'>f</span>
								<span className='letter'>l</span>
								<span className='letter'>o</span>
								<span className='letter'>w</span>
								<span className='letter'>e</span>
								<span className='letter'>r</span>
								<span className='letter'>e</span>
								<span className='letter'>d</span>
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

export default Homophone
