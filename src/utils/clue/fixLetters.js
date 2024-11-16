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

		if (hint.category == 'anagram' || hint.category == 'letter bank' || hint.category == 'container') {
			let anchor, moving, endPt

			if (hint.category == 'anagram') {
				anchor = hint.end.ref // anchor letters
				moving = hint.addLetters.ref.current.slice(0,hint.end.value[0].length) // moving letters
				endPt = hint.addLetters.ref.current.slice(hint.end.value[0].length) // staging area letters
			} else if (hint.category == 'letter bank') {
				anchor = hint.end.ref // anchor letters
				moving = hint.addLetters.ref.current.slice(0, hint.end.value[1].length) // moving letters
				endPt = hint.addLetters.ref.current.slice(hint.end.value[1].length) // staging area letters
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
							case 'particle':
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
										case 'particle':
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

				console.log(splitWord)

				anchor = [...otherLtrs, ...splitWord]
				moving = hint.addLetters.ref.current.slice(0, hint.end.value.join("").split('').length) // moving letters
				endPt = hint.addLetters.ref.current.slice(hint.end.value.join("").split('').length) // staging area letters
			}
			
			// position move letters over anchor letters
			if (Array.isArray(moving)) {
				moving.forEach(ref => {

					
					// Matching letter in anchor
					let currentDestLetter = anchor.find(destLetter => {
						return destLetter.current.textContent.toLowerCase() == ref.current.textContent.toLowerCase()
					})
					ref.current.style.top = !!currentDestLetter.current.style.top ? currentDestLetter.current.style.top : `${currentDestLetter.current.getBoundingClientRect().top}px`
					ref.current.style.left = !!currentDestLetter.current.style.left ? currentDestLetter.current.style.left : `${currentDestLetter.current.getBoundingClientRect().left}px`

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
	}

	// Logic to run fixHints
	activeClue.hints.forEach(hint => {
		hint && hint.type == 'indicator' && fixHints(hint)
	})	
}

export default fixLetters