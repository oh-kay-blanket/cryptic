import React from 'react';
import logo from '../img/lc-logo2.png';

const TopBar = ({ setMode, setNextHint, setShowMessage }) => {

	const clickTitle = () => {
		setShowMessage(false)
		setNextHint(0)
		setMode('title')
	}

  return(
    <div className='top-bar'>
		<div className='container'>
			<img src={logo} onClick={clickTitle} />
		</div>
    </div>
  )
}

export default TopBar;