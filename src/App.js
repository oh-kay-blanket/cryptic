import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// pages
import Title from './pages/Title'
import TopBar from './components/TopBar'
import Learn from './pages/Learn'
import Clues from './pages/Clues' 
import Clue from './pages/Clue'
import NotFound from './pages/NotFound';

// learn
import Anagram from './pages/learn/Anagram'
import Charade from './pages/learn/Charade'
import Container from './pages/learn/Container'
import Deletion from './pages/learn/Deletion'
import DoubleDefinition from './pages/learn/DoubleDefinition'
import HiddenWord from './pages/learn/HiddenWord'
import Homophone from './pages/learn/Homophone'
import Initialism from './pages/learn/Initialism'
import LetterBank from './pages/learn/LetterBank'
import Reversal from './pages/learn/Reversal'
import Spoonerism from './pages/learn/Spoonerism'
import Lit from './pages/learn/Lit'
import Combination from './pages/learn/Combination'

// hooks
import manageStorage from './utils/state/manageStorage'

import cluesData from './assets/clues.json'

const App = () => {


	let { completedClues, addCompletedClue, showType, setShowType, typeViewed, setTypeViewed, returnLearn, setReturnLearn } = manageStorage()

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

export default App