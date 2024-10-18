import moveLetters from "./moveLetters"
import changeColor from './changeColor'
import removeSpecial from "./removeSpecialChar"

const showSolution = (activeClue, nextHint) => {

	const prevHint = activeClue.hints[nextHint-1]
		
	switch(prevHint.category) { 
		case 'anagram':
			moveLetters(prevHint.addLetters.ref.current.slice(0,prevHint.end.value[0].length), prevHint.addLetters.ref.current.slice(prevHint.end.value[0].length))
			break 

		case 'hidden word':
			// get index of solution within indicated
			let solIndex = removeSpecial(activeClue.hints.find(hint => hint.type == 'indicator').end.value[0]).indexOf(activeClue.solution.value)

			prevHint.end.ref = removeSpecial(prevHint.end.ref)
			changeColor(prevHint.end.ref, '#ccc')
			changeColor(prevHint.end.ref.splice(solIndex, activeClue.solution.arr.length))
			break

		case 'homophone':
			changeColor(prevHint.addLetters.ref.current[1])
			break

		case 'initialism':
			changeColor(prevHint.end.ref, '#ccc')
			// build arrary of first letters
			let firstLetters = prevHint.end.value[0].split(' ').map(wrd => wrd.length +1)
			firstLetters.pop()
			firstLetters = [0, ...firstLetters]

			firstLetters.forEach(startLetter => {
				changeColor(prevHint.end.ref[startLetter])
				prevHint.end.ref.splice(0, startLetter)
			})
			break

		default: 
			break 
	}
	
	// reveal solution
	const revealSolution = () => {
		activeClue.solution.sectionRef.current.classList.add('hide-input')
		activeClue.solution.sectionRef.current.classList.add('reveal-solution')
	}

	// reveal solution
	const revealSource = () => {
		activeClue.source.ref.current.classList.add('show')
	}

	revealSolution()
	setTimeout(revealSource, 1000)
}

export default showSolution