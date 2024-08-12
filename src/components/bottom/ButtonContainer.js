import React from 'react';
import Button from './Button'

const ButtonContainer = ({ btnArr }) => {

	const buttons = btnArr.map((btnInfo, index) => <Button key={index} btnInfo={btnInfo} />)

	return (
		<div className='button-container'>
			{buttons}
		</div>
	)
}

export default ButtonContainer