# Personalize the invitation

Edit [`src/config/birthdayConfig.ts`](./src/config/birthdayConfig.ts) to change the invitation. The birthday name is stored once as `birthdayGirl`; its title and social description update automatically from that value and `displayDate`.

- `Fifi` is the party’s birthday name; change `birthdayGirl` to personalize it further.
- The invitation already uses the supplied 9 PM start time and Tsavo Sunset venue. Set the remaining `address` and `dressCode` values when available. While either still holds its `[ADD …]` marker the invitation hides it: the dress-code card is dropped and the venue falls back to its description.
- Add a Google Maps share URL to `mapsUrl` and the international phone number to `whatsappNumber` to enable those links. Leave either value blank to hide its link.
- Replace the six `memories` photo URLs, captions, and alt text. The included remote photos are editorial placeholders with photographer credits.
- Edit the activity lineup, DJ/MC names, and personal messages in the same object.
- Add your own MP3 at `public/music/birthday.mp3`. It is only played after the visitor activates the music button.

The countdown targets local midnight on the configured `date` in each visitor’s timezone.

```powershell
cd invitation
npm run dev
```

## Checks

```powershell
npm run typecheck
npm run lint
npm run build
```

`npm run build` writes `dist/`, including `404.html` and `_redirects` so deep links resolve to the app on static hosts.
