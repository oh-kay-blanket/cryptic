import React from 'react';

const C1 = ({ solution }) => {

	let className = `clue`;
	if (solution) className += ' solution'; 

	return(
		<div className={className}>
			<div className='w2'>
				<span className='letter'>I</span>
				<span className='letter'>t</span>
				<span className='letter'>s</span>
				<span className='letter'> </span>
				<span className='letter'>a</span>
				<span className='letter'>n</span>
				<span className='letter'> </span>
				<span className='letter'>A</span>
				<span className='letter'>n</span>
				<span className='letter'>a</span>
				<span className='letter'>g</span>
				<span className='letter'>r</span>
				<span className='letter'>a</span>
				<span className='letter'>m</span>
			</div>
			
			<div className='w1'>
				<span className='letter'>S</span>
				<span className='letter'>a</span>
				<span className='letter'>t</span>
				<span className='letter'>i</span>
				<span className='letter'>n</span>
				<span className='letter'> </span>
				<span className='letter'>R</span>
				<span className='letter'>a</span>
				<span className='letter'>g</span>
				<span className='letter'>a</span>
				<span className='letter'> </span>
				<span className='letter'>M</span>
				<span className='letter'>a</span>
				<span className='letter'>n</span>
			</div>

		</div>
	)
}

export default C1;