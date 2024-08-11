import React from "react";

import backspace from '../../img/backspace.svg';

const Keyboard = () => {

	return(
		<div className='container keyboard'>
			<div className='k-row k-row-1'>
				<div><span>q</span></div>
				<div><span>w</span></div>
				<div><span>e</span></div>
				<div><span>r</span></div>
				<div><span>t</span></div>
				<div><span>y</span></div>
				<div><span>u</span></div>
				<div><span>i</span></div>
				<div><span>o</span></div>
				<div><span>p</span></div>
			</div>
			<div className='k-row k-row-2'>
				<div><span>a</span></div>
				<div><span>s</span></div>
				<div><span>d</span></div>
				<div><span>f</span></div>
				<div><span>g</span></div>
				<div><span>h</span></div>
				<div><span>j</span></div>
				<div><span>k</span></div>
				<div><span>l</span></div>
			</div>
			<div className='k-row k-row-3'>
				<div><span>z</span></div>
				<div><span>x</span></div>
				<div><span>c</span></div>
				<div><span>v</span></div>
				<div><span>b</span></div>
				<div><span>n</span></div>
				<div><span>m</span></div>
				<div id='backspace'><img src={backspace}/></div>
			</div>
		</div>
	)
}

export default Keyboard