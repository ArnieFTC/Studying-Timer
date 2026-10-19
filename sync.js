// Google sign-in + cloud sync (Firebase Auth + Cloud Firestore).
//
// Signing in only asks Google for the standard basic profile: your name and email.
// Timer data is stored at users/{your uid} and the security rules (firestore.rules)
// only let you read and write your own document.
//
// Without a config in firebase-config.js the app simply works offline, as before.

import { firebaseConfig } from './firebase-config.js';

const FIREBASE = 'https://www.gstatic.com/firebasejs/10.12.2';
const $ = id => document.getElementById(id);
const app = window.timerApp;

const show = (id, on) => $(id).classList.toggle('hidden', !on);
const setStatus = (text, kind) => {
  $('syncStatus').textContent = text;
  $('syncDot').className = 'dot ' + (kind || '');
};
const showError = text => {
  $('authError').textContent = text;
  show('authError', !!text);
};

// Compare only what syncs, ignoring key order differences from Firestore.
const canon = data => JSON.stringify(['timers', 'trash', 'archive'].map(l =>
  (data[l] || []).map(t => Object.keys(t).sort().map(k => [k, t[k]]))));

async function main() {
  if (!firebaseConfig || !firebaseConfig.apiKey || !app) return;  // sync not set up
  show('account', true);

  const [{ initializeApp }, auth, fs] = await Promise.all([
    import(`${FIREBASE}/firebase-app.js`),
    import(`${FIREBASE}/firebase-auth.js`),
    import(`${FIREBASE}/firebase-firestore.js`),
  ]);
  const fbApp = initializeApp(firebaseConfig);
  const authInst = auth.getAuth(fbApp);
  const db = fs.getFirestore(fbApp);

  // Default Google provider = basic profile (name) + email. No extra scopes are added.
  const provider = new auth.GoogleAuthProvider();
  provider.setCustomParameters({ prompt: 'select_account' });

  $('signInBtn').onclick = async () => {
    showError('');
    try {
      await auth.signInWithPopup(authInst, provider);
    } catch (e) {
      if (e.code === 'auth/popup-blocked' || e.code === 'auth/operation-not-supported-in-this-environment') {
        await auth.signInWithRedirect(authInst, provider);
      } else if (e.code !== 'auth/popup-closed-by-user' && e.code !== 'auth/cancelled-popup-request') {
        showError(`Sign-in failed: ${e.message}`);
      }
    }
  };
  $('signOutBtn').onclick = () => auth.signOut(authInst);
  auth.getRedirectResult(authInst).catch(e => showError(`Sign-in failed: ${e.message}`));

  let unsubscribe = null, ref = null, writeTimer = null, ready = false;

  const push = async () => {
    if (!ref) return;
    setStatus('Saving…', 'busy');
    try {
      await fs.setDoc(ref, { ...app.getData(), updatedAt: fs.serverTimestamp() });
      setStatus('Synced', 'ok');
    } catch (e) {
      setStatus(navigator.onLine ? 'Sync error' : 'Offline — will sync later', 'bad');
      console.error(e);
    }
  };
  // Local changes: write to the cloud shortly after (batches rapid clicks).
  app.onSave(() => {
    if (!ref || !ready) return;
    clearTimeout(writeTimer);
    setStatus('Saving…', 'busy');
    writeTimer = setTimeout(push, 600);
  });

  auth.onAuthStateChanged(authInst, user => {
    if (unsubscribe) { unsubscribe(); unsubscribe = null; }
    clearTimeout(writeTimer);
    ref = null; ready = false;

    show('who', !!user);
    show('signInBtn', !user);
    if (!user) return;

    $('userName').textContent = user.displayName || 'Signed in';
    $('userEmail').textContent = user.email || '';
    setStatus('Connecting…', 'busy');

    ref = fs.doc(db, 'users', user.uid);
    unsubscribe = fs.onSnapshot(ref, snap => {
      if (snap.metadata.hasPendingWrites) return;  // our own write echoing back
      const remote = snap.exists() ? snap.data() : { timers: [], trash: [], archive: [] };
      const merged = app.applyRemote(remote);
      ready = true;
      // If this device had changes the cloud didn't, send the merged result back.
      if (!snap.exists() || canon(merged) !== canon(remote)) push();
      else setStatus('Synced', 'ok');
    }, e => {
      setStatus('Sync error', 'bad');
      showError(`Couldn't load your saved timers: ${e.message}`);
    });
  });

  window.addEventListener('online', () => { if (ready) push(); });
}

main().catch(e => {
  console.error(e);
  show('account', true);
  showError('Sync is unavailable right now — your timers still save on this device.');
});
