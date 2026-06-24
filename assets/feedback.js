// Feedback store — all Firestore access lives here. ES module.
// The config below is a PUBLIC identifier, not a secret: Firestore Security
// Rules (see firestore.rules) restrict what it can do, and the free tier caps
// rather than bills. Safe to commit.
import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js';
import {
  getFirestore, collection, addDoc, getDocs, query, where, serverTimestamp
} from 'https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js';

// Firebase web config for project color-pie-review-20904 (public — rules enforce access).
const firebaseConfig = {
  apiKey: 'AIzaSyDQmY2_OTyo86oFwBdgO9Yb-mqvjX2sJ5w',
  authDomain: 'color-pie-review-20904.firebaseapp.com',
  projectId: 'color-pie-review-20904',
};

const col = collection(getFirestore(initializeApp(firebaseConfig)), 'feedback');

export function addFeedback(effectId, payload) {
  return addDoc(col, { ...payload, effectId, createdAt: serverTimestamp() });
}

// ponytail: sort newest-first client-side so the where() needs no composite index.
export async function listFeedback(effectId) {
  const snap = await getDocs(query(col, where('effectId', '==', effectId)));
  return snap.docs.map(d => d.data())
    .sort((a, b) => (b.createdAt?.seconds || 0) - (a.createdAt?.seconds || 0));
}

// ponytail: reads the whole collection once for badge counts; swap to a
// per-effect counter doc if the collection ever gets large.
export async function allCounts() {
  const snap = await getDocs(col);
  const counts = {};
  snap.forEach(d => { const id = d.data().effectId; if (id) counts[id] = (counts[id] || 0) + 1; });
  return counts;
}
