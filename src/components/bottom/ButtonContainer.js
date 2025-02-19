import React from 'react';
import Button from './Button'

const ButtonContainer = ({ btnArr, isSolution, stack = false }) => {

	const buttons = btnArr.map((btnInfo, index) => <Button key={index} btnInfo={btnInfo} />)

	return (
		<div className={`button-container${stack ? ' stack' : ''}${isSolution ? ' solution' : ''}`}>
			{buttons}
		</div>
	)
}

export default ButtonContainer