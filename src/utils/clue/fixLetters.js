import removeSpecial from "./removeSpecialChar"

// locks letters into a fixed position based on their initial render position
const fixLetters = (activeClue, hint, index) => {

	// FN to position letters //
	const positionLetters = (removeAnchor = true) => {
		
		// Keep track of used anchors
		let anchorUsed = []

		moving.forEach(ref => {

			// Matching letter in anchor
			const currentDestLetter = anchor.find((destLetter, index) => {

				// Remove anchor to not reuse
				if (removeAnchor) {
					if ((destLetter.current.textContent.toUpperCase() == ref.current.textContent.toUpperCase()) && !anchorUsed.includes(index)) {
						anchorUsed.push(index)
						return destLetter.current.textContent.toUpperCase() == ref.current.textContent.toUpperCase()
					} else {
						return false
					}
				} else {
					console.log(destLetter.current.textContent.toUpperCase(), ref.current.textContent.toUpperCase())
					return destLetter.current.textContent.toUpperCase() == ref.current.textContent.toUpperCase()
				}
			})

			// Add position attributes
			ref.current.style.top = !!currentDestLetter.current.style.top ? currentDestLetter.current.style.top : `${currentDestLetter.current.getBoundingClientRect().top}px`
			ref.current.style.left = !!currentDestLetter.current.style.left ? currentDestLetter.current.style.left : `${currentDestLetter.current.getBoundingClientRect().left}px`
		})

		// Fix after adding position attributes
		moving.forEach(ref => { ref.current.style.position = 'fixed' })

		// Add position attributes
		endPt.forEach(ref => {
			let left = ref.current.getBoundingClientRect().left
			let top = ref.current.getBoundingClientRect().top
			ref.current.style.left = `${left}px`
			ref.current.style.top = `${top}px`
			return [left, top]
		})

		// Fix after adding pos attributes
		endPt.forEach( ref => { ref.current.style.position = 'fixed' })
	}

	// LOGIC //
	let anchor, moving, endPt, wordWidth
	const prevHint = activeClue.hints[index-1]

	switch (hint.category) {
		case 'ag-2':
			anchor = prevHint.addLetters.ref.current // anchor letters
			moving = hint.addLetters.ref.current.slice(0,hint.end.value[0].length) // moving letters
			endPt = hint.addLetters.ref.current.slice(hint.end.value[0].length) // staging area letters

			// fix word with. Helps to place hints following this inline. Only run when there are hints following ag-2. Othewise it can mess with layout
			wordWidth = moving.reduce((total, ltr) => total + ltr.current.getBoundingClientRect().width, 0)
			activeClue.hints.length > (index + 1) && (hint.addLetters.wordRef.current.style.width = `${wordWidth + 8}px`)

			positionLetters()
			break

		case 'lb-2':
			anchor = prevHint.addLetters.ref.current // anchor letters
			moving = hint.addLetters.ref.current.slice(0,hint.end.value[1].length) // moving letters
			endPt = hint.addLetters.ref.current.slice(hint.end.value[1].length) // staging area letters

			// fix word with. Helps to place hints following this inline. Only run when there are hints following ag-2. Othewise it can mess with layout
			wordWidth = moving.reduce((total, ltr) => total + ltr.current.getBoundingClientRect().width, 0)
			activeClue.hints.length > (index + 1) && (hint.addLetters.wordRef.current.style.width = `${wordWidth + 8}px`)

			positionLetters(false)
			break

		case 'hw-2':
			let solIndex = removeSpecial(prevHint.end.value[0].toUpperCase()).indexOf(removeSpecial(hint.end.value[1].toUpperCase()))
			anchor = removeSpecial(prevHint.addLetters.ref.current).slice(solIndex, (solIndex + removeSpecial(activeClue.solution.value).length)) // anchor letters
			moving = removeSpecial(hint.addLetters.ref.current) // moving letters
			console.log(prevHint.end.value[0].toUpperCase(), removeSpecial(activeClue.solution.value.toUpperCase()))
			endPt = []

			// fix word with. Helps to place hints following this inline. Only run when there are hints following ag-2. Othewise it can mess with layout
			wordWidth = moving.reduce((total, ltr) => total + ltr.current.getBoundingClientRect().width, 0)
			activeClue.hints.length > (index + 1) && (hint.addLetters.wordRef.current.style.width = `${wordWidth + 8}px`)

			positionLetters()
			break

		case 'container':

			// Get valid previous hints
			let prevHints = activeClue.hints.slice(1,index)
			const skipCats = ['anagram', 'hidden word', 'letter bank', 'homophone']
			prevHints = prevHints.filter(prevHint => !skipCats.includes(prevHint.category))

			prevHints.forEach(prevHint => {
				// Get cell to use for split word
				switch(prevHint.category) {
					case 'direct':
						prevHint.rightValue = prevHint.value
						break
					case 'reversal':
					case 'ag-2':
						prevHint.rightValue = prevHint.end.value[1]
						break
					default:
						prevHint.rightValue = prevHint.end.value[0]
						break
				}
			})
			
			// Find word that is split
			let splitWord = prevHints.find((h,hIndex) => {
				
				// Standard container
				if (hint.end.value.length == 3 || h.rightValue == [hint.end.value[0], hint.end.value[2]].join('')) {
					hint.joinIndex = [0,2]
					hint.indicatorMatch = hIndex
					return (h.rightValue == [hint.end.value[0], hint.end.value[2]].join(''))

				// complex containers w/more than 3 parts
				} else if (h.rightValue == [hint.end.value[0], hint.end.value[3]].join('')) {
					hint.joinIndex = [0,3]
					hint.indicatorMatch = hIndex
					return (h.rightValue == [hint.end.value[0], hint.end.value[3]].join(''))

				} else if (h.rightValue == [hint.end.value[1], hint.end.value[3]].join('')) {
					hint.joinIndex = [1,3]
					hint.indicatorMatch = hIndex
					return (h.rightValue == [hint.end.value[1], hint.end.value[3]].join(''))
				}
				return false
			})

			// Remove duplicate letter from special hints
			const doubleHints = ['ag-2', 'lb-2']
			if (doubleHints.includes(splitWord.category)) {
				console.log(splitWord)
				splitWord = splitWord.addLetters.ref.current.slice(splitWord.end.value[0].length)
			} else {
				splitWord = splitWord.addLetters.ref.current
			}
			
			// Remove splitword from prevHints
			prevHints.splice(hint.indicatorMatch, 1)


			// find non-split words/letters
			let otherLtrs = []
			hint.end.value.forEach((hend, index) => {
				if (!hint.joinIndex.includes(index)) {
					const thisMatch = prevHints.find((h,hIndex) => h.rightValue.toUpperCase() == hend.toUpperCase())
					thisMatch && otherLtrs.push(...thisMatch.addLetters.ref.current)
				}
			})
			
			anchor = [...otherLtrs,...splitWord].reverse()
			moving = hint.addLetters.ref.current.slice(0, hint.end.value.join("").split('').length).reverse() // moving letters
			endPt = hint.addLetters.ref.current.slice(hint.end.value.join("").split('').length) // staging area letters

			// fix word with. Helps to place hints following this inline. Only run when there are hints following ag-2. Othewise it can mess with layout
			wordWidth = moving.reduce((total, ltr) => total + ltr.current.getBoundingClientRect().width, 0)
			activeClue.hints.length > (index + 1) && (hint.addLetters.wordRef.current.style.width = `${wordWidth + 8}px`)
			
			positionLetters()
			break

		case 'reversal':
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
			wordWidth = moving.reduce((total, ltr) => total + ltr.current.getBoundingClientRect().width, 0)
			const revIndex = activeClue.hints.findIndex(h=>h.category=='reversal')
			activeClue.hints.length > (revIndex + 1) && (hint.addLetters.wordRef.current.style.width = `${wordWidth + 8}px`)

			endPt = hint.addLetters.ref.current.slice(hint.end.value[0].length) // staging area letters
			
			positionLetters()
			break

		default:
			break
	}
}

export default fixLetters