# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
pnpm dev        # Start development server (Vite)
pnpm build      # Build for production
pnpm preview    # Preview production build
pnpm test       # Run unit tests in watch mode
pnpm test:run   # Run unit tests once
pnpm test:e2e   # Run E2E tests (requires build first)
```

## Architecture

This is a Vue 3 + Vite application for randomizing The Binding of Isaac: Rebirth runs. It uses Pinia for state management and Tailwind CSS 4 for styling.

### Core Structure

- **State Management**: Single Pinia store (`src/stores/gameStore.js`) manages all app state including characters, objectives, completion tracking, and UI settings. State is persisted to localStorage via `useLocalStorage` composable.

- **Randomization Logic**: `src/composables/useRandomizer.js` handles the weighted random selection. It respects completion tracking, target configuration, and challenge incompatibilities.

- **Game Data**: `src/constants/gameData.js` contains all static data: 34 characters (17 normal + 17 tainted), 7 objectives, 2 timed objectives (Boss Rush/Hush), 45 official game challenges, 12 extra challenges, and version presets.

### Component Layout

The app has a three-panel layout:
- **Left**: `OptionsPanel` - Configuration (display settings, presets, character/objective selection, challenges)
- **Center**: Display components + RandomizeButton - Shows results in different formats (full/simpleA/simpleB/plainText)
- **Right**: `CompletionPanel` - Track completion per character/objective combination and game challenges

### Key Concepts

- **Targets**: Which character/objective combinations are included in randomization (configured in CompletionPanel)
- **Timed Objectives**: Boss Rush and Hush can work as independent objectives OR as extras rolled alongside main objectives (`timedAsExtra` setting)
- **Extra Challenges**: Optional gameplay modifiers (no shops, no devil rooms, etc.) with individual % chance
- **Game Challenges**: Official Isaac challenges (1-45) that can be randomly selected instead of character+objective

### Path Alias

`@` is aliased to `src/` in vite.config.js.

### Testing

**Unit tests** (Vitest + Vue Test Utils) in `src/__tests__/`:
- `gameStore.test.js` - Store state and actions
- `useRandomizer.test.js` - Randomization logic, targeting, challenge incompatibilities

**E2E tests** (Playwright) in `e2e/`:
- Tests user flows: randomization, presets, completion, display modes, persistence
- Some tests are probabilistic due to randomness - may occasionally fail