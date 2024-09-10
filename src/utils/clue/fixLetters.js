// locks letters into a fixed position based on their initial render position

const fixLetters = (activeClue) => {
	// clue
	activeClue.clue.ref.current.forEach( ref => {
		let left = ref.current.getBoundingClientRect().left
		let top = ref.current.getBoundingClientRect().top
		ref.current.style.left = `${left}px`
		ref.current.style.top = `${top}px`
		return [left, top]
	})

	// activeClue.solution.length.ref
	activeClue.solution.length.ref.current.style.left = `${activeClue.solution.length.ref.current.getBoundingClientRect().left}px`
	activeClue.solution.length.ref.current.style.top = `${activeClue.solution.length.ref.current.getBoundingClientRect().top}px`

	// fix positions
	activeClue.clue.ref.current.forEach( ref => {
		ref.current.style.position = 'fixed'
	})
	activeClue.solution.length.ref.current.style.position = 'fixed'
	
	// solution
	activeClue.solution.ref.current.forEach( ref => {
		let left = ref.current.getBoundingClientRect().left
		let top = ref.current.getBoundingClientRect().top
		ref.current.style.left = `${left}px`
		ref.current.style.top = `${top -3}px`
		return [left, top]
	})
	
	activeClue.solution.ref.current.forEach( ref => {
		ref.current.style.position = 'fixed'
	})

	activeClue.solution.sectionRef.current.style.transform = 'none'
}

export default fixLetters