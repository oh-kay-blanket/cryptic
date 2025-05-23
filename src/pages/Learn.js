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
			<li key={type.id} className={isViewed ? 'viewed' : ''}>
				<Link to={type.id}>{type.name}</Link>
			</li>
		)
	})

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
				<div className='learn-section'>
					<h2 className='learn-question'>What is a cryptic crossword?</h2>
					<p className='learn-answer'>
						A “cryptic,” or “British-style” crossword is one in which each clue
						is a puzzle in itself, involving wordplay such as anagrams,
						homophones, hidden words, and other devilish tricks.
						<br />
						Each clue reads as a sentence, but it’s important to recognize that
						the meaning of the sentence—its “surface reading”—is not important.
						Rather, the clue hints at the answer in two different ways, and thus
						is composed of two parts:
					</p>
					<ul className='no-dec'>
						<li className='mt-3'>
							<p>
								<strong>Definition</strong>
							</p>
							<p>
								The rest of the clue is a sort of enigmatic hint, in which
								wordplay gives a second path to the answer.
							</p>
						</li>
						<li className='mt-3'>
							<p>
								<strong>Wordplay</strong>
							</p>
							<p>
								A cryptic hint involving anagrams, reversals, hidden words,
								homophones, or other forms of word manipulation.
							</p>
						</li>
					</ul>
					<p>
						<strong>Example</strong>
					</p>
					<div className='example-container'>
						<p className='example'>Wild West goulash (4)</p>
						<div className='explanation'>
							<ul className='mt-0'>
								<li>
									The definition part is <strong>GOULASH</strong>
								</li>
								<li>
									<strong>WILD</strong> indicates an anagram—picture the letters
									in the word <strong>WEST</strong> “going wild”
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
					<h2 className='learn-question'>What is Learn Cryptic?</h2>
					<p className='learn-answer'>
						Learn Cryptic is a daily game that teaches the cryptic-curious how
						to decipher clues.
						<br />
						As with regular American-style crosswords, it takes a lot of
						practice to get good at solving cryptic puzzles. For beginners, the
						learning curve can be steep. To help guide you to the answer, the
						app has two kinds of hints:
					</p>
					<ul className='no-dec'>
						<li className='mt-3'>
							<p>
								<strong>Clue type</strong>
							</p>
							<p>
								At the top left of the screen, purple pills tell you the type(s)
								of wordplay used. A single clue can use as many as four
								different types of wordplay! Hover over or tap the pills to see
								a brief description and example of each type.
							</p>
							<img className='border' src={typePill} alt='' />
						</li>
						<li className='mt-3'>
							<p>
								<strong>Hints</strong>
							</p>
							<p>
								The "Show hint" and "Reveal solution" buttons guide you through
								each step of deciphering the clue.
							</p>
							<img className='border' src={showHint} alt='' />
						</li>
					</ul>
				</div>

				<div id='learn-types' className='learn-section'>
					<h2 className='learn-question'>
						What different types of wordplay will I find?
					</h2>
					<p className='learn-answer'>Tap a type below to learn more:</p>
					<ul className='learn-types no-dec'>{types}</ul>
				</div>

				<div className='learn-section'>
					<h2 className='learn-question'>Anything else I need to know?</h2>
					<ul className='learn-answer'>
						<li>
							A new clue is released each day. Access past clues from the main
							menu via the “See all clues” button.
						</li>
						<li>
							For each day’s clue, the app keeps track of how many guesses it
							took you to find the solution, and how many hints you used.{' '}
						</li>
						<li>
							Tap the eye icon in the top left to hide or reveal the purple
							pills that indicate the clue type(s).
						</li>
						<li>
							If you’ve correctly guessed the answer but you’re not sure how the
							clue works, press the “Show logic” button to be guided through the
							steps.
						</li>
						<li>
							Share your results with friends using the “Share score” button.
						</li>
					</ul>
					<p>Now let’s dive in and try a few clues!</p>
					<ButtonContainer btnArr={btnArr} stack={true} />
				</div>
			</div>
		</Layout>
	)
}

export default Learn
