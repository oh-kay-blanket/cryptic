import React, { useEffect } from 'react'

import backspace from '../../assets/img/backspace.svg'

const Keyboard = ({ handleInput, onEnter, canCheckAnswer }) => {
	// handle keyboard hardware press
	useEffect(() => {
		const handleKeyDown = (e) => {
			if (/^[a-zA-Z]$/.test(e.key)) {
				handleInput(e.key.toUpperCase())
			} else if (e.key === 'Backspace' || e.key === 'Delete') {
				handleInput('del')
			} else if (e.key === 'Enter' && canCheckAnswer) {
				onEnter()
			}
		}

		document.addEventListener('keydown', handleKeyDown)

		return () => {
			document.removeEventListener('keydown', handleKeyDown)
		}
	}, [handleInput, onEnter, canCheckAnswer])

	return (
		<div className='lc-container keyboard'>
			<div className='k-row k-row-1'>
				<button
					onClick={() => handleInput('Q')}
					className='bg-neutral-300 dark:!bg-neutral-600 dark:!text-neutral-100 hover:bg-neutral-400 hover:dark:!bg-neutral-500'
					data-testid='keyboard-Q'
				>
					<span>Q</span>
				</button>
				<button
					onClick={() => handleInput('W')}
					className='bg-neutral-300 dark:!bg-neutral-600 dark:!text-neutral-100 hover:bg-neutral-400 hover:dark:!bg-neutral-500'
					data-testid='keyboard-W'
				>
					<span>W</span>
				</button>
				<button
					onClick={() => handleInput('E')}
					className='bg-neutral-300 dark:!bg-neutral-600 dark:!text-neutral-100 hover:bg-neutral-400 hover:dark:!bg-neutral-500'
					data-testid='keyboard-E'
				>
					<span>E</span>
				</button>
				<button
					onClick={() => handleInput('R')}
					className='bg-neutral-300 dark:!bg-neutral-600 dark:!text-neutral-100 hover:bg-neutral-400 hover:dark:!bg-neutral-500'
					data-testid='keyboard-R'
				>
					<span>R</span>
				</button>
				<button
					onClick={() => handleInput('T')}
					className='bg-neutral-300 dark:!bg-neutral-600 dark:!text-neutral-100 hover:bg-neutral-400 hover:dark:!bg-neutral-500'
					data-testid='keyboard-T'
				>
					<span>T</span>
				</button>
				<button
					onClick={() => handleInput('Y')}
					className='bg-neutral-300 dark:!bg-neutral-600 dark:!text-neutral-100 hover:bg-neutral-400 hover:dark:!bg-neutral-500'
					data-testid='keyboard-Y'
				>
					<span>Y</span>
				</button>
				<button
					onClick={() => handleInput('U')}
					className='bg-neutral-300 dark:!bg-neutral-600 dark:!text-neutral-100 hover:bg-neutral-400 hover:dark:!bg-neutral-500'
					data-testid='keyboard-U'
				>
					<span>U</span>
				</button>
				<button
					onClick={() => handleInput('I')}
					className='bg-neutral-300 dark:!bg-neutral-600 dark:!text-neutral-100 hover:bg-neutral-400 hover:dark:!bg-neutral-500'
					data-testid='keyboard-I'
				>
					<span>I</span>
				</button>
				<button
					onClick={() => handleInput('O')}
					className='bg-neutral-300 dark:!bg-neutral-600 dark:!text-neutral-100 hover:bg-neutral-400 hover:dark:!bg-neutral-500'
					data-testid='keyboard-O'
				>
					<span>O</span>
				</button>
				<button
					onClick={() => handleInput('P')}
					className='bg-neutral-300 dark:!bg-neutral-600 dark:!text-neutral-100 hover:bg-neutral-400 hover:dark:!bg-neutral-500'
					data-testid='keyboard-P'
				>
					<span>P</span>
				</button>
			</div>
			<div className='k-row k-row-2'>
				<button
					onClick={() => handleInput('A')}
					className='bg-neutral-300 dark:!bg-neutral-600 dark:!text-neutral-100 hover:bg-neutral-400 hover:dark:!bg-neutral-500'
					data-testid='keyboard-A'
				>
					<span>A</span>
				</button>
				<button
					onClick={() => handleInput('S')}
					className='bg-neutral-300 dark:!bg-neutral-600 dark:!text-neutral-100 hover:bg-neutral-400 hover:dark:!bg-neutral-500'
					data-testid='keyboard-S'
				>
					<span>S</span>
				</button>
				<button
					onClick={() => handleInput('D')}
					className='bg-neutral-300 dark:!bg-neutral-600 dark:!text-neutral-100 hover:bg-neutral-400 hover:dark:!bg-neutral-500'
					data-testid='keyboard-D'
				>
					<span>D</span>
				</button>
				<button
					onClick={() => handleInput('F')}
					className='bg-neutral-300 dark:!bg-neutral-600 dark:!text-neutral-100 hover:bg-neutral-400 hover:dark:!bg-neutral-500'
					data-testid='keyboard-F'
				>
					<span>F</span>
				</button>
				<button
					onClick={() => handleInput('G')}
					className='bg-neutral-300 dark:!bg-neutral-600 dark:!text-neutral-100 hover:bg-neutral-400 hover:dark:!bg-neutral-500'
					data-testid='keyboard-G'
				>
					<span>G</span>
				</button>
				<button
					onClick={() => handleInput('H')}
					className='bg-neutral-300 dark:!bg-neutral-600 dark:!text-neutral-100 hover:bg-neutral-400 hover:dark:!bg-neutral-500'
					data-testid='keyboard-H'
				>
					<span>H</span>
				</button>
				<button
					onClick={() => handleInput('J')}
					className='bg-neutral-300 dark:!bg-neutral-600 dark:!text-neutral-100 hover:bg-neutral-400 hover:dark:!bg-neutral-500'
					data-testid='keyboard-J'
				>
					<span>J</span>
				</button>
				<button
					onClick={() => handleInput('K')}
					className='bg-neutral-300 dark:!bg-neutral-600 dark:!text-neutral-100 hover:bg-neutral-400 hover:dark:!bg-neutral-500'
					data-testid='keyboard-K'
				>
					<span>K</span>
				</button>
				<button
					onClick={() => handleInput('L')}
					className='bg-neutral-300 dark:!bg-neutral-600 dark:!text-neutral-100 hover:bg-neutral-400 hover:dark:!bg-neutral-500'
					data-testid='keyboard-L'
				>
					<span>L</span>
				</button>
			</div>
			<div className='k-row k-row-3'>
				<button
					onClick={canCheckAnswer ? onEnter : undefined}
					id='enter-key'
					className={canCheckAnswer
						? 'bg-[#FFCBAB] dark:!bg-[rgb(120,70,45)] dark:!text-neutral-100 hover:bg-[#f5c1a1] hover:dark:!bg-[rgb(110,65,42)]'
						: 'bg-neutral-200 dark:!bg-neutral-700 text-neutral-400 dark:!text-neutral-500 cursor-default'}
					data-testid='keyboard-ENTER'
				>
					<span>Enter</span>
				</button>
				<button
					onClick={() => handleInput('Z')}
					className='bg-neutral-300 dark:!bg-neutral-600 dark:!text-neutral-100 hover:bg-neutral-400 hover:dark:!bg-neutral-500'
					data-testid='keyboard-Z'
				>
					<span>Z</span>
				</button>
				<button
					onClick={() => handleInput('X')}
					className='bg-neutral-300 dark:!bg-neutral-600 dark:!text-neutral-100 hover:bg-neutral-400 hover:dark:!bg-neutral-500'
					data-testid='keyboard-X'
				>
					<span>X</span>
				</button>
				<button
					onClick={() => handleInput('C')}
					className='bg-neutral-300 dark:!bg-neutral-600 dark:!text-neutral-100 hover:bg-neutral-400 hover:dark:!bg-neutral-500'
					data-testid='keyboard-C'
				>
					<span>C</span>
				</button>
				<button
					onClick={() => handleInput('V')}
					className='bg-neutral-300 dark:!bg-neutral-600 dark:!text-neutral-100 hover:bg-neutral-400 hover:dark:!bg-neutral-500'
					data-testid='keyboard-V'
				>
					<span>V</span>
				</button>
				<button
					onClick={() => handleInput('B')}
					className='bg-neutral-300 dark:!bg-neutral-600 dark:!text-neutral-100 hover:bg-neutral-400 hover:dark:!bg-neutral-500'
					data-testid='keyboard-B'
				>
					<span>B</span>
				</button>
				<button
					onClick={() => handleInput('N')}
					className='bg-neutral-300 dark:!bg-neutral-600 dark:!text-neutral-100 hover:bg-neutral-400 hover:dark:!bg-neutral-500'
					data-testid='keyboard-N'
				>
					<span>N</span>
				</button>
				<button
					onClick={() => handleInput('M')}
					className='bg-neutral-300 dark:!bg-neutral-600 dark:!text-neutral-100 hover:bg-neutral-400 hover:dark:!bg-neutral-500'
					data-testid='keyboard-M'
				>
					<span>M</span>
				</button>
				<button
					onClick={() => handleInput('del')}
					id='backspace'
					className='bg-neutral-300 dark:!bg-neutral-600 dark:!text-neutral-100 hover:bg-neutral-400 hover:dark:!bg-neutral-500'
					data-testid='keyboard-DEL'
				>
					<img src={backspace} alt='backspace' className='dark:invert' />
				</button>
			</div>
		</div>
	)
}

export default Keyboard
