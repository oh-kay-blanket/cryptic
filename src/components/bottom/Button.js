import React from "react";

const Button = ({ btnInfo }) => {

	return(
		<button className={`show-btn ${btnInfo.style}`} type='button' onClick={btnInfo.onClick}>{btnInfo.name}</button>
	)
}

export default Button