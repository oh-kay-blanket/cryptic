import { useState, useEffect } from "react"

const useInput = activeClue => {

    // state
    const [input, setInput] = useState([])
	const [checkAns, setCheckAns] = useState(false)

    // handle input
    const handleInput = (press) => {
		setInput((prevInput) => {
            if (press !== 'del' && (prevInput.length < activeClue.solArr.length)) {
                return [...prevInput, press];
            } else if (press === 'del') {
                return prevInput.slice(0, -1); // `slice` creates a new array without the last element
            } else {
				return prevInput
			}
        })
    }

    return { input, setInput, handleInput, checkAns, setCheckAns }
}

export default useInput
