/**
 * Homepage State Preview Scripts
 *
 * Run these in the browser console on the homepage to preview different user states.
 * Each script sets localStorage and reloads the page.
 */

// =============================================================================
// 1. NEW USER - Clear everything
// =============================================================================
localStorage.removeItem("lcState");
location.reload();

// =============================================================================
// 2. RETURNING USER - NO STREAK
// (Has solved clues before, but streak is broken)
// =============================================================================
localStorage.setItem(
  "lcState",
  JSON.stringify({
    completedClues: [{ clid: "old-clue", guesses: 2, hints: 1, how: "g" }],
    showType: true,
    typeViewed: [],
    streak: 0,
    longestStreak: 3,
    lastSolved: "01/01/2024",
    darkMode: null,
  }),
);
location.reload();

// =============================================================================
// 3. RETURNING USER - HAS STREAK, TODAY NOT SOLVED
// =============================================================================
localStorage.setItem(
  "lcState",
  JSON.stringify({
    completedClues: [{ clid: "old-clue", guesses: 2, hints: 1, how: "g" }],
    showType: true,
    typeViewed: [],
    streak: 5,
    longestStreak: 5,
    lastSolved: new Date(Date.now() - 86400000).toLocaleDateString("en-US"), // yesterday
    darkMode: null,
  }),
);
location.reload();

// =============================================================================
// 4. RETURNING USER - TODAY SOLVED
// (Auto-detects today's clue ID from the page)
// =============================================================================
// Try multiple selectors to find the clue link
const link = document.querySelector('#play') ||
             document.querySelector('a[href*="/clues/"]') ||
             document.querySelector('[data-testid="play"]');
const href = link?.getAttribute('href') || link?.href;
const todayClid = href ? href.replace(/\/$/, '').split('/').pop() : null;
if (!todayClid) {
  console.error('Could not find clue link. Run this instead with your clue ID:');
  console.log(`
localStorage.setItem("lcState", JSON.stringify({
  completedClues: [{ clid: "YOUR_CLUE_ID", guesses: 3, hints: 1, how: "g", solveTime: 94 }],
  showType: true, typeViewed: [], streak: 7, longestStreak: 7,
  lastSolved: new Date().toLocaleDateString("en-US"), darkMode: null
})); location.reload();
  `);
} else {
  console.log('Found clue ID:', todayClid);
  localStorage.setItem(
    "lcState",
    JSON.stringify({
      completedClues: [
        { clid: todayClid, guesses: 3, hints: 1, how: "g", solveTime: 94 },
      ],
      showType: true,
      typeViewed: [],
      streak: 7,
      longestStreak: 7,
      lastSolved: new Date().toLocaleDateString("en-US"),
      darkMode: null,
    }),
  );
  location.reload();
}

// =============================================================================
// VARIATIONS - Adjust these values to test different scenarios
// =============================================================================

// High streak (shows 😎 emoji)
// streak: 15

// Low streak (shows 🔥 emoji)
// streak: 3

// Single day streak (no emoji)
// streak: 1

// Different solve stats
// guesses: 1, hints: 0, solveTime: 30  // Perfect solve
// guesses: 5, hints: 3, solveTime: 180 // Struggled

// Dark mode variations
// darkMode: null   // System preference
// darkMode: true   // Force dark
// darkMode: false  // Force light
