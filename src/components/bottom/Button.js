import React from "react";

const Button = ({ btnInfo }) => {

	const { name, style, onClick } = btnInfo

	return(
		<button className={`show-btn ${style}`} type='button' onClick={onClick}>{name}</button>
	)
}

export default Button