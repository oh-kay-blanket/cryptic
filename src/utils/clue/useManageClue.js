import { useState, useEffect } from 'react'

import handleHint from './handleHint'

const useManageClue = (activeClue) => {

	// state
	const [stats, setStats] = useState({ guesses: 0, hints: 0, how: '' })
    const [input, setInput] = useState([])
	const [nextHint, setNextHint] = useState(0)
	const [showMessage, setShowMessage] = useState(false)
	const [checkAns, setCheckAns] = useState(false)
	const [showLogic, setShowLogic] = useState(false)

    // handle input
    const handleInput = (press) => {
		setInput((prevInput) => {
            if (press !== 'del' && (prevInput.length < activeClue.solution.arr.length)) {
                return [...prevInput, press]
            } else if (press === 'del') {
                return prevInput.slice(0, -1) // `slice` creates a new array without the last element
            } else {
				return prevInput
			}
        })
    }
	
	// runs every change of showMessage
	useEffect(() => {
		handleHint(activeClue, nextHint, showMessage, checkAns, showLogic)
	}, [showMessage, activeClue, nextHint, checkAns, showLogic])

	return { stats, setStats, input, setInput, handleInput, nextHint, setNextHint, showMessage, setShowMessage, checkAns, setCheckAns, showLogic, setShowLogic }
}

export default useManageClue