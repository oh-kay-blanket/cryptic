import React, { useEffect } from 'react'

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

		document.addEventListener('keydown', handleKeyDown)

		return () => {
			document.removeEventListener('keydown', handleKeyDown)
		}
	}, [handleInput])

	return (
		<div className='lc-container keyboard'>
			<div className='k-row k-row-1'>
				<button
					onClick={() => handleInput('Q')}
					className='bg-neutral-300 dark:!bg-neutral-600 dark:!text-neutral-100 hover:bg-neutral-400 hover:dark:!bg-neutral-500'
				>
					<span>Q</span>
				</button>
				<button
					onClick={() => handleInput('W')}
					className='bg-neutral-300 dark:!bg-neutral-600 dark:!text-neutral-100 hover:bg-neutral-400 hover:dark:!bg-neutral-500'
				>
					<span>W</span>
				</button>
				<button
					onClick={() => handleInput('E')}
					className='bg-neutral-300 dark:!bg-neutral-600 dark:!text-neutral-100 hover:bg-neutral-400 hover:dark:!bg-neutral-500'
				>
					<span>E</span>
				</button>
				<button
					onClick={() => handleInput('R')}
					className='bg-neutral-300 dark:!bg-neutral-600 dark:!text-neutral-100 hover:bg-neutral-400 hover:dark:!bg-neutral-500'
				>
					<span>R</span>
				</button>
				<button
					onClick={() => handleInput('T')}
					className='bg-neutral-300 dark:!bg-neutral-600 dark:!text-neutral-100 hover:bg-neutral-400 hover:dark:!bg-neutral-500'
				>
					<span>T</span>
				</button>
				<button
					onClick={() => handleInput('Y')}
					className='bg-neutral-300 dark:!bg-neutral-600 dark:!text-neutral-100 hover:bg-neutral-400 hover:dark:!bg-neutral-500'
				>
					<span>Y</span>
				</button>
				<button
					onClick={() => handleInput('U')}
					className='bg-neutral-300 dark:!bg-neutral-600 dark:!text-neutral-100 hover:bg-neutral-400 hover:dark:!bg-neutral-500'
				>
					<span>U</span>
				</button>
				<button
					onClick={() => handleInput('I')}
					className='bg-neutral-300 dark:!bg-neutral-600 dark:!text-neutral-100 hover:bg-neutral-400 hover:dark:!bg-neutral-500'
				>
					<span>I</span>
				</button>
				<button
					onClick={() => handleInput('O')}
					className='bg-neutral-300 dark:!bg-neutral-600 dark:!text-neutral-100 hover:bg-neutral-400 hover:dark:!bg-neutral-500'
				>
					<span>O</span>
				</button>
				<button
					onClick={() => handleInput('P')}
					className='bg-neutral-300 dark:!bg-neutral-600 dark:!text-neutral-100 hover:bg-neutral-400 hover:dark:!bg-neutral-500'
				>
					<span>P</span>
				</button>
			</div>
			<div className='k-row k-row-2'>
				<button
					onClick={() => handleInput('A')}
					className='bg-neutral-300 dark:!bg-neutral-600 dark:!text-neutral-100 hover:bg-neutral-400 hover:dark:!bg-neutral-500'
				>
					<span>A</span>
				</button>
				<button
					onClick={() => handleInput('S')}
					className='bg-neutral-300 dark:!bg-neutral-600 dark:!text-neutral-100 hover:bg-neutral-400 hover:dark:!bg-neutral-500'
				>
					<span>S</span>
				</button>
				<button
					onClick={() => handleInput('D')}
					className='bg-neutral-300 dark:!bg-neutral-600 dark:!text-neutral-100 hover:bg-neutral-400 hover:dark:!bg-neutral-500'
				>
					<span>D</span>
				</button>
				<button
					onClick={() => handleInput('F')}
					className='bg-neutral-300 dark:!bg-neutral-600 dark:!text-neutral-100 hover:bg-neutral-400 hover:dark:!bg-neutral-500'
				>
					<span>F</span>
				</button>
				<button
					onClick={() => handleInput('G')}
					className='bg-neutral-300 dark:!bg-neutral-600 dark:!text-neutral-100 hover:bg-neutral-400 hover:dark:!bg-neutral-500'
				>
					<span>G</span>
				</button>
				<button
					onClick={() => handleInput('H')}
					className='bg-neutral-300 dark:!bg-neutral-600 dark:!text-neutral-100 hover:bg-neutral-400 hover:dark:!bg-neutral-500'
				>
					<span>H</span>
				</button>
				<button
					onClick={() => handleInput('J')}
					className='bg-neutral-300 dark:!bg-neutral-600 dark:!text-neutral-100 hover:bg-neutral-400 hover:dark:!bg-neutral-500'
				>
					<span>J</span>
				</button>
				<button
					onClick={() => handleInput('K')}
					className='bg-neutral-300 dark:!bg-neutral-600 dark:!text-neutral-100 hover:bg-neutral-400 hover:dark:!bg-neutral-500'
				>
					<span>K</span>
				</button>
				<button
					onClick={() => handleInput('L')}
					className='bg-neutral-300 dark:!bg-neutral-600 dark:!text-neutral-100 hover:bg-neutral-400 hover:dark:!bg-neutral-500'
				>
					<span>L</span>
				</button>
			</div>
			<div className='k-row k-row-3'>
				<button
					onClick={() => handleInput('Z')}
					className='bg-neutral-300 dark:!bg-neutral-600 dark:!text-neutral-100 hover:bg-neutral-400 hover:dark:!bg-neutral-500'
				>
					<span>Z</span>
				</button>
				<button
					onClick={() => handleInput('X')}
					className='bg-neutral-300 dark:!bg-neutral-600 dark:!text-neutral-100 hover:bg-neutral-400 hover:dark:!bg-neutral-500'
				>
					<span>X</span>
				</button>
				<button
					onClick={() => handleInput('C')}
					className='bg-neutral-300 dark:!bg-neutral-600 dark:!text-neutral-100 hover:bg-neutral-400 hover:dark:!bg-neutral-500'
				>
					<span>C</span>
				</button>
				<button
					onClick={() => handleInput('V')}
					className='bg-neutral-300 dark:!bg-neutral-600 dark:!text-neutral-100 hover:bg-neutral-400 hover:dark:!bg-neutral-500'
				>
					<span>V</span>
				</button>
				<button
					onClick={() => handleInput('B')}
					className='bg-neutral-300 dark:!bg-neutral-600 dark:!text-neutral-100 hover:bg-neutral-400 hover:dark:!bg-neutral-500'
				>
					<span>B</span>
				</button>
				<button
					onClick={() => handleInput('N')}
					className='bg-neutral-300 dark:!bg-neutral-600 dark:!text-neutral-100 hover:bg-neutral-400 hover:dark:!bg-neutral-500'
				>
					<span>N</span>
				</button>
				<button
					onClick={() => handleInput('M')}
					className='bg-neutral-300 dark:!bg-neutral-600 dark:!text-neutral-100 hover:bg-neutral-400 hover:dark:!bg-neutral-500'
				>
					<span>M</span>
				</button>
				<button
					onClick={() => handleInput('del')}
					id='backspace'
					className='bg-neutral-300 dark:!bg-neutral-600 dark:!text-neutral-100 hover:bg-neutral-400 hover:dark:!bg-neutral-500'
				>
					<img src={backspace} alt='backspace' className='dark:invert' />
				</button>
			</div>
		</div>
	)
}

export default Keyboard
