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
  (or current total for a stopwatch), time spent running, and times used (runs + adds + subtracts)
- Alarm sound and a browser notification when a countdown finishes
- Shows the clock time a countdown will end at
- Every timer keeps running correctly across page refreshes
- **Google sign-in to sync across devices** (phone, laptop, ...). Only your name and email are requested.

## Use it

Open `index.html` in any browser. There's nothing to install or build. Without sign-in, timers save on that device only.
(Sign-in and sync need the page to be served from a web address, such as GitHub Pages, not opened as a file.)

Or turn on GitHub Pages (Settings → Pages → Deploy from branch → `main` / root) and use it at
`https://arnieftc.github.io/Studying-Timer/`.

## Set up sign-in and sync (one time, about 10 minutes)

Sync uses Firebase, which is free at this size. You only do this once. After that, anyone using the site can sign in.

1. Go to <https://console.firebase.google.com>, click **Create a project**, and give it any name, for example `studying-timer`.
   You can turn Google Analytics off.
2. **Add a web app:** on the project home page, click the `</>` (Web) icon, name it, and click **Register app**.
   Firebase shows a `firebaseConfig = { ... }` block. Copy it.
3. Paste it into [`firebase-config.js`](firebase-config.js), replacing `null`:
   ```js
   export const firebaseConfig = { apiKey: "...", authDomain: "...", projectId: "...", /* ... */ };
   ```
   These values aren't secret and are meant to be in the page. Your data is protected by the rules in step 5.
4. **Turn on Google sign-in:** go to Build → **Authentication** → Get started → Sign-in method → **Google** → Enable,
   pick a support email, and Save.
   Then go to Authentication → Settings → **Authorized domains** and add `arnieftc.github.io`.
5. **Create the database:** go to Build → **Firestore Database** → Create database, pick a location near you, and start in **production mode**.
   Then open the **Rules** tab, replace everything with the contents of [`firestore.rules`](firestore.rules), and click **Publish**.
   These rules mean each person can only read and write their own timers.
6. Commit and push `firebase-config.js`, and make sure GitHub Pages is on.

Open the site and click **Sign in with Google**. Sign in with the same account on your phone and everything stays in sync.

**What's requested from Google:** only the basic profile (your name) and your email address, which is Firebase's default.
The app shows your name and email in the sign-in bar. Your timers are stored in Firestore under your account ID.
Your name and email are not copied into the database.

**How syncing works:** every change is saved on the device first and then sent to the cloud, so it works offline and
catches up when you're back online. If the same timer was changed on two devices, the most recent change wins.
Running timers stay accurate across devices because they store when they started, not a ticking value.

## Keyboard

- **Space:** start or pause the selected timer
- **Enter** (in a time field): set the selected timer to the entered time
