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
			  ).toFixed(2)
			: '0'
	const avgHints =
		totalSolved > 0
			? (
					completedClues.reduce((sum, c) => sum + (c.hints || 0), 0) /
					totalSolved
			  ).toFixed(2)
			: '0'

	return (
		<>
			<header className='top-bar'>
				<div className='container'>
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
				<h2>About Cryptic</h2>
				<p>
					Welcome to Cryptic! If you're having difficulty understanding the
					clues, visit the <Link to='/learn'>Learn</Link> page to learn more
					about cryptics and practice with more basic clues.
				</p>
				<p>
					Have questions, comments, or want to contribute future cryptic clues?{' '}
					<a href='mailto:learncrypticgame@gmail.com'>Contact us</a>!
				</p>
			</Modal>
			<Modal open={statsOpen} onClose={() => setStatsOpen(false)}>
				<h2>Your Stats</h2>
				<ul>
					<li>
						<strong>Streak:</strong> {streak}
					</li>
					<li>
						<strong>Total clues solved:</strong> {totalSolved}
					</li>
					<li>
						<strong>Average guesses per clue:</strong> {avgGuesses}
					</li>
					<li>
						<strong>Average hints per clue:</strong> {avgHints}
					</li>
				</ul>
			</Modal>
		</>
	)
}

export default TopBar
