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
  return <Button type="submit" disabled={pending}>{pending ? 'Sending...' : 'Send Message'}</Button>;
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
    <section
      id="contact"
      className="w-full py-20 md:py-32 flex items-center justify-center"
    >
      <Card className="w-full max-w-2xl mx-4">
        <CardHeader>
          <CardTitle className="text-3xl font-bold tracking-tight text-center">
            Get In Touch
          </CardTitle>
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
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Enter your email"
                  required
                />
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="message">Message</Label>
              <Textarea
                id="message"
                name="message"
                placeholder="Enter your message"
                className="min-h-[150px]"
                required
              />
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
    </section>
  );
};

export default Contact;
