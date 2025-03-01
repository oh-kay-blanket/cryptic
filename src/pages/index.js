import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router';

// pages
import Title from './Title'
import TopBar from '../components/TopBar'
import Learn from './learn'
import Clues from './Clues' 
import Clue from './Clue'
import NotFound from './404';

// learn
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

// hooks
import useLocalStorage from '../utils/state/useLocalStorage'
import cluesData from '../assets/clues.json'

const IndexPage = () => {


	let { completedClues, addCompletedClue, showType, setShowType, typeViewed, setTypeViewed, returnLearn, setReturnLearn } = useLocalStorage()

    return (
		<BrowserRouter>
      		<Routes>

				<Route path="/" element={
					<Title
						cluesData={cluesData}
						completedClues={completedClues}
					/>
				} />

				<Route path="learn" element={<TopBar
						setReturnLearn={setReturnLearn}
					/>
				}>
					<Route index element={
						<Learn
							typeViewed={typeViewed}
							setTypeViewed={setTypeViewed}
						/>
					} />
					<Route path="anagram" element={ <Anagram setReturnLearn={setReturnLearn} /> } />
					<Route path="charade" element={ <Charade setReturnLearn={setReturnLearn} /> } />
					<Route path="container" element={ <Container setReturnLearn={setReturnLearn} /> } />
					<Route path="deletion" element={ <Deletion setReturnLearn={setReturnLearn} /> } />
					<Route path="double-definition" element={ <DoubleDefinition setReturnLearn={setReturnLearn} /> } />
					<Route path="hidden-word" element={ <HiddenWord setReturnLearn={setReturnLearn} /> } />
					<Route path="homophone" element={ <Homophone setReturnLearn={setReturnLearn} /> } />
					<Route path="initialism" element={ <Initialism setReturnLearn={setReturnLearn} /> } />
					<Route path="letter-bank" element={ <LetterBank setReturnLearn={setReturnLearn} /> } />
					<Route path="reversal" element={ <Reversal setReturnLearn={setReturnLearn} /> } />
					<Route path="spoonerism" element={ <Spoonerism setReturnLearn={setReturnLearn} /> } />
					<Route path="lit" element={ <Lit setReturnLearn={setReturnLearn} /> } />
					<Route path="combination" element={ <Combination setReturnLearn={setReturnLearn} /> } />
				</Route>

				<Route path="clues" element={
					<TopBar
						setReturnLearn={setReturnLearn}
					/>
				}>
					<Route index element={
						<Clues
							cluesData={cluesData}
							completedClues={completedClues}
						/>
					} />

					<Route path=":id" element={<>
						<Clue 
							cluesData={cluesData}
							showType={showType}
							setShowType={setShowType}
							addCompletedClue={addCompletedClue}
							returnLearn={returnLearn}
							setReturnLearn={setReturnLearn}
						/>
					</>} />
				</Route>
				<Route path="*" element={<NotFound />} />
			</Routes>
		</BrowserRouter>
	)
}

export default IndexPage

export { Head } from "../components/Head"