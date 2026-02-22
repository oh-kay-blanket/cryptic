import React from "react"

const getMessage = hint => {

	const vowels = ['a', 'e', 'i', 'o', 'u']

	const aAn = hint.category && hint.category.slice(0, 1).includes(vowels) ? 'a' : 'an'

	switch(hint.type) {
		case 'definition':
			if (hint.value.length === 1) { // Single definition
				return <><strong>{hint.value[0].toUpperCase()}</strong> is the definition</>
			} else { // Double definition
				return <>Both <strong>{hint.value[0].toUpperCase()}</strong> and <strong>{hint.value[1].toUpperCase()}</strong> are definitions for the solution</>
			}
		case 'indicator':
			switch(hint.category) {
				case 'anagram':
					return <><strong>{hint.value.toUpperCase()}</strong> indicates an anagram of <strong>{hint.end.value[0].toUpperCase()}</strong></>
				case 'ag-2':
					return <><strong>{hint.end.value[1].toUpperCase()}</strong> is an anagram of <strong>{hint.end.value[0].toUpperCase()}</strong></>
				case 'charade':
					return <><strong>{hint.value.toUpperCase()}</strong> can be <strong>{hint.end.value[0].toUpperCase()}</strong></>
				case 'container':
					return <><strong>{hint.value.toUpperCase()}</strong> indicates a container</>
				case 'deletion':
					return <><strong>{hint.value.toUpperCase()}</strong> indicates a deletion</>
				case 'delete even':
					return <><strong>{hint.value.toUpperCase()}</strong> indicates deleting the even letters from <strong>{hint.end.value[0].toUpperCase()}</strong></>
				case 'delete odd':
					return <><strong>{hint.value.toUpperCase()}</strong> indicates deleting the odd letters from <strong>{hint.end.value[0].toUpperCase()}</strong></>
				case 'direct':
					return <><strong>{hint.value.toUpperCase()}</strong> is used</>
				case 'hidden word':
					return <><strong>{hint.value.toUpperCase()}</strong> indicates a hidden word in <strong>{hint.end.value[0].toUpperCase()}</strong></>
				case 'hw-2':
					return <><strong>{hint.end.value[1].toUpperCase()}</strong> is hidden within <strong>{hint.end.value[0].toUpperCase()}</strong></>
				case 'homophone':
					return <><strong>{hint.value.toUpperCase()}</strong> indicates a homophone</>
				case 'hp-2':
					return <><strong>{hint.end.value[1].toUpperCase()}</strong> is a homophone of <strong>{hint.end.value[0].toUpperCase()}</strong></>
				case 'initialism':
					return <><strong>{hint.value.toUpperCase()}</strong> indicates the beginning of one or more words</>
				case 'letter bank':
					return <><strong>{hint.value.toUpperCase()}</strong> indicates a letter bank</>
				case 'lb-2':
					return <><strong>{hint.end.value[0].toUpperCase()}</strong> is a letter bank for <strong>{hint.end.value[1].toUpperCase()}</strong></>
				case 'particle':
					return <><strong>{hint.value.toUpperCase()}</strong> can be <strong>{hint.end.value[0].toUpperCase()}</strong></>
				case 'reversal':
					return <><strong>{hint.value.toUpperCase()}</strong> indicates a reversal of <strong>{hint.end.value[0].toUpperCase()}</strong>, making <strong>{hint.end.value[1].toUpperCase()}</strong></>
				case 'synonym':
					return <>Find a synonym for <strong>{hint.value.toUpperCase()}</strong></>
				case 'sy-2':
					return <><strong>{hint.value.toUpperCase()}</strong> can be <strong>{hint.end.value[0].toUpperCase()}</strong></>
				case 'symbol':
					return <><strong>{hint.value.toUpperCase()}</strong> can be <strong>{hint.end.value[0].toUpperCase()}</strong></>
				case 'spoonerism':
					return <><strong>{hint.end.value[1].toUpperCase()}</strong> is a spoonerism of <strong>{hint.end.value[0].toUpperCase()}</strong></>
				case 'dd-2':
				case 'in-2':
					return
				default:
					// One end point
					if (hint.end.value.length === 1) {
						return <><strong>{hint.value.toUpperCase()}</strong> incicates {aAn} {hint.category} at <strong>{hint.end.value[0].toUpperCase()}</strong></> 
						
						// Two end points
					} else {
						return <><strong>{hint.value.toUpperCase()}</strong> incicates {aAn} {hint.category} at <strong>{hint.end.value[0].toUpperCase()}</strong> and <strong>{hint.end.value[1].toUpperCase()}</strong></> 
					}
			}
		default: 
			return hint.value
	}
}

export default getMessage