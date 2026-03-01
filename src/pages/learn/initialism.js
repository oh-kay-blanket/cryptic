import React, { useEffect } from 'react'
import Layout from '../../components/layout'
import ButtonContainer from '../../components/bottom/ButtonContainer'
import { ClueTypeIcon } from '../../components/ClueTypeIcons'

const Initialism = () => {
	const backButton = (
		<button onClick={() => window.history.back()} aria-label='Go back'>
			<svg
				className='back-button text-neutral-600 dark:text-neutral-400'
				xmlns='http://www.w3.org/2000/svg'
				width='25px'
				height='25px'
				viewBox='0 0 24 24'
				fill='none'
				stroke='currentColor'
				strokeWidth='2'
				strokeLinecap='round'
				strokeLinejoin='round'
			>
				{/* Hand-drawn back arrow */}
				<path d='M19.1 12.2 Q12.1 12.4 5.2 11.9' />
				<path d='M11.3 5.3 L5.1 12.1 L11.1 18.8' />
			</svg>
		</button>
	)

	// Icon components
	const PlayIcon = (
		<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='currentColor' stroke='currentColor' strokeWidth='1.5' strokeLinecap='round' strokeLinejoin='round'>
			{/* Hand-drawn play triangle with organic edges */}
			<path d='M7.2 4.2 Q7.1 12.1 7.3 19.7 Q13.2 15.9 19.2 12.1 Q13.3 8.2 7.2 4.2'/>
		</svg>
	)
	const ArrowLeftIcon = (
		<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='1.5' strokeLinecap='round' strokeLinejoin='round'>
			{/* Hand-drawn back arrow */}
			<path d='M19.2 12.3c-2.3-.1-4.6.2-6.9-.1-2.4.2-4.7-.1-7.1.1' />
			<path d='M10.8 5.2c-1.8 2.3-3.7 4.5-5.6 6.8 1.9 2.4 3.9 4.6 5.7 7.1' />
		</svg>
	)

	const ArrowRightIcon = (
		<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'>
			{/* Hand-drawn next arrow */}
			<path d='M4.9 11.8 Q11.9 11.6 18.8 12.1' />
			<path d='M12.7 5.3 L18.9 12.1 L12.9 18.8' />
		</svg>
	)

	const ListIcon = (
		<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none'>
			<path d='M3.5 4.8c.6-.2 1.3.2 1.5.8.3.6 0 1.3-.5 1.6-.6.3-1.3.1-1.6-.5-.4-.6-.1-1.4.6-1.9' fill='currentColor' />
			<path d='M3.6 11.4c.6-.2 1.3.1 1.6.6.3.6.1 1.3-.4 1.7-.6.3-1.3.1-1.7-.5-.3-.6-.1-1.3.5-1.8' fill='currentColor' />
			<path d='M3.5 17.8c.6-.2 1.3.1 1.6.7.3.6 0 1.3-.5 1.6-.6.3-1.3 0-1.6-.6-.3-.6 0-1.3.5-1.7' fill='currentColor' />
			<path d='M8.2 5.9c4.4.1 8.8-.1 13.2.1' stroke='currentColor' strokeWidth='2.5' strokeLinecap='round' />
			<path d='M8.1 12.1c4.4-.1 8.9.1 13.3-.1' stroke='currentColor' strokeWidth='2.5' strokeLinecap='round' />
			<path d='M8.2 18.2c4.4.1 8.8-.1 13.2.1' stroke='currentColor' strokeWidth='2.5' strokeLinecap='round' />
		</svg>
	)

	const GridIcon = (
		<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'>
			{/* Hand-drawn 2x2 grid */}
			<path d='M3.2 3.1c2-.1 4.1.1 6.1-.1.5.1.9.5.9 1-.1 1.8.1 3.7-.1 5.5-.1.5-.5.9-1 .9-1.8-.1-3.7.1-5.5-.1-.5-.1-.9-.5-.9-1 .1-1.8-.1-3.7.1-5.5.1-.4.4-.7.9-.7' />
			<path d='M14.2 3.2c2-.1 4.1.1 6.1-.1.5.1.9.5.9 1-.1 1.8.1 3.7-.1 5.5-.1.5-.5.9-1 .9-1.8-.1-3.7.1-5.5-.1-.5-.1-.9-.5-.9-1 .1-1.8-.1-3.7.1-5.5.1-.4.4-.7.9-.7' />
			<path d='M3.1 14.2c2-.1 4.1.1 6.1-.1.5.1.9.5.9 1-.1 1.8.1 3.7-.1 5.5-.1.5-.5.9-1 .9-1.8-.1-3.7.1-5.5-.1-.5-.1-.9-.5-.9-1 .1-1.8-.1-3.7.1-5.5.1-.4.5-.7 1-.7' />
			<path d='M14.1 14.1c2-.1 4.1.1 6.1-.1.5.1.9.5.9 1-.1 1.8.1 3.7-.1 5.5-.1.5-.5.9-1 .9-1.8-.1-3.7.1-5.5-.1-.5-.1-.9-.5-.9-1 .1-1.8-.1-3.7.1-5.5.1-.4.5-.7 1-.7' />
		</svg>
	)

	// buttons
	const buttons = {
		easyClue: {
			path: '/clues?type=initialism',
			name: 'Browse initialism clues',
			style: 'primary',
			img: ListIcon,
		},
		prev: {
			path: '/learn/homophone',
			name: 'Homophone',
			style: 'secondary',
			img: ArrowLeftIcon,
			stack: true,
		},
		learn: {
			path: '/learn#learn-types',
			name: 'All Types',
			style: 'secondary',
			img: GridIcon,
			stack: true,
		},
		next: {
			path: '/learn/letter-bank',
			name: 'Letter Bank',
			style: 'alt',
			img: ArrowRightIcon,
			stack: true,
		},
	}
	const btnArr1 = [buttons.easyClue]
	const btnArr2 = [buttons.prev, buttons.learn, buttons.next]

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
					<h1 className='text-3xl font-bold my-4 flex items-center gap-3'>Initialism <ClueTypeIcon type="initialism" className="w-8 h-8" /></h1>
					<p className='my-2'>
						The first (or last, or even middle) letters of series of words form
						the answer.
					</p>
				</div>

				<div className='learn-section'>
					<h2 className='text-xl font-bold my-4'>Indicators</h2>
					<p className='my-2'>Common initialism indicators include:</p>
					<ul className='indicators'>{indicators}</ul>
				</div>

				<div className='learn-section'>
					<h2 className='text-xl font-bold my-4'>Examples</h2>
					<div className='example-container'>
						<p className='example'>
							Starts to dream about living large amid suburban Texas metropolis
							(6)
						</p>
						<div className='explanation dark:!bg-neutral-700 dark:!text-neutral-100'>
							<ul className='mt-0 list-disc my-3'>
								<li>
									<strong>Texas metropolis</strong> is the definition
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
						<div className='explanation dark:!bg-neutral-700 dark:!text-neutral-100'>
							<ul className='mt-0 list-disc my-3'>
								<li>
									<strong>European capital</strong> is the definition
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

export const Head = () => (
	<>
		<title>Initialism Clues in Cryptic Crosswords - How to Solve | Learn Cryptic</title>
		<meta
			name="description"
			content="Learn how to solve initialism (acrostic) clues in cryptic crosswords. Spot indicators like 'starts', 'first', 'beginnings', and 'ends' with worked examples."
		/>
		<link rel="canonical" href="https://learncryptic.com/learn/initialism" />
		<meta property="og:type" content="article" />
		<meta property="og:url" content="https://learncryptic.com/learn/initialism" />
		<meta property="og:title" content="Initialism Clues in Cryptic Crosswords - How to Solve" />
		<meta property="og:description" content="Learn how to solve initialism clues. First letters of words form the answer." />
		<meta property="og:image" content="https://learncryptic.com/social.jpg" />
		<meta name="twitter:card" content="summary_large_image" />
		<script type="application/ld+json">
			{JSON.stringify({
				"@context": "https://schema.org",
				"@type": "Article",
				"headline": "How to Solve Initialism Clues in Cryptic Crosswords",
				"description": "Learn how to solve initialism (acrostic) clues in cryptic crosswords. Spot indicators like 'starts', 'first', 'beginnings', and 'ends' with worked examples.",
				"author": { "@type": "Organization", "name": "Learn Cryptic" },
				"publisher": { "@type": "Organization", "name": "Learn Cryptic", "url": "https://learncryptic.com" },
				"mainEntityOfPage": "https://learncryptic.com/learn/initialism",
				"breadcrumb": {
					"@type": "BreadcrumbList",
					"itemListElement": [
						{ "@type": "ListItem", "position": 1, "name": "Home", "item": "https://learncryptic.com" },
						{ "@type": "ListItem", "position": 2, "name": "Learn", "item": "https://learncryptic.com/learn" },
						{ "@type": "ListItem", "position": 3, "name": "Initialism" }
					]
				}
			})}
		</script>
	</>
)
