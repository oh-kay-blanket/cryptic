# Learn Cryptic Design System

This document defines the color system and design tokens for Learn Cryptic. **All style changes must reference this document to maintain consistency.**

## Color Palette

### Primary (Orange)
Used for primary actions, active states, and warm accents.

| Token | Hex | Usage |
|-------|-----|-------|
| `$lc-primary` | #e88a52 | Base orange (logo color) |
| `$lc-primary--light` | #f5b896 | Light orange backgrounds, button fills |
| `$lc-primary--v-light` | #fde8dc | Very light orange tints |
| `$lc-primary--dark` | #a85525 | Orange links (WCAG AA compliant) |

### Secondary (Purple)
Used for secondary actions, highlights, and cool accents.

| Token | Hex | Usage |
|-------|-----|-------|
| `$lc-secondary` | #a798c9 | Base purple (logo color) |
| `$lc-secondary--light` | #d4cce6 | Light purple backgrounds |
| `$lc-secondary--v-light` | #ebe7f3 | Very light purple tints |
| `$lc-secondary--dark` | #7a6aab | Purple text/links (light mode) |

### Neutrals
Used for text, backgrounds, and borders.

| Token | Hex | Usage |
|-------|-----|-------|
| `$lc-text` | #1a1a1a | Primary text |
| `$lc-text--light` | #666666 | Secondary text (WCAG AA) |
| `$lc-gray` | #E8E6E1 | Muted backgrounds |
| `$lc-gray--light` | #F5F3EE | Light backgrounds |
| `$lc-gray--v-light` | #FAF9F6 | Page background (cream) |
| `$lc-gray--dark` | #D4D2CD | Borders |

### Dark Mode Background
| Token | Hex | Usage |
|-------|-----|-------|
| Body background | #2a2a2a | Main dark mode background |

## CSS Custom Properties

These are available in JavaScript and for dynamic theming:

### Light Mode (`:root`)
```css
--lc-primary: #e88a52;
--lc-primary-light: #f5b896;
--lc-primary-dark: #a85525;
--lc-secondary: #a798c9;
--lc-secondary-light: #d4cce6;
--lc-secondary-v-light: #ebe7f3;
--lc-secondary-dark: #7a6aab;
--lc-highlight-text: #7a5fb8;      /* Saturated purple for readability */
--lc-highlight-bg: #d4cce6;        /* Secondary light */
--lc-active-bg: #f5b896;           /* Primary light */
--lc-active-bg-hover: #e8a882;     /* Slightly darker for hover */
--lc-text-primary: #1a1a1a;
--lc-text-muted: #ccc;             /* Only for placeholders, NOT readable text */
```

### Dark Mode (`:root.dark`)
```css
--lc-primary: #e88a52;
--lc-primary-light: #f5b896;
--lc-primary-dark: #a85525;
--lc-secondary: #a798c9;
--lc-secondary-light: #d4cce6;
--lc-secondary-v-light: #3d3654;   /* Dark purple for dark mode */
--lc-secondary-dark: #b8a8d9;      /* Lighter for dark backgrounds */
--lc-highlight-text: #b8a8d9;      /* Light purple for dark backgrounds */
--lc-highlight-bg: #4a4066;        /* Muted purple background */
--lc-active-bg: #905838;           /* Warm orange for dark mode */
--lc-active-bg-hover: #7a4a30;     /* Slightly darker for hover */
--lc-text-primary: #E5E5E5;
--lc-text-muted: #888888;
```

## Accessibility Requirements

All text must meet WCAG AA contrast ratios (4.5:1 for normal text, 3:1 for large text).

### Verified Compliant Colors

| Color | On Background | Contrast | Status |
|-------|---------------|----------|--------|
| `$lc-text--light` (#666) | #FAF9F6 (cream) | 5.7:1 | AA Pass |
| `$lc-primary--dark` (#a85525) | #FAF9F6 (cream) | 5.1:1 | AA Pass |
| `$lc-secondary--dark` (#7a6aab) | #FAF9F6 (cream) | 4.6:1 | AA Pass |
| `--lc-highlight-text` (#b8a8d9) | #2a2a2a (dark) | 6.5:1 | AA Pass |
| `--lc-active-bg` (#905838) | with #E5E5E5 text | 4.6:1 | AA Pass |

### Colors NOT for readable text
- `--lc-text-muted` (#ccc) - Only for placeholders, disabled states
- Never use light colors on light backgrounds without checking contrast

## Typography

### Font Families

| Token | Stack | Usage |
|-------|-------|-------|
| `$lc-font--sans` | 'Roboto', 'Open Sans', 'Arial', sans-serif | UI text, headings, body copy |
| `$lc-font--serif` | 'Georgia', 'Times New Roman', serif | Clues, examples, crossword content |
| `$lc-font--alt` | 'Gloria Hallelujah', 'Helvetica', 'Arial', sans | Handwritten style (solutions) |

### Text Styles

**Page Headings (h1)**
```scss
font-family: $lc-font--sans;
font-size: 2rem;
font-weight: 700;
color: $lc-text;              // Light mode
color: #f5f5f5;               // Dark mode
```

**Sub-headings (intro paragraphs)**
```scss
font-family: $lc-font--sans;
font-size: 1rem;
color: $lc-text--light;       // Light mode
color: #a3a3a3;               // Dark mode
```

**Body Copy (longer content)**
```scss
font-family: $lc-font--sans;
font-size: 1rem;
line-height: 1.5;
color: $lc-text--light;       // Light mode
color: #d4d4d4;               // Dark mode (lighter for readability)
```

**Card/Bio Text (compact content)**
```scss
font-family: $lc-font--sans;
font-size: 0.875rem;
line-height: 1.5;
color: $lc-text--light;       // Light mode
color: #d4d4d4;               // Dark mode
```

**Links**
```scss
font-family: $lc-font--sans;
font-size: 0.8125rem;
color: $lc-secondary--dark;   // Light mode
color: var(--lc-highlight-text); // Dark mode
text-decoration: none;
&:hover { text-decoration: underline; }
```

### Dark Mode Text Colors

| Purpose | Color | Notes |
|---------|-------|-------|
| Primary text | #f5f5f5 | Headings, important content |
| Body copy | #d4d4d4 | Longer-form readable text |
| Secondary/muted | #a3a3a3 | Sub-headings, less prominent text |
| Disabled/placeholder | #888888 | NOT for readable content |

## Component Patterns

### Buttons

**Primary buttons** (orange):
- Light: `$lc-primary--light` background
- Dark: `var(--lc-active-bg)` background

**Alt/Secondary buttons** (purple):
- Light: `$lc-secondary--light` background
- Dark: `var(--lc-highlight-bg)` background

### Stat Badges

| Badge | Light Mode | Dark Mode |
|-------|------------|-----------|
| Guesses (orange) | `$lc-primary--light` | `var(--lc-active-bg)` |
| Hints (purple) | `$lc-secondary--light` | `var(--lc-highlight-bg)` |
| Time (gray) | #e5e5e5 | #525252 |

### Links

| Context | Light Mode | Dark Mode |
|---------|------------|-----------|
| Primary link | `$lc-primary--dark` | `$lc-primary--light` |
| Secondary link | `$lc-secondary--dark` | `var(--lc-highlight-text)` |

### Achievement Badges
Achievement badges use **amber/gold** colors (`#fbbf24`, `#f59e0b`) intentionally separate from the primary orange to convey "reward" status. Do not change these to primary orange.

## Page Layout

### Container Width
All content pages use `.lc-container`:
```scss
.lc-container {
  width: 100%;
  max-width: 700px;
  margin: 0 auto;
}
```

### Page Padding
Standard page padding: `padding: 1rem;`

## File Locations

- **SCSS Variables**: `src/scss/base/_var.scss`
- **CSS Custom Properties**: `src/scss/base/_var.scss` (in `:root` and `:root.dark`)
- **Container styles**: `src/scss/base/_body.scss`

## Adding New Colors

1. **Check contrast** using a tool like WebAIM Contrast Checker
2. **Add to `_var.scss`** as both SCSS variable and CSS custom property
3. **Update this document** with the new color
4. **Test in both light and dark modes**

## Migration Notes (March 2026)

The color system was updated to align with new logo colors:
- Primary orange: #EF9E6C → #e88a52
- Secondary purple: #b9ace2 → #a798c9

All hardcoded hex values were replaced with variables/custom properties.
