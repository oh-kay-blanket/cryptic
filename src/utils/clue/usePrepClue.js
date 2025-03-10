import { useRef, createRef, useEffect } from 'react'

import getTargetLetters from './getTargetLetters'
import fixLetters from './fixLetters'
import addLetters from './addLetters'

const usePrepClue = (dataClue) => {

	let activeClue = structuredClone(dataClue)
	
	useEffect(() => console.log(activeClue), [dataClue]);

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
		case "Midas":
			activeClue.source.href = 'https://www.marcmaximov.net'
			break
		case 'plunk it':
			activeClue.source.href = 'https://ohkayblanket.com'
			break
		case 'Kegler':
			activeClue.source.href = 'https://kegler.gitlab.io'
			break
		case 'Ucaoimhu':
			activeClue.source.href = 'https://www.ucaoimhu.com'
			break
		case 'Hex':
			activeClue.source.href = 'https://coxrathvon.com'
			break
		default:
			activeClue.source.href = false
			break
	}

	// add hint type
	if (activeClue.hints) {
		activeClue.hints.map(hint => hint.type = 'indicator')
		activeClue.hints = activeClue.hints.flatMap(obj => {
			if (obj.category === 'anagram') { return [{ ...obj, explainer: "" }, { ...obj, category: 'ag-2' }] }
			if (obj.category === 'hidden word') { return [{ ...obj, explainer: "" }, { ...obj, category: 'hw-2' }] }
			if (obj.category === 'homophone') { return [{ ...obj, explainer: "" }, { ...obj, category: 'hp-2' }] }
			if (obj.category === 'initialism') { return [{ ...obj, explainer: "" }, { ...obj, category: 'in-2' }] }
			if (obj.category === 'letter bank') { return [{ ...obj, explainer: "" }, { ...obj, category: 'lb-2' }] }
			return [obj]
		}
		  );
	} else {
		activeClue.hints = []
	}

	// Add definition(s)
	if (!activeClue.type.includes('double definition')) {
		activeClue.hints.unshift({ type: 'definition', value: activeClue.definition })
		activeClue.hints[activeClue.hints.length-1].reveals = true
	} else {
		activeClue.hints.unshift(
			{ type: 'definition', value: activeClue.definition },
			{ 
				type: 'indicator', 
				category: 'dd-2',
				explainer: false,
				value: activeClue.definition,
				reveals: true,
				end: {
					value: activeClue.definition
				}
			}
		)
	}

	// build refs
	activeClue.clue.ref = useRef(activeClue.clue.arr.map(() => createRef())) // clue letter refs
	activeClue.clue.sectionRef = useRef() // clue section ref
	activeClue.solution.ref = useRef(activeClue.solution.arr.map(() => createRef())) // solution letter refs
	activeClue.solution.sectionRef = useRef() // solution section ref
	activeClue.solution.length.ref = useRef() // solution length ref
	activeClue.source.ref = useRef() // source ref
	activeClue.spoon = useRef() // source ref
	activeClue.addLetters = { ref: useRef([]) } // add letters ref

	// hint target refs
	activeClue.hints.forEach(hint => { 
		
		// add extra letters needed
		addLetters(activeClue, hint)
		
		// indicator letters
		hint.ref = getTargetLetters(hint.value, activeClue, hint)
		
		// indicator end letters
		if (!!hint.end) {hint.end.ref = getTargetLetters(hint.end.value, activeClue, hint)}
	})

	// add letters
	activeClue.hints.forEach((hint, index) => { 
		if (hint.addLetters && hint.addLetters.value) {
			activeClue.addLetters.ref.current.push(hint.addLetters.value.map(() => createRef()))
			hint.addLetters.ref.current = activeClue.addLetters.ref.current[index]
		} else {
			activeClue.addLetters.ref.current.push([])
		}
	})

	useEffect(() => {
		// Fix letters
		const fixList = ['ag-2', 'hw-2', 'lb-2', 'container', 'reversal']	
		activeClue.hints.forEach((hint, index) => {
			hint && hint.category && fixList.includes(hint.category) && fixLetters(activeClue, hint, index)
		})
	}, [])

	return { activeClue }
}

export default usePrepClue