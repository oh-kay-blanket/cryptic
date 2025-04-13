import React, { useContext, useEffect } from 'react'
import { Link } from "gatsby"

import Layout from '../components/Layout'
import ButtonContainer from '../components/bottom/ButtonContainer'

import { UserContext } from '../utils/UserContext'

import typePill from '../assets/img/learn/type-pill-reveal.png'
import showHint from '../assets/img/learn/show-hint.png'
import ex from '../assets/img/learn/example.jpg'

const Learn = () => {

	const { typeViewed } = useContext(UserContext);

	// buttons
	const buttons = {
		easyClue: {
			path: '/clues/208',
			name: "Try a clue",
			style: 'primary'
		}
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
		{ name: 'Combination', id: 'combination' }
	]

	const types = typesArr.map(type => {
		const isViewed = typeViewed.find(viewed => viewed === type.id)
		return <li key={type.id} className={isViewed ? 'viewed' : ''}><Link to={type.id} >{type.name}</Link></li>
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
					<p className='learn-answer'>A cryptic crossword is a type of crossword in which each clue is a puzzle in itself, often involving wordplay, anagrams, homophones, hidden words, or other linguistic tricks. Unlike standard crosswords, where clues are straightforward definitions, cryptic clues typically have two parts:</p>
					<ul className='no-dec'>
						<li className='mt-3'>
							<p><strong>Definition</strong></p>
							<p>A straight or slightly disguised definition of the answer. This will <span className='underline'>always</span> be at the start or end of the clue.</p>
						</li>
						<li className='mt-3'>
							<p><strong>Wordplay</strong></p>
							<p>A cryptic hint involving anagrams, reversals, hidden words, homophones, or other forms of word manipulation.</p>
						</li>
					</ul>
					<p><strong>Example</strong></p>
					<div className='example-container'>
						<div className='example'><img src={ex} alt=""/></div>
						<div className='explanation'>
							<ul className='mt-0'>
								<li>The definition is <strong>poison fungus</strong></li>
								<li><strong>toads</strong> is a synonym for <strong>frogs</strong></li>
								<li><strong>tool</strong> is a synonym for <strong>saw</strong></li>
							</ul>
							<p className='text-center'><strong>toads</strong> + <strong>tool</strong> = <strong>toadstool</strong></p>
							<div className='solution'>
								<span className='letter'>t</span>
								<span className='letter'>o</span>
								<span className='letter'>a</span>
								<span className='letter'>d</span>
								<span className='letter'>s</span>
								<span className='letter'>t</span>
								<span className='letter'>o</span>
								<span className='letter'>o</span>
								<span className='letter'>l</span>
							</div>
						</div>
					</div>
				</div>

				<div className='learn-section'>
					<h2 className='learn-question'>What is Learn Cryptic?</h2>
					<p className='learn-answer'>Learn Cryptic is a  daily game to help you learn about and practice cryptic clues. There are two ways you can get help with solving clues:</p>
					<ul className='no-dec'>
						<li className='mt-3'>
							<p><strong>Wordplay used</strong></p>
							<p>At the top of each clue you will see purple pills indicating the type(s) of wordplay used in this clue. Tapping on these will reveal more information about that type.</p>
							<img className='border' src={typePill} alt="" />
						</li>
						<li className='mt-3'>
							<p><strong>Hints</strong></p>
							<p>The "Show hint" and "Reveal solution" buttons in the clue provide direct guidance as to what steps you will need to take to find the solution.</p>
							<img className='border' src={showHint} alt="" />
						</li>
					</ul>
				</div>

				<div id='learn-types' className='learn-section'>
					<h2 className='learn-question'>What different types of wordplay will I find?</h2>
					<p className='learn-answer'>Tap a type below to learn more:</p>
					<ul className='learn-types no-dec'>{types}</ul>
				</div>

				<div className='learn-section'>
					<h2 className='learn-question'>Anything else I need to know?</h2>
					<p className='learn-answer'>Now that you understand the basics of how cryptic clues are constructed and are familiar with some of the different types of hints, dive in and try a few!</p>
					<ButtonContainer
						btnArr={btnArr}
						stack={true}
					/>
				</div>
			</div>
		</Layout>
	)
}


export default Learn;