# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
pnpm dev          # Start development server
pnpm build        # Build for production
pnpm generate     # Pre-render static site
pnpm preview      # Preview production build
```

Prettier is configured but has no npm script — run `pnpm prettier --write .` directly.

## Architecture

**Stack:** Nuxt 4, Vue 3, TypeScript, Tailwind CSS v4

**Directory layout** (all source under `app/`):
- `app/pages/` — file-based routing; project detail pages live at `pages/projects/[project-slug]/`
- `app/layouts/` — `default.vue` (minimal) and `projects.vue` (case study layout); pages opt in via `definePageMeta({ layout: "projects" })`
- `app/components/` — feature-based folders (e.g. `HeroSection/`, `ProjectsSection/`); Nuxt auto-imports everything, no explicit imports needed
- `app/data/projects.ts` — **single source of truth** for all project metadata; has a `Project` TypeScript interface with full type definitions
- `app/assets/css/main.css` — global Tailwind imports and scrollbar/body resets
- `app/plugins/fontawesome.js` — registers FontAwesome icon library globally

**Component patterns:**
- `<script setup lang="ts">` with `defineProps<Type>()` throughout
- `class-variance-authority` (CVA) for variant-based styling (see `ActionButton`)
- No global state — data flows via props; `@vueuse/core` used for utilities
- Device/breakpoint detection done with `window.matchMedia()` (not a composable yet)
- Scroll interactions use `Element.scrollIntoView({ behavior: "smooth" })`; clean up event listeners in `onUnmounted()`

**Styling:**
- Custom Tailwind theme: color palette (`primary`, `accent`, `secondary`), `Inter` font, and a custom gradient defined in `tailwind.config.ts`
- Responsive classes use Tailwind's `max-md:` / `lg:` prefixes directly on elements

**Adding a new project:** Add an entry to `app/data/projects.ts`, then create the page at `app/pages/projects/[project-slug]/index.vue` using the `projects` layout.

## Code Style

Prettier config (`.prettierrc`): double quotes, trailing comma `es5`, 2-space indent, print width 100, `arrowParens: "always"`.
