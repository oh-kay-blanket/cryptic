import { useState, useEffect } from 'react'

import handleHint from './handleHint'

const manageClue = (activeClue) => {

	// state
	const [stats, setStats] = useState({ guesses: 0, hints: 0, how: '' })
    const [input, setInput] = useState([])
	const [nextHint, setNextHint] = useState(0)
	const [showMessage, setShowMessage] = useState(false)
	const [checkAns, setCheckAns] = useState(false)

    // handle input
    const handleInput = (press) => {
		setInput((prevInput) => {
            if (press !== 'del' && (prevInput.length < activeClue.solution.arr.length)) {
                return [...prevInput, press];
            } else if (press === 'del') {
                return prevInput.slice(0, -1); // `slice` creates a new array without the last element
            } else {
				return prevInput
			}
        })
    }
	
	// runs every change of showMessage
	useEffect(() => {
		handleHint(activeClue, nextHint, showMessage, checkAns)
	}, [showMessage])

	return { stats, setStats, input, setInput, handleInput, nextHint, setNextHint, showMessage, setShowMessage, checkAns, setCheckAns }
}

export default manageClue