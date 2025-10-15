'use server';

import { z } from 'zod';
import { db } from '@/lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import {
  efficiencyPredictionTool,
  type EfficiencyPredictionInput,
  type EfficiencyPredictionOutput,
} from '@/ai/flows/efficiency-prediction-tool';
import { revalidatePath } from 'next/cache';

// Contact Form
const ContactFormSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  email: z.string().email({ message: 'Please enter a valid email.' }),
  message: z
    .string()
    .min(10, { message: 'Message must be at least 10 characters.' }),
});

export type ContactFormState = {
  message: string;
  status: 'success' | 'error' | 'idle';
};

export async function submitContactForm(
  prevState: ContactFormState,
  formData: FormData
): Promise<ContactFormState> {
  const validatedFields = ContactFormSchema.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    message: formData.get('message'),
  });

  if (!validatedFields.success) {
    return {
      message:
        validatedFields.error.flatten().fieldErrors.message?.[0] ||
        validatedFields.error.flatten().fieldErrors.email?.[0] ||
        validatedFields.error.flatten().fieldErrors.name?.[0] ||
        'An error occurred.',
      status: 'error',
    };
  }

  try {
    await addDoc(collection(db, 'contacts'), {
      ...validatedFields.data,
      createdAt: serverTimestamp(),
    });

    revalidatePath('/');
    return {
      message: 'Your message has been sent successfully!',
      status: 'success',
    };
  } catch (e) {
    console.error('Error adding document: ', e);
    return {
      message: 'An internal error occurred. Please try again later.',
      status: 'error',
    };
  }
}

// Efficiency Prediction Tool
export async function getEfficiencyPrediction(
  data: EfficiencyPredictionInput
): Promise<EfficiencyPredictionOutput> {
  try {
    const prediction = await efficiencyPredictionTool(data);
    return prediction;
  } catch (error) {
    console.error('Error in efficiency prediction flow: ', error);
    throw new Error('Failed to get efficiency prediction.');
  }
}
