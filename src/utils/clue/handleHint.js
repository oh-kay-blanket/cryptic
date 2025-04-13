import underlineLetters from './underlineLetters'
import highlightLetters from './highlightLetters'
import changeColor from './changeColor'
import moveLetters from "./moveLetters"

const handleHint = (activeClue, nextHint, showMessage, checkAns, showLogic) => {

	// Run if showing a message & not checking answer
	if (showMessage && !checkAns) {

		// Get hint
		const hint = activeClue.hints[nextHint]

		// Definition
		if (nextHint === 0) {
			underlineLetters(hint.ref)

		// Indicators
		} else {
			const prevHint = activeClue.hints[nextHint - 1]

			switch(hint.category) {

				case 'anagram':
				case 'letter bank':
					highlightLetters(hint.ref)
					changeColor(hint.end.ref, '#ccc')
					changeColor(hint.addLetters.ref.current)
					break

				case 'ag-2':
					changeColor(prevHint.addLetters.ref.current, '#ccc')
					changeColor(hint.addLetters.ref.current.slice(0,hint.end.value[0].length), '#0b0b0b')
					moveLetters(hint.addLetters.ref.current.slice(0,hint.end.value[0].length), hint.addLetters.ref.current.slice(hint.end.value[0].length))
					break

				case 'lb-2':
					changeColor(prevHint.addLetters.ref.current, '#ccc')
					changeColor(hint.addLetters.ref.current.slice(0,hint.end.value[1].length), '#0b0b0b')
					moveLetters(hint.addLetters.ref.current.slice(0,hint.end.value[1].length), hint.addLetters.ref.current.slice(hint.end.value[1].length))
					break

				case 'charade':
				case 'symbol':
				case 'synonym':
					highlightLetters(hint.ref)
					changeColor(hint.addLetters.ref.current)
					break

				case 'container':
					highlightLetters(hint.ref)

					// make all previous addLetters gray
					activeClue.hints.some(h => {
						
						// Break out if container
						if (h.category === 'container') return true
						
						if (h.addLetters) {
							changeColor(h.addLetters.ref.current, '#ccc')
						}
						return false
					});

					// Make moving letters dark
					changeColor(hint.addLetters.ref.current.slice(0, hint.end.value.join("").split('').length), '#222')
					
					moveLetters(hint.addLetters.ref.current.slice(0, hint.end.value.join("").split('').length), hint.addLetters.ref.current.slice(hint.end.value.join("").split('').length), false)
					break

				case 'dd-2':
					break

				case 'deletion':
					highlightLetters(hint.ref)
					changeColor(prevHint.addLetters.ref.current, '#ccc')

					// see if shorter word exists within last hint addLetters
					const delIndex = prevHint.addLetters.value.join('').toUpperCase().indexOf(hint.end.value[1].toUpperCase())

					// if so, highlight short word in longer
					if (hint.end.value.length > 2) {
						changeColor(prevHint.addLetters.ref.current.slice(0, hint.end.value[1].length), '#0b0b0b')

						changeColor(prevHint.addLetters.ref.current.slice(-hint.end.value[2].length), '#0b0b0b')
					} else if (delIndex >= 0) {
						changeColor(prevHint.addLetters.ref.current.slice(delIndex, (delIndex + hint.end.value[1].length)), '#0b0b0b')
					}
					break

				case 'delete even':
					highlightLetters(hint.ref)
					const oddOnly = prevHint.addLetters.ref.current.filter((ltr,index) => index % 2 !== 0)
					console.log(oddOnly)
					changeColor(oddOnly, '#ccc')
					break

				case 'delete odd':
					highlightLetters(hint.ref)
					const evenOnly = prevHint.addLetters.ref.current.filter((ltr,index) => index % 2 === 0)
					console.log(evenOnly)
					changeColor(evenOnly, '#ccc')
					break

				case 'direct':
					highlightLetters(hint.ref)
					changeColor(hint.addLetters.ref.current)
					break

				case 'hidden word':
					highlightLetters(hint.ref)
					changeColor(hint.end.ref, '#ccc')
					changeColor(hint.addLetters.ref.current)
					break

				case 'hw-2':
					changeColor(prevHint.addLetters.ref.current, '#ccc')
					changeColor(hint.addLetters.ref.current)
					break

				case 'homophone':
					highlightLetters(hint.ref)
					changeColor(hint.addLetters.ref.current[0])
					break

				case 'hp-2':
					changeColor(prevHint.addLetters.ref.current[1])
					break

				case 'initialism':
					highlightLetters(hint.ref)
					changeColor(hint.end.ref)
					break

				case 'in-2':
					changeColor(prevHint.end.ref, '#ccc')
					// build arrary of first letters
					let firstLetters = prevHint.end.value[0].split(' ').map(wrd => wrd.length +1)
					firstLetters.pop()
					firstLetters = [0, ...firstLetters]

					firstLetters.forEach(startLetter => {
						changeColor(prevHint.end.ref[startLetter])
						prevHint.end.ref.splice(0, startLetter)
					})
					break

				case 'particle':
					highlightLetters(hint.ref)
					changeColor(hint.addLetters.ref.current)
					break

				case 'reversal':
					highlightLetters(hint.ref)
					changeColor(prevHint.addLetters.ref.current, '#ccc')

					// make all previous addLetters gray
					let usedAnchor = []
					// push only used anchor to anchor
					let anchor = []
					activeClue.hints.some(h => {
						if (h.category === 'reversal') return true
						if (h.addLetters) { anchor.push(h) }
						return false
					})
					anchor = anchor.map(h => h.addLetters.ref.current).flat().reverse()
					
					let moving = hint.addLetters.ref.current.slice(0,hint.end.value[0].length)
					moving = moving.filter(m => m.current.textContent !== " ").reverse()
					
					// Build arr of used anchors
					moving.forEach(ref => {		
						const destIndex = anchor.findIndex(destLetter => destLetter.current.textContent === ref.current.textContent)
						usedAnchor.push(anchor[destIndex])
						anchor.splice(destIndex, 1)
					})

					changeColor(usedAnchor, '#ccc')
					changeColor(hint.addLetters.ref.current.slice(0, hint.end.value[0].length), '#222')
					moveLetters(hint.addLetters.ref.current.slice(0, hint.end.value[0].length), hint.addLetters.ref.current.slice(hint.end.value[0].length), 'sequence', true)
					break

				case 'spoonerism':
					highlightLetters(hint.ref)
					changeColor(hint.addLetters.ref.current)
					changeColor(activeClue.spoon)
					break

				default: 
					highlightLetters(hint.ref)
					changeColor(hint.end.ref)
					break
			}
		}

		// If this is the revealing hint, end clue.			
		if (hint.reveals) {
			setTimeout(()=> { try {activeClue.solution.sectionRef.current.classList.add('hide-input') } catch(e){console.log(e)} }, 2500)
			setTimeout(()=> { try {activeClue.solution.sectionRef.current.classList.add('reveal-solution') } catch(e){console.log(e)} }, 2500)
			setTimeout(()=> { try {activeClue.source.ref.current.classList.add('show') } catch(e){console.log(e)} }, 3000)
		}
	} 
	
	// Change last hint to gray when going back to play
	if ((!showMessage && !checkAns && nextHint > 1) || (showLogic && nextHint > 1)) {
		const prevHint = activeClue.hints[nextHint - 1]
		try {
			highlightLetters(prevHint.ref, false, true)

			if (prevHint.end) {
				changeColor(prevHint.end.ref, false, true)
			} else {
				changeColor(prevHint.ref, false, true)
			}
			
			if (prevHint.category !== 'deletion') {
				changeColor(prevHint.addLetters.ref.current, false, true)
			} else {
				changeColor(activeClue.hints[nextHint - 2].addLetters.ref.current, false, true)
			}
		} catch(err) {
			console.log(err)
		}
	}
}

export default handleHint