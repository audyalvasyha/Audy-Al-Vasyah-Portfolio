'use server';

import { z } from 'zod';
import { Resend } from 'resend';
import { initializeApp, getApp, getApps } from 'firebase/app';
import { getDatabase, runTransaction, ref, get } from 'firebase/database';

export type FormState = {
  message: string;
  success: boolean;
};

// --- Firebase (hanya untuk server action, dibuat lazy) ---
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
};

function getRtdb() {
  // View counter bersifat opsional: jangan inisialisasi Firebase kalau env
  // belum diisi, supaya halaman tidak melempar fatal error di server.
  if (!firebaseConfig.apiKey || !firebaseConfig.projectId || !firebaseConfig.databaseURL) {
    return null;
  }

  const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
  return getDatabase(app);
}

/** Escape sehingga isi form tidak bisa "menyusup" ke HTML email. */
function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

const SendEmailSchema = z.object({
  name: z.string().trim().min(2, 'Nama minimal 2 karakter.'),
  email: z.string().trim().email('Email tidak valid.'),
  message: z.string().trim().min(10, 'Pesan minimal 10 karakter.'),
});

export async function sendEmail(
  _previousState: FormState,
  formData: FormData
): Promise<FormState> {
  const parsed = SendEmailSchema.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    message: formData.get('message'),
  });

  if (!parsed.success) {
    const first =
      parsed.error.flatten().fieldErrors.name?.[0] ??
      parsed.error.flatten().fieldErrors.email?.[0] ??
      parsed.error.flatten().fieldErrors.message?.[0] ??
      'Cek kembali isian formulirmu.';
    return { message: first, success: false };
  }

  const { name, email, message } = parsed.data;

  try {
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      return {
        message: 'Server kirim email belum dikonfigurasi. Hubungi saya langsung via email ya.',
        success: false,
      };
    }

    const resend = new Resend(apiKey);
    await resend.emails.send({
      // Ganti ke domain sendiri setelah diverifikasi di Resend.
      from: 'Portfolio <onboarding@resend.dev>',
      to: 'audialfasha@gmail.com',
      subject: `Pesan baru dari ${name}`,
      replyTo: email,
      html: `<p>Pesan baru dari formulir portofolio.</p>
             <p><strong>Nama:</strong> ${escapeHtml(name)}</p>
             <p><strong>Email:</strong> ${escapeHtml(email)}</p>
             <p><strong>Pesan:</strong></p><p>${escapeHtml(message)}</p>`,
    });

    return { message: 'Pesan terkirim. Saya balas secepat mungkin!', success: true };
  } catch (error) {
    console.error('Error sending email:', error);
    return { message: 'Server sedang bermasalah. Coba lagi nanti atau hubungi via email.', success: false };
  }
}

/**
 * Membaca jumlah kunjungan TANPA menambah angka.
 * Dipakai saat suatu peramban (session) sudah pernah menambah counter.
 */
export async function getPageViews(): Promise<number | null> {
  const db = getRtdb();
  if (!db) return null;

  try {
    const snapshot = await get(ref(db, 'pageViews'));
    return snapshot.val() || 0;
  } catch (error) {
    console.error('Error reading page views:', error);
    return null;
  }
}

/**
 * Menambah counter kunjungan dan mengembalikan nilai barunya.
 */
export async function incrementAndGetViews(): Promise<number | null> {
  const db = getRtdb();
  if (!db) return null;

  try {
    const { snapshot } = await runTransaction(
      ref(db, 'pageViews'),
      (current: number | null) => (current || 0) + 1
    );
    return snapshot.val() || 0;
  } catch (error) {
    console.error('Error incrementing page views:', error);
    return getPageViews();
  }
}
