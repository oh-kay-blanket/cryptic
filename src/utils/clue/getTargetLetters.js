// returns an array of refs for clue letter that match with a string or array of strings of target(s)
const getTargetLetters = (letters, activeClue, hint) => {
	// If an array of values
	if (Array.isArray(letters)) {
		// Get each index in clue of val
		const targetLettersStartArr = letters.map((val) => {
			return activeClue.clue.value.indexOf(val)
		})

		// Special case where ref is not part of clue
		if (
			(hint.category === 'particle' ||
				hint.category === 'container' ||
				hint.category === 'anagram' ||
				hint.category === 'letter bank') &&
			Array.isArray(targetLettersStartArr) &&
			targetLettersStartArr[0] === -1
		) {
			activeClue.hints.find((h) => {
				if (!!h.end && h.end.value && h.end.value[0] === letters[0]) {
					return h.addLetters.ref.current
				}
				return false
			})

			// Ref found in clue
		} else {
			// get each range of clue refs
			let clueLetters = []
			targetLettersStartArr.forEach((targetLettersStart, index) => {
				clueLetters.push(
					...activeClue.clue.ref.current.slice(
						targetLettersStart,
						targetLettersStart + letters[index].length
					)
				)
			})
			return clueLetters
		}

		// Just a string value
	} else {
		let targetLettersStart, strSlice

		if (hint.category === 'direct') {
			// Compute definition range(s) so we can exclude them from matching.
			// activeClue.definition is typically an array of strings.
			const defStrs = Array.isArray(activeClue.definition)
				? activeClue.definition
				: [activeClue.definition]
			const defRanges = defStrs
				.map((defStr) => {
					if (!defStr) return null
					const start = activeClue.clue.value.indexOf(defStr)
					return start >= 0 ? [start, start + defStr.length] : null
				})
				.filter(Boolean)

			// Collect refs already claimed by previous direct hints so later
			// direct hints with the same letters (e.g. two "a" directs in one
			// clue) find different occurrences in the clue.
			const usedRefs = new Set()
			for (const h of activeClue.hints) {
				if (h === hint) break
				if (h.category === 'direct' && Array.isArray(h.ref)) {
					h.ref.forEach((r) => usedRefs.add(r))
				}
			}

			// Out-of-range positions and any non-letter char count as word
			// boundaries (spaces, apostrophes, punctuation, digits, etc.).
			const isBoundaryChar = (pos) => {
				if (pos < 0 || pos >= activeClue.clue.value.length) return true
				return !/[a-zA-Z]/.test(activeClue.clue.value[pos])
			}

			// Find a word-boundary match of `letters` in clue.value that lies
			// outside any definition range and whose refs are not already
			// claimed by an earlier direct hint.
			let targetIdx = -1
			let searchFrom = 0
			while (searchFrom <= activeClue.clue.value.length - letters.length) {
				const idx = activeClue.clue.value.indexOf(letters, searchFrom)
				if (idx === -1) break

				const endIdx = idx + letters.length
				const hasStartBoundary = isBoundaryChar(idx - 1)
				const hasEndBoundary = isBoundaryChar(endIdx)
				const inDefinition = defRanges.some(
					([s, e]) => idx < e && endIdx > s
				)

				let refsAvailable = true
				for (let i = idx; i < endIdx; i++) {
					if (usedRefs.has(activeClue.clue.ref.current[i])) {
						refsAvailable = false
						break
					}
				}

				if (
					hasStartBoundary &&
					hasEndBoundary &&
					!inDefinition &&
					refsAvailable
				) {
					targetIdx = idx
					break
				}
				searchFrom = idx + 1
			}

			strSlice =
				targetIdx >= 0
					? activeClue.clue.ref.current.slice(
							targetIdx,
							targetIdx + letters.length
						)
					: []
		} else {
			targetLettersStart = activeClue.clue.value.indexOf(letters)
			strSlice = activeClue.clue.ref.current.slice(
				targetLettersStart,
				targetLettersStart + letters.length
			)
		}

		return strSlice
	}
}

export default getTargetLetters
