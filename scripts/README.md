# Data Conversion Scripts

This directory contains scripts to automatically convert your clues data from CSV or Google Sheets to the minified JSON format used by the app.

## Option 1: CSV File Method (Recommended)

### Setup

1. The script will automatically create `src/assets/data/clues.csv` if it doesn't exist
2. Paste your CSV data from Google Sheets into this file
3. The headers should be: `id,clid,clue,release,difficulty,ready,type,definition,hints,solution,source`

### Usage

- **Manual conversion**: `npm run convert-csv`
- **Automatic on start**: `npm start` (runs conversion first)
- **Automatic on build**: `npm run build` (runs conversion first)

### Workflow

1. Export your Google Sheet as CSV
2. Copy the CSV content (including headers)
3. Paste into `src/assets/data/clues.csv`
4. Run `npm start` or `npm run build`

## Option 2: Direct Google Sheets Integration

### Setup

1. Get your Google Sheet ID from the URL:

   ```
   https://docs.google.com/spreadsheets/d/YOUR_SHEET_ID_HERE/edit
   ```

2. Set environment variables:

   ```bash
   export GOOGLE_SHEET_ID="your_actual_sheet_id"
   export GOOGLE_SHEET_NAME="Sheet1"  # or whatever your sheet name is
   ```

3. Update package.json to use the Google Sheets script:
   ```json
   "convert-csv": "node scripts/google-sheets-to-json.js"
   ```

### Usage

- Same as CSV method: `npm start` or `npm run build`
- The script will automatically fetch from Google Sheets
- Falls back to CSV file if Google Sheets fails

### Important Notes

- Your Google Sheet must be publicly accessible (or shared with appropriate permissions)
- The sheet should have the same headers as the CSV method
- This method requires internet connection during build

## Which Method Should You Use?

### Use CSV Method If:

- You want offline builds
- You prefer manual control over when data updates
- You want to version control your data
- You're concerned about Google Sheets API limits

### Use Google Sheets Method If:

- You want automatic updates from your sheet
- Multiple people edit the sheet
- You want real-time data synchronization
- You don't mind internet dependency during builds

## Troubleshooting

### CSV Method Issues

- **Empty file**: Make sure you've pasted the CSV data including headers
- **Wrong format**: Ensure headers match exactly: `id,clid,clue,release,difficulty,ready,type,definition,hints,solution,source`

### Google Sheets Method Issues

- **Sheet not found**: Check your sheet ID and make sure the sheet is publicly accessible
- **Permission denied**: Make sure the sheet is shared publicly or with appropriate permissions
- **Network error**: Check your internet connection

### General Issues

- **Script not found**: Make sure you're running from the project root directory
- **Permission errors**: Make sure the scripts directory and files are readable
