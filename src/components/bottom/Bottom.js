import React from 'react'

import Input from './Input'
import ButtonContainer from './ButtonContainer'
import Keyboard from './Keyboard'
import Message from './Message'

const Bottom = ({ message, btnArr }) => {

	return(
		<div className='bottom'>
			<div className='container'>
				<Input />
				<ButtonContainer
					btnArr={btnArr}
				/>
				<Keyboard />
				<Message
					message={message}
				/>
			</div>
		</div>
	)
}

export default Bottom;