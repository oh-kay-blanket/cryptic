import React from 'react';
import Button from './Button'

const ButtonContainer = ({ name, btnStyle, solution, setSolution }) => {

  return(
	<div className='button-container'>
		<Button
			name={name}
			btnStyle={btnStyle}
			solution={solution}
			setSolution={setSolution}
		/>
	</div>
  )
}

export default ButtonContainer