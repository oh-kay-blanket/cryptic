// remove special characters from ref

const removeSpecial = (charArr) => {
	
	const specialChar = [' ', ',', '-', '_', ':', ':', '"', "'", '?', '!', '.', ';', '(', ')', '[', ']', '{', '}', '/', '\\']


	if (typeof(charArr) === 'string') {

		charArr = charArr.split('')
		return charArr.filter(char => !specialChar.includes(char)).join('')

	} else {

		return charArr.filter(ref => {
			
			// remove any special characters from ref area
			return !specialChar.includes(ref.current.textContent)
		})
	}
}

export default removeSpecial