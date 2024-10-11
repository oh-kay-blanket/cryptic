import { useState } from 'react'

const manageHints = () => {

	// state
	const [nextHint, setNextHint] = useState(0)
	const [showMessage, setShowMessage] = useState(false)

	return { nextHint, setNextHint, showMessage, setShowMessage }
}

export default manageHints