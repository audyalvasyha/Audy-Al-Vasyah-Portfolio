'use server';

import { runTransaction, ref } from 'firebase/database';
import { Resend } from 'resend';
import { getAdminDb } from '@/lib/firebase-admin';

// Type for the form state
export type FormState = {
  message: string;
  success: boolean;
};

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
 * Increments the page view counter in Firebase Realtime Database.
 * This is a server action and should only be called from the server or other server components.
 * @returns {Promise<number>} The new number of page views, or 0 if an error occurs.
 */
export async function updatePageViews(): Promise<number> {
  try {
    const adminDb = getAdminDb();
    const viewsRef = ref(adminDb, 'pageViews');
    
    const { snapshot } = await runTransaction(viewsRef, (currentData: number | null) => {
      return (currentData || 0) + 1;
    });

    return snapshot.val() || 0;
  } catch (error) {
    console.error('Error updating page views:', error);
    return 0; // Return 0 if there's an error
  }
}
