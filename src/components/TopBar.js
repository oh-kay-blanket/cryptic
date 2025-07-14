import React, { useContext, useState, useEffect } from 'react'
import { Link } from 'gatsby'

import { UserContext } from '../utils/UserContext'

import logo from '../assets/img/logo-short.png'
// Custom info icon component
const InfoIcon = () => (
	<svg
		width='24'
		height='24'
		viewBox='0 0 24 24'
		fill='none'
		xmlns='http://www.w3.org/2000/svg'
		className='text-neutral-500 dark:text-neutral-200'
	>
		<circle
			cx='12'
			cy='12'
			r='10'
			stroke='currentColor'
			strokeWidth='1.5'
			fill='none'
		/>
		<circle cx='12' cy='9' r='1' fill='currentColor' />
		<path d='M11 12h2v5h-2z' fill='currentColor' />
	</svg>
)

const BarGraphIcon = () => (
	<svg
		width='24'
		height='24'
		viewBox='0 0 24 24'
		fill='none'
		xmlns='http://www.w3.org/2000/svg'
		className='text-neutral-500 dark:text-neutral-200'
	>
		<rect x='3' y='10' width='4' height='8' rx='1' fill='currentColor' />
		<rect x='9' y='6' width='4' height='12' rx='1' fill='currentColor' />
		<rect x='15' y='13' width='4' height='5' rx='1' fill='currentColor' />
	</svg>
)

const Modal = ({ open, onClose, children }) => {
	useEffect(() => {
		const preventDefault = (e) => {
			e.preventDefault()
		}

		if (open) {
			// Prevent scrolling by blocking wheel and touch events
			document.addEventListener('wheel', preventDefault, { passive: false })
			document.addEventListener('touchmove', preventDefault, { passive: false })
		}

		// Cleanup function to remove event listeners
		return () => {
			document.removeEventListener('wheel', preventDefault)
			document.removeEventListener('touchmove', preventDefault)
		}
	}, [open])

	if (!open) return null
	return (
		<div className='modal-overlay' onClick={onClose}>
			<div
				className='modal-content bg-white dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100'
				onClick={(e) => e.stopPropagation()}
			>
				<button
					className='modal-close text-neutral-500 dark:text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200'
					onClick={onClose}
					aria-label='Close'
				>
					&times;
				</button>
				{children}
			</div>
		</div>
	)
}

const TopBar = () => {
	const {
		setReturnLearn,
		completedClues = [],
		streak = 0,
		longestStreak = 0,
		darkMode,
		setDarkMode,
	} = useContext(UserContext)
	const [helpOpen, setHelpOpen] = useState(false)
	const [statsOpen, setStatsOpen] = useState(false)

	const clickTitle = () => {
		setReturnLearn(false)
	}

	// Stats calculations
	const totalSolved = completedClues.length
	const avgGuesses =
		totalSolved > 0
			? (
					completedClues.reduce((sum, c) => sum + (c.guesses || 0), 0) /
					totalSolved
			  ).toFixed(1)
			: '0'
	const avgHints =
		totalSolved > 0
			? (
					completedClues.reduce((sum, c) => sum + (c.hints || 0), 0) /
					totalSolved
			  ).toFixed(1)
			: '0'

	return (
		<>
			<header className='top-bar bg-white dark:bg-neutral-800 border-b border-neutral-200 dark:border-neutral-700'>
				<div className='top-bar-container lc-container'>
					<div className='topbar-left'>
						<button
							className='icon-btn hover:bg-neutral-100 dark:hover:bg-neutral-700 rounded-lg p-2 transition-colors'
							aria-label='Help'
							onClick={() => setHelpOpen(true)}
						>
							<InfoIcon />
						</button>
						<button
							className='icon-btn hover:bg-neutral-100 dark:hover:bg-neutral-700 rounded-lg p-2 transition-colors'
							aria-label='Stats'
							onClick={() => setStatsOpen(true)}
						>
							<BarGraphIcon />
						</button>
					</div>
					<Link to='/' onClick={clickTitle} className='topbar-logo'>
						<img src={logo} alt='' />
					</Link>
				</div>
			</header>
			<Modal open={helpOpen} onClose={() => setHelpOpen(false)}>
				<div className='mt-6'>
					<h3 className='font-semibold mb-3'>Theme</h3>
					<div className='flex mb-4'>
						<div className='flex theme-picker-bg rounded-lg p-1 gap-1'>
							<label className='flex items-center cursor-pointer'>
								<input
									type='radio'
									name='theme'
									checked={darkMode === null}
									onChange={() => setDarkMode(null)}
									className='sr-only'
								/>
								<span
									className={`px-3 py-1 text-sm rounded-md transition-colors ${
										darkMode === null
											? 'bg-white dark:bg-neutral-600 text-neutral-900 dark:text-white shadow-sm'
											: 'text-neutral-600 dark:text-neutral-200 hover:text-neutral-900 dark:hover:text-white'
									}`}
								>
									System
								</span>
							</label>
							<label className='flex items-center cursor-pointer'>
								<input
									type='radio'
									name='theme'
									checked={darkMode === false}
									onChange={() => setDarkMode(false)}
									className='sr-only'
								/>
								<span
									className={`px-3 py-1 text-sm rounded-md transition-colors ${
										darkMode === false
											? 'bg-white dark:bg-neutral-600 text-neutral-900 dark:text-white shadow-sm'
											: 'text-neutral-600 dark:text-neutral-200 hover:text-neutral-900 dark:hover:text-white'
									}`}
								>
									Light
								</span>
							</label>
							<label className='flex items-center cursor-pointer'>
								<input
									type='radio'
									name='theme'
									checked={darkMode === true}
									onChange={() => setDarkMode(true)}
									className='sr-only'
								/>
								<span
									className={`px-3 py-1 text-sm rounded-md transition-colors ${
										darkMode === true
											? 'bg-white dark:bg-neutral-600 text-neutral-900 dark:text-white shadow-sm'
											: 'text-neutral-600 dark:text-neutral-200 hover:text-neutral-900 dark:hover:text-white'
									}`}
								>
									Dark
								</span>
							</label>
						</div>
					</div>
					<div className='mt-4 border-t border-neutral-200 dark:border-neutral-600 pt-4'>
						<p>
							<Link to='/learn' className='underline'>
								What are cryptics?
							</Link>
						</p>

						<p className='mt-2'>
							<Link to='/creators' className='underline'>
								About us
							</Link>
						</p>

						<p className='mt-2'>
							<Link to='/resources' className='underline'>
								Resources
							</Link>
						</p>
					</div>

					<div className='mt-4 border-t border-neutral-200 dark:border-neutral-600 pt-4'>
						<p>
							Have questions, comments, or want to contribute future cryptic
							clues?
							<a
								href='mailto:learncrypticgame@gmail.com?subject=Learn Cryptic Feedback'
								className='underline mt-2 block'
							>
								Email us
							</a>
						</p>
					</div>
				</div>
			</Modal>
			<Modal open={statsOpen} onClose={() => setStatsOpen(false)}>
				<h2 className='my-3 text-xl font-semibold'>Statistics</h2>
				<div className='stats-list'>
					<div className='stat-item'>
						🔥 <span className='font-medium mx-1'>Current Streak:</span>{' '}
						{streak}
					</div>
					<div className='stat-item'>
						🏆 <span className='font-medium mx-1'>Longest Streak:</span>{' '}
						{longestStreak}
					</div>
					<div className='stat-item'>
						🧩 <span className='font-medium mx-1'>Clues solved:</span>{' '}
						{totalSolved}
					</div>
					<div className='stat-item'>
						🎯 <span className='font-medium mx-1'>Avg guesses:</span>{' '}
						{avgGuesses}
					</div>
					<div className='stat-item'>
						💡 <span className='font-medium mx-1'>Avg hints:</span> {avgHints}
					</div>
				</div>
			</Modal>
		</>
	)
}

export default TopBar
