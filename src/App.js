import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// pages
import Title from './pages/Title'
import TopBar from './components/TopBar'
import Learn from './pages/Learn'
import AllClues from './pages/All-Clues' 
import ClueContainer from './pages/Clue'

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

// components
import Bottom from './components/Bottom'

// hooks
import manageState from './utils/state/manageState'
import manageHints from './utils/state/manageHints'
import manageInput from './utils/state/manageInput'

const App = () => {

	let { clues, activeClue, setclueId, completedClues, addCompletedClue, mode, setMode, showType, setShowType, stats, setStats, typeViewed, setTypeViewed, returnLearn, setReturnLearn } = manageState()
	let { nextHint, setNextHint, showMessage, setShowMessage } = manageHints(activeClue, setCheckAns)
	let { input, setInput, handleInput, checkAns, setCheckAns } = manageInput(activeClue)


    return (
		<BrowserRouter>
      		<Routes>

				<Route path="/" element={
					<Title
						clues={clues}
						setMode={setMode}
						setclueId={setclueId}
						completedClues={completedClues}
					/>
				} />

				<Route path="learn" element={<TopBar
						setMode={setMode}
						setShowMessage={setShowMessage}
						setNextHint={setNextHint}
						setclueId={setclueId}
						setInput={setInput}
						setReturnLearn={setReturnLearn}
						setStats={setStats}
					/>
				}>
					<Route index element={
						<Learn
							clues={clues}
							setMode={setMode}
							setclueId={setclueId}
							setInput={setInput}
							setCheckAns={setCheckAns}
							typeViewed={typeViewed}
							setTypeViewed={setTypeViewed}
							setReturnLearn={setReturnLearn}
						/>
					} />
					<Route path="anagram" element={
						<Anagram setclueId={setclueId} setInput={setInput} setCheckAns={setCheckAns} setMode={setMode} setReturnLearn={setReturnLearn} />
					} />
					<Route path="charade" element={
						<Charade setclueId={setclueId} setInput={setInput} setCheckAns={setCheckAns} setMode={setMode} setReturnLearn={setReturnLearn} />
					} />
					<Route path="container" element={
						<Container setclueId={setclueId} setInput={setInput} setCheckAns={setCheckAns} setMode={setMode} setReturnLearn={setReturnLearn} />
					} />
					<Route path="deletion" element={
						<Deletion setclueId={setclueId} setInput={setInput} setCheckAns={setCheckAns} setMode={setMode} setReturnLearn={setReturnLearn} />
					} />
					<Route path="double-definition" element={
						<DoubleDefinition setclueId={setclueId} setInput={setInput} setCheckAns={setCheckAns} setMode={setMode} setReturnLearn={setReturnLearn} />
					} />
					<Route path="hidden-word" element={
						<HiddenWord setclueId={setclueId} setInput={setInput} setCheckAns={setCheckAns} setMode={setMode} setReturnLearn={setReturnLearn} />
					} />
					<Route path="homophone" element={
						<Homophone setclueId={setclueId} setInput={setInput} setCheckAns={setCheckAns} setMode={setMode} setReturnLearn={setReturnLearn} />
					} />
					<Route path="initialism" element={
						<Initialism setclueId={setclueId} setInput={setInput} setCheckAns={setCheckAns} setMode={setMode} setReturnLearn={setReturnLearn} />
					} />
					<Route path="letter-bank" element={
						<LetterBank setclueId={setclueId} setInput={setInput} setCheckAns={setCheckAns} setMode={setMode} setReturnLearn={setReturnLearn} />
					} />
					<Route path="reversal" element={
						<Reversal setclueId={setclueId} setInput={setInput} setCheckAns={setCheckAns} setMode={setMode} setReturnLearn={setReturnLearn} />
					} />
					<Route path="spoonerism" element={
						<Spoonerism setclueId={setclueId} setInput={setInput} setCheckAns={setCheckAns} setMode={setMode} setReturnLearn={setReturnLearn} />
					} />
					<Route path="lit" element={
						<Lit setclueId={setclueId} setInput={setInput} setCheckAns={setCheckAns} setMode={setMode} setReturnLearn={setReturnLearn} />
					} />
					<Route path="combination" element={
						<Combination setclueId={setclueId} setInput={setInput} setCheckAns={setCheckAns} setMode={setMode} setReturnLearn={setReturnLearn} />
					} />
				</Route>

				<Route path="clues" element={
					<TopBar
						setMode={setMode}
						setShowMessage={setShowMessage}
						setNextHint={setNextHint}
						setclueId={setclueId}
						setInput={setInput}
						setReturnLearn={setReturnLearn}
						setStats={setStats}
					/>
				}>
					<Route index element={
						<AllClues
							clues={clues}
							setclueId={setclueId}
							setMode={setMode}
							completedClues={completedClues}
							setInput={setInput}
							setCheckAns={setCheckAns}
							stats={stats}
						/>
					} />

					<Route path="clue" element={<>
						<ClueContainer 
							clues={clues}
							activeClue={activeClue}
							nextHint={nextHint}
							showMessage={showMessage}
							input={input}
							checkAns={checkAns}
							showType={showType}
							setShowType={setShowType}
							stats={stats}
						/>
						<Bottom
							showMessage={showMessage}
							setShowMessage={setShowMessage}
							nextHint={nextHint}
							setNextHint={setNextHint}
							activeClue={activeClue}
							setclueId={setclueId}
							setMode={setMode}
							addCompletedClue={addCompletedClue}
							handleInput={handleInput}
							input={input}
							setInput={setInput}
							checkAns={checkAns}
							setCheckAns={setCheckAns}
							stats={stats}
							setStats={setStats}
							returnLearn={returnLearn}
							setReturnLearn={setReturnLearn}
						/>
					</>} />
				</Route>
				{/* <Route path="*" element={<NotFound />} /> */}
			</Routes>
		</BrowserRouter>
	)
}

export default App