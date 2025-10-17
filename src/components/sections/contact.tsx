'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { useFormState, useFormStatus } from 'react-dom';
import { sendEmail, FormState } from '@/app/actions';
import { useEffect, useRef } from 'react';

function SubmitButton() {
  const { pending } = useFormStatus();
  return <Button type="submit" className="w-full" disabled={pending}>{pending ? 'Sending...' : 'Send Message'}</Button>;
}

// SVG Icon Components
function MapPinIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

function MailIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  );
}

function PhoneIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}


const Contact = () => {
  const initialState: FormState = { message: '', success: false };
  const [formState, formAction] = useFormState(sendEmail, initialState);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (formState.success) {
      formRef.current?.reset();
    }
  }, [formState.success]);

  return (
    <section id="contact" className="w-full py-20 md:py-32 scroll-mt-20">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="space-y-6">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Contact Information</h2>
              <p className="text-gray-500 dark:text-gray-400">
                Feel free to reach out to me directly or through the form. I'll get back to you as soon as possible.
              </p>
            </div>
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <PhoneIcon className="mt-1 h-6 w-6 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold">Phone</h3>
                  <a href="tel:+1(555)123-4567" className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50">+62 896-1603-5368</a>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <MailIcon className="mt-1 h-6 w-6 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold">Email</h3>
                  <a href="mailto:info@example.com" className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50">audialfasha@gmail.com</a>
                </div>
              </div>
               <div className="flex items-start gap-4">
                <MapPinIcon className="mt-1 h-6 w-6 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold">Address</h3>
                  <p className="text-gray-500 dark:text-gray-400">Bagan Batu, Riau - Indonesia</p>
                </div>
              </div>
            </div>
          </div>
          <Card>
            <CardHeader>
              <CardTitle>Get In Touch</CardTitle>
            </CardHeader>
            <CardContent>
              <form action={formAction} ref={formRef} className="grid gap-6">
                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="grid gap-2">
                    <Label htmlFor="name">Name</Label>
                    <Input id="name" name="name" placeholder="Enter your name" required />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" name="email" type="email" placeholder="Enter your email" required />
                  </div>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea id="message" name="message" placeholder="Enter your message" className="min-h-[150px]" required />
                </div>
                <div className="flex flex-col items-center gap-4">
                  <SubmitButton />
                  {formState.message && (
                    <p className={formState.success ? 'text-green-500' : 'text-red-500'}>
                      {formState.message}
                    </p>
                  )}
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Contact;
