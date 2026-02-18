# Changelog

All notable changes to DateDash will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).

## [0.10.0] - 2026-02-17

### Added

- Favorites page (`/favorites`) for viewing saved date ideas
- Responsive 3-column grid layout (1 col mobile, 2 tablet, 3 desktop)
- Empty state with friendly prompt when no favorites exist
- Remove saved ideas by clicking the heart icon on the favorites page
- "My Favorites" navigation link on the home page

### Fixed

- Add rate limiting to `/api/generate` (10 req/hour per IP via MongoDB)
- Sanitize city input: max 100 chars, Unicode-aware pattern validation, regex escaping to prevent ReDoS
- Truncate query param on `/api/cities/search` to 100 chars

## [0.9.0] - 2026-02-08

### Added

- Save/bookmark date ideas with localStorage persistence
- `useSavedIdeas` custom hook for managing saved state
- Visual toggle on Heart button: filled red when saved, outline when not
- Save functionality on shared date idea page
- `SavedIdeaEntry` and `SavedIdeasStore` types (ready for future MongoDB sync)

## [0.8.0] - 2026-02-07

### Fixed

- Replace deprecated `gemini-pro` model with `gemini-2.5-flash-lite` to restore date idea generation
- Strip markdown code fences from Gemini API responses before JSON parsing
- Bump Next.js from 15.1.6 to 15.1.9 to patch CVE-2025-66478
- Defer environment variable validation to runtime to unblock Vercel builds
- Resolve ESLint errors (`no-unused-vars`, `no-unescaped-entities`) blocking production builds
- Remove `AuthProvider` from root layout to prevent 500 errors on every page load (auth is WIP)

### Removed

- Temporary "Test Auth" button from the home page

### Added

- Debug logging to `/api/generate` for production troubleshooting
- `maxDuration = 30` export on generate route for Vercel function timeout headroom

## [0.7.0] - 2025-11-24

### Added

- Open Graph image generation for social sharing

### Fixed

- Mark interactive components as client components

## [0.6.0] - 2025-02-14

### Changed

- Migrate from Upstash Redis to MongoDB for persistent storage of date ideas
- Update prompt to include local currency with USD equivalent in cost estimates

### Added

- MongoDB adapter and connection module
- NextAuth v5 (beta) with magic link authentication via Resend (in progress)
- Custom email template for magic link sign-in

## [0.5.0] - 2025-02-11

### Added

- Share date idea functionality with shareable links
- Suspense boundary for shared date idea content

### Changed

- Tweak app title casing to suit variable font rendering

## [0.4.0] - 2025-02-10

### Added

- `CityCombobox` component with autocomplete city search
- Cities search API route (`/api/cities/search`)
- Dataset of ~48,000 worldwide "city, country" pairs
- Barrio, Oooh Baby, and Pompiere custom fonts

### Changed

- Replace freeform `CityInput` with `CityCombobox` for better UX
- Overall style enhancements across all components
- Custom scrollbar styles

### Removed

- Obsolete `CityInput` component
- Geist and Geist Mono fonts (replaced with custom fonts)

## [0.3.0] - 2025-01-31

### Added

- Dynamic CSS cloud background using `@sahiltandon/react-clouds`
- `CloudBackground` component with layered cloud rendering
- Floating hearts animation with depth effect within cloud layers
- Multiple speed variants for float-up animation

### Changed

- Update page body background color
- Update front-most cloud layer color
- Layout improvements to vertically center main content within viewport
- Update page metadata

## [0.2.0] - 2025-01-25

### Added

- `DateIdeaCard` component for displaying individual date ideas
- Carousel UI for browsing through generated ideas
- Google Gemini AI integration (`@google/generative-ai`) for generating date ideas
- Loading skeleton state while fetching ideas

### Changed

- Switch from Vercel KV to Upstash Redis for caching
- Update prompt to generate 10 date ideas instead of 5
- Improve card layout and content visibility
- Enhance header typography and layout
- Optimize prompt for Gemini API to prevent timeouts
- Enhance error handling for Gemini API integration

## [0.1.0] - 2025-01-24

### Added

- Initial project setup with Next.js 15, TypeScript, and Tailwind CSS
- shadcn/ui component library (button, card, carousel, input, skeleton)
- Core TypeScript interfaces and types
- Custom color scheme
- `CityInput` component for entering a city name
- API route for date ideas generation with Vercel KV caching
