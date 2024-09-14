const changeColor = (hintColor, toChange) => {

	const getHex = (color) => {
		switch(color) {
			case 0:
				return '#C94F03'
			case 1:
				return '#7457d6'
			case 2:
				return '#d2268a'
			case 3:
				return '#2a70bb'
			default: 
				return '#C94F03'
		}
	}
	

	toChange.forEach( ref => {
		ref.current.style.color = getHex(hintColor)
	})
}

export default changeColor