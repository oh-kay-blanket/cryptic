import React from 'react'

import types from '../assets/type.json'

const Tooltip = ({ text }) => {

	const matchType = types.find(type => type.type.toUpperCase() === text.toUpperCase())

    return (
        <div role="tooltip" className="tooltip" id={text}>
			<p className='tooltip-description'>{matchType.description}</p>
			<p className='tooltip-example'>{matchType.example}</p>
		</div>
    )
}

export default Tooltip;