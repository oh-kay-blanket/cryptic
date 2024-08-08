import React from 'react';
import Button from './Button'

const ButtonContainer = ({ name, btnStyle, solution, setSolution }) => {

  return(
    <Button
		name={"Solve"}
		btnStyle={"alt"}
		solution={solution}
		setSolution={setSolution}
	/>
  )
}

export default ButtonContainer