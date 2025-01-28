import { useRef, createRef, useEffect } from 'react'

import getTargetLetters from './getTargetLetters'
import fixLetters from './fixLetters'
import addLetters from './addLetters'
// import getLines from './getLines'
import handleHint from './handleHint'

const loadClue = (activeClue, nextHint, showMessage, checkAns) => {
	
	// build refs
	activeClue.clue.ref = useRef(activeClue.clue.arr.map(() => createRef())) // clue letter refs
	activeClue.clue.sectionRef = useRef() // clue section ref
	activeClue.solution.ref = useRef(activeClue.solution.arr.map(() => createRef())) // solution letter refs
	activeClue.solution.sectionRef = useRef() // solution section ref
	activeClue.solution.length.ref = useRef() // solution length ref
	activeClue.source.ref = useRef() // source ref

	// hint target refs
	activeClue.hints.forEach(hint => { 
		
		// add extra letters needed
		addLetters(activeClue, hint)
		
		// indicator letters
		hint.ref = getTargetLetters(hint.value, activeClue, hint)
		
		// indicator end letters
		if (!!hint.end) {hint.end.ref = getTargetLetters(hint.end.value, activeClue, hint)}
	})

	useEffect(() => {
		// Fix letters
		const fixList = ['ag-2', 'hw-2', 'letter bank', 'container', 'reversal']	
		activeClue.hints.forEach((hint, index) => {
			hint && hint.category && fixList.includes(hint.category) && fixLetters(activeClue, hint, index)
		})
	}, []);
	
	// runs every change of showMessage
	useEffect(() => {
		handleHint(activeClue, nextHint, showMessage, checkAns)
	}, [showMessage])
}

export default loadClue