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
			ref.current.style.top = `${top -2}px`
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

		if (hint.category == 'anagram' || hint.category == 'letter bank' || hint.category == 'container' || hint.category == 'reversal') {
			let anchor, moving, endPt

			// anagram
			if (hint.category == 'anagram') {
				anchor = hint.end.ref // anchor letters
				moving = hint.addLetters.ref.current.slice(0,hint.end.value[0].length) // moving letters
				endPt = hint.addLetters.ref.current.slice(hint.end.value[0].length) // staging area letters

			// letter bank
			} else if (hint.category == 'letter bank') {
				anchor = hint.end.ref // anchor letters
				moving = hint.addLetters.ref.current.slice(0, hint.end.value[1].length) // moving letters
				endPt = hint.addLetters.ref.current.slice(hint.end.value[1].length) // staging area letters

			// container
			} else if (hint.category == 'container') {

				// get index in arr of word that is split
				let joinIndex

				// find word that is split
				let splitWord = activeClue.hints.find(h => {
					// only search indicators
					if (h.type == 'indicator' && h.category !== 'container') {

						// get cell to use for split word
						let rightValue
						switch(h.category) {
							case 'direct':
								rightValue = h.value
								break
							case 'reversal':
								rightValue = h.end.value[1]
								break
							default:
								rightValue = h.end.value[0]
								break
						}
						
						// standard container
						if (hint.end.value.length == 3 || rightValue == [hint.end.value[0], hint.end.value[2]].join('')) {
							joinIndex = [0,2]
							return (rightValue == [hint.end.value[0], hint.end.value[2]].join(''))

						// complex containers w/more than 3 parts
						} else if (rightValue == [hint.end.value[0], hint.end.value[3]].join('')) {
							joinIndex = [0,3]
							return (rightValue == [hint.end.value[0], hint.end.value[3]].join(''))

						} else if (rightValue == [hint.end.value[1], hint.end.value[3]].join('')) {
							joinIndex = [1,3]
							return (rightValue == [hint.end.value[1], hint.end.value[3]].join(''))
						} else {
							joinIndex = false
						}
					}
				})
				splitWord = splitWord ? splitWord.addLetters.ref.current : false

				// find non-split words/letters
				let otherLtrs = []
				hint.end.value.forEach((hend, index) => {
					if (joinIndex && !joinIndex.includes(index) || !joinIndex) {

						const thisMatch = activeClue.hints.find(h => {

							if (h.category !== 'container') {
								let rightValue
								if (h.type == 'indicator') {
									switch(h.category) {
										case 'direct':
											rightValue = h.value
											break
										case 'reversal':
											rightValue = h.end.value[1]
											break
										default:
											rightValue = h.end.value[0]
											break
									}
	
									return rightValue == hend
								} else {
									return false
								}
							} else {
								return false
							}
						})
						thisMatch && otherLtrs.push(...thisMatch.addLetters.ref.current)
					}
				})
				anchor = [...otherLtrs.reverse(), ...splitWord.reverse()]
				moving = hint.addLetters.ref.current.slice(0, hint.end.value.join("").split('').length).reverse() // moving letters
				endPt = hint.addLetters.ref.current.slice(hint.end.value.join("").split('').length) // staging area letters
			// reversal
			} else if (hint.category == 'reversal') {
				
				// push only used anchor to anchor
				anchor = []
				activeClue.hints.some(h => {
					if (h.category == 'reversal') return true
					if (h.addLetters) { anchor.push(h) }
					return false
				})
				
				anchor = anchor.map(h => h.addLetters.ref.current).flat().reverse()

				moving = hint.addLetters.ref.current.slice(0,hint.end.value[0].length) // moving letters
				moving = moving.filter(m => m.current.textContent !== " ").reverse()

				// fix word with. Helps to place hints following this inline. Only run when there are hints following reversal. Othewise it can mess with reversal layout
				const wordWidth = moving.reduce((total, ltr) => total + ltr.current.getBoundingClientRect().width, 0)
				const revIndex = activeClue.hints.findIndex(h=>h.category=='reversal')
				activeClue.hints.length > (revIndex + 2) && (hint.addLetters.wordRef.current.style.width = `${wordWidth + 8}px`)

				endPt = hint.addLetters.ref.current.slice(hint.end.value[0].length) // staging area letters
			}

			
			// position move letters over anchor letters
			if (Array.isArray(moving)) {
				moving.forEach(ref => {

					ref.current.style.textTransform = 'none'

					// Matching letter in anchor
					let currentDestLetter = anchor.find(destLetter => {
						return destLetter.current.textContent == ref.current.textContent
					})
					ref.current.style.top = !!currentDestLetter.current.style.top ? currentDestLetter.current.style.top : `${currentDestLetter.current.getBoundingClientRect().top}px`
					ref.current.style.left = !!currentDestLetter.current.style.left ? currentDestLetter.current.style.left : `${currentDestLetter.current.getBoundingClientRect().left}px`

					// Remove anchor to not reuse
					if (hint.category == 'anagram' || hint.category == 'container' || hint.category == 'reversal') {
						const destIndex = anchor.findIndex(destLetter => destLetter.current.textContent == ref.current.textContent)
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
	}

	// Logic to run fixHints
	activeClue.hints.forEach(hint => {
		hint && hint.type == 'indicator' && fixHints(hint)
	})	
}

export default fixLetters