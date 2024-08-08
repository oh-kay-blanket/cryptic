import React from 'react'
import Button from './Button'

const Bottom = ({ name, btnStyle, solution, setSolution }) => {


  return(
    <div className='bottom'>
		<Button
			name={name}
			btnStyle={btnStyle}
			solution={solution}
			setSolution={setSolution}
		/>
    </div>
  )
}

export default Bottom;