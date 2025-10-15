'use client';

import { useEffect } from 'react';
import { useFormState, useFormStatus } from 'react-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  submitContactForm,
  type ContactFormState,
} from '@/lib/actions';
import { useToast } from '@/hooks/use-toast';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { UnderlineInput } from '@/components/ui/underline-input';
import { UnderlineTextarea } from '@/components/ui/underline-textarea';
import { Loader2, Mail, Phone } from 'lucide-react';

const formSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email address'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

const SubmitButton = () => {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full">
      {pending ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Sending...
        </>
      ) : (
        'Send Message'
      )}
    </Button>
  );
};

const Contact = () => {
  const { toast } = useToast();
  const [state, formAction] = useFormState<ContactFormState, FormData>(
    submitContactForm,
    { message: '', status: 'idle' }
  );

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      message: '',
    },
  });

  useEffect(() => {
    if (state.status === 'success') {
      toast({
        title: 'Success!',
        description: state.message,
      });
      form.reset();
    } else if (state.status === 'error') {
      toast({
        title: 'Error',
        description: state.message,
        variant: 'destructive',
      });
    }
  }, [state, toast, form]);

  return (
    <section id="contact" className="w-full py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-headline font-bold tracking-tighter sm:text-5xl">
              Get In Touch
            </h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Have a question or want to work together?
            </p>
          </div>
        </div>
        <div className="mt-12 max-w-4xl mx-auto grid gap-8 md:grid-cols-2">
          <Card className="border-0 md:border">
            <CardHeader>
              <CardTitle className="font-headline">Contact Me</CardTitle>
              <CardDescription>
                Fill out the form and I'll get back to you soon.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form action={formAction} className="space-y-6">
                <UnderlineInput
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Your Name"
                  required
                />
                <UnderlineInput
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Your Email"
                  required
                />
                <UnderlineTextarea
                  id="message"
                  name="message"
                  placeholder="Your Message"
                  rows={4}
                  required
                />
                <SubmitButton />
              </form>
            </CardContent>
          </Card>
          <div className="space-y-6 flex flex-col justify-center">
             <Card>
              <CardHeader>
                <CardTitle className="font-headline">Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-sm">
                <div className="flex items-center">
                  <Phone className="h-5 w-5 mr-3 text-primary" />
                  <a href="tel:089616035368" className="hover:text-primary transition-colors">089616035368</a>
                </div>
                <div className="flex items-center">
                  <Mail className="h-5 w-5 mr-3 text-primary" />
                  <a href="mailto:audialfasha@gmail.com" className="hover:text-primary transition-colors">audialfasha@gmail.com</a>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
