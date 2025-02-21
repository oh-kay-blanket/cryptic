import React from 'react';
import { Outlet, Link } from "react-router-dom";

import logo from '../assets/img/lc7.png';

const TopBar = ({ setReturnLearn, setStats }) => {

	const clickTitle = () => {
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