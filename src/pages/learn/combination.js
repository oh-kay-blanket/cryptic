import React, { useEffect } from 'react'
import Layout from '../../components/layout'
import ButtonContainer from '../../components/bottom/ButtonContainer'
import { ClueTypeIcon } from '../../components/ClueTypeIcons'

const Combination = () => {
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
		<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='1.5' strokeLinecap='round'>
			<path d='M18.8 12.1c-4.5-.1-9 .1-13.5-.1' />
			<path d='M11.2 5.2c-2 2.2-4.1 4.4-6.1 6.6 2.1 2.3 4.2 4.5 6.3 6.8' />
		</svg>
	)

	const ArrowRightIcon = (
		<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='1.5' strokeLinecap='round'>
			<path d='M5.2 12.1c4.5-.1 9 .1 13.5-.1' />
			<path d='M12.8 5.2c2 2.2 4.1 4.4 6.1 6.6-2.1 2.3-4.2 4.5-6.3 6.8' />
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
		<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='1.5' strokeLinecap='round'>
			<path d='M3.2 3.1c2-.1 4.1.1 6.1-.1.5.1.9.5.9 1-.1 1.8.1 3.7-.1 5.5-.1.5-.5.9-1 .9-1.8-.1-3.7.1-5.5-.1-.5-.1-.9-.5-.9-1 .1-1.8-.1-3.7.1-5.5.1-.4.4-.7.9-.7' />
			<path d='M14.2 3.2c2-.1 4.1.1 6.1-.1.5.1.9.5.9 1-.1 1.8.1 3.7-.1 5.5-.1.5-.5.9-1 .9-1.8-.1-3.7.1-5.5-.1-.5-.1-.9-.5-.9-1 .1-1.8-.1-3.7.1-5.5.1-.4.4-.7.9-.7' />
			<path d='M3.1 14.2c2-.1 4.1.1 6.1-.1.5.1.9.5.9 1-.1 1.8.1 3.7-.1 5.5-.1.5-.5.9-1 .9-1.8-.1-3.7.1-5.5-.1-.5-.1-.9-.5-.9-1 .1-1.8-.1-3.7.1-5.5.1-.4.5-.7 1-.7' />
			<path d='M14.1 14.1c2-.1 4.1.1 6.1-.1.5.1.9.5.9 1-.1 1.8.1 3.7-.1 5.5-.1.5-.5.9-1 .9-1.8-.1-3.7.1-5.5-.1-.5-.1-.9-.5-.9-1 .1-1.8-.1-3.7.1-5.5.1-.4.5-.7 1-.7' />
		</svg>
	)

	// buttons
	const buttons = {
		easyClue: {
			path: '/clues',
			name: 'Browse all clues',
			style: 'primary',
			img: ListIcon,
		},
		prev: {
			path: '/learn/lit',
			name: '& Lit.',
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
	}
	const btnArr1 = [buttons.easyClue]
	const btnArr2 = [buttons.prev, buttons.learn]

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
					<h1 className='text-3xl font-bold my-4 flex items-center gap-3'>Combination <ClueTypeIcon type="combination" className="w-8 h-8" /></h1>
					<p className='my-2'>
						It's common for a clue to employ more than one type of wordplay—a
						single clue will often involve two, or sometimes even three (or
						more) varieties.
					</p>
				</div>

				<div className='learn-section'>
					<h2 className='text-xl font-bold my-4'>Example</h2>
					<div className='example-container'>
						<p className='example'>
							Republican rejecting one city in Nevada (4)
						</p>
						<div className='explanation dark:!bg-neutral-700 dark:!text-neutral-100'>
							<p
								style={{
									fontWeight: '500',
									marginBottom: '0.5rem',
									fontStyle: 'italic',
								}}
							>
								This clue combines a charade with a reversal
							</p>
							<ul className='mt-0 list-disc my-3'>
								<li>
									<strong>City in Nevada</strong> is the definition
								</li>
								<li>
									<strong>REPUBLICAN</strong> can be <strong>R</strong>
								</li>
								<li>
									<strong>REJECTING</strong> indicates a reversal of{' '}
									<strong>ONE</strong>, giving us <strong>ENO</strong>
								</li>
							</ul>
							<p className='text-center'>
								<strong>R</strong> + <strong>ENO</strong> ={' '}
								<strong>RENO</strong>
							</p>
							<div className='solution'>
								<span className='letter'>t</span>
								<span className='letter'>o</span>
								<span className='letter'>n</span>
								<span className='letter'>a</span>
								<span className='letter'>l</span>
							</div>
						</div>
					</div>

					<div className='example-container'>
						<p className='example'>
							Caressed, Don excitedly bolted outside (7)
						</p>
						<div className='explanation dark:!bg-neutral-700 dark:!text-neutral-100'>
							<p
								style={{
									fontWeight: '500',
									marginBottom: '0.5rem',
									fontStyle: 'italic',
								}}
							>
								This clue combines an anagram with a container
							</p>
							<ul className='mt-0 list-disc my-3'>
								<li>
									<strong>Caressed</strong> is the definition
								</li>
								<li>
									<strong>bolted</strong> can be <strong>fled</strong>
								</li>
								<li>
									<strong>outside</strong> indicates a container involving{' '}
									<strong>fled</strong>
								</li>
								<li>
									<strong>excitedly</strong> indicates an anagram of{' '}
									<strong>don</strong>, giving us <strong>ond</strong>
								</li>
							</ul>
							<p className='text-center'>
								<strong>f</strong>(<strong>ond</strong>)<strong>led</strong> ={' '}
								<strong>fondled</strong>
							</p>
							<div className='solution'>
								<span className='letter'>f</span>
								<span className='letter'>o</span>
								<span className='letter'>n</span>
								<span className='letter'>d</span>
								<span className='letter'>l</span>
								<span className='letter'>e</span>
								<span className='letter'>d</span>
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

export default Combination

export const Head = () => (
	<>
		<title>Combination Clues in Cryptic Crosswords - How to Solve | Learn Cryptic</title>
		<meta
			name="description"
			content="Learn how to solve combination clues in cryptic crosswords. Many clues use multiple wordplay types together. See examples combining anagrams, charades, and more."
		/>
		<link rel="canonical" href="https://learncryptic.com/learn/combination" />
		<meta property="og:type" content="article" />
		<meta property="og:url" content="https://learncryptic.com/learn/combination" />
		<meta property="og:title" content="Combination Clues in Cryptic Crosswords - How to Solve" />
		<meta property="og:description" content="Learn how to solve combination clues. Many clues use multiple wordplay types together." />
		<meta property="og:image" content="https://learncryptic.com/social.jpg" />
		<meta name="twitter:card" content="summary_large_image" />
		<script type="application/ld+json">
			{JSON.stringify({
				"@context": "https://schema.org",
				"@type": "Article",
				"headline": "How to Solve Combination Clues in Cryptic Crosswords",
				"description": "Learn how to solve combination clues in cryptic crosswords. Many clues use multiple wordplay types together. See examples combining anagrams, charades, and more.",
				"author": { "@type": "Organization", "name": "Learn Cryptic" },
				"publisher": { "@type": "Organization", "name": "Learn Cryptic", "url": "https://learncryptic.com" },
				"mainEntityOfPage": "https://learncryptic.com/learn/combination",
				"breadcrumb": {
					"@type": "BreadcrumbList",
					"itemListElement": [
						{ "@type": "ListItem", "position": 1, "name": "Home", "item": "https://learncryptic.com" },
						{ "@type": "ListItem", "position": 2, "name": "Learn", "item": "https://learncryptic.com/learn" },
						{ "@type": "ListItem", "position": 3, "name": "Combination" }
					]
				}
			})}
		</script>
	</>
)
