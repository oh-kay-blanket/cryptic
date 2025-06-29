const fs = require('fs')
const path = require('path')

// Function to convert Google Sheets CSV to JSON
function csvToJson(csvText) {
	const lines = csvText.trim().split('\n')
	const headers = lines[0].split(',').map((h) => h.trim().replace(/"/g, ''))
	const result = []

	for (let i = 1; i < lines.length; i++) {
		const values = parseCSVLine(lines[i])
		const obj = {}

		headers.forEach((header, index) => {
			let value = values[index] || ''
			value = value.trim().replace(/"/g, '')

			// Try to parse as JSON if it looks like JSON
			if (value.startsWith('{') || value.startsWith('[')) {
				try {
					obj[header] = JSON.parse(value)
				} catch {
					obj[header] = value
				}
			} else {
				obj[header] = value
			}
		})

		result.push(obj)
	}

	return result
}

// Function to parse CSV line properly (handles commas within quotes)
function parseCSVLine(line) {
	const result = []
	let current = ''
	let inQuotes = false

	for (let i = 0; i < line.length; i++) {
		const char = line[i]

		if (char === '"') {
			inQuotes = !inQuotes
		} else if (char === ',' && !inQuotes) {
			result.push(current)
			current = ''
		} else {
			current += char
		}
	}

	result.push(current)
	return result
}

// Function to fetch from Google Sheets
async function fetchFromGoogleSheets(sheetId, sheetName = 'Sheet1') {
	const url = `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?tqx=out:csv&sheet=${sheetName}`

	try {
		const response = await fetch(url)
		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`)
		}
		return await response.text()
	} catch (error) {
		throw new Error(`Failed to fetch from Google Sheets: ${error.message}`)
	}
}

// Main conversion function
async function convertGoogleSheetsToJson() {
	const jsonPath = path.join(__dirname, '../src/assets/data/clues.json')

	// You'll need to replace this with your actual Google Sheet ID
	// To get the sheet ID: look at the URL of your Google Sheet
	// https://docs.google.com/spreadsheets/d/YOUR_SHEET_ID_HERE/edit
	const SHEET_ID = process.env.GOOGLE_SHEET_ID || 'YOUR_SHEET_ID_HERE'
	const SHEET_NAME = process.env.GOOGLE_SHEET_NAME || 'Sheet1'

	if (SHEET_ID === 'YOUR_SHEET_ID_HERE') {
		console.log('❌ Please set your Google Sheet ID:')
		console.log(
			'1. Get your sheet ID from the URL: https://docs.google.com/spreadsheets/d/YOUR_SHEET_ID_HERE/edit'
		)
		console.log(
			'2. Set it as an environment variable: export GOOGLE_SHEET_ID="your_sheet_id"'
		)
		console.log(
			'3. Or edit this script and replace YOUR_SHEET_ID_HERE with your actual sheet ID'
		)
		console.log('')
		console.log('📝 For now, falling back to CSV file method...')

		// Fall back to CSV file method
		const csvPath = path.join(__dirname, '../src/assets/data/clues.csv')
		if (fs.existsSync(csvPath)) {
			const csvContent = fs.readFileSync(csvPath, 'utf8')
			const jsonData = csvToJson(csvContent)
			const minifiedJson = JSON.stringify(jsonData)
			fs.writeFileSync(jsonPath, minifiedJson)
			console.log(`✅ Converted CSV file to JSON (${jsonData.length} clues)`)
		} else {
			console.log(
				'❌ No CSV file found either. Please set up either Google Sheets or CSV file.'
			)
		}
		return
	}

	try {
		console.log(`📥 Fetching data from Google Sheets...`)
		const csvContent = await fetchFromGoogleSheets(SHEET_ID, SHEET_NAME)

		// Convert to JSON
		const jsonData = csvToJson(csvContent)

		// Write minified JSON
		const minifiedJson = JSON.stringify(jsonData)
		fs.writeFileSync(jsonPath, minifiedJson)

		console.log(`✅ Successfully fetched and converted Google Sheets data!`)
		console.log(`📊 ${jsonData.length} clues processed`)
		console.log(`📁 Output: ${jsonPath}`)
		console.log(`📏 File size: ${(minifiedJson.length / 1024).toFixed(1)}KB`)
	} catch (error) {
		console.error('❌ Error fetching from Google Sheets:', error.message)
		console.log('📝 Falling back to CSV file method...')

		// Fall back to CSV file method
		const csvPath = path.join(__dirname, '../src/assets/data/clues.csv')
		if (fs.existsSync(csvPath)) {
			const csvContent = fs.readFileSync(csvPath, 'utf8')
			const jsonData = csvToJson(csvContent)
			const minifiedJson = JSON.stringify(jsonData)
			fs.writeFileSync(jsonPath, minifiedJson)
			console.log(`✅ Converted CSV file to JSON (${jsonData.length} clues)`)
		} else {
			console.log(
				'❌ No CSV file found either. Please set up either Google Sheets or CSV file.'
			)
		}
	}
}

// Run the conversion
convertGoogleSheetsToJson()
