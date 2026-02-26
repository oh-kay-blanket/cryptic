import React, { useContext, useEffect } from 'react'
import Layout from '../../components/layout'
import { UserContext } from '../../utils/UserContext'
import ButtonContainer from '../../components/bottom/ButtonContainer'
import { ClueTypeIcon } from '../../components/ClueTypeIcons'

const LetterBank = () => {
	const { typeViewed, setTypeViewed } = useContext(UserContext)

	const hasBeenViewed = typeViewed.find((viewed) => viewed === 'letter-bank')
	useEffect(() => {
		if (!hasBeenViewed && typeof setTypeViewed === 'function') {
			setTypeViewed('letter-bank')
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

	// Icon components
	const PlayIcon = (
		<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='currentColor'>
			<path d='M8 5v14l11-7z'/>
		</svg>
	)
	const ArrowLeftIcon = (
		<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round' viewBox='0 0 24 24'>
			<line x1='19' y1='12' x2='5' y2='12' /><polyline points='12 19 5 12 12 5' />
		</svg>
	)
	const ArrowRightIcon = (
		<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round' viewBox='0 0 24 24'>
			<line x1='5' y1='12' x2='19' y2='12' /><polyline points='12 5 19 12 12 19' />
		</svg>
	)
	const ListIcon = (
		<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round' viewBox='0 0 24 24'>
			<line x1='8' y1='6' x2='21' y2='6' /><line x1='8' y1='12' x2='21' y2='12' /><line x1='8' y1='18' x2='21' y2='18' /><line x1='3' y1='6' x2='3.01' y2='6' /><line x1='3' y1='12' x2='3.01' y2='12' /><line x1='3' y1='18' x2='3.01' y2='18' />
		</svg>
	)

	// buttons
	const buttons = {
		easyClue: {
			path: '/clues?type=letter%20bank',
			name: 'Browse letter bank clues',
			style: 'primary',
			img: ArrowRightIcon,
		},
		prev: {
			path: '/learn/initialism',
			name: 'Initialism',
			style: 'secondary',
			img: ArrowLeftIcon,
			stack: true,
		},
		learn: {
			path: '/learn#learn-types',
			name: 'All Types',
			style: 'secondary',
			img: ListIcon,
			stack: true,
		},
		next: {
			path: '/learn/reversal',
			name: 'Reversal',
			style: 'alt',
			img: ArrowRightIcon,
			stack: true,
		},
	}
	const btnArr1 = [buttons.easyClue]
	const btnArr2 = [buttons.prev, buttons.learn, buttons.next]

	const indicatorArr = [
		'repeatedly',
		'often',
		'recurring',
		'looping',
		'cyclical',
		'over and over',
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
					<h1 className='text-3xl font-bold my-4 flex items-center gap-3'>Letter Bank <ClueTypeIcon type="letter-bank" className="w-8 h-8" /></h1>
					<p className='my-2'>
						Letters are rearranged like in an anagram, but the letters in the
						source word(s) can be repeated—think of a "bank" of letters from
						which you can make as many withdrawals as needed.
					</p>
				</div>

				<div className='learn-section'>
					<h2 className='text-xl font-bold my-4'>Indicators</h2>
					<p className='my-2'>Common letter bank indicators include:</p>
					<ul className='indicators'>{indicators}</ul>
				</div>

				<div className='learn-section'>
					<h2 className='text-xl font-bold my-4'>Examples</h2>
					<div className='example-container'>
						<p className='example'>Repeatedly retain host (11)</p>
						<div className='explanation dark:!bg-neutral-700 dark:!text-neutral-100'>
							<ul className='mt-0 list-disc my-3'>
								<li>
									<strong>Host</strong> is the definition
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

export default LetterBank

export const Head = () => (
	<>
		<title>Letter Bank Clues in Cryptic Crosswords - How to Solve | Learn Cryptic</title>
		<meta
			name="description"
			content="Learn how to solve letter bank clues in cryptic crosswords. Like anagrams but letters can repeat. Spot indicators like 'repeatedly' and 'often' with examples."
		/>
		<link rel="canonical" href="https://learncryptic.com/learn/letter-bank" />
		<meta property="og:type" content="article" />
		<meta property="og:url" content="https://learncryptic.com/learn/letter-bank" />
		<meta property="og:title" content="Letter Bank Clues in Cryptic Crosswords - How to Solve" />
		<meta property="og:description" content="Learn how to solve letter bank clues. Like anagrams but letters can be reused multiple times." />
		<meta property="og:image" content="https://learncryptic.com/social.jpg" />
		<meta name="twitter:card" content="summary_large_image" />
		<script type="application/ld+json">
			{JSON.stringify({
				"@context": "https://schema.org",
				"@type": "Article",
				"headline": "How to Solve Letter Bank Clues in Cryptic Crosswords",
				"description": "Learn how to solve letter bank clues in cryptic crosswords. Like anagrams but letters can repeat. Spot indicators like 'repeatedly' and 'often' with examples.",
				"author": { "@type": "Organization", "name": "Learn Cryptic" },
				"publisher": { "@type": "Organization", "name": "Learn Cryptic", "url": "https://learncryptic.com" },
				"mainEntityOfPage": "https://learncryptic.com/learn/letter-bank",
				"breadcrumb": {
					"@type": "BreadcrumbList",
					"itemListElement": [
						{ "@type": "ListItem", "position": 1, "name": "Home", "item": "https://learncryptic.com" },
						{ "@type": "ListItem", "position": 2, "name": "Learn", "item": "https://learncryptic.com/learn" },
						{ "@type": "ListItem", "position": 3, "name": "Letter Bank" }
					]
				}
			})}
		</script>
	</>
)
