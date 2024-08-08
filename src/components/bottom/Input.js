import React from "react";

const Input = ({ name, btnStyle="alt", setSolution, handleButtonClick }) => {

	let className = `show-btn ${btnStyle}`;

	const buttonClick = () => setSolution(true)

  return(
    <button className={className} type='button' onClick={buttonClick}>{name}</button>
  )
}

export default Input