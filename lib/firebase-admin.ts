// Firebase Admin SDK (server-only)

import { cert, getApps, initializeApp, App } from 'firebase-admin/app'
import { getAuth, Auth } from 'firebase-admin/auth'
import { getFirestore, Firestore } from 'firebase-admin/firestore'

let adminApp: App | undefined;
let firebaseAdminAuth: Auth | undefined;
let firebaseAdminDb: Firestore | undefined;
let isAdminEnabled = false;

try {
  const json = process.env.FIREBASE_SERVICE_ACCOUNT_KEY;
  if (json) {
    const serviceAccount = JSON.parse(json);
    adminApp = getApps().length > 0 ? getApps()[0] : initializeApp({
      credential: cert(serviceAccount),
    });
    firebaseAdminAuth = getAuth(adminApp);
    firebaseAdminDb = getFirestore(adminApp);
    isAdminEnabled = true;
  } else {
    console.warn('⚠️ FIREBASE_SERVICE_ACCOUNT_KEY is not set. Firebase Admin SDK will not be initialized.');
  }
} catch (error) {
  console.error('❌ Failed to initialize Firebase Admin SDK:', error);
}

// Export a proxy for db to prevent runtime crashes if accessed before checking isAdminEnabled
const safeAdminDb = firebaseAdminDb || new Proxy({} as any, {
  get: () => {
    throw new Error('Firebase Admin SDK is not initialized.');
  }
});

export { firebaseAdminAuth, safeAdminDb as firebaseAdminDb, isAdminEnabled }
