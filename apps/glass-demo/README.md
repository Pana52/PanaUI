# PanaUI Glass Demo

Full-page demo showcasing all PanaUI Button glass variants against a custom background image.

## Quick Start

```bash
# Run the demo (from the workspace root)
pnpm --filter @panaui/glass-demo dev
```

Then open http://localhost:3001 in your browser.

## Setup

1. **Add your background image:**
   - Place your image at `public/background.jpg`
   - Or update the `backgroundImage` path in `src/App.tsx` to point to your image file

2. **Install dependencies** (if not already done):
   ```bash
   pnpm install
   ```

## What's Included

The demo shows:

- All 4 glass profiles (frosted, liquid, dark, tinted)
- All 4 semantic variants (primary, secondary, ghost, danger)
- Interactive states (loading, disabled)
- Size variants (sm, md, lg)
- Side-by-side comparison of solid vs glass buttons

The glassmorphic backdrop-filter effects are best visible when rendered over complex backgrounds with colors and gradients.

## Customization

Edit `src/App.tsx` to:

- Change the background image path
- Adjust layout and spacing
- Add or remove button combinations
- Modify colors and effects

## Note

The demo app may show TypeScript errors due to React type version mismatches between workspaces, but it runs correctly at runtime with Vite.
