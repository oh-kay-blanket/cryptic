import React from 'react'
import Input from './Input'
import ButtonContainer from './ButtonContainer'
import Keyboard from './Keyboard'

const Bottom = ({ name, btnStyle, solution, setSolution }) => {

  return(
    <div className='bottom'>
		<div className='container'>
			<Input />
			<ButtonContainer
				name={name}
				btnStyle={btnStyle}
				solution={solution}
				setSolution={setSolution}
			/>
			<Keyboard />
		</div>
    </div>
  )
}

export default Bottom;