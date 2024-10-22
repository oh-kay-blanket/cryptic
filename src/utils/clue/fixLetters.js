// locks letters into a fixed position based on their initial render position

const fixLetters = (activeClue) => {
	
	//
	// Fix clue & solution letters
	//

	const fixInitial = activeClue => {

		// clue letters
		activeClue.clue.ref.current.forEach( ref => {
			let left = ref.current.getBoundingClientRect().left
			let top = ref.current.getBoundingClientRect().top
			ref.current.style.left = `${left}px`
			ref.current.style.top = `${top}px`
			return [left, top]
		})

		// clue sol count
		activeClue.solution.length.ref.current.style.left = `${activeClue.solution.length.ref.current.getBoundingClientRect().left}px`
		activeClue.solution.length.ref.current.style.top = `${activeClue.solution.length.ref.current.getBoundingClientRect().top}px`

		activeClue.clue.ref.current.forEach( ref => {
			ref.current.style.position = 'fixed'
		})
		activeClue.solution.length.ref.current.style.position = 'fixed'
		
		// solution boxes
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

		if (hint.category == 'anagram' || hint.category == 'letter bank') {
			let anchor, moving, endPt

			if (hint.category == 'anagram') {
				anchor = hint.end.ref // anchor letters
				moving = hint.addLetters.ref.current.slice(0,hint.end.value[0].length) // moving letters
				endPt = hint.addLetters.ref.current.slice(hint.end.value[0].length) // staging area letters
			} else if (hint.category == 'letter bank') {
				anchor = hint.end.ref // anchor letters
				moving = hint.addLetters.ref.current.slice(0, hint.end.value[1].length) // moving letters
				endPt = hint.addLetters.ref.current.slice(hint.end.value[1].length) // staging area letters
			}

			
			// position move letters over anchor letters
			if (Array.isArray(moving)) {
				moving.forEach(ref => {
					
					// Matching letter in anchor
					const currentDestLetter = anchor.find(destLetter => {
						return destLetter.current.textContent.toLowerCase() == ref.current.textContent.toLowerCase()
					})

					ref.current.style.top = `${Number(currentDestLetter.current.style.top.slice(0,-2))}px`
					ref.current.style.left = `${Number(currentDestLetter.current.style.left.slice(0,-2))}px`

					if (hint.category == 'anagram') {
						const destIndex = anchor.findIndex(destLetter => destLetter.current.textContent.toLowerCase() == ref.current.textContent.toLowerCase())
						anchor.splice(destIndex, 1)
					}
				})

				moving.forEach(ref => {
					ref.current.style.position = 'fixed'
				})
			} else {
				moving.current.style.position = 'fixed'
				moving.current.style.top = `${Number(anchor[0].current.style.top.slice(0,-2))}px`
				moving.current.style.left = `${Number(anchor[0].current.style.left.slice(0,-2))}px`
			}

			// lock unmoved letters into place
			// clue letters
			endPt.forEach(ref => {
				let left = ref.current.getBoundingClientRect().left
				let top = ref.current.getBoundingClientRect().top
				ref.current.style.left = `${left}px`
				ref.current.style.top = `${top}px`
				return [left, top]
			})
			
			endPt.forEach( ref => {
				ref.current.style.position = 'fixed'
			})

		}

		//
		// UNUSED CODE FOR PLACING ADDLETTERS ABOVE/BELOW CLUE //
		//
		
		// case 'adjacent':
		// 	let anchor = hint.ref
		// 	let moving = hint.addLetters.wordRef.current

		// 	// get anchor pos
		// 	const indLeft = anchor[0].current.getBoundingClientRect().left
		// 	const indRight = anchor[anchor.length -1].current.getBoundingClientRect().right
		// 	const indTop = anchor[0].current.getBoundingClientRect().top
		// 	const indBottom = anchor[anchor.length -1].current.getBoundingClientRect().bottom

		// 	// 1-2 lines or bottom line
		// 	if (activeClue.clue.lines == 1 || (activeClue.clue.lines == 2 && (activeClue.clue.ref.current[0].current.getBoundingClientRect().top !== anchor[0].current.getBoundingClientRect().top))) {
		// 		moving.style.left = `${(indLeft + indRight)/2}px`
		// 		moving.style.transform = `translateX(-50%)`
		// 		moving.style.top = `${indBottom + 4}px`
		// 		moving.style.position = 'fixed'

		// 	// top line
		// 	} else if (activeClue.clue.lines == 2 && (activeClue.clue.ref.current[0].current.getBoundingClientRect().top === anchor[0].current.getBoundingClientRect().top)) {
		// 		moving.style.left = `${(indLeft + indRight)/2}px`
		// 		moving.style.transform = `translateX(-50%)`
		// 		moving.style.top = `${indTop - 28}px`
		// 		moving.style.position = 'fixed'
		// 	}
		// }
	}

	// Logic to run fixHints
	activeClue.hints.forEach(hint => {
		hint && hint.type == 'indicator' && fixHints(hint)
	})	
}

export default fixLetters