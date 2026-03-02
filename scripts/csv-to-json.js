const fs = require('fs')
const path = require('path')

// Recursively set nested value using dot notation, supporting arrays and objects
function setDeep(obj, path, value) {
	// Skip empty values - don't create the property at all
	if (value === null || value === undefined || value === '') {
		return
	}

	const keys = path.split('.')
	let current = obj
	for (let i = 0; i < keys.length; i++) {
		let key = keys[i]
		// If key is an array index
		if (/^\d+$/.test(key)) {
			key = parseInt(key, 10)
			if (!Array.isArray(current)) current = []
			if (!current[key]) current[key] = {}
			if (i === keys.length - 1) {
				current[key] = value
			} else {
				if (typeof current[key] !== 'object') current[key] = {}
				current = current[key]
			}
		} else {
			// If next key is an array index, make this an array
			if (i < keys.length - 1 && /^\d+$/.test(keys[i + 1])) {
				if (!Array.isArray(current[key])) current[key] = []
			} else {
				if (!current[key]) current[key] = {}
			}
			if (i === keys.length - 1) {
				current[key] = value
			} else {
				current = current[key]
			}
		}
	}
}

// Group all values for a given prefix (e.g., definition.0, definition.1, ...)
function groupArrayFields(row, prefix) {
	const arr = []
	Object.keys(row).forEach((key) => {
		const match = key.match(new RegExp(`^${prefix}\\.(\\d+)$`))
		if (match && row[key] !== '') {
			arr[parseInt(match[1], 10)] = row[key]
		}
	})
	// Remove undefined holes
	return arr.filter((v) => v !== undefined && v !== '')
}

// Clean up hints array to remove empty hint objects
function cleanHints(obj) {
	if (obj.hints && Array.isArray(obj.hints)) {
		obj.hints = obj.hints.filter((hint) => {
			// Keep hint if it has category, value, or explainer
			return hint.category || hint.value || hint.explainer
		})

		// If hints array is empty, remove it entirely
		if (obj.hints.length === 0) {
			delete obj.hints
		}
	}
}

// Function to convert CSV to JSON with nested objects
function csvToJson(csvText) {
	const lines = csvText.trim().split('\n')

	// Detect delimiter (comma or tab)
	const firstLine = lines[0]
	const hasCommas = firstLine.includes(',')
	const hasTabs = firstLine.includes('\t')
	const delimiter = hasTabs ? '\t' : ','

	const headers = lines[0].split(delimiter).map((h) => h.trim())
	const result = []

	for (let i = 1; i < lines.length; i++) {
		const values = parseCSVLine(lines[i], delimiter)
		const row = {}
		headers.forEach((header, idx) => {
			row[header] = values[idx] || ''
		})

		// Build nested object
		const obj = {}
		Object.entries(row).forEach(([key, value]) => {
			if (value === '') return
			// Try to parse as JSON if it looks like JSON
			let parsed = value
			if (value.startsWith('{') || value.startsWith('[')) {
				try {
					parsed = JSON.parse(value)
				} catch {
					parsed = value
				}
			}
			setDeep(obj, key, parsed)
		})

		// Group definition array if present
		if (Object.keys(row).some((k) => k.startsWith('definition.'))) {
			obj.definition = groupArrayFields(row, 'definition')
		}

		// Group hints.N.end.value arrays if present, but preserve other hint fields
		for (let h = 0; h < 10; h++) {
			const hintPrefix = `hints.${h}.end.value`
			if (Object.keys(row).some((k) => k.startsWith(hintPrefix + '.'))) {
				if (!obj.hints) obj.hints = []
				if (!obj.hints[h]) obj.hints[h] = {}
				if (!obj.hints[h].end) obj.hints[h].end = {}
				obj.hints[h].end.value = groupArrayFields(row, hintPrefix)
			}
		}

		// Clean up hints to remove empty hint objects
		cleanHints(obj)

		result.push(obj)
	}
	return result
}

// Function to parse CSV line properly (handles delimiters within quotes)
function parseCSVLine(line, delimiter) {
	const result = []
	let current = ''
	let inQuotes = false
	let fieldStart = true

	// Normalize different quote characters to standard ASCII quotes
	const normalizedLine = line
		.replace(/[\u201C\u201D]/g, '"') // Replace Unicode smart quotes with regular quotes
		.replace(/[\u2018\u2019]/g, "'") // Replace Unicode smart apostrophes with regular apostrophes

	// Helper function to check if a field starting with a quote is properly quoted
	// Fixed to only scan until the end of the current field to prevent interference from later fields
	const isProperlyQuotedField = (startPos) => {
		let quoteCount = 0
		let foundClosingQuote = false
		
		for (let j = startPos; j < normalizedLine.length; j++) {
			const char = normalizedLine[j]
			if (char === '"') {
				quoteCount++
				// Check for escaped quotes
				if (j + 1 < normalizedLine.length && normalizedLine[j + 1] === '"') {
					j++ // Skip the next quote
				} else if (quoteCount % 2 === 0) {
					// Found potential closing quote
					foundClosingQuote = true
					// Check if next non-whitespace char is delimiter or end
					for (let k = j + 1; k < normalizedLine.length; k++) {
						const nextChar = normalizedLine[k]
						if (nextChar === delimiter) {
							return true // Properly quoted field
						}
						if (k === normalizedLine.length - 1) {
							return true // Properly quoted field at end of line
						}
						if (nextChar !== ' ' && nextChar !== '\t') {
							// Found non-whitespace content after quote, this is not a properly quoted field
							return false
						}
					}
				}
			} else if (char === delimiter) {
				// Reached end of current field
				if (quoteCount % 2 === 1) {
					// Odd number of quotes means we're still inside quotes, improperly terminated
					return false
				}
				// Even number of quotes, but we need to check if we found a proper closing quote
				return foundClosingQuote
			}
		}
		
		// Reached end of line
		return foundClosingQuote && quoteCount % 2 === 0
	}

	for (let i = 0; i < normalizedLine.length; i++) {
		const char = normalizedLine[i]
		if (char === '"') {
			// Only treat quotes as field delimiters if they're at the start of a field AND it's properly quoted
			if (fieldStart) {
				if (isProperlyQuotedField(i)) {
					inQuotes = !inQuotes
					fieldStart = false
				} else {
					// Quote is part of field content, not a delimiter
					current += char
					fieldStart = false
				}
			} else if (inQuotes) {
				// Check if this is an escaped quote (double quote)
				if (i + 1 < normalizedLine.length && normalizedLine[i + 1] === '"') {
					// This is an escaped quote, add a single quote to current and skip next char
					current += '"'
					i++ // Skip the next quote
				} else {
					// This is the closing quote for the field
					inQuotes = false
				}
			} else {
				// Quote is inside unquoted field content, treat as literal
				current += char
			}
		} else if (char === delimiter && !inQuotes) {
			result.push(current)
			current = ''
			fieldStart = true
		} else {
			current += char
			fieldStart = false
		}
	}

	result.push(current)
	return result
}

// Simple CSV to JSON for flat files (no nested objects)
function simpleCsvToJson(csvText) {
	const lines = csvText.trim().split('\n')

	// Detect delimiter (comma or tab)
	const firstLine = lines[0]
	const hasTabs = firstLine.includes('\t')
	const delimiter = hasTabs ? '\t' : ','

	const headers = lines[0].split(delimiter).map((h) => h.trim())
	const result = []

	for (let i = 1; i < lines.length; i++) {
		const values = parseCSVLine(lines[i], delimiter)
		const obj = {}
		headers.forEach((header, idx) => {
			const value = values[idx] || ''
			if (value !== '') {
				obj[header] = value
			}
		})
		result.push(obj)
	}
	return result
}

// Convert clues.csv to clues.json
function convertClues() {
	const csvPath = path.join(__dirname, '../src/assets/data/clues.csv')
	const jsonPath = path.join(__dirname, '../src/assets/data/clues.json')

	try {
		// Check if CSV file exists
		if (!fs.existsSync(csvPath)) {
			console.log('📝 clues.csv not found. Creating empty file...')
			fs.writeFileSync(
				csvPath,
				'id,clid,clue.value,release,difficulty,ready,type,definition.0,hints.0.category,hints.0.value,hints.0.end.value.0,hints.0.explainer,solution.value,source.value\n'
			)
			console.log('✅ Created clues.csv with headers.')
			return
		}

		// Read CSV file
		const csvContent = fs.readFileSync(csvPath, 'utf8')

		// Check if it has the expected headers
		const hasExpectedHeaders =
			csvContent.trim().startsWith('id') &&
			(csvContent.includes('clue.value') || csvContent.includes('clue\tvalue'))

		if (hasExpectedHeaders) {
			const jsonData = csvToJson(csvContent)
			const minifiedJson = JSON.stringify(jsonData)
			fs.writeFileSync(jsonPath, minifiedJson)

			console.log(`✅ clues.csv → clues.json`)
			console.log(`   ${jsonData.length} clues, ${(minifiedJson.length / 1024).toFixed(1)}KB`)

			const explainerCount = jsonData.filter(
				(clue) => clue.hints && clue.hints.some((hint) => hint.explainer)
			).length
			console.log(`   ${explainerCount} clues have explainers`)
		} else {
			console.log('⚠️  clues.csv is empty or missing expected headers.')
		}
	} catch (error) {
		console.error('❌ Error converting clues.csv:', error.message)
		process.exit(1)
	}
}

// Convert creators.csv to creators.json
function convertCreators() {
	const csvPath = path.join(__dirname, '../src/assets/data/creators.csv')
	const jsonPath = path.join(__dirname, '../src/assets/data/creators.json')

	try {
		// Check if CSV file exists
		if (!fs.existsSync(csvPath)) {
			console.log('📝 creators.csv not found. Skipping...')
			return
		}

		// Read CSV file
		const csvContent = fs.readFileSync(csvPath, 'utf8')

		// Check if it has the expected headers
		const hasExpectedHeaders = csvContent.trim().startsWith('nom')

		if (hasExpectedHeaders) {
			const jsonData = simpleCsvToJson(csvContent)
			const minifiedJson = JSON.stringify(jsonData)
			fs.writeFileSync(jsonPath, minifiedJson)

			console.log(`✅ creators.csv → creators.json`)
			console.log(`   ${jsonData.length} creators`)
		} else {
			console.log('⚠️  creators.csv is empty or missing expected headers.')
		}
	} catch (error) {
		console.error('❌ Error converting creators.csv:', error.message)
		process.exit(1)
	}
}

// Run all conversions
function convertAll() {
	console.log('Converting CSV files to JSON...\n')
	convertClues()
	console.log('')
	convertCreators()
	console.log('\nDone!')
}

convertAll()
