import moveLetters from "./moveLetters"
import changeColor from './changeColor'
import removeSpecial from "./removeSpecialChar"

const showSolution = (activeClue, nextHint, revealSolution, revealSource) => { 

	const prevHint = activeClue.hints[nextHint-1]
		
	switch(prevHint.category) { 
		case 'anagram':
			moveLetters(prevHint.addLetters.ref.current.slice(0,prevHint.end.value[0].length), prevHint.addLetters.ref.current.slice(prevHint.end.value[0].length))
			setTimeout(revealSolution, 2500)
			setTimeout(revealSource, 3000)
			break 

		case 'hidden word':
			// get index of solution within indicated
			let solIndex = removeSpecial(activeClue.hints.find(hint => hint.type == 'indicator').end.value[0]).indexOf(activeClue.solution.value)

			prevHint.end.ref = removeSpecial(prevHint.end.ref)
			changeColor(prevHint.end.ref, '#ccc')
			changeColor(prevHint.end.ref.splice(solIndex, activeClue.solution.arr.length))
			setTimeout(revealSolution, 2000)
			setTimeout(revealSource, 3000)
			break

		case 'homophone':
			changeColor(prevHint.addLetters.ref.current[1])
			setTimeout(revealSolution, 2000)
			setTimeout(revealSource, 3000)

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

			setTimeout(revealSolution, 2000)
			setTimeout(revealSource, 3000)

			break

		default: 
			revealSolution()
			setTimeout(revealSource, 1000)
			break 
	}

}

export default showSolution