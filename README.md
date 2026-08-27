# Star Motion Pack

A playable motion pack for a glossy 3D star mascot with six expressive moods.

## Moods

1. **Curious** — Base star with large oval eyes, gentle jelly float animation (IDLE)
2. **Zap** — Determined eyes with lightning bolt, snappy energetic bounce
3. **Sweat** — Tired half-lidded eyes with sweat drop, slow heavy droop
4. **Ping** — Curious eyes with phone and chat bubbles, lively with extra pop
5. **Soft** — Peaceful closed eyes with heart, slow dreamy pulse
6. **Sad** — Closed sad eyes with teardrop, sits lower with minimal movement

## Features

- Jelly-like idle animations unique to each mood
- Squash/stretch transitions between moods
- Auto-cycle mode (~2.2s per mood)
- Speed slider (0.6x – 1.6x)
- Respects `prefers-reduced-motion`
- Mobile-friendly, looks great at 1280px wide
- Star body stays visually centered across all moods (including wider prop frames)

## Run Locally

```bash
npm install
npm run dev
```

## Adding the High-Res Star Images

The app currently uses placeholder SVGs. To use the original high-res PNG images:

1. Add the PNG files to `public/star/`:
   - `01-curious.png` — base star, oval eyes, slight tilt, no props
   - `02-zap.png` — slanted determined eyes + lightning bolt (upper-right)
   - `03-sweat.png` — half-lidded tired eyes + sweat drop (upper-left)
   - `04-ping.png` — curious oval eyes + phone + chat bubbles (wider frame)
   - `05-soft.png` — closed peaceful eyes + smile + pink heart (upper-right)
   - `06-sad.png` — closed sad eyes + frown + teardrop (right side)

2. Update `src/App.tsx` — change `.svg` to `.png` in `MOOD_IMAGES`:
   ```typescript
   const MOOD_IMAGES: Record<Mood, string> = {
     Curious: '/star/01-curious.png',
     Zap: '/star/02-zap.png',
     // ... etc
   }
   ```

3. Update `index.html` — change the preload links from `.svg` to `.png`

4. Delete the placeholder `.svg` files from `public/star/`

## Deploy

This is a static Vite app ready for Vercel deployment. Just push to your repo.

## Tech Stack

- Vite + React + TypeScript
- Pure CSS animations (no animation library)
- Responsive design with CSS media queries
