'use server';

import { initializeApp, getApp, getApps } from 'firebase/app';
import { getDatabase, runTransaction, ref, get } from 'firebase/database';
import { Resend } from 'resend';

// Type for the form state
export type FormState = {
  message: string;
  success: boolean;
};

// --- Firebase Config ---
// This config is only used within server actions.
const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
    databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
};

function getFirebaseApp() {
    return !getApps().length ? initializeApp(firebaseConfig) : getApp();
}

/**
 * Server action to send an email using Resend.
 * @param previousState The previous state of the form.
 * @param formData The data from the form.
 * @returns {Promise<FormState>} The new state of the form.
 */
export async function sendEmail(previousState: FormState, formData: FormData): Promise<FormState> {
  const name = formData.get('name') as string;
  const email = formData.get('email') as string;
  const message = formData.get('message') as string;

  // Basic validation
  if (!name || !email || !message) {
    return { message: 'Please fill out all fields.', success: false };
  }

  try {
    const resend = new Resend(process.env.RESEND_API_KEY);

    await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: 'audialfasha@gmail.com', // Your email address
      subject: `New message from ${name}`,
      replyTo: email,
      html: `<p>You have received a new message from your portfolio contact form.</p>
             <p><strong>Name:</strong> ${name}</p>
             <p><strong>Email:</strong> ${email}</p>
             <p><strong>Message:</strong></p>
             <p>${message}</p>`,
    });

    return { message: 'Your message has been sent successfully!', success: true };
  } catch (error) {
    console.error('Error sending email:', error);
    return { message: 'Something went wrong. Please try again later.', success: false };
  }
}

/**
 * Increments the page view counter and returns the new value.
 * @returns {Promise<number>} The new number of page views.
 */
export async function incrementAndGetViews(): Promise<number> {
    try {
        const app = getFirebaseApp();
        const rtdb = getDatabase(app);
        const viewsRef = ref(rtdb, 'pageViews');
        
        const { snapshot } = await runTransaction(viewsRef, (currentData: number | null) => {
            return (currentData || 0) + 1;
        });

        return snapshot.val() || 0;
    } catch (error) {
        console.error('Error updating and getting page views:', error);
        // If increment fails, try to at least get the current value
        try {
            const app = getFirebaseApp();
            const rtdb = getDatabase(app);
            const viewsRef = ref(rtdb, 'pageViews');
            const snapshot = await get(viewsRef);
            return snapshot.val() || 0;
        } catch (readError) {
             console.error('Error reading page views after failed transaction:', readError);
             return 0;
        }
    }
}
