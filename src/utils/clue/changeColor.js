const changeColor = (toChange, color = false, recheck) => {

	const getHex = () => {
		if (color) {
			return color
		} else {
			return '#C94F03'
		}
	}

	if (Array.isArray(toChange)) {
		toChange.forEach( ref => {

			if (recheck) {
				if (ref.current.style.color == 'rgb(201, 79, 3)') ref.current.style.color = '#0B0B0B'
			} else {
				ref.current.style.color = getHex()
				ref.current.style.opacity = 1;
			}
		})
	} else {
		if (recheck) {
			if (toChange.current.style.color == 'rgb(201, 79, 3)') toChange.current.style.color = '#0B0B0B'
		} else {
			toChange.current.style.color = getHex()
			toChange.current.style.opacity = 1;
		}
	}
}

export default changeColor