import { useState, useEffect } from "react"

const useInput = activeClue => {

    // state
    const [input, setInput] = useState([])

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
    console.log(input)

    // handle keyboard hardware press
    useEffect(() => {
        const handleKeyDown = (e) => {
			if (/^[a-zA-Z]$/.test(e.key)) {
				handleInput(e.key)
			} else if (e.key === 'Backspace' || e.key === 'Delete') {
				handleInput('del')
			} else {
				console.log(`Non-alphabet key pressed: ${e.key}`)
			}
        }

        document.addEventListener("keydown", handleKeyDown)

        return () => {
            document.removeEventListener("keydown", handleKeyDown)
        }
    }, [])

    return { input, setInput, handleInput }
}

export default useInput
