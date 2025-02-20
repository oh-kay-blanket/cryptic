import React from 'react';
import { Outlet, Link } from "react-router-dom";

import logo from '../assets/img/lc7.png';

const TopBar = ({ setMode, setNextHint, setShowMessage, setclueId, setInput, setReturnLearn, setStats }) => {

	const clickTitle = () => {
		setShowMessage(false)
		setNextHint(0)
		setMode('title')
		setclueId()
		setInput([])
		setStats({ guesses: 0, hints: 0, how: '' });
		setReturnLearn(false)
	}

	const clickInfo = () => {
		console.log('info')
	}

  return(
	<>
		<div className='top-bar'>
			<div className='container'>
				{/* <img src={info} onClick={clickInfo} /> */}
				<Link to='/'>
					<img src={logo} onClick={ clickTitle } />
				</Link>
			</div>
		</div>
		<Outlet />
	</>
  )
}

export default TopBar;