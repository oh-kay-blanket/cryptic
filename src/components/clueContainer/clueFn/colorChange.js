const colorChange = (toChange, hex = '#C94F03') => {
	toChange.forEach( ref => {
		ref.current.style.color = hex
	})
}

export default colorChange