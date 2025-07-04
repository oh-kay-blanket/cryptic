import React, { useContext, useState } from 'react'
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
	>
		<circle
			cx='12'
			cy='12'
			r='10'
			stroke='#aaa'
			stroke-width='1.5'
			fill='none'
		/>
		<circle cx='12' cy='9' r='1' fill='#aaa' />
		<path d='M11 12h2v5h-2z' fill='#aaa' />
	</svg>
)

const BarGraphIcon = () => (
	<svg
		width='24'
		height='24'
		viewBox='0 0 24 24'
		fill='none'
		xmlns='http://www.w3.org/2000/svg'
	>
		<rect x='3' y='10' width='4' height='8' rx='1' fill='#aaa' />
		<rect x='9' y='6' width='4' height='12' rx='1' fill='#aaa' />
		<rect x='15' y='13' width='4' height='5' rx='1' fill='#aaa' />
	</svg>
)

const Modal = ({ open, onClose, children }) => {
	if (!open) return null
	return (
		<div className='modal-overlay' onClick={onClose}>
			<div className='modal-content' onClick={(e) => e.stopPropagation()}>
				<button className='modal-close' onClick={onClose} aria-label='Close'>
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
			<header className='top-bar'>
				<div className='top-bar-container lc-container'>
					<div className='topbar-left'>
						<button
							className='icon-btn'
							aria-label='Help'
							onClick={() => setHelpOpen(true)}
						>
							<InfoIcon />
						</button>
						<button
							className='icon-btn'
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
				<p className='mt-4'>
					Welcome to Learn Cryptic! If you're having difficulty understanding
					the clues, visit the{' '}
					<Link to='/learn' className='font-bold underline'>
						Learn
					</Link>{' '}
					page to learn more about cryptics and practice with more basic clues.
				</p>
				<p className='mt-4'>
					Have questions, comments, or want to contribute future cryptic clues?
					<a
						href='mailto:learncrypticgame@gmail.com?subject=Learn Cryptic Feedback'
						className='font-bold underline mt-2 text-center block'
					>
						Email us
					</a>
				</p>
			</Modal>
			<Modal open={statsOpen} onClose={() => setStatsOpen(false)}>
				<h2 className='my-3 text-xl font-bold'>Statistics</h2>
				<div className='stats-list'>
					<div className='stat-item'>
						🔥 <strong>Current Streak:</strong> {streak}
					</div>
					<div className='stat-item'>
						🏆 <strong>Longest Streak:</strong> {longestStreak}
					</div>
					<div className='stat-item'>
						🧩 <strong>Clues solved:</strong> {totalSolved}
					</div>
					<div className='stat-item'>
						🎯 <strong>Avg guesses:</strong> {avgGuesses}
					</div>
					<div className='stat-item'>
						💡 <strong>Avg hints:</strong> {avgHints}
					</div>
				</div>
			</Modal>
		</>
	)
}

export default TopBar
