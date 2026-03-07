# Letter Reveal Feature - Test Plan

## Overview
This document outlines test scenarios for the letter reveal functionality that allows users to reveal individual letters in the solution by tapping on blank squares.

## Feature Requirements
1. Users can tap on any blank square in the solution box
2. A prompt appears asking if they want to reveal that letter
3. Revealing a letter counts as a hint
4. Revealed letters appear in purple (using `var(--lc-highlight-text)` color)
5. Revealed letters are fixed and cannot be changed by typing
6. Typing or deleting skips over revealed letters
7. The final letter cannot be revealed

## Test Scenarios

### 1. Basic Letter Reveal

#### Test 1.1: Click on blank square shows prompt
**Steps:**
1. Navigate to any clue page
2. Click on an empty square in the solution box (not the last square)
3. Verify prompt appears with message: "Reveal letter N? This counts as a hint."
4. Verify prompt has "Reveal" and "Cancel" buttons

**Expected Result:** Prompt appears correctly with appropriate message

#### Test 1.2: Cancel prompt closes without revealing
**Steps:**
1. Click on an empty square
2. Click "Cancel" button in prompt
3. Verify prompt closes
4. Verify letter is not revealed
5. Verify hint counter has not increased

**Expected Result:** Prompt closes, no letter revealed, hint count unchanged

#### Test 1.3: Reveal button reveals letter
**Steps:**
1. Click on an empty square at position N
2. Click "Reveal" button in prompt
3. Verify the correct letter appears in that square
4. Verify the letter is colored purple
5. Verify the hint counter increases by 1

**Expected Result:** Letter is revealed in purple, hint count increases

### 2. Revealed Letter Behavior

#### Test 2.1: Revealed letter cannot be changed by typing
**Steps:**
1. Reveal letter at position 2 (solution: "STEW" → reveal "T")
2. Try typing when cursor is at the revealed position
3. Verify typing skips to the next position

**Expected Result:** User cannot type over revealed letter

#### Test 2.2: Typing skips over revealed letters
**Steps:**
1. Clear all input
2. Reveal letter at position 1 (second position, 0-indexed)
3. Type "S" (first letter)
4. Verify cursor automatically jumps to position 2 (third position), skipping the revealed letter

**Expected Result:** Input jumps over revealed letter automatically

#### Test 2.3: Backspace skips over revealed letters
**Steps:**
1. Clear all input
2. Reveal letter at position 1
3. Type "S", "E" (positions 0 and 2)
4. Press backspace
5. Verify backspace deletes "E" (position 2)
6. Press backspace again
7. Verify backspace deletes "S" (position 0), skipping the revealed letter at position 1

**Expected Result:** Backspace skips over revealed letters

#### Test 2.4: Multiple revealed letters
**Steps:**
1. Clear all input
2. Reveal letters at positions 1 and 3 (for a 4-letter solution)
3. Type "S"
4. Verify "S" appears at position 0
5. Type "W"
6. Verify "W" appears at position 2 (skipping revealed position 1)
7. Verify solution is complete with all 4 letters

**Expected Result:** Multiple revealed letters work correctly, typing fills only unrevealed positions

### 3. Restriction: Cannot Reveal Final Letter

#### Test 3.1: Clicking last square does nothing
**Steps:**
1. Navigate to a clue with solution length N
2. Click on the last square (position N-1)
3. Verify no prompt appears
4. Verify cursor style remains default (not pointer)

**Expected Result:** No prompt, final letter cannot be revealed

#### Test 3.2: Final letter can still be typed
**Steps:**
1. Reveal all letters except the final one
2. Type the final letter
3. Verify it can be entered normally

**Expected Result:** Final letter can be typed by user

### 4. Visual Styling

#### Test 4.1: Revealed letter has purple color (light mode)
**Steps:**
1. Ensure app is in light mode
2. Reveal a letter
3. Verify text color is purple (CSS variable `--lc-highlight-text`: #7457D6)
4. Verify background color is light purple (`--lc-highlight-bg`: #E1D8FF)

**Expected Result:** Correct purple colors in light mode

#### Test 4.2: Revealed letter has purple color (dark mode)
**Steps:**
1. Switch to dark mode
2. Reveal a letter
3. Verify text color is lighter purple (`--lc-highlight-text`: #9B8FE8)
4. Verify background color is darker purple (`--lc-highlight-bg`: #4A3F6B)

**Expected Result:** Correct purple colors in dark mode

#### Test 4.3: Hover/cursor on revealable squares
**Steps:**
1. Hover over an empty, non-revealed, non-final square
2. Verify cursor changes to pointer
3. Hover over a revealed square
4. Verify cursor is default
5. Hover over the final square
6. Verify cursor is default

**Expected Result:** Only revealable squares show pointer cursor

### 5. Hint Tracking

#### Test 5.1: Revealing letter increments hint counter
**Steps:**
1. Note current hint count (should be 0 initially)
2. Reveal a letter
3. Verify hint count increases by 1

**Expected Result:** Hint counter increments

#### Test 5.2: Multiple reveals increment hint counter
**Steps:**
1. Note initial hint count
2. Reveal 3 different letters
3. Verify hint count increases by 3

**Expected Result:** Each reveal increments hint counter

#### Test 5.3: Hint count persists after revealing
**Steps:**
1. Reveal 2 letters (hint count = 2)
2. Type some letters
3. Delete some letters
4. Verify hint count remains at 2

**Expected Result:** Hint count doesn't change from typing/deleting

### 6. Edge Cases

#### Test 6.1: Cannot reveal already revealed letter
**Steps:**
1. Reveal letter at position 1
2. Click on the same square again
3. Verify no prompt appears
4. Verify hint count doesn't change

**Expected Result:** Already revealed letters cannot be revealed again

#### Test 6.2: Revealing when message is showing
**Steps:**
1. Click "Show hint" or "Check answer" to show message
2. Try clicking on a square
3. Verify no prompt appears

**Expected Result:** Cannot reveal letters when message is showing

#### Test 6.3: Reveal all letters except last
**Steps:**
1. For a 4-letter solution (e.g., "STEW")
2. Reveal positions 0, 1, 2 (S, T, E)
3. Verify only position 3 (W) is still empty
4. Type "W"
5. Verify solution is complete and correct

**Expected Result:** Can complete solution by typing final letter

#### Test 6.4: Complete solution with some revealed letters
**Steps:**
1. Reveal letter at position 1
2. Type remaining letters to complete solution
3. Click "Check answer"
4. Verify answer is marked as correct
5. Verify stats show both hints used and guesses made

**Expected Result:** Solution with revealed letters can be checked and is accepted

### 7. Accessibility

#### Test 7.1: Keyboard navigation to squares
**Steps:**
1. Use Tab key to navigate
2. Verify revealable squares can receive focus (tabindex=0)
3. Verify non-revealable squares cannot receive focus (tabindex=-1)

**Expected Result:** Only revealable squares are keyboard accessible

#### Test 7.2: Enter/Space key activates reveal
**Steps:**
1. Tab to a revealable square
2. Press Enter or Space
3. Verify prompt appears

**Expected Result:** Keyboard activation works

#### Test 7.3: Escape key closes prompt
**Steps:**
1. Open reveal prompt
2. Press Escape key
3. Verify prompt closes

**Expected Result:** Escape closes the prompt

#### Test 7.4: Screen reader attributes
**Steps:**
1. Inspect revealable squares with dev tools
2. Verify `role="button"` is present
3. Verify `aria-label="Reveal letter N"` is present
4. Inspect modal with dev tools
5. Verify `role="dialog"` and `aria-modal="true"` are present

**Expected Result:** Proper ARIA attributes are present

### 8. Integration Tests

#### Test 8.1: Reveal + Show hint
**Steps:**
1. Reveal a letter (hint count = 1)
2. Click "Show hint" (hint count = 2)
3. Verify both hints are counted separately

**Expected Result:** Different hint types counted correctly

#### Test 8.2: Reveal + Reveal solution
**Steps:**
1. Reveal 2 letters (hint count = 2)
2. Click "Reveal solution"
3. Verify all letters are shown
4. Verify revealed letters remain purple
5. Verify hint count reflects total hints used

**Expected Result:** Reveal solution works with partial reveals

#### Test 8.3: State persistence across hints
**Steps:**
1. Reveal letter at position 1
2. Click "Show hint"
3. Click "Continue"
4. Verify revealed letter is still purple and fixed
5. Verify can still type other letters

**Expected Result:** Revealed letters persist through hint progression

## Testing Checklist

- [ ] All basic reveal scenarios (Tests 1.1-1.3)
- [ ] Revealed letter behavior (Tests 2.1-2.4)
- [ ] Final letter restriction (Tests 3.1-3.2)
- [ ] Visual styling in both modes (Tests 4.1-4.3)
- [ ] Hint tracking (Tests 5.1-5.3)
- [ ] Edge cases (Tests 6.1-6.4)
- [ ] Accessibility (Tests 7.1-7.4)
- [ ] Integration scenarios (Tests 8.1-8.3)

## Browser Testing

Test in the following browsers:
- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Mobile Safari (iOS)
- [ ] Chrome Mobile (Android)

## Notes

- The feature uses CSS custom properties that adapt to dark mode automatically
- Purple color scheme: `--lc-highlight-text` and `--lc-highlight-bg`
- Revealed letters are stored in `revealedLetters` state array (indices)
- Typing logic in `handleInput` automatically skips revealed positions
- Final letter restriction implemented in both `handleSquareClick` and `handleRevealLetter`
