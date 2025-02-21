import React from 'react';
import { Outlet, Link } from "react-router-dom";

import logo from '../assets/img/lc7.png';

const TopBar = ({ setReturnLearn, setStats }) => {

	const clickTitle = () => {
		setStats({ guesses: 0, hints: 0, how: '' });
		setReturnLearn(false)
	}

  return(
	<>
		<div className='top-bar'>
			<div className='container'>
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