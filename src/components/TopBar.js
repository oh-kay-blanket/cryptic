import React from 'react';

import logo from '../assets/img/lc7.png';
import info from '../assets/img/info.svg';

const TopBar = ({ setMode, setNextHint, setShowMessage, setclueId, setInput }) => {

	const clickTitle = () => {
		setShowMessage(false)
		setNextHint(0)
		setMode('title')
		setclueId()
		setInput([])
	}

	const clickInfo = () => {
		console.log('info')
	}

  return(
    <div className='top-bar'>
		<div className='container'>
			{/* <img src={info} onClick={clickInfo} /> */}
			<img src={logo} onClick={clickTitle} />
		</div>
    </div>
  )
}

export default TopBar;