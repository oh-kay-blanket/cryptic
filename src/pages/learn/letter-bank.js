import React, { useContext, useEffect } from 'react'
import Layout from '../../components/layout'
import { UserContext } from '../../utils/UserContext'
import ButtonContainer from '../../components/bottom/ButtonContainer'

const LetterBank = () => {
	const { setReturnLearn, typeViewed, setTypeViewed } = useContext(UserContext)

	const hasBeenViewed = typeViewed.find((viewed) => viewed === 'letter-bank')
	useEffect(() => {
		if (!hasBeenViewed && typeof setTypeViewed === 'function') {
			setTypeViewed('letter-bank')
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
			path: '/clues/50',
			name: 'Play a letter bank clue',
			style: 'primary',
			onClick: function () {
				setReturnLearn('letter-bank')
			},
		},
		return: {
			path: '/learn#learn-types',
			name: 'Back to Learn',
			style: 'secondary',
		},
		next: {
			path: '/learn/reversal',
			name: 'Next (Reversal)',
			style: 'alt',
		},
	}
	const btnArr1 = [buttons.easyClue]
	const btnArr2 = [buttons.return, buttons.next]

	const indicatorArr = [
		'repeatedly',
		'often',
		'recurring',
		'looping',
		'cyclical',
		'over and over',
	]
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
					<h1>Letter Bank</h1>
					<p>
						Letters are rearranged like in an anagram, but the letters in the
						source word(s) can be repeated—think of a “bank” of letters from
						which you can make as many withdrawals as needed.
					</p>
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
								<li>
									The definition is <strong>host</strong>
								</li>
								<li>
									<strong>Repeatedly</strong> indicates a letter bank
								</li>
							</ul>
							<p className='text-center'>
								<strong>retain</strong> → <strong>entertainer</strong>
							</p>
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

export default LetterBank
