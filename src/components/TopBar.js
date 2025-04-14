import React, { useContext } from 'react'
import { Link } from 'gatsby'

import { UserContext } from '../utils/UserContext'

import logo from '../assets/img/logo-short.png'

const TopBar = () => {

	const { setReturnLearn } = useContext(UserContext)

	const clickTitle = () => {
		setReturnLearn(false)
	}

  return(
	<>
		<header className='top-bar'>
			<div className='container'>
				<Link to='/' onClick={ clickTitle }>
					<img src={logo} alt="" />
				</Link>
			</div>
		</header>
	</>
  )
}

export default TopBar