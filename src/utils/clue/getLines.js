const getLines = (letters) => {

	const difference = Math.abs(letters[0].current.getBoundingClientRect().top - letters[letters.length -1].current.getBoundingClientRect().top)
	switch(true) {
		case (difference === 0):
			return 1
		case (difference > 1 && difference <= 35):
			return 2
		case (difference > 35 && difference <= 55):
			return 3
		case (difference > 55):
			return 4
	}
}

export default getLines