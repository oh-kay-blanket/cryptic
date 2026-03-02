# Icon Style Guide

This guide documents the hand-drawn icon style used throughout Learn Cryptic. Follow these specifications when creating or modifying icons to maintain visual consistency.

## Core Aesthetic

The icons follow a **hand-drawn, slightly imperfect style** that feels approachable and playful. Lines have subtle wobbles and shapes avoid perfect geometry, creating an organic, sketched appearance.

## Technical Specifications

### Base Settings

| Property | Value |
|----------|-------|
| ViewBox | `0 0 24 24` |
| Default Size | 20x20 pixels |
| Color | `currentColor` (inherits from parent) |
| Stroke Linecap | `round` |
| Stroke Linejoin | `round` |
| Fill | `none` (unless intentionally filled) |

### Stroke Widths

Use stroke widths within this range depending on visual weight needed:

| Weight | Stroke Width | Usage |
|--------|--------------|-------|
| Light | `1.5` | Secondary elements, details, theme icons |
| Medium | `2` | Standard icons, connecting lines |
| Heavy | `2.5` | Primary UI icons (TopBar), emphasis |

**Guidelines:**
- TopBar navigation icons: `2.5` for visibility
- Clue type icons: `1.5` for delicate detail
- Achievement icons: `1.5` - `2` depending on complexity
- Smaller icons (16x16): use `1.5` to avoid visual heaviness

## Hand-Drawn Techniques

### 1. Wobbly Lines

Instead of perfectly straight lines, introduce subtle curve variations:

```svg
<!-- Avoid: Perfect straight line -->
<line x1="4" y1="12" x2="20" y2="12" />

<!-- Preferred: Subtle wobble with quadratic curve -->
<path d="M4 12 Q12 11.5 20 12" />
```

### 2. Imperfect Circles

Circles should have slight organic irregularity:

```svg
<!-- Avoid: Perfect circle -->
<circle cx="12" cy="12" r="8" />

<!-- Preferred: Hand-drawn circle using curves -->
<path d="M12 4 Q20 4 20 12 Q20 20 12 20 Q4 20 4 12 Q4 4 12 4" />

<!-- Alternative: Slight coordinate offsets -->
<circle cx="12" cy="12.2" r="7.8" />
```

### 3. Quadratic Bezier Curves (Q command)

The primary tool for creating organic shapes:

```svg
<!-- Q control-x control-y end-x end-y -->
<path d="M4 8 Q6 7.5 8 8" />
```

Use Q curves for:
- Rounded corners that aren't perfectly circular
- Wave-like forms
- Organic arcs

### 4. Cubic Bezier Curves (C command)

For more complex organic shapes like crescents:

```svg
<!-- C ctrl1-x ctrl1-y ctrl2-x ctrl2-y end-x end-y -->
<path d="M12 3 C6 3 3 8 3 12 C3 17 7 21 12 21 C9 18 9 6 12 3" />
```

### 5. Deliberate Asymmetry

When creating repeated elements (bars, dots, lines), vary them slightly:

```svg
<!-- Bar chart with intentional variation -->
<line x1="6" y1="18" x2="6" y2="10" />      <!-- height: 8 -->
<line x1="12" y1="18" x2="12" y2="7.7" />   <!-- height: 10.3 -->
<line x1="18" y1="18" x2="18" y2="12" />    <!-- height: 6 -->
```

## Color Handling

### Always Use currentColor

Icons should inherit color from their parent element:

```svg
<svg viewBox="0 0 24 24" stroke="currentColor" fill="none">
  <!-- paths here -->
</svg>
```

This enables:
- Dark mode support via CSS classes
- Hover/active states
- Contextual coloring

### Fill vs Stroke

| Element Type | Treatment |
|--------------|-----------|
| Outlines, lines | Stroke only |
| Solid shapes (dots, filled circles) | Fill with `currentColor` |
| Decorative elements | Mix as appropriate |

```svg
<!-- Stroked outline -->
<path stroke="currentColor" fill="none" d="..." />

<!-- Filled dot -->
<circle fill="currentColor" cx="6" cy="12" r="2" />
```

## Icon Categories

### TopBar Icons (Navigation)

- Size: 20x20 (or 16x16 for theme icons)
- Stroke: `2.5` for main elements, `1.5` for details
- Style: Bold, clear silhouettes
- Wobble: Moderate - visible but not distracting

### Clue Type Icons

- Size: 20x20
- Stroke: `1.5`
- Style: Conceptual/metaphorical representations
- Wobble: Subtle - maintains readability at small sizes

### Achievement Icons

- Size: 20x20
- Stroke: `1.5` - `2`
- Style: Celebratory, recognizable symbols
- Wobble: Moderate - adds personality

## Examples from Codebase

### Simple Wobbly Circle (Info Icon)

```svg
<svg viewBox="0 0 24 24" width="20" height="20"
     stroke="currentColor" fill="none"
     strokeWidth="2.5" strokeLinecap="round">
  <!-- Wobbly outer circle -->
  <path d="M12 3 Q19 3 21 12 Q21 19 12 21 Q5 21 3 12 Q3 5 12 3" />
  <!-- Inner details -->
  <circle cx="12" cy="8" r="0.5" fill="currentColor" />
  <path d="M12 11 L12 16" strokeWidth="2" />
</svg>
```

### Organic Shape (Anagram Arrows)

```svg
<svg viewBox="0 0 24 24" width="20" height="20"
     stroke="currentColor" fill="none"
     strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
  <!-- Top arrow with curve -->
  <path d="M16 3 L20 7 L16 11" />
  <path d="M20 7 Q12 6.5 4 7" />
  <!-- Bottom arrow with curve -->
  <path d="M8 13 L4 17 L8 21" />
  <path d="M4 17 Q12 17.5 20 17" />
</svg>
```

### Mixed Fill and Stroke (Container)

```svg
<svg viewBox="0 0 24 24" width="20" height="20"
     stroke="currentColor" fill="none"
     strokeWidth="1.5" strokeLinecap="round">
  <!-- Stroked brackets -->
  <path d="M8 4 L4 4 L4 20 L8 20" />
  <path d="M16 4 L20 4 L20 20 L16 20" />
  <!-- Filled inner element -->
  <circle fill="currentColor" cx="12" cy="12" r="2" />
</svg>
```

## Do's and Don'ts

### Do

- Use `currentColor` for all color values
- Add subtle wobble to straight lines
- Vary repeated elements slightly
- Use `strokeLinecap="round"` and `strokeLinejoin="round"`
- Keep icons simple and recognizable at 20x20
- Test in both light and dark modes

### Don't

- Use perfect geometric shapes
- Hardcode colors (except for multi-color illustrations)
- Over-wobble to the point of illegibility
- Use stroke widths outside the 1.5 - 2.5 range
- Add unnecessary complexity or detail
- Forget to set `fill="none"` on stroked paths

## File Organization

```
src/assets/icons/
  clue-types/
    anagram.svg
    charade.svg
    ...
  achievements/
    star.svg
    streak.svg
    ...
```

Inline SVGs are acceptable for TopBar icons in `src/components/TopBar.js` where they benefit from direct React integration.

## Testing Checklist

Before committing a new icon:

- [ ] ViewBox is `0 0 24 24`
- [ ] Uses `currentColor` (no hardcoded colors)
- [ ] Stroke width is between 1.5 and 2.5
- [ ] Has `strokeLinecap="round"` and `strokeLinejoin="round"`
- [ ] Displays correctly at 20x20 pixels
- [ ] Works in light mode
- [ ] Works in dark mode
- [ ] Has appropriate hand-drawn wobble
- [ ] Remains recognizable and clear
