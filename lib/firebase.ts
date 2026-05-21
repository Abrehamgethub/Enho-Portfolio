import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const requiredEnvVars = [
  'NEXT_PUBLIC_FIREBASE_API_KEY',
  'NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN',
  'NEXT_PUBLIC_FIREBASE_PROJECT_ID'
];

const missingEnvVars = requiredEnvVars.filter(envVar => !process.env[envVar]);

if (missingEnvVars.length > 0) {
  console.warn(`⚠️ Missing Firebase environment variables: ${missingEnvVars.join(', ')}. Firestore may fail.`);
}

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || 'dummy-api-key',
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || 'dummy-auth-domain',
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || 'dummy-project-id',
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || "eneho-egna-30ba1.firebasestorage.app",
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "151246027703",
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || "1:151246027703:web:03ce982a6d404ee3ef0632"
};

// Initialize Firebase only if it hasn't been initialized yet
const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);

// Initialize Auth
export const firebaseAuth = getAuth(app);

// Initialize Firestore lazily or with a check
let db: any;
let isFirestoreEnabled = false;

try {
  if (firebaseConfig.projectId && firebaseConfig.apiKey && firebaseConfig.apiKey !== 'dummy-api-key') {
    db = getFirestore(app);
    isFirestoreEnabled = true;
  } else {
    console.warn("⚠️ Firestore not initialized: Missing configuration.");
    // Export a dummy object that won't crash basic access but will fail on actual calls
    db = new Proxy({}, {
      get: (target, prop) => {
        if (prop === 'type') return 'firestore'; // Some SDK checks might use this
        return undefined;
      }
    });
  }
} catch (error) {
  console.error("❌ Failed to initialize Firestore:", error);
}

// Export `firestore` as an alias for `db` to maintain compatibility with `firebaseClient.ts`
export const firestore = db;
export { app, db, isFirestoreEnabled };
