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
					parsed = JSON.parse(value.replace(/""/g, '"'))
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

	for (let i = 0; i < line.length; i++) {
		const char = line[i]
		if (char === '"') {
			inQuotes = !inQuotes
		} else if (char === delimiter && !inQuotes) {
			result.push(current)
			current = ''
		} else {
			current += char
		}
	}

	result.push(current)
	return result
}

// Main conversion function
function convertCsvToJson() {
	const csvPath = path.join(__dirname, '../src/assets/data/clues.csv')
	const jsonPath = path.join(__dirname, '../src/assets/data/clues.json')

	try {
		// Check if CSV file exists
		if (!fs.existsSync(csvPath)) {
			console.log('📝 CSV file not found. Creating empty clues.csv file...')
			fs.writeFileSync(
				csvPath,
				'id,clid,clue.value,release,difficulty,ready,type,definition.0,hints.0.category,hints.0.value,hints.0.end.value.0,hints.0.explainer,solution.value,source.value\n'
			)
			console.log(
				'✅ Created clues.csv with proper headers. Please paste your CSV data into this file and run the script again.'
			)
			return
		}

		// Read CSV file
		const csvContent = fs.readFileSync(csvPath, 'utf8')

		// Check if it has the expected headers (either comma or tab delimited)
		const hasExpectedHeaders =
			csvContent.trim().startsWith('id') &&
			(csvContent.includes('clue.value') || csvContent.includes('clue\tvalue'))

		if (hasExpectedHeaders) {
			const jsonData = csvToJson(csvContent)
			const minifiedJson = JSON.stringify(jsonData)
			fs.writeFileSync(jsonPath, minifiedJson)

			console.log(`✅ Successfully converted CSV to JSON!`)
			console.log(`📊 ${jsonData.length} clues processed`)
			console.log(`📁 Output: ${jsonPath}`)
			console.log(`📏 File size: ${(minifiedJson.length / 1024).toFixed(1)}KB`)

			// Check if explainers are present
			const explainerCount = jsonData.filter(
				(clue) => clue.hints && clue.hints.some((hint) => hint.explainer)
			).length
			console.log(`💡 ${explainerCount} clues have explainers`)
		} else {
			console.log('⚠️  CSV file is empty or missing expected headers.')
		}
	} catch (error) {
		console.error('❌ Error converting CSV to JSON:', error.message)
		process.exit(1)
	}
}

// Run the conversion
convertCsvToJson()
