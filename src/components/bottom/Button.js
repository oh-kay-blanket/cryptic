import React from "react"
import { Link } from "gatsby"

const Button = ({ btnInfo }) => {

	const { path = false, name, style, onClick, img = false } = btnInfo

	return(<>
		{path ? 
			<Link to={path} id={name.toLowerCase()} className={`show-btn ${style}`} type='button' onClick={onClick}>{name}</Link> : 
			<button id={name.toLowerCase()} className={`show-btn ${style}`} type='button' onClick={onClick}>{name}{img}</button>
		}
	</>)
}

export default Button