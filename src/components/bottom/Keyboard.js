import React from "react";

import backspace from '../../img/backspace.svg';

const Keyboard = () => {

	const keyPress = ltr => console.log(ltr)

	return(
		<div className='container keyboard'>
			<div className='k-row k-row-1'>
				<div onClick={()=>keyPress('q')}><span>q</span></div>
				<div onClick={()=>keyPress('w')}><span>w</span></div>
				<div onClick={()=>keyPress('e')}><span>e</span></div>
				<div onClick={()=>keyPress('r')}><span>r</span></div>
				<div onClick={()=>keyPress('t')}><span>t</span></div>
				<div onClick={()=>keyPress('y')}><span>y</span></div>
				<div onClick={()=>keyPress('u')}><span>u</span></div>
				<div onClick={()=>keyPress('i')}><span>i</span></div>
				<div onClick={()=>keyPress('o')}><span>o</span></div>
				<div onClick={()=>keyPress('p')}><span>p</span></div>
			</div>
			<div className='k-row k-row-2'>
				<div onClick={()=>keyPress('a')}><span>a</span></div>
				<div onClick={()=>keyPress('s')}><span>s</span></div>
				<div onClick={()=>keyPress('d')}><span>d</span></div>
				<div onClick={()=>keyPress('f')}><span>f</span></div>
				<div onClick={()=>keyPress('g')}><span>g</span></div>
				<div onClick={()=>keyPress('h')}><span>h</span></div>
				<div onClick={()=>keyPress('j')}><span>j</span></div>
				<div onClick={()=>keyPress('k')}><span>k</span></div>
				<div onClick={()=>keyPress('l')}><span>l</span></div>
			</div>
			<div className='k-row k-row-3'>
				<div onClick={()=>keyPress('z')}><span>z</span></div>
				<div onClick={()=>keyPress('x')}><span>x</span></div>
				<div onClick={()=>keyPress('c')}><span>c</span></div>
				<div onClick={()=>keyPress('v')}><span>v</span></div>
				<div onClick={()=>keyPress('b')}><span>b</span></div>
				<div onClick={()=>keyPress('n')}><span>n</span></div>
				<div onClick={()=>keyPress('m')}><span>m</span></div>
				<div onClick={()=>keyPress('del')} id='backspace'><img src={backspace}/></div>
			</div>
		</div>
	)
}

export default Keyboard