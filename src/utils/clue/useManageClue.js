import { useState, useEffect, useRef } from 'react'

import handleHint from './handleHint'

const useManageClue = (activeClue) => {
	// Keep a ref to always access the latest activeClue
	const activeClueRef = useRef(activeClue)
	activeClueRef.current = activeClue

	// state
	const [stats, setStats] = useState({ guesses: 0, hints: 0, how: '' })
    const [input, setInput] = useState([])
	const [nextHint, setNextHint] = useState(0)
	const [showMessage, setShowMessage] = useState(false)
	const [checkAns, setCheckAns] = useState(false)
	const [showLogic, setShowLogic] = useState(false)
	const [revealedLetters, setRevealedLetters] = useState([]) // Array of indices of revealed letters
	const [showRevealPrompt, setShowRevealPrompt] = useState(false)
	const [revealPromptIndex, setRevealPromptIndex] = useState(null)

	// handle revealing a letter
	const handleRevealLetter = (index) => {
		// Don't allow revealing if already revealed
		if (revealedLetters.includes(index)) {
			return
		}

		// Don't allow revealing if this would be the last unrevealed letter
		if (revealedLetters.length >= activeClue.solution.arr.length - 1) {
			return
		}

		// Add to revealed letters
		const newRevealedLetters = [...revealedLetters, index].sort((a, b) => a - b)
		setRevealedLetters(newRevealedLetters)

		// Update input to include the revealed letter
		setInput(prevInput => {
			const newInput = [...prevInput]

			// Extend array to include this position, filling gaps
			while (newInput.length <= index) {
				const currentPos = newInput.length
				// If this position is revealed (including the one we just revealed), add the letter
				if (newRevealedLetters.includes(currentPos)) {
					newInput.push(activeClue.solution.arr[currentPos])
				} else {
					// Otherwise add empty string
					newInput.push('')
				}
			}

			// Ensure the revealed position has the correct letter (in case it was wrong)
			newInput[index] = activeClue.solution.arr[index]

			return newInput
		})

		// Increment hints counter
		setStats(prev => ({ ...prev, hints: prev.hints + 1 }))

		// Close the prompt
		setShowRevealPrompt(false)
		setRevealPromptIndex(null)
	}

	// handle clicking on a solution square
	const handleSquareClick = (index) => {
		// Don't allow clicking if already revealed
		if (revealedLetters.includes(index)) {
			return
		}

		// Don't allow clicking if this would be the last unrevealed letter
		if (revealedLetters.length >= activeClue.solution.arr.length - 1) {
			return
		}

		// Don't allow clicking if message is showing
		if (showMessage) {
			return
		}

		// Show the prompt
		setRevealPromptIndex(index)
		setShowRevealPrompt(true)
	}

    // handle input
    const handleInput = (press, revealedLettersParam = revealedLetters) => {
		setInput((prevInput) => {
            if (press !== 'del') {
				// Find the first empty, non-revealed position
				let insertPos = -1
				for (let i = 0; i < activeClue.solution.arr.length; i++) {
					if ((!prevInput[i] || prevInput[i] === '') && !revealedLettersParam.includes(i)) {
						insertPos = i
						break
					}
				}

				// If we found a position, insert the letter there
				if (insertPos >= 0) {
					const newInput = [...prevInput]

					// Extend array if needed
					while (newInput.length <= insertPos) {
						newInput.push('')
					}

					newInput[insertPos] = press

					return newInput
				}

                return prevInput
            } else if (press === 'del') {
				// Find the last non-revealed, non-empty position to delete from
				let deletePos = -1
				for (let i = prevInput.length - 1; i >= 0; i--) {
					if (!revealedLettersParam.includes(i) && prevInput[i] && prevInput[i] !== '') {
						deletePos = i
						break
					}
				}

				// If we found a position to delete, remove it
				if (deletePos >= 0) {
					const newInput = [...prevInput]
					newInput[deletePos] = ''

					// Trim trailing empty strings, but keep revealed letters
					while (newInput.length > 0) {
						const lastIndex = newInput.length - 1
						if (newInput[lastIndex] === '' && !revealedLettersParam.includes(lastIndex)) {
							newInput.pop()
						} else {
							break
						}
					}

					return newInput
				}

                return prevInput
            } else {
				return prevInput
			}
        })
    }
	
	// runs when showMessage changes (but not during showLogic - that's handled in CluePage)
	useEffect(() => {
		// Only run handleHint when showMessage is true and NOT in showLogic mode
		// In showLogic mode, CluePage's effect handles calling handleHint
		// In regular hint mode, handleHint is called directly from handleShowHint
		if (showMessage && !showLogic) {
			handleHint(activeClueRef.current, nextHint, showMessage, checkAns, showLogic)
		}
	}, [showMessage, nextHint, checkAns, showLogic])

	return {
		stats,
		setStats,
		input,
		setInput,
		handleInput,
		nextHint,
		setNextHint,
		showMessage,
		setShowMessage,
		checkAns,
		setCheckAns,
		showLogic,
		setShowLogic,
		revealedLetters,
		setRevealedLetters,
		showRevealPrompt,
		setShowRevealPrompt,
		revealPromptIndex,
		handleRevealLetter,
		handleSquareClick
	}
}

export default useManageClue