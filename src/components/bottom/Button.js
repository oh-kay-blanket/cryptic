import React from "react";

const Button = ({ btnInfo }) => {

	const { name, style, onClick } = btnInfo

	// let addFocus = autofocus ? 'autofocus' : ""

	return(
		<button id={name.toLowerCase()} className={`show-btn ${style}`} type='button' onClick={onClick} autoFocus
		>{name}</button>
	)
}

export default Button