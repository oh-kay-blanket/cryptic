import React, { useRef, createRef, useEffect } from 'react';

const ClueContainer = ({ activeClue, nextHint }) => {

	// make local clone of clue object
	let clue = sructuredClone(activeClue)
	const isSolution = clue.hints[nextHint].hintType == 'solution'

	const getMovementLetters = () => {
		const movementLetters = clue.hints.find(hint => hint.hintType == "indicated").value[0]

		const movementLettersStart = clue.clue.indexOf(movementLetters)

		return clueLettersRef.current.slice(movementLettersStart, movementLetters.length - 1)
	}

	// set refs
	let clueLettersRef = useRef(clue.clueArr.map(() => createRef()))
	let clueMovementLettersRef = getMovementLetters()
	let solutionLettersRef = useRef(clue.solArr.map(() => createRef()))
	let solutionSection = useRef()
	let solutionLettersCount = useRef()
	let clueSection = useRef()

	// look for position once set
	useEffect(() => {

		// clue
		clueLettersRef.current.forEach( ref => {
			let left = ref.current.getBoundingClientRect().left
			let top = ref.current.getBoundingClientRect().top
			ref.current.style.left = `${left}px`
			ref.current.style.top = `${top}px`
			return [left, top]
		})

		// solutionLettersCount
		solutionLettersCount.current.style.left = `${solutionLettersCount.current.getBoundingClientRect().left}px`
		solutionLettersCount.current.style.top = `${solutionLettersCount.current.getBoundingClientRect().top}px`

		// fix positions
		clueLettersRef.current.forEach( ref => {
			ref.current.style.position = 'fixed'
		})
		solutionLettersCount.current.style.position = 'fixed'
		
		// solution
		solutionLettersRef.current.forEach( ref => {
			let left = ref.current.getBoundingClientRect().left
			let top = ref.current.getBoundingClientRect().top
			ref.current.style.left = `${left}px`
			ref.current.style.top = `${top}px`
			return [left, top]
		})
		
		solutionLettersRef.current.forEach( ref => {
			ref.current.style.position = 'fixed'
		})

		solutionSection.current.style.transform = 'none'
		
	}, []);	
	
	// move letters when solution is true
	useEffect(() => {

		clueMovementLettersRef = clueMovementLettersRef.filter(ref => {
			return ref.current.textContent !== " "
		})
		
		isSolution && clueMovementLettersRef.forEach( ref => {
			const currentSol = solutionLettersRef.current.find(sol => {
				return sol.current.textContent.toLowerCase() == ref.current.textContent.toLowerCase()
			})
			const solIndex = solutionLettersRef.current.findIndex(sol => sol.current.textContent.toLowerCase() == ref.current.textContent.toLowerCase())
			solutionLettersRef.current.splice(solIndex, 1)
			ref.current.style.top = `${Number(currentSol.current.style.top.slice(0,-2))+8}px`
			ref.current.style.left = `${Number(currentSol.current.style.left.slice(0,-2))+8}px`
			ref.current.style.transitionDelay = `${(750 * Math.random()) + 250}ms`
			ref.current.style.textTransform = 'lowercase'
		})

		const morphToUppercase = () => {
			clueMovementLettersRef.forEach( ref => {
				ref.current.style.opacity = 0
			})
			// clueSection.current.style.opacity = 0
			solutionSection.current.style.opacity = 1
		}

		isSolution && setTimeout(morphToUppercase, 4000)
	}, [activeClue]);

	useEffect({
		// set refs
		// let clueLettersRef = useRef(clue.clueArr.map(() => createRef()))
		// // let clueMovementLettersRef = clueLettersRef.current.slice(clue.range[0], clue.range[1]);
		// let solutionLettersRef = useRef(clue.solArr.map(() => createRef()))
		// let solutionSection = useRef()
		// let solutionLettersCount = useRef()
		// let clueSection = useRef()
	},[activeClue])

	// build clue HTML
	const clueInsert = clue.clueArr.map((letter, index) => {
		return <span key={index} ref={clueLettersRef.current[index]} className={`letter`}>{letter}</span>
	})

	// build solution HTML
	const solInsert = clue.solArr.map((letter, index) => (<span key={index} ref={solutionLettersRef.current[index]} className="letter">{letter}</span>))

	// add solution letters
	const solutionLetters = <span className='solution-letters' ref={solutionLettersCount}>&nbsp;{clue.solArrLetters}</span>
	

	return(
		<div id='clue-container' className='clue container'>
			<div className='clue' ref={clueSection}>{clueInsert} {solutionLetters}</div>
			<div className='solution' ref={solutionSection}>{solInsert}</div>
		</div>
	)
}

export default ClueContainer;