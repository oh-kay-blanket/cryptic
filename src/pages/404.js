import React from 'react';
import ButtonContainer from '../components/bottom/ButtonContainer';

const NotFound = () => {

	// buttons
	const buttons = {
		home: {
			path: '/',
			name: "Return home",
			style: 'primary'
		}
	}

	let btnArr = [buttons.home]
	
	return (
		<section className='container' style={{ marginTop: '5rem' }}>
			<h1 style={{ textAlign: 'center' }}>Page not found</h1>
			<ButtonContainer
				btnArr={btnArr}
			/>
		</section>
	)
}

export default NotFound;