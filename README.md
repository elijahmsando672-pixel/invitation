# Fifi’s Birthday Invitation

A responsive romantic birthday invitation for 21 November 2026, built with React, TypeScript, Vite, Tailwind CSS v4, Motion, Lucide React, and bespoke CSS.

## Personalize it

Change `src/config/birthdayConfig.ts` to edit the name, date, venue, address, dress code, activities, DJ/MC, personal notes, and placeholder photos. Enter a Maps URL and WhatsApp number to reveal those optional links. Values still holding their `[ADD …]` marker are hidden rather than shown as placeholder text. Add your own audio file at `public/music/birthday.mp3`; playback remains visitor-controlled.

For the complete customization guide, see [EDITING.md](./EDITING.md).

## Run locally

```powershell
npm install
npm run dev
```

Create a production bundle using `npm run build`. Validate changes with `npm run typecheck` and `npm run lint`.
