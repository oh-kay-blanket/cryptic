import React from "react";
import { Link } from "gatsby"

const Button = ({ btnInfo }) => {

	const { path = false, name, style, onClick } = btnInfo

	return(<>
		{path ? 
			<Link to={path}>
				<button id={name.toLowerCase()} className={`show-btn ${style}`} type='button' onClick={onClick}>{name}</button>
			</Link> : 
			<button id={name.toLowerCase()} className={`show-btn ${style}`} type='button' onClick={onClick}>{name}</button>
		}
	</>)
}

export default Button