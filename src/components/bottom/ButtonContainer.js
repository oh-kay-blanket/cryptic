import React from 'react';
import Button from './Button'

const ButtonContainer = ({ btnArr }) => {

	return (
		<div className='button-container'>
			{btnArr}
		</div>
	)
}

export default ButtonContainer