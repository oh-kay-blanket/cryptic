import React from 'react'
import Input from './Input'
import ButtonContainer from './ButtonContainer'
import Keyboard from './Keyboard'

const Bottom = ({ mode, setMode, activeClue, setActiveClue, nextHint, showHint }) => {

  return(
    <div className='bottom'>
		<div className='container'>
			<Input />
			<ButtonContainer
				mode={mode}
				setMode={setMode}
				setActiveClue={setActiveClue}
				activeClue={activeClue}
				nextHint={nextHint}
				showHint={showHint}
			/>
			<Keyboard />
		</div>
    </div>
  )
}

export default Bottom;