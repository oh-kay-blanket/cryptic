// remove special characters from ref

const removeSpecial = (charArr, keepSpaces = false) => {

	const allSpecialChars = [' ', ',', '-', '_', ':', ':', '"', "'", '?', '!', '.', ';', '(', ')', '[', ']', '{', '}', '/', '\\']
	const specialChar = keepSpaces
		? allSpecialChars.filter(c => c !== ' ')
		: allSpecialChars


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