import React from 'react';
import Button from './Button'

const ButtonContainer = ({ btnArr, isSolution }) => {

	const buttons = btnArr.map((btnInfo, index) => <Button key={index} btnInfo={btnInfo} />)

	return (
		<div className={`button-container${isSolution ? ' solution' : ''}`}>
			{buttons}
		</div>
	)
}

export default ButtonContainer