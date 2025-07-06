import React, { useContext, useEffect } from 'react'
import { Link } from 'gatsby'

import Layout from '../components/layout'
import ButtonContainer from '../components/bottom/ButtonContainer'

import { UserContext } from '../utils/UserContext'

import typePill from '../assets/img/learn/type-pill-reveal.png'
import showHint from '../assets/img/learn/show-hint.png'
import ex from '../assets/img/learn/example.jpg'

const Learn = () => {
	const { typeViewed } = useContext(UserContext)

	// buttons
	const buttons = {
		easyClue: {
			path: '/clues/208',
			name: 'Try a clue',
			style: 'primary',
		},
	}
	const btnArr = [buttons.easyClue]

	const typesArr = [
		{ name: 'Anagram', id: 'anagram' },
		{ name: 'Charade', id: 'charade' },
		{ name: 'Container', id: 'container' },
		{ name: 'Deletion', id: 'deletion' },
		{ name: 'Double Definition', id: 'double-definition' },
		{ name: 'Hidden Word', id: 'hidden-word' },
		{ name: 'Homophone', id: 'homophone' },
		{ name: 'Initialism', id: 'initialism' },
		{ name: 'Letter Bank', id: 'letter-bank' },
		{ name: 'Reversal', id: 'reversal' },
		{ name: 'Spoonerism', id: 'spoonerism' },
		{ name: '& Lit.', id: 'lit' },
		{ name: 'Combination', id: 'combination' },
	]

	const types = typesArr.map((type) => {
		const isViewed = typeViewed.find((viewed) => viewed === type.id)
		return (
			<li key={type.id} className={isViewed ? 'viewed dark:!bg-[#47387b] dark:!border-[#47387b] dark:!text-white' : ''}>
				<Link to={type.id}>{type.name}</Link>
			</li>
		)
	})

	// Handle anchor link
	useEffect(() => {
		if (typeof window !== 'undefined') {
			const hash = window.location.hash
			// Only proceed if hash exists and is not empty
			if (hash && hash.length > 1) {
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
			}
		}
	}, [])

	return (
		<Layout>
			<div className='learn lc-container'>
				<div className='learn-section'>
					<h2 className='text-3xl font-bold my-4'>
						What is a cryptic crossword?
					</h2>
					<p className='my-2'>
						A "cryptic," or "British-style" crossword is one in which each clue
						is a puzzle in itself, involving wordplay such as anagrams,
						homophones, hidden words, and other devilish tricks.
					</p>
					<p className='my-2'>
						Each clue reads as a sentence, but it's important to recognize that
						the meaning of the sentence—its "surface reading"—is not important.
						Rather, the clue hints at the answer in two different ways, and thus
						is composed of two parts:
					</p>
					<ul className='no-dec'>
						<li className='mt-3'>
							<p className='font-bold'>Definition</p>
							<p className='my-2'>
								A straightforward (or thinly or thickly disguised!) definition
								of the answer word(s) appears at the start or end of the clue.
							</p>
						</li>
						<li className='mt-3'>
							<p className='font-bold'>Wordplay</p>
							<p className='my-2'>
								The rest of the clue is a sort of enigmatic hint, in which
								wordplay gives a second path to the answer.
							</p>
						</li>
					</ul>
					<p className='font-bold my-4'>Example</p>
					<div className='example-container'>
						<p className='example'>Wild West goulash (4)</p>
						<div className='explanation dark:!bg-neutral-700 dark:!text-neutral-100'>
							<ul className='mt-0 list-disc my-3'>
								<li>
									The definition part is <strong>GOULASH</strong>
								</li>
								<li>
									<strong>WILD</strong> indicates an anagram—picture the letters
									in the word <strong>WEST</strong> "going wild"
								</li>
								<li>
									<strong>WEST</strong> anagrams to <strong>STEW</strong>,
									defined by <strong>GOULASH</strong>
								</li>
							</ul>
							<p className='text-center'>
								<strong>west</strong> → <strong>stew</strong>
							</p>
							<div className='solution'>
								<span className='letter'>s</span>
								<span className='letter'>t</span>
								<span className='letter'>e</span>
								<span className='letter'>w</span>
							</div>
						</div>
					</div>
				</div>

				<div className='learn-section'>
					<h2 className='text-3xl font-bold my-4'>What is Learn Cryptic?</h2>
					<p className='my-2'>
						Learn Cryptic is a daily game that teaches the cryptic-curious how
						to decipher clues.
					</p>
					<p className='my-2'>
						As with regular American-style crosswords, it takes a lot of
						practice to get good at solving cryptic puzzles. For beginners, the
						learning curve can be steep. To help guide you to the answer, the
						app has two kinds of hints:
					</p>
					<ul className='no-dec'>
						<li className='mt-3'>
							<p className='font-bold'>Clue type</p>
							<p className='my-2'>
								At the top left of the screen, purple pills tell you the type(s)
								of wordplay used. A single clue can use as many as four
								different types of wordplay! Hover over or tap the pills to see
								a brief description and example of each type.
							</p>
							<img className='border' src={typePill} alt='' />
						</li>
						<li className='mt-3'>
							<p className='font-bold'>Hints</p>
							<p className='my-2'>
								The "Show hint" and "Reveal solution" buttons guide you through
								each step of deciphering the clue.
							</p>
							<img className='border' src={showHint} alt='' />
						</li>
					</ul>
				</div>

				<div id='learn-types' className='learn-section'>
					<h2 className='text-3xl font-bold my-4'>
						What different types of wordplay will I find?
					</h2>
					<p className='my-2'>Tap a type below to learn more:</p>
					<ul className='learn-types no-dec'>{types}</ul>
				</div>

				<div className='learn-section'>
					<h2 className='text-3xl font-bold my-4'>
						Anything else I need to know?
					</h2>
					<p className='my-2'>
						A new clue is released each day. Access past clues from the main
						menu via the "See all clues" button.
					</p>
					<p className='my-2'>
						For each day's clue, the app keeps track of how many guesses it took
						you to find the solution, and how many hints you used.
					</p>
					<p className='my-2'>
						Tap the eye icon in the top left to hide or reveal the purple pills
						that indicate the clue type(s).
					</p>
					<p className='my-2'>
						If you've correctly guessed the answer but you're not sure how the
						clue works, press the "Show logic" button to be guided through the
						steps.
					</p>
					<p className='my-2'>
						Share your results with friends using the "Share score" button.
					</p>
					<p className='my-2'>Now let's dive in and try a few clues!</p>
					<div className='mt-4'>
						<ButtonContainer btnArr={btnArr} stack={true} />
					</div>
				</div>
			</div>
		</Layout>
	)
}

export default Learn
