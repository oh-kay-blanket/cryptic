import React, { useState, useRef, useEffect } from 'react'

import ButtonContainer from './bottom/ButtonContainer'
import Anagram from './learn/Anagram'
import Charade from './learn/Charade'
import Container from './learn/Container'
import Deletion from './learn/Deletion'
import DoubleDefinition from './learn/DoubleDefinition'
import HiddenWord from './learn/HiddenWord'
import Homophone from './learn/Homophone'
import Initialism from './learn/Initialism'
import LetterBank from './learn/LetterBank'
import Reversal from './learn/Reversal'
import Spoonerism from './learn/Spoonerism'
import Lit from './learn/Lit'
import Combination from './learn/Combination'

import typePill from '../assets/img/learn/type-pill-reveal.png'
import showHint from '../assets/img/learn/show-hint.png'

const Learn = ({ setMode, setclueId, setInput, setCheckAns, typeViewed, setTypeViewed }) => {

	// buttons
	const buttons = {
		easyClue: {
			name: "Try a clue",
			style: 'secondary',
			onClick: function() {
				setclueId(208)
				setInput([])
				setCheckAns(false)
				setMode('playing')
			}
		}
	}
	const btnArr = [buttons.easyClue]

	// Clue types
	
	const [learnType, setLearnType] = useState('learn');

	const typeSection = useRef(null);
	useEffect(() => {
		// learnType == 'learn' && typeSection.current?.scrollIntoView({ behavior: "smooth" });
	}, [learnType])

	const loadType = (type) => {
		setTypeViewed(type)
		setLearnType(type)
	}
	
	const typesArr = ['Anagram', 'Charade', 'Container', 'Deletion', 'Double Definition', 'Hidden Word', 'Homophone', 'Initialism', 'Letter Bank', 'Reversal', 'Spoonerism', '& Lit.', 'Combination']

	const types = typesArr.map(type => {
		const isViewed = typeViewed.find(viewed => viewed == type)
		return <li className={isViewed ? 'viewed' : ''} onClick={()=>loadType(type)}>{type}</li>
	})

	return (<>
		{ learnType == 'learn' &&
			<div className='learn container'>

				<div className='learn-section'>
					<h2 className='learn-question'>What is a cryptic crossword?</h2>
					<p className='learn-answer'>A cryptic crossword is a type of crossword in which each clue is a puzzle in itself, often involving wordplay, anagrams, homophones, hidden words, or other linguistic tricks. Unlike standard crosswords, where clues are straightforward definitions, cryptic clues typically have two parts:</p>
					<ul className='no-dec'>
						<li><strong>Definition</strong><br></br> A straight or slightly disguised definition of the answer. This will <em>always</em> be at the start or end of the clue.</li>
						<li><strong>Wordplay</strong><br></br> A cryptic hint involving anagrams, reversals, hidden words, homophones, or other forms of word manipulation.</li>
					</ul>
				</div>

				<div className='learn-section'>
					<h2 className='learn-question'>What is Learn Cryptic?</h2>
					<p className='learn-answer'>Learn Cryptic is designed to help you learn to understand and solve cryptic clues. There are two ways you can get help with solving clues:</p>
					<ul className='no-dec'>
						<li><strong>Wordplay used</strong><br></br> At the top of each clue you will see purple pills indicating the type(s) of wordplay used in this clue. Tapping on these will reveal more information about that type.<br></br><img className='' src={typePill} /></li>
						<li><strong>Hints</strong><br></br> The "Show hint" and "Reveal solution" buttons in the clue provide direct guidance as to what steps you will need to take to find the solution.<br></br><img className='' src={showHint} /></li>
					</ul>
				</div>

				<div ref={typeSection} className='learn-section'>
					<h2 className='learn-question'>What differnt types of wordplay will I find?</h2>
					<p className='learn-answer'>Tap each type below to learn more:</p>
					<ul className='learn-types no-dec'>{types}</ul>
				</div>

				<div className='learn-section'>
					<h2 className='learn-question'>Anything else I need to know?</h2>
					<p className='learn-answer'>Now that you understand the basics of how cryptic clues are constructed and are familiar with some of the different types of hints, dive in and try a few! Make sure to use the type pills and hints to help you out along the way.</p>
				</div>

				<div className='learn-section'>
					<ButtonContainer
						btnArr={btnArr}
						stack={true}
					/>
				</div>
			</div>
		}
		{ learnType == 'Charade' && <Charade setLearnType={setLearnType} /> }
		{ learnType == 'Anagram' && <Anagram setLearnType={setLearnType} /> }
		{ learnType == 'Container' && <Container setLearnType={setLearnType} /> }
		{ learnType == 'Deletion' && <Deletion setLearnType={setLearnType} /> }
		{ learnType == 'Double Definition' && <DoubleDefinition setLearnType={setLearnType} /> }
		{ learnType == 'Hidden Word' && <HiddenWord setLearnType={setLearnType} /> }
		{ learnType == 'Homophone' && <Homophone setLearnType={setLearnType} /> }
		{ learnType == 'Initialism' && <Initialism setLearnType={setLearnType} /> }
		{ learnType == 'Letter Bank' && <LetterBank setLearnType={setLearnType} /> }
		{ learnType == 'Reversal' && <Reversal setLearnType={setLearnType} /> }
		{ learnType == 'Spoonerism' && <Spoonerism setLearnType={setLearnType} /> }
		{ learnType == '& Lit.' && <Lit setLearnType={setLearnType} /> }
		{ learnType == 'Combination' && <Combination setLearnType={setLearnType} /> }
	</>)
}


export default Learn;