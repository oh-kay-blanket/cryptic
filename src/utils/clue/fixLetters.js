import removeSpecial from "./removeSpecialChar"

// locks letters into a fixed position based on their initial render position
const fixLetters = (activeClue, hint, index) => {

	// FN to position letters //
	const positionLetters = (hint, anchor = hint.fix.anchor, moving = hint.fix.moving) => {
		
		// Keep track of used anchors
		let anchorUsed = []

		moving.forEach(ref => {

			// Matching letter in anchor
			const currentDestLetter = anchor.find((destLetter, index) => {

				// Remove anchor to not reuse
				if (hint.fix.removeAnchor) {
					if ((destLetter.current.textContent.toUpperCase() == ref.current.textContent.toUpperCase()) && !anchorUsed.includes(index)) {
						anchorUsed.push(index)
						return destLetter.current.textContent.toUpperCase() == ref.current.textContent.toUpperCase()
					} else {
						return false
					}
				} else {
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
		hint.fix.endPt.forEach(ref => {
			let left = ref.current.getBoundingClientRect().left
			let top = ref.current.getBoundingClientRect().top
			ref.current.style.left = `${left}px`
			ref.current.style.top = `${top}px`
			return [left, top]
		})

		// Fix after adding pos attributes
		// hint.fix.endPt.forEach( ref => { ref.current.style.position = 'fixed' })
	}

	// 
	// LOGIC //
	// 
	hint.fix = {removeAnchor: true}
	const prevHint = activeClue.hints[index-1]

	switch (hint.category) {
		case 'ag-2':
			hint.fix.anchor = prevHint.addLetters.ref.current // anchor letters
			hint.fix.moving = hint.addLetters.ref.current.slice(0,hint.end.value[0].length) // moving letters
			hint.fix.endPt = hint.addLetters.ref.current.slice(hint.end.value[0].length) // staging area letters			

			// fix word with. Helps to place hints following this inline. Only run when there are hints following ag-2. Othewise it can mess with layout
			// hint.fix.wordWidth = hint.fix.moving.reduce((total, ltr) => total + ltr.current.getBoundingClientRect().width, 0)
			// activeClue.hints.length > (index + 1) && (hint.addLetters.wordRef.current.style.width = `${hint.fix.wordWidth + 8}px`)

			positionLetters(hint)
			break

		case 'lb-2':
			hint.fix.anchor = prevHint.addLetters.ref.current // anchor letters
			hint.fix.moving = hint.addLetters.ref.current.slice(0,hint.end.value[1].length) // moving letters
			hint.fix.endPt = hint.addLetters.ref.current.slice(hint.end.value[1].length) // staging area letters
			hint.fix.removeAnchor = false

			// fix word with. Helps to place hints following this inline. Only run when there are hints following ag-2. Othewise it can mess with layout
			// hint.fix.wordWidth = moving.reduce((total, ltr) => total + ltr.current.getBoundingClientRect().width, 0)
			// activeClue.hints.length > (index + 1) && (hint.addLetters.wordRef.current.style.width = `${hint.fix.wordWidth + 8}px`)

			positionLetters(hint)
			break

		case 'hw-2':
			let solIndex = removeSpecial(prevHint.end.value[0].toUpperCase()).indexOf(removeSpecial(hint.end.value[1].toUpperCase()))
			hint.fix.anchor = removeSpecial(prevHint.addLetters.ref.current).slice(solIndex, (solIndex + removeSpecial(activeClue.solution.value).length)) // anchor letters
			hint.fix.moving = removeSpecial(hint.addLetters.ref.current) // moving letters

			hint.fix.endPt = []

			// fix word with. Helps to place hints following this inline. Only run when there are hints following ag-2. Othewise it can mess with layout
			// hint.fix.wordWidth = hint.fix.moving.reduce((total, ltr) => total + ltr.current.getBoundingClientRect().width, 0)
			// activeClue.hints.length > (index + 1) && (hint.addLetters.wordRef.current.style.width = `${hint.fix.wordWidth + 8}px`)

			positionLetters(hint)
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
			
			// anchorSplit - get anchor word that is split //
			hint.fix.anchorSplit = prevHints.find((h,hIndex) => {
				// Standard container
				if (hint.end.value.length == 3 || h.rightValue == [hint.end.value[0], hint.end.value[2]].join('')) {
					hint.fix.joinIndex = [0,2]
					hint.fix.indicatorMatch = hIndex
					return (h.rightValue == [hint.end.value[0], hint.end.value[2]].join(''))

				// complex containers w/more than 3 parts
				} else if (h.rightValue == [hint.end.value[0], hint.end.value[3]].join('')) {
					hint.fix.joinIndex = [0,3]
					hint.fix.indicatorMatch = hIndex
					return (h.rightValue == [hint.end.value[0], hint.end.value[3]].join(''))

				} else if (h.rightValue == [hint.end.value[1], hint.end.value[3]].join('')) {
					hint.fix.joinIndex = [1,3]
					hint.fix.indicatorMatch = hIndex
					return (h.rightValue == [hint.end.value[1], hint.end.value[3]].join(''))
				}
				return false
			})

			// Remove duplicate letter from special hints
			const doubleHints = ['ag-2', 'lb-2']
			if (doubleHints.includes(hint.fix.anchorSplit.category)) {
				console.log('double hint')
				hint.fix.anchorSplit = hint.fix.anchorSplit.addLetters.ref.current.slice(hint.fix.anchorSplit.end.value[0].length)
			} else {
				hint.fix.anchorSplit = hint.fix.anchorSplit.addLetters.ref.current
			}
			
			// anchorOther - get other anchor words //
			// Remove splitword from prevHints
			prevHints.splice(hint.fix.indicatorMatch, 1)
			
			// find non-split words/letters
			hint.fix.anchorOther = []
			hint.end.value.forEach((hend, index) => {
				if (!hint.fix.joinIndex.includes(index)) {
					const thisMatch = prevHints.find((h,hIndex) => h.rightValue.toUpperCase() == hend.toUpperCase())
					thisMatch && hint.fix.anchorOther.push(...thisMatch.addLetters.ref.current)
				}
			})

			// MOVING SPLIT
			const movingLStart = hint.end.value.slice(0,hint.fix.joinIndex[0]).join("").length
			const movingLLength = hint.end.value[hint.fix.joinIndex[0]].length
			const movingRStart = hint.end.value.slice(0,hint.fix.joinIndex[1]).join("").length
			const movingRLength = hint.end.value[hint.fix.joinIndex[1]].length

			hint.fix.movingSplit = [...hint.addLetters.ref.current.slice(movingLStart, movingLStart + movingLLength), ...hint.addLetters.ref.current.slice(movingRStart, movingRStart + movingRLength)]

			hint.fix.movingOther = hint.addLetters.ref.current.slice(0,hint.end.value.join("").split('').length).filter(ref => !hint.fix.movingSplit.includes(ref))

			// Destination letters
			hint.fix.endPt = hint.addLetters.ref.current.slice(hint.end.value.join("").split('').length)
			
			// fix word with. Helps to place hints following this inline. Only run when there are hints following ag-2. Othewise it can mess with layout
			// hint.fix.wordWidth = [...hint.fix.movingSplit, ...hint.fix.movingOther].reduce((total, ltr) => total + ltr.current.getBoundingClientRect().width, 0)
			// activeClue.hints.length > (index + 1) && (hint.addLetters.wordRef.current.style.width = `${hint.fix.wordWidth + 8}px`)
			
			positionLetters(hint, hint.fix.anchorSplit, hint.fix.movingSplit)
			positionLetters(hint, hint.fix.anchorOther, hint.fix.movingOther)
			break

		case 'reversal':
			// push only used anchor to anchor
			hint.fix.anchor = []
			activeClue.hints.some(h => {
				if (h.category == 'reversal') return true
				if (h.addLetters) { anchor.push(h) }
				return false
			})
			
			hint.fix.anchor = anchor.map(h => h.addLetters.ref.current).flat().reverse()
			hint.fix.moving = hint.addLetters.ref.current.slice(0,hint.end.value[0].length) // moving letters
			hint.fix.moving = hint.fix.moving.filter(m => m.current.textContent !== " ").reverse()

			// fix word with. Helps to place hints following this inline. Only run when there are hints following reversal. Othewise it can mess with reversal layout
			hint.fix.wordWidth = hint.fix.moving.reduce((total, ltr) => total + ltr.current.getBoundingClientRect().width, 0)
			// const revIndex = activeClue.hints.findIndex(h=>h.category=='reversal')
			// activeClue.hints.length > (revIndex + 1) && (hint.addLetters.wordRef.current.style.width = `${hint.fix.wordWidth + 8}px`)

			hint.fix.endPt = hint.addLetters.ref.current.slice(hint.end.value[0].length) // staging area letters
			
			positionLetters(hint)
			break

		default:
			break
	}
}

export default fixLetters