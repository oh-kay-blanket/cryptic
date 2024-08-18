import { useState } from 'react'

const useNextHint = activeClue => {

	// state
	const [nextHint, setNextHint] = useState(0)
	const [showMessage, setShowMessage] = useState(false)

	// set initial btns
	var btnArr = btnArr || [{ name:'Show hint', style: 'secondary', onClick: function(){showHint()} }]

	const showHint = () => {
		setShowMessage(true)
	}

	return { nextHint, setNextHint, showHint, showMessage, setShowMessage, btnArr }
}

export default useNextHint