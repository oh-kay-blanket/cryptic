import React from 'react'
import ButtonContainer from './ButtonContainer';

const Message = ({ message, name, onClick }) => {

	return(
		<div className={`message`}>
			<div className={'message-copy'}>{message}</div>
			<ButtonContainer
				btnInfo={{name: 'Continue'}}
				name={name}
			/>
		</div>
	)
}

export default Message