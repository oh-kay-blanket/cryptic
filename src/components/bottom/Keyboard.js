import React, { useEffect } from "react"

import backspace from '../../assets/img/backspace.svg'

const Keyboard = ({ handleInput }) => {

	// handle keyboard hardware press
    useEffect(() => {
        const handleKeyDown = (e) => {
			if (/^[a-zA-Z]$/.test(e.key)) {
				handleInput(e.key.toUpperCase())
			} else if (e.key === 'Backspace' || e.key === 'Delete') {
				handleInput('del')
			}
        }

        document.addEventListener("keydown", handleKeyDown)

        return () => {
            document.removeEventListener("keydown", handleKeyDown)
        }
    }, [handleInput])

	return(
		<div className='lc-container keyboard'>
			<div className='k-row k-row-1'>
				<button onClick={()=>handleInput('Q')}><span>Q</span></button>
				<button onClick={()=>handleInput('W')}><span>W</span></button>
				<button onClick={()=>handleInput('E')}><span>E</span></button>
				<button onClick={()=>handleInput('R')}><span>R</span></button>
				<button onClick={()=>handleInput('T')}><span>T</span></button>
				<button onClick={()=>handleInput('Y')}><span>Y</span></button>
				<button onClick={()=>handleInput('U')}><span>U</span></button>
				<button onClick={()=>handleInput('I')}><span>I</span></button>
				<button onClick={()=>handleInput('O')}><span>O</span></button>
				<button onClick={()=>handleInput('P')}><span>P</span></button>
			</div>
			<div className='k-row k-row-2'>
				<button onClick={()=>handleInput('A')}><span>A</span></button>
				<button onClick={()=>handleInput('S')}><span>S</span></button>
				<button onClick={()=>handleInput('D')}><span>D</span></button>
				<button onClick={()=>handleInput('F')}><span>F</span></button>
				<button onClick={()=>handleInput('G')}><span>G</span></button>
				<button onClick={()=>handleInput('H')}><span>H</span></button>
				<button onClick={()=>handleInput('J')}><span>J</span></button>
				<button onClick={()=>handleInput('K')}><span>K</span></button>
				<button onClick={()=>handleInput('L')}><span>L</span></button>
			</div>
			<div className='k-row k-row-3'>
				<button onClick={()=>handleInput('Z')}><span>Z</span></button>
				<button onClick={()=>handleInput('X')}><span>X</span></button>
				<button onClick={()=>handleInput('C')}><span>C</span></button>
				<button onClick={()=>handleInput('V')}><span>V</span></button>
				<button onClick={()=>handleInput('B')}><span>B</span></button>
				<button onClick={()=>handleInput('N')}><span>N</span></button>
				<button onClick={()=>handleInput('M')}><span>M</span></button>
				<button onClick={()=>handleInput('del')} id='backspace'><img src={backspace} alt="backspace" /></button>
			</div>
		</div>
	)
}

export default Keyboard