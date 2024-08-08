import React from 'react';
import logo from '../img/lc-logo2.png';

const TopBar = () => {


  return(
    <div className='top-bar'>
		<div className='container'>
			<img src={logo} />
		</div>
    </div>
  )
}

export default TopBar;