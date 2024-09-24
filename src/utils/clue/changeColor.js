const changeColor = (hintColor, toChange, color = false) => {

	const getHex = () => {
		if (color) {
			return color
		} else {
			switch(hintColor) {
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
	}

	// console.log(toChange)

	toChange.forEach( ref => {
		ref.current.style.color = getHex()
		ref.current.style.opacity = 1;
	})
}

export default changeColor