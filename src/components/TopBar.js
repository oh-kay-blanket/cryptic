import React from 'react';
import logo from '../img/lc-logo2.png';

const TopBar = ({ setMode }) => {

  return(
    <div className='top-bar'>
		<div className='container'>
			<img src={logo} onClick={()=>setMode('title')} />
		</div>
    </div>
  )
}

export default TopBar;