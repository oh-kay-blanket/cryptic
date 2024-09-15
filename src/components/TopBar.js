import React from 'react';
import logo from '../assets/img/lc-logo2.png';

const TopBar = ({ setMode, setNextHint, setShowMessage, setclueId, setInput, setHintColor }) => {

	const clickTitle = () => {
		setShowMessage(false)
		setNextHint(0)
		setMode('title')
		setclueId()
		setInput([])
		setHintColor(0)
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