import React from "react";

const Button = ({ name, btnStyle="secondary", onClick }) => {

	let className = `show-btn ${btnStyle}`;

  return(
    <button className={className} type='button' onClick={onClick}>{name}</button>
  )
}

export default Button