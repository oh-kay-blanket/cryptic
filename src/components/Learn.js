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
import ex from '../assets/img/learn/example.jpg'

const Learn = ({ setMode, setclueId, setInput, setCheckAns, typeViewed, setTypeViewed }) => {

	// buttons
	const buttons = {
		easyClue: {
			name: "Try a clue",
			style: 'primary',
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
						<div className='example'><img src={ex}/></div>
						<div className='explanation'>
							<ul className='mt-0'>
								<li><strong>Frogs</strong> can be <strong>toads</strong></li>
								<li><strong>saw</strong> can be <strong>tool</strong></li>
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
					<p className='learn-answer'>Learn Cryptic is a game to help you learn about and practice cryptic clues. There are two ways you can get help with solving clues:</p>
					<ul className='no-dec'>
						<li className='mt-3'>
							<p><strong>Wordplay used</strong></p>
							<p>At the top of each clue you will see purple pills indicating the type(s) of wordplay used in this clue. Tapping on these will reveal more information about that type.</p>
							<img className='border' src={typePill} />
						</li>
						<li className='mt-3'>
							<p><strong>Hints</strong></p>
							<p>The "Show hint" and "Reveal solution" buttons in the clue provide direct guidance as to what steps you will need to take to find the solution.</p>
							<img className='border' src={showHint} />
						</li>
					</ul>
				</div>

				<div ref={typeSection} className='learn-section'>
					<h2 className='learn-question'>What differnt types of wordplay will I find?</h2>
					<p className='learn-answer'>Tap a type below to learn more:</p>
					<ul className='learn-types no-dec'>{types}</ul>
				</div>

				<div className='learn-section'>
					<h2 className='learn-question'>Anything else I need to know?</h2>
					<p className='learn-answer'>Now that you understand the basics of how cryptic clues are constructed and are familiar with some of the different types of hints, dive in and try a few!</p>
				</div>

				<div className='learn-section'>
					<ButtonContainer
						btnArr={btnArr}
						stack={true}
					/>
				</div>
			</div>
		}
		{ learnType == 'Charade' && <Charade setLearnType={setLearnType} setclueId={setclueId} setInput={setInput} setCheckAns={setCheckAns} setMode={setMode} /> }
		{ learnType == 'Anagram' && <Anagram setLearnType={setLearnType} setclueId={setclueId} setInput={setInput} setCheckAns={setCheckAns} setMode={setMode} /> }
		{ learnType == 'Container' && <Container setLearnType={setLearnType} setclueId={setclueId} setInput={setInput} setCheckAns={setCheckAns} setMode={setMode} /> }
		{ learnType == 'Deletion' && <Deletion setLearnType={setLearnType} setclueId={setclueId} setInput={setInput} setCheckAns={setCheckAns} setMode={setMode} /> }
		{ learnType == 'Double Definition' && <DoubleDefinition setLearnType={setLearnType} setclueId={setclueId} setInput={setInput} setCheckAns={setCheckAns} setMode={setMode} /> }
		{ learnType == 'Hidden Word' && <HiddenWord setLearnType={setLearnType} setclueId={setclueId} setInput={setInput} setCheckAns={setCheckAns} setMode={setMode} /> }
		{ learnType == 'Homophone' && <Homophone setLearnType={setLearnType} setclueId={setclueId} setInput={setInput} setCheckAns={setCheckAns} setMode={setMode} /> }
		{ learnType == 'Initialism' && <Initialism setLearnType={setLearnType} setclueId={setclueId} setInput={setInput} setCheckAns={setCheckAns} setMode={setMode} /> }
		{ learnType == 'Letter Bank' && <LetterBank setLearnType={setLearnType} setclueId={setclueId} setInput={setInput} setCheckAns={setCheckAns} setMode={setMode} /> }
		{ learnType == 'Reversal' && <Reversal setLearnType={setLearnType} setclueId={setclueId} setInput={setInput} setCheckAns={setCheckAns} setMode={setMode} /> }
		{ learnType == 'Spoonerism' && <Spoonerism setLearnType={setLearnType} setclueId={setclueId} setInput={setInput} setCheckAns={setCheckAns} setMode={setMode} /> }
		{ learnType == '& Lit.' && <Lit setLearnType={setLearnType} setclueId={setclueId} setInput={setInput} setCheckAns={setCheckAns} setMode={setMode} /> }
		{ learnType == 'Combination' && <Combination setLearnType={setLearnType} setclueId={setclueId} setInput={setInput} setCheckAns={setCheckAns} setMode={setMode} /> }
	</>)
}


export default Learn;