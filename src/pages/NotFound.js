import React from 'react';
import ButtonContainer from '../components/bottom/ButtonContainer';

const NotFound = () => {

	// buttons
	const buttons = {
		home: {
			path: '/',
			name: "Return home",
			style: 'primaru'
		}
	}

	let btnArr = [buttons.home]
	
	return (
		<>
			<h1>Page not found</h1>
			<ButtonContainer
				btnArr={btnArr}
			/>
		</>
	)
}

export default NotFound;