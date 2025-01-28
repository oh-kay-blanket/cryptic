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
    }, [])

	return(
		<div className='container keyboard'>
			<div className='k-row k-row-1'>
				<div onClick={()=>handleInput('Q')}><span>Q</span></div>
				<div onClick={()=>handleInput('W')}><span>W</span></div>
				<div onClick={()=>handleInput('E')}><span>E</span></div>
				<div onClick={()=>handleInput('R')}><span>R</span></div>
				<div onClick={()=>handleInput('T')}><span>T</span></div>
				<div onClick={()=>handleInput('Y')}><span>Y</span></div>
				<div onClick={()=>handleInput('U')}><span>U</span></div>
				<div onClick={()=>handleInput('I')}><span>I</span></div>
				<div onClick={()=>handleInput('O')}><span>O</span></div>
				<div onClick={()=>handleInput('P')}><span>P</span></div>
			</div>
			<div className='k-row k-row-2'>
				<div onClick={()=>handleInput('A')}><span>A</span></div>
				<div onClick={()=>handleInput('S')}><span>S</span></div>
				<div onClick={()=>handleInput('D')}><span>D</span></div>
				<div onClick={()=>handleInput('F')}><span>F</span></div>
				<div onClick={()=>handleInput('G')}><span>G</span></div>
				<div onClick={()=>handleInput('H')}><span>H</span></div>
				<div onClick={()=>handleInput('J')}><span>J</span></div>
				<div onClick={()=>handleInput('K')}><span>K</span></div>
				<div onClick={()=>handleInput('L')}><span>L</span></div>
			</div>
			<div className='k-row k-row-3'>
				<div onClick={()=>handleInput('Z')}><span>Z</span></div>
				<div onClick={()=>handleInput('X')}><span>X</span></div>
				<div onClick={()=>handleInput('C')}><span>C</span></div>
				<div onClick={()=>handleInput('V')}><span>V</span></div>
				<div onClick={()=>handleInput('B')}><span>B</span></div>
				<div onClick={()=>handleInput('N')}><span>N</span></div>
				<div onClick={()=>handleInput('M')}><span>M</span></div>
				<div onClick={()=>handleInput('del')} id='backspace'><img src={backspace}/></div>
			</div>
		</div>
	)
}

export default Keyboard