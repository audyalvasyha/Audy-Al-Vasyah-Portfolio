import admin from 'firebase-admin';
import { getDatabase } from 'firebase-admin/database';

const serviceAccount = {
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
  privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
};

let adminDb: admin.database.Database;

function getAdminDb() {
  if (!admin.apps.length) {
    try {
      admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
        databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
      });
    } catch (error: any) {
      console.error('Firebase admin initialization error', error.stack);
    }
  }
  // @ts-ignore
  adminDb = getDatabase();
  return adminDb;
}

export { getAdminDb };
