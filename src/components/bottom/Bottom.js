import React from 'react'
import Input from './Input'
import Button from './Button'
import Keyboard from './Keyboard'

const Bottom = ({ name, btnStyle, solution, setSolution }) => {

  return(
    <div className='bottom'>
		<div className='container'>
			<Button
				name={name}
				btnStyle={btnStyle}
				solution={solution}
				setSolution={setSolution}
			/>
		</div>
    </div>
  )
}

export default Bottom;