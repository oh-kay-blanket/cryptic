# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Learn Cryptic is an interactive educational web app for learning and practicing cryptic crossword clues. Built with GatsbyJS, it features a daily clue game, learning modules, clue archives, and user progress tracking via localStorage.

## Development Commands

### Starting Development
```bash
npm start
# Runs csv-to-json conversion, cleans Gatsby cache, and starts dev server at localhost:8000
```

### Building for Production
```bash
npm run build    # Build with path prefix
npm run serve    # Serve production build at localhost:9000
```

### Testing
```bash
npm test                    # Run all tests
npm test -- --watch        # Watch mode (re-runs on file changes)
npm test -- --coverage     # Generate coverage report
npm test dateHelpers       # Run specific test file
```

### Data Conversion
```bash
npm run convert-csv
# Converts src/assets/data/clues.csv to clues.json
# Automatically runs before start/build commands
```

### Deployment
```bash
npm run deploy
# Deploys to gh-pages with CNAME for learncryptic.com
```

## Architecture

### Data Flow & Clue System

**Source of Truth**: CSV file at `src/assets/data/clues.csv` is converted to `clues.json` using `scripts/csv-to-json.js`. This script handles complex nested structures using dot notation (e.g., `hints.0.category`, `definition.0`) and supports both comma and tab delimiters.

**Clue Data Structure**: Each clue has:
- `clid`: Unique identifier
- `release`: Release date (format: MM/DD/YYYY) - used to determine "today's clue"
- `clue.value`: The clue text
- `solution.value`: The answer
- `type`: Array of clue types (e.g., "anagram", "container", "reversal")
- `hints`: Array of hint objects with `category`, `value`, `explainer`, and nested `end.value` arrays
- `definition`: Array of definition text fragments
- `difficulty`: 1-4 scale
- `source.value`: Clue creator attribution
- `dow`: Day of week

**Clue Processing Pipeline**:
1. GraphQL queries pull clue data via `gatsby-transformer-json`
2. `src/utils/clue/usePrepClue.js` prepares the clue by creating refs and converting strings to character arrays
3. `src/utils/clue/useManageClue.js` manages clue state (input, hints, stats, revealed letters)
4. Hint system in `src/utils/clue/handleHint.js` orchestrates visual animations that highlight, underline, move, and transform letters to demonstrate wordplay

### User Context & State Management

**Global State**: `src/utils/UserContext.js` provides a React Context wrapping the entire app (configured in `gatsby-browser.js`). It manages:
- `completedClues`: Array of solved clues with stats (guesses, hints)
- `streak` & `longestStreak`: Daily solving streaks
- `lastSolved`: Last solve date for streak calculation
- `showType`: Whether to display clue type pills
- `typeViewed`: Learning module progress
- `darkMode`: User theme preference (null = system, true/false = explicit)

**Persistence**: All user state syncs to localStorage as `lcState`. The Context listens for `storage` events to sync across tabs.

**Streak Logic**: Streaks are calculated by comparing release dates. A streak continues if the user solves a clue within 1 day of their last solve. The streak resets after missing more than 1 day.

### Page Structure

**Dynamic Clue Pages**: `src/pages/clues/{cluesJson.clid}.js` uses Gatsby's file system route API to generate individual pages for each clue. The page:
- Displays the clue with interactive letter-by-letter input
- Shows hint system with animated letter transformations
- Tracks guesses and hints used
- Allows clicking solution squares to reveal individual letters (costs hints)
- Updates user stats in Context when completed

**Homepage Logic**: `src/pages/index.js` determines which UI to show based on:
- New users: Welcome message with call-to-action
- Returning users with streak: Encouragement to maintain streak
- Users who completed today's clue: Stats display and alternate actions

**Today's Clue**: Determined by comparing clue `release` date with current date (both stripped to midnight for accurate day comparison). This logic appears in multiple places (homepage, clue page, Context).

### Visual Hint System

The hint system (`src/utils/clue/handleHint.js`) uses element refs and imperative DOM manipulation to animate letters during hints:
- `highlightLetters.js`: Highlights characters in the clue
- `underlineLetters.js`: Underlines portions of the clue
- `moveLetters.js`: Animates letters moving from clue to addLetters or solution areas
- `changeColor.js`: Changes letter colors for visual emphasis
- `getTargetLetters.js`: Identifies which letters to animate based on hint category

**AddLetters Section**: A flex container below the clue that displays intermediate wordplay steps (e.g., extracted letters before anagram, container parts before assembly).

### Gatsby Configuration

**Data Sources**:
- `gatsby-source-filesystem` loads JSON data from `src/assets/data/`
- `gatsby-transformer-json` makes clues queryable via GraphQL
- Individual clue pages are generated automatically via file system routing

**Sitemap**: Custom `gatsby-plugin-sitemap` resolver assigns priority and changefreq based on page type (home: 1.0/daily, individual clues: 0.6/weekly).

**Styling**:
- Sass files in `src/scss/`
- Tailwind CSS configured via `gatsby-plugin-postcss`
- Dark mode implemented via `.dark` class on `<html>` element

## Key Implementation Details

### Date Handling & Utilities

**IMPORTANT**: Always use the centralized date utilities from `src/utils/dateHelpers.js` instead of duplicating date logic.

**Available Utilities**:
- `stripTime(date)`: Removes time component from a date, returning midnight
- `isSameDay(date1, date2)`: Compares two dates at day level (ignoring time)
- `isTodayClue(clue)`: Checks if a clue's release date is today
- `daysBetween(date1, date2)`: Calculates days between two dates
- `shouldResetStreak(lastSolvedDate, currentStreak)`: Determines if streak should reset (>1 day gap)

**Usage Example**:
```javascript
import { isTodayClue, shouldResetStreak } from '../utils/dateHelpers'

// Check if clue is today's clue
const todayClue = cluesData.find(isTodayClue)

// Check if streak should reset
if (shouldResetStreak(lastSolvedDate, currentStreak)) {
  // Reset streak to 0
}
```

**Why Use These Utilities**:
- Single source of truth for date logic
- Properly handles timezone issues by stripping time components
- Well-tested with comprehensive edge cases
- Eliminates code duplication

### Revealed Letters Feature
Users can click empty solution squares to reveal individual letters (costs a hint). Implementation in `useManageClue.js`:
- `revealedLetters`: Array of revealed indices
- Cannot reveal if it would leave only one unrevealed letter
- Revealed letters are locked and styled with highlight color
- Input logic skips revealed positions

### CSV Data Format
When modifying `clues.csv`:
- Use dot notation for nested structures: `hints.0.category`, `hints.0.end.value.0`
- Array indices must be sequential starting from 0
- Empty values are omitted from JSON output
- Script handles both quoted and unquoted fields, with special handling for Unicode quotes

### Analytics Integration
Google Analytics events tracked via `gatsby-plugin-google-gtag`:
- `started_daily_clue`: When user loads today's clue page
- `completed_daily_clue`: When user solves today's clue (includes guesses, hints, streak, difficulty)

## Common Patterns

**GraphQL Queries**: All clue data accessed via GraphQL. Use `allCluesJson` for lists, `cluesJson(id: {eq: $id})` for individual clues.

**Fixed Page Layout**: Daily clue pages and homepage add `fixed-page` class to `<body>` to prevent scrolling (removed on unmount).

**Dark Mode Colors**: Use Tailwind with `dark:` prefix. Inline styles should use `!` to ensure specificity: `dark:!bg-[#4A3F6B]`

**Loading States**: Homepage implements context loading delay (100ms timeout) to prevent flicker when reading from localStorage.

## Testing

### Testing Infrastructure

The project uses **Jest** with **React Testing Library** for testing. Configuration:
- `jest.config.js`: Main Jest configuration (Gatsby-optimized)
- `jest.setup.js`: Global test environment setup
- `__mocks__/`: Mock implementations for Gatsby modules and static assets

### Test Organization

Tests are located in `__tests__` directories next to the source files they test:
```
src/utils/
├── dateHelpers.js
└── __tests__/
    ├── dateHelpers.test.js
    └── UserContext.test.js

src/utils/clue/
├── useManageClue.js
└── __tests__/
    └── useManageClue.test.js
```

### Testing Patterns

**1. Pure Function Testing** (`dateHelpers.test.js`):
- Arrange-Act-Assert pattern
- Edge case testing (month boundaries, year boundaries, null values)
- Mocking time with `jest.useFakeTimers()` and `jest.setSystemTime()`

**2. React Context Testing** (`UserContext.test.js`):
- Render components with `render()` from testing-library
- Query elements with `screen.getByTestId()`
- Test async state updates with `waitFor()`
- Mock localStorage with fresh instances in `beforeEach`

**3. Custom Hook Testing** (`useManageClue.test.js`):
- Use `renderHook()` from testing-library
- Wrap state updates in `act()`
- Create mock data matching expected structure

### Writing New Tests

When adding tests:
1. Place in `__tests__` directory next to source file
2. Name file `*.test.js`
3. Use descriptive test names: `should [expected behavior] when [condition]`
4. Follow Arrange-Act-Assert pattern
5. Test edge cases and error conditions
6. Add comments explaining complex test logic

### Test Coverage Goals

- Aim for 80%+ coverage on critical paths (UserContext, clue utilities)
- Test edge cases and error conditions
- Don't obsess over 100% coverage
- Focus on testing behavior users depend on
