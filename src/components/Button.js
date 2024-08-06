import React from "react";

const Button = ({ name, btnStyle="alt", setSolution }) => {

	let className = `show-btn ${btnStyle}`;

	const buttonClick = () => setSolution(true)

  return(
    <button className={className} type='button' onClick={buttonClick}>{name}</button>
  )
}

export default Button