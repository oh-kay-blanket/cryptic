import React, { useContext, useEffect } from 'react'
import Layout from '../../components/layout'
import { UserContext } from '../../utils/UserContext'
import ButtonContainer from '../../components/bottom/ButtonContainer'
import { ClueTypeIcon } from '../../components/ClueTypeIcons'

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

	// Icon components
	const PlayIcon = (
		<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='currentColor'>
			<path d='M8 5v14l11-7z'/>
		</svg>
	)

	const ArrowLeftIcon = (
		<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round' viewBox='0 0 24 24'>
			<line x1='19' y1='12' x2='5' y2='12' />
			<polyline points='12 19 5 12 12 5' />
		</svg>
	)

	const ArrowRightIcon = (
		<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round' viewBox='0 0 24 24'>
			<line x1='5' y1='12' x2='19' y2='12' />
			<polyline points='12 5 19 12 12 19' />
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
			path: '/clues/97',
			name: 'Play an anagram clue',
			style: 'primary',
			img: PlayIcon,
			onClick: function () {
				setReturnLearn('anagram')
			},
		},
		learn: {
			path: '/learn#learn-types',
			name: 'All Types',
			style: 'secondary',
			img: ListIcon,
			stack: true,
		},
		next: {
			path: '/learn/charade',
			name: 'Charade',
			style: 'alt',
			img: ArrowRightIcon,
			stack: true,
		},
	}
	const btnArr1 = [buttons.easyClue]
	const btnArr2 = [buttons.learn, buttons.next]

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
					<h1 className='text-4xl font-bold my-4 flex items-center gap-3'>Anagram <ClueTypeIcon type="anagram" className="w-8 h-8" /></h1>
					<p className='my-2'>
						Reorder the letters of a given word (or words) to make a new word
						(or words).
					</p>
				</div>

				<div className='learn-section'>
					<h2 className='text-xl font-bold my-4'>Indicators</h2>
					<p className='my-2'>
						An indicator will tip you off to the presence of an anagram. Common
						indicators include:
					</p>
					<ul className='indicators mt-3'>{indicators}</ul>
				</div>

				<div className='learn-section'>
					<h2 className='text-xl font-bold my-4'>Examples</h2>
					<div className='example-container'>
						<p className='example'>One unusual role in "The Matrix" (3)</p>
						<div className='explanation dark:!bg-neutral-700 dark:!text-neutral-100'>
							<ul className='mt-0 list-disc my-3'>
								<li>
									<strong>Role in "The Matrix"</strong> is the definition
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
									<strong>Three-sided figure</strong> is the definition
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

export const Head = () => (
	<>
		<title>Anagram Clues in Cryptic Crosswords - How to Solve | Learn Cryptic</title>
		<meta
			name="description"
			content="Learn how to solve anagram clues in cryptic crosswords. Discover common anagram indicators like 'broken', 'mad', 'wild', and 'scrambled' with worked examples."
		/>
		<link rel="canonical" href="https://learncryptic.com/learn/anagram" />
		<meta property="og:type" content="article" />
		<meta property="og:url" content="https://learncryptic.com/learn/anagram" />
		<meta property="og:title" content="Anagram Clues in Cryptic Crosswords - How to Solve" />
		<meta property="og:description" content="Learn how to solve anagram clues in cryptic crosswords. Discover common anagram indicators with worked examples." />
		<meta property="og:image" content="https://learncryptic.com/social.jpg" />
		<meta name="twitter:card" content="summary_large_image" />
		<script type="application/ld+json">
			{JSON.stringify({
				"@context": "https://schema.org",
				"@type": "Article",
				"headline": "How to Solve Anagram Clues in Cryptic Crosswords",
				"description": "Learn how to solve anagram clues in cryptic crosswords. Discover common anagram indicators like 'broken', 'mad', 'wild', and 'scrambled' with worked examples.",
				"author": { "@type": "Organization", "name": "Learn Cryptic" },
				"publisher": { "@type": "Organization", "name": "Learn Cryptic", "url": "https://learncryptic.com" },
				"mainEntityOfPage": "https://learncryptic.com/learn/anagram",
				"breadcrumb": {
					"@type": "BreadcrumbList",
					"itemListElement": [
						{ "@type": "ListItem", "position": 1, "name": "Home", "item": "https://learncryptic.com" },
						{ "@type": "ListItem", "position": 2, "name": "Learn", "item": "https://learncryptic.com/learn" },
						{ "@type": "ListItem", "position": 3, "name": "Anagram" }
					]
				}
			})}
		</script>
	</>
)
