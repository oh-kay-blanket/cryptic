import { useState } from 'react'

const manageHints = () => {

	// state
	const [nextHint, setNextHint] = useState(0)
	const [showMessage, setShowMessage] = useState(false)
	const [hintColor, setHintColor] = useState(0)

	return { nextHint, setNextHint, showMessage, setShowMessage, hintColor, setHintColor }
}

export default manageHints