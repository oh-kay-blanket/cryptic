import underlineLetters from './underlineLetters'
import highlightLetters from './highlightLetters'
import changeColor from './changeColor'
import showSolution from './showSolution'
import moveLetters from "./moveLetters"

const handleHint = (activeClue, nextHint, showMessage, checkAns) => {

	const revealSolution = () => {
		activeClue.solution.sectionRef.current.classList.add('hide-input')
		activeClue.solution.sectionRef.current.classList.add('reveal-solution')
	}

	const revealSource = () => {
		activeClue.source.ref.current.classList.add('show')
	}

	if (showMessage && !checkAns) {

		const hint = activeClue.hints[nextHint]

		switch(hint.type) {

			case 'definition':
				underlineLetters(hint.ref)
				break

			case 'indicator': 
				switch(hint.category) {
					case 'charade':
					case 'symbol':
					case 'synonym':
						highlightLetters(hint.ref)
						changeColor(hint.addLetters.ref.current)
						hint.reveals && setTimeout(revealSolution, 2000), setTimeout(revealSource, 3000)
						break
					case 'deletion':
						highlightLetters(hint.ref)
						changeColor(activeClue.hints[nextHint - 1].addLetters.ref.current, '#ccc')

						// see if shorter word exists within last hint addLetters
						const delIndex = activeClue.hints[nextHint - 1].addLetters.value.join('').indexOf(hint.end.value[1])

						// if so, highlight short word in longer
						if (hint.end.value.length > 2) {
							changeColor(activeClue.hints[nextHint - 1].addLetters.ref.current.slice(0, hint.end.value[1].length), '#0b0b0b')

							changeColor(activeClue.hints[nextHint - 1].addLetters.ref.current.slice(-hint.end.value[2].length), '#0b0b0b')
						} else if (delIndex >= 0) {
							changeColor(activeClue.hints[nextHint - 1].addLetters.ref.current.slice(delIndex, (delIndex + hint.end.value[1].length)), '#0b0b0b')
						}

						hint.reveals && setTimeout(revealSolution, 2000), setTimeout(revealSource, 3000)
						break
					case 'direct':
						highlightLetters(hint.ref)
						changeColor(hint.addLetters.ref.current)
						hint.reveals && setTimeout(revealSolution, 2000), setTimeout(revealSource, 3000)
						break
					case 'homophone':
						highlightLetters(hint.ref)
						changeColor(hint.addLetters.ref.current[0])
						hint.reveals && setTimeout(revealSolution, 2000), setTimeout(revealSource, 3000)
						break
					case 'initialism':
						highlightLetters(hint.ref)
						changeColor(hint.end.ref)
						hint.reveals && setTimeout(revealSolution, 2000), setTimeout(revealSource, 3000)
						break
					case 'anagram':
						highlightLetters(hint.ref)
						changeColor(hint.end.ref, '#ccc')
						changeColor(hint.addLetters.ref.current.slice(0,hint.end.value[0].length))
						hint.reveals && setTimeout(revealSolution, 2000), setTimeout(revealSource, 3000)
					case 'letter bank':
						highlightLetters(hint.ref)
						changeColor(hint.end.ref, '#ccc')
						changeColor(hint.addLetters.ref.current.slice(0,hint.end.value[1].length))
						hint.reveals && setTimeout(revealSolution, 2000), setTimeout(revealSource, 3000)
						break
					case 'particle':
						highlightLetters(hint.ref)
						// changeColor(hint.end.ref, '#ccc')
						changeColor(hint.addLetters.ref.current)
						hint.reveals && setTimeout(revealSolution, 2000), setTimeout(revealSource, 3000)
						break
					case 'container':
						highlightLetters(hint.ref)

						// make all previous addLetters gray
						activeClue.hints.some(h => {
							
							// Break out if container
							if (h.category == 'container') return true
							
							if (h.addLetters) {
								changeColor(h.addLetters.ref.current, '#ccc')
							}
							return false
						});

						// Make moving letters dark
						changeColor(hint.addLetters.ref.current.slice(0, hint.end.value.join("").split('').length), '#222')
						
						moveLetters(hint.addLetters.ref.current.slice(0, hint.end.value.join("").split('').length), hint.addLetters.ref.current.slice(hint.end.value.join("").split('').length), false)
						
						hint.reveals && setTimeout(revealSolution, 2000), setTimeout(revealSource, 3000)
						break
					case 'reversal':
						highlightLetters(hint.ref)

						// make all previous addLetters gray
						activeClue.hints.some(h => {
							
							// Break out if reversal
							if (h.category == 'reversal') return true
							
							if (h.addLetters) {
								changeColor(h.addLetters.ref.current, '#ccc')
							}
							return false
						});

						// activeClue.hints.forEach(h => {
						// 	if (h.addLetters && h.category !== 'reversal') {
						// 		changeColor(h.addLetters.ref.current, '#ccc')
						// 	}
						// });

						changeColor(hint.addLetters.ref.current.slice(0, hint.end.value[0].length), '#222')
						moveLetters(hint.addLetters.ref.current.slice(0, hint.end.value[0].length), hint.addLetters.ref.current.slice(hint.end.value[0].length), 'sequence', true)

						hint.reveals && setTimeout(revealSolution, 2000), setTimeout(revealSource, 3000)
						break
					default: 
						highlightLetters(hint.ref)
						changeColor(hint.end.ref)
						if (hint.reveals) {
							setTimeout(revealSolution, 2000)
							setTimeout(revealSource, 3000)
						}

						break
				}
				break
			case 'solution':
				showSolution(activeClue, nextHint, revealSolution, revealSource)
				break
			default: 
				break
		}

	// change last hint to gray
	} else if (!showMessage) {
		if (nextHint > 1) {
			try {
				highlightLetters(activeClue.hints[nextHint - 1].ref, false, true)

				if (activeClue.hints[nextHint - 1].end) {
					changeColor(activeClue.hints[nextHint - 1].end.ref, false, true)
				} else {
					changeColor(activeClue.hints[nextHint - 1].ref, false, true)
				}
				
				if (activeClue.hints[nextHint - 1].category !== 'deletion') {
					changeColor(activeClue.hints[nextHint - 1].addLetters.ref.current, false, true)
				} else {
					changeColor(activeClue.hints[nextHint - 2].addLetters.ref.current, false, true)
				}
			} catch(err) {
				console.log(err)
			}
		}
	}
}

export default handleHint