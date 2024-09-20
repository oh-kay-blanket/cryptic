// locks letters into a fixed position based on their initial render position
import removeSpecial from "./removeSpecialChar"

const fixLetters = (activeClue) => {
	
	//
	// Fix clue & solution letters
	//

	const fixInitial = activeClue => {
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

	fixInitial(activeClue)


	//
	// Fix hint letters //
	//

	const fixHints = (hint) => {

		const placeRelational = (type, anchor, moving) => {
			
			switch(type) {
				case 'overlay':
					moving = removeSpecial(moving)
					console.log(anchor)
	
					moving.forEach(ref => {
						const currentSol = anchor.find(sol => {
							return sol.current.textContent.toLowerCase() == ref.current.textContent.toLowerCase()
						})
						const solIndex = anchor.findIndex(sol => sol.current.textContent.toLowerCase() == ref.current.textContent.toLowerCase())
						anchor.splice(solIndex, 1)
						ref.current.style.position = 'fixed'
						ref.current.style.top = `${Number(currentSol.current.style.top.slice(0,-2))}px`
						ref.current.style.left = `${Number(currentSol.current.style.left.slice(0,-2))}px`
					})
					break
				case 'adjacent':

					// get anchor pos
					const indLeft = anchor[0].current.getBoundingClientRect().left
					const indRight = anchor[anchor.length -1].current.getBoundingClientRect().right
					const indTop = anchor[0].current.getBoundingClientRect().top
					const indBottom = anchor[anchor.length -1].current.getBoundingClientRect().bottom

					// 1-2 lines or bottom line
					if (activeClue.clue.lines == 1 || (activeClue.clue.lines == 2 && (activeClue.clue.ref.current[0].current.getBoundingClientRect().top !== anchor[0].current.getBoundingClientRect().top))) {
						moving.style.left = `${(indLeft + indRight)/2}px`
						moving.style.transform = `translateX(-50%)`
						moving.style.top = `${indBottom + 4}px`
						moving.style.position = 'fixed'

					// top line
					} else if (activeClue.clue.lines == 2 && (activeClue.clue.ref.current[0].current.getBoundingClientRect().top === anchor[0].current.getBoundingClientRect().top)) {
						moving.style.left = `${(indLeft + indRight)/2}px`
						moving.style.transform = `translateX(-50%)`
						moving.style.top = `${indTop - 28}px`
						moving.style.position = 'fixed'
					}
					break
			}
		}

		switch(hint.category) {
			case 'synonym':
			case 'symbol':
				placeRelational('adjacent', hint.ref, hint.addLetters.wordRef.current)
				break
			case 'anagram':
			case 'particle':
			case 'letter bank':
			case 'direct':
			case 'hidden word':
			case 'initialism':
				placeRelational('overlay', hint.end.ref, hint.addLetters.ref.current)
				break
		}
	}

	// Logic to run fixHints
	activeClue.hints.forEach(hint => {
		hint && hint.type == 'indicator' && fixHints(hint)
	})
	
}

export default fixLetters