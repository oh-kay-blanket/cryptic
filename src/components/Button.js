import React from "react";

const Button = ({ name, btnStyle="alt", buttonClick }) => {

	let className = `show-btn ${btnStyle}`;

  return(
    <input className={className} type='button' value={name} onClick={buttonClick} />
  )
}

export default Button