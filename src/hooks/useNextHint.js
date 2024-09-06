import { useState } from 'react'

const useNextHint = () => {

	// state
	const [nextHint, setNextHint] = useState(0)
	const [showMessage, setShowMessage] = useState(false)

	return { nextHint, setNextHint, showMessage, setShowMessage }
}

export default useNextHint