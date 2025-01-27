const prepActiveClue = (activeClue) => {

	// get solution letters
	const getSolutionLetters = solution => solution.value.split(' ').map(word => word.length)
	activeClue.solution.length = {
		value: `(${getSolutionLetters(activeClue.solution).join(', ')})`,
		arr: getSolutionLetters(activeClue.solution)
	}

	// build clue and solution arrays
	activeClue.clue.arr = activeClue.clue.value.split("")
	activeClue.solution.arr = activeClue.solution.value.split("")
	activeClue.solution.arr = activeClue.solution.arr.filter(ltr => ltr !== " ")

	// build type array
	activeClue.type = activeClue.type.split(', ')

	// clue source
	switch(activeClue.source.value) {
		case 'Fraz':
			activeClue.source.href = 'https://www.theglobeandmail.com/puzzles-and-crosswords/article-how-to-solve-the-cryptic-crossword-fraser-simson/'
			break
		case 'plunk it':
			activeClue.source.href = 'https://ohkayblanket.com'
			break
		case 'Kegler':
			activeClue.source.href = 'https://kegler.gitlab.io/Block_style/November_2009.pdf'
			break
		case 'Ucaoimhu':
			activeClue.source.href = 'https://www.ucaoimhu.com'
			break
		case 'Hex':
			activeClue.source.href = 'https://coxrathvon.com/puzzles/xoOx3KL17IT3eFSBoGPA'
			break
		default:
			activeClue.source.href = false
			break
	}

	// add hint type
	if (activeClue.hints) {
		activeClue.hints.map(hint => hint.type = 'indicator')
		activeClue.hints = activeClue.hints.flatMap(obj => {
			if (obj.category === 'anagram') { return [obj, { ...obj, category: 'ag-2' }] }
			if (obj.category === 'hidden word') { return [obj, { ...obj, category: 'hw-2' }] }
			if (obj.category === 'homophone') { return [obj, { ...obj, category: 'hp-2' }] }
			if (obj.category === 'initialism') { return [obj, { ...obj, category: 'in-2' }] }
			if (obj.category === 'letter bank') { return [obj, { ...obj, category: 'lb-2' }] }
			return [obj]
		}
		  );
	} else {
		activeClue.hints = []
	}

	// build hints //
	activeClue.hints.unshift({ type: 'definition', value: activeClue.definition })
	// activeClue.hints.push({ type: 'solution', value: activeClue.solution.value })
}

export default prepActiveClue