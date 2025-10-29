
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
import Link from 'next/link';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../ui/tooltip';

function SubmitButton() {
  const { pending } = useFormStatus();
  return <Button type="submit" className="w-full" disabled={pending}>{pending ? 'Sending...' : 'Send Message'}</Button>;
}

const socialLinks = [
  {
    name: 'LinkedIn',
    href: 'https://www.linkedin.com/in/audy-al-vasyah-8b6135206/',
    icon: <Linkedin className="h-6 w-6" />,
  },
  {
    name: 'Facebook',
    href: 'https://web.facebook.com/audyalvasyah.audyalvasyah.1/',
    icon: <Facebook className="h-6 w-6" />,
  },
  {
    name: 'Instagram',
    href: 'https://www.instagram.com/_audysignin/',
    icon: <Instagram className="h-6 w-6" />,
  },
]

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
    <section id="contact" className="relative w-full py-20 md:py-32 scroll-mt-20 overflow-hidden">
      {/* Overlay Efek Vintage */}
      <div className="absolute inset-0 w-full h-full bg-transparent pointer-events-none z-0">
        <div className="absolute inset-0 w-full h-full bg-[repeating-linear-gradient(to_bottom,transparent_0,hsl(var(--background)/0.02)_1px,transparent_2px)]"></div>
        <div
          className="absolute inset-0 w-full h-full"
          style={{
            backgroundImage:
              'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'hsl(222, 47%, 11%)\' fill-opacity=\'0.03\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
            opacity: 0.3,
          }}
        />
      </div>
      
      <div className="relative container mx-auto px-4 md:px-6 z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="space-y-8">
            <div className="space-y-3">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl font-headline">Contact Information</h2>
              <p className="text-muted-foreground">
                Feel free to reach out to me directly or through the form. I'll get back to you as soon as possible.
              </p>
            </div>
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <Phone className="mt-1 h-5 w-5 flex-shrink-0 text-primary" />
                <div>
                  <h3 className="font-semibold">Phone</h3>
                  <a href="tel:+6289616035368" className="text-muted-foreground hover:text-primary transition-colors">+62 896-1603-5368</a>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Mail className="mt-1 h-5 w-5 flex-shrink-0 text-primary" />
                <div>
                  <h3 className="font-semibold">Email</h3>
                  <a href="mailto:audialfasha@gmail.com" className="text-muted-foreground hover:text-primary transition-colors">audialfasha@gmail.com</a>
                </div>
              </div>
               <div className="flex items-start gap-4">
                <MapPin className="mt-1 h-5 w-5 flex-shrink-0 text-primary" />
                <div>
                  <h3 className="font-semibold">Address</h3>
                  <p className="text-muted-foreground">Bagan Batu, Riau - Indonesia</p>
                </div>
              </div>
            </div>
            <div className="space-y-4 pt-4 border-t">
              <h3 className="font-semibold">Find me on Social Media</h3>
              <TooltipProvider>
                <div className="flex gap-4">
                  {socialLinks.map((social) => (
                    <Tooltip key={social.name}>
                      <TooltipTrigger asChild>
                        <Button asChild variant="outline" size="icon" className="rounded-full">
                          <Link href={social.href} target="_blank" rel="noopener noreferrer">
                            {social.icon}
                            <span className="sr-only">{social.name}</span>
                          </Link>
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>{social.name}</p>
                      </TooltipContent>
                    </Tooltip>
                  ))}
                </div>
              </TooltipProvider>
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
