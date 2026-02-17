# KodNest Premium Build System

A calm, intentional, and coherent design system for serious B2C product companies.

## Design Philosophy

**Calm, Intentional, Coherent, Confident**

This is not a student project. This design system embodies the principles of restraint, clarity, and professionalism.

### What We Avoid
- ❌ Flashy, loud, or playful aesthetics
- ❌ Hackathon-style designs
- ❌ Gradients and glassmorphism
- ❌ Neon colors
- ❌ Animation noise

### What We Embrace
- ✅ Intentional whitespace
- ✅ Consistent spacing and typography
- ✅ Subtle, purposeful interactions
- ✅ Clear information hierarchy
- ✅ Professional, timeless aesthetics

---

## Color System

**Maximum 4 colors across the entire system:**

| Color | Hex | Usage |
|-------|-----|-------|
| Background | `#F7F6F3` | Off-white background |
| Primary Text | `#111111` | All text content |
| Accent | `#8B0000` | Primary actions, deep red |
| Success | `#3D5A3E` | Muted green for positive states |
| Warning | `#8B6914` | Muted amber for cautionary states |

---

## Typography

### Headings
- **Font**: Playfair Display (serif)
- **Style**: Large, confident, generous spacing
- **Sizes**: 48px (h1), 32px (h2), 24px (h3)

### Body Text
- **Font**: Inter (sans-serif)
- **Size**: 16-18px
- **Line Height**: 1.6-1.8
- **Max Width**: 720px for optimal readability

### Rules
- No decorative fonts
- No random sizes
- Consistent letter spacing

---

## Spacing System

**Consistent scale only. Never use random values like 13px or 27px.**

| Token | Value | Usage |
|-------|-------|-------|
| `--space-xs` | 8px | Tight spacing |
| `--space-sm` | 16px | Default spacing |
| `--space-md` | 24px | Section spacing |
| `--space-lg` | 40px | Large gaps |
| `--space-xl` | 64px | Major sections |

Whitespace is part of the design. Use it generously and intentionally.

---

## Global Layout Structure

Every page must follow this exact structure:

```
┌─────────────────────────────────────────────┐
│ TOP BAR                                      │
├─────────────────────────────────────────────┤
│ CONTEXT HEADER                               │
├─────────────────────────────────────────────┤
│ ┌─────────────────┬─────────────────────┐  │
│ │ PRIMARY         │ SECONDARY           │  │
│ │ WORKSPACE       │ PANEL               │  │
│ │ (70%)           │ (30%)               │  │
│ │                 │                     │  │
│ └─────────────────┴─────────────────────┘  │
├─────────────────────────────────────────────┤
│ PROOF FOOTER                                 │
└─────────────────────────────────────────────┘
```

### 1. Top Bar
- **Left**: Project name
- **Center**: Progress indicator (Step X / Y)
- **Right**: Status badge (Not Started / In Progress / Shipped)

### 2. Context Header
- Large serif headline
- 1-line subtext
- Clear purpose
- No hype language

### 3. Primary Workspace (70% width)
- Main product interaction area
- Clean cards
- Predictable components
- No crowding

### 4. Secondary Panel (30% width)
- Step explanation (short)
- Copyable prompt box
- Action buttons:
  - Copy
  - Build in Lovable
  - It Worked
  - Error
  - Add Screenshot
- Calm styling

### 5. Proof Footer
Persistent bottom section with checklist:
- □ UI Built
- □ Logic Working
- □ Test Passed
- □ Deployed

Each checkbox requires user proof input.

---

## Component Rules

### Buttons
- **Primary**: Solid deep red (`#8B0000`)
- **Secondary**: Outlined with border
- **Hover**: Same effect everywhere
- **Border Radius**: 2px (consistent)
- **Transition**: 150-200ms ease-in-out

### Inputs
- Clean borders (`1px solid #D4D2CC`)
- No heavy shadows
- Clear focus state (accent color border)
- Consistent padding (16px)

### Cards
- Subtle border (`1px solid #D4D2CC`)
- No drop shadows
- Balanced padding (24px)
- White background

---

## Interaction Rules

- **Transitions**: 150–200ms, ease-in-out
- **No bounce effects**
- **No parallax scrolling**
- **No decorative animations**

Interactions should feel immediate and intentional.

---

## Error & Empty States

### Errors
- Explain what went wrong
- Provide clear solution steps
- Never blame the user
- Use calm, professional language

### Empty States
- Provide the next action
- Never feel dead or abandoned
- Suggest what to do next
- Maintain visual consistency

---

## Files

- `design-system.css` - Complete design system CSS
- `index.html` - Full layout demonstration
- `components.html` - Component library showcase

---

## Usage

1. Include `design-system.css` in your HTML:
   ```html
   <link rel="stylesheet" href="design-system.css">
   ```

2. Follow the global layout structure for every page

3. Use only the provided components and spacing tokens

4. Never introduce random spacing or colors

5. Maintain visual consistency across all pages

---

## The Golden Rule

**Everything must feel like one mind designed it.**

No visual drift. No exceptions.

---

This design system was built for serious B2C product companies that value clarity, professionalism, and timeless design.
