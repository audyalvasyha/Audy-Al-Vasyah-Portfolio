'use server';

import { z } from 'zod';
import { Resend } from 'resend';

const contactFormSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  message: z.string().min(10, { message: 'Message must be at least 10 characters.' }),
});

const resend = new Resend(process.env.RESEND_API_KEY);
const myEmail = process.env.MY_EMAIL;

export type FormState = {
  message: string;
  success: boolean;
};

export async function sendEmail(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  if (!myEmail) {
    console.error('Missing environment variable: MY_EMAIL');
    return {
      message: 'Server configuration error. Please try again later.',
      success: false,
    };
  }
  
  await new Promise(resolve => setTimeout(resolve, 1000));

  const validatedFields = contactFormSchema.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    message: formData.get('message'),
  });

  if (!validatedFields.success) {
    const fieldErrors = validatedFields.error.flatten().fieldErrors;
    const firstError = fieldErrors.name?.[0] 
                    || fieldErrors.email?.[0] 
                    || fieldErrors.message?.[0] 
                    || 'Validation failed. Please check your inputs.';
    return {
      message: firstError,
      success: false,
    };
  }

  const { name, email, message } = validatedFields.data;

  try {
    const { data, error } = await resend.emails.send({
      from: 'Portfolio Contact <onboarding@resend.dev>', // Must be from resend.dev
      to: [myEmail],
      subject: `New message from ${name} via your portfolio`,
      replyTo: email,
      html: `
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `,
    });
    
    if (error) {
        console.error("Resend error:", error);
        return { message: "Failed to send message. Please try again.", success: false };
    }

    return { message: 'Message sent successfully!', success: true };
  } catch (error) {
    console.error('Error sending email:', error);
    return { message: 'Failed to send message. Please try again later.', success: false };
  }
}
