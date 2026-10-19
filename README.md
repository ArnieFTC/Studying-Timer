# Studying Timer

A countdown timer that works like a normal clock-app timer, plus:

- **No upper limit** — set 3 hours, 30 hours, whatever.
- **Add or subtract time instantly**, even while it's running.
- **Two ways to enter time:**
  - **Exact** — hours, minutes, seconds (e.g. `1 hr 13 min 28 sec`)
  - **Decimal** — e.g. `1.11` hours → converted to `1 hr 6 min 36 sec` (also works in minutes or seconds)
- Quick buttons (−10m, −5m, −1m, +1m, +5m, +10m, +30m, +1h)
- Alarm sound + browser notification when time's up
- Shows the clock time the timer will end at
- Keeps running correctly across page refreshes
- History of every set / add / subtract

## Use it

Open `index.html` in any browser — no install, no build step.

Or turn on GitHub Pages (Settings → Pages → Deploy from branch → `main` / root) and use it at
`https://arnieftc.github.io/Studying-Timer/`.

## Keyboard

- **Space** — start / pause
- **Enter** (in a field) — set the timer to the entered time
