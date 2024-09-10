import React, { useEffect } from "react"

import backspace from '../../assets/img/backspace.svg'

const Keyboard = ({ handleInput }) => {

	// handle keyboard hardware press
    useEffect(() => {
        const handleKeyDown = (e) => {
			if (/^[a-zA-Z]$/.test(e.key)) {
				handleInput(e.key.toLowerCase())
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
				<div onClick={()=>handleInput('q')}><span>q</span></div>
				<div onClick={()=>handleInput('w')}><span>w</span></div>
				<div onClick={()=>handleInput('e')}><span>e</span></div>
				<div onClick={()=>handleInput('r')}><span>r</span></div>
				<div onClick={()=>handleInput('t')}><span>t</span></div>
				<div onClick={()=>handleInput('y')}><span>y</span></div>
				<div onClick={()=>handleInput('u')}><span>u</span></div>
				<div onClick={()=>handleInput('i')}><span>i</span></div>
				<div onClick={()=>handleInput('o')}><span>o</span></div>
				<div onClick={()=>handleInput('p')}><span>p</span></div>
			</div>
			<div className='k-row k-row-2'>
				<div onClick={()=>handleInput('a')}><span>a</span></div>
				<div onClick={()=>handleInput('s')}><span>s</span></div>
				<div onClick={()=>handleInput('d')}><span>d</span></div>
				<div onClick={()=>handleInput('f')}><span>f</span></div>
				<div onClick={()=>handleInput('g')}><span>g</span></div>
				<div onClick={()=>handleInput('h')}><span>h</span></div>
				<div onClick={()=>handleInput('j')}><span>j</span></div>
				<div onClick={()=>handleInput('k')}><span>k</span></div>
				<div onClick={()=>handleInput('l')}><span>l</span></div>
			</div>
			<div className='k-row k-row-3'>
				<div onClick={()=>handleInput('z')}><span>z</span></div>
				<div onClick={()=>handleInput('x')}><span>x</span></div>
				<div onClick={()=>handleInput('c')}><span>c</span></div>
				<div onClick={()=>handleInput('v')}><span>v</span></div>
				<div onClick={()=>handleInput('b')}><span>b</span></div>
				<div onClick={()=>handleInput('n')}><span>n</span></div>
				<div onClick={()=>handleInput('m')}><span>m</span></div>
				<div onClick={()=>handleInput('del')} id='backspace'><img src={backspace}/></div>
			</div>
		</div>
	)
}

export default Keyboard