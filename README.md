# Studying Timer

A timer that works like a normal clock-app timer, plus:

- **Multiple timers at once.** Run as many as you want side by side.
- **Named timers.** For example, "Biology this week" or "Chem break". Click the name on the big clock to rename it.
- **Countdown or stopwatch.** A countdown rings at zero. A stopwatch counts up, which is good for tracking total time studied.
- **No upper limit.** Set 3 hours, 30 hours, whatever.
- **Add or subtract time instantly**, even while a timer is running.
- **Two ways to enter time:**
  - **Exact:** hours, minutes, seconds (e.g. `1 hr 13 min 28 sec`)
  - **Decimal:** e.g. `1.11` hours is converted to `1 hr 6 min 36 sec` (minutes and seconds work too)
- Matching quick buttons: −1h −30m −10m −5m −1m and +1h +30m +10m +5m +1m
- **Recently deleted:** deleting a timer shows an Undo button, and deleted timers can be restored for 30 days
- **Stats for every timer**, including deleted ones: when it was created and deleted, initial time, time remaining
  (or current total for a stopwatch), time spent (for a countdown: time run plus time subtracted), and times used (runs + adds + subtracts)
- **Overtime:** countdowns keep going past zero into negative time (−00:03:00), and adding, subtracting and stats all account for it
- Alarm sound and a browser notification when a countdown hits zero
- Shows the clock time a countdown will end at
- Every timer keeps running correctly across page refreshes

## Use it

Open `index.html` in any browser. There's nothing to install or build.

Or turn on GitHub Pages (Settings → Pages → Deploy from branch → `main` / root) and use it at
`https://arnieftc.github.io/Studying-Timer/`.

## Keyboard

- **Space:** start or pause the selected timer
- **Enter** (in a time field): set the selected timer to the entered time
