'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { useFormStatus } from 'react-dom';
import { useActionState, useEffect, useRef } from 'react';
import { sendEmail, FormState } from '@/app/actions';
import { Phone, Mail, MapPin, Linkedin, Facebook, Instagram } from 'lucide-react';

function SubmitButton() {
  const { pending } = useFormStatus();
  return <Button type="submit" className="w-full" disabled={pending}>{pending ? 'Sending...' : 'Send Message'}</Button>;
}

const Contact = () => {
  const initialState: FormState = { message: '', success: false };
  const [formState, formAction, isPending] = useActionState(sendEmail, initialState);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (formState.success && !isPending) {
      formRef.current?.reset();
    }
  }, [formState.success, isPending]);

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
                <Phone className="mt-1 h-6 w-6 flex-shrink-0 text-primary" />
                <div>
                  <h3 className="font-semibold">Phone</h3>
                  <a href="tel:+6289616035368" className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50">+62 896-1603-5368</a>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Mail className="mt-1 h-6 w-6 flex-shrink-0 text-primary" />
                <div>
                  <h3 className="font-semibold">Email</h3>
                  <a href="mailto:audialfasha@gmail.com" className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50">audialfasha@gmail.com</a>
                </div>
              </div>
               <div className="flex items-start gap-4">
                <MapPin className="mt-1 h-6 w-6 flex-shrink-0 text-primary" />
                <div>
                  <h3 className="font-semibold">Address</h3>
                  <p className="text-gray-500 dark:text-gray-400">Bagan Batu, Riau - Indonesia</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Linkedin className="mt-1 h-6 w-6 flex-shrink-0 text-primary" />
                <div>
                  <h3 className="font-semibold">LinkedIn</h3>
                  <a href="https://www.linkedin.com/in/audy-al-vasyah-58316a247/" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50">
                    audy-al-vasyah-58316a247
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Facebook className="mt-1 h-6 w-6 flex-shrink-0 text-primary" />
                <div>
                  <h3 className="font-semibold">Facebook</h3>
                  <a href="https://www.facebook.com/your-profile" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50">
                    Your Facebook Profile
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Instagram className="mt-1 h-6 w-6 flex-shrink-0 text-primary" />
                <div>
                  <h3 className="font-semibold">Instagram</h3>
                  <a href="https://www.instagram.com/your-profile" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50">
                    @your_instagram
                  </a>
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
                  {formState.message && !isPending && (
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
