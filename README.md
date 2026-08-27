# Star Motion Pack

A playable motion pack for a glossy 3D star mascot with six expressive moods.

## Moods

1. **Curious** — Base star with large oval eyes, gentle jelly float animation
2. **Zap** — Determined eyes with lightning bolt, snappy energetic bounce
3. **Sweat** — Tired half-lidded eyes with sweat drop, slow heavy droop
4. **Ping** — Curious eyes with phone and chat bubbles, lively with extra pop
5. **Soft** — Peaceful closed eyes with heart, slow dreamy pulse
6. **Sad** — Closed sad eyes with teardrop, sits lower with minimal movement

## Features

- Jelly-like idle animations unique to each mood
- Squash/stretch transitions between moods
- Auto-cycle mode (2.2s per mood)
- Speed slider (0.6x – 1.6x)
- Respects `prefers-reduced-motion`
- Mobile-friendly, looks great at 1280px wide

## Run Locally

```bash
npm install
npm run dev
```

## Image Assets

The star images should be placed in `public/star/`:

- `public/star/01-curious.png`
- `public/star/02-zap.png`
- `public/star/03-sweat.png`
- `public/star/04-ping.png`
- `public/star/05-soft.png`
- `public/star/06-sad.png`

> **Note:** The high-resolution star images need to be added manually. Copy the original PNG files to the `public/star/` directory with the filenames listed above.

## Deploy

This is a static Vite app ready for Vercel deployment.
