'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { useFormStatus } from 'react-dom';
import { useActionState, useEffect, useRef } from 'react';
import { sendEmail, FormState } from '@/app/actions';
import { Phone, Mail, MapPin, Linkedin, Facebook, Instagram, Github } from 'lucide-react';
import Link from 'next/link';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../ui/tooltip';
import { motion, useInView, useAnimation } from 'framer-motion';
import Meteor from '../ui/meteor';

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
    name: 'GitHub',
    href: 'https://github.com/audyalvasyha',
    icon: <Github className="h-6 w-6" />,
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

  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });
  const controls = useAnimation();

  useEffect(() => {
    if (formState.success && !isPending) {
      formRef.current?.reset();
    }
  }, [formState.success, isPending]);

  useEffect(() => {
    if (isInView) {
      controls.start('visible');
    }
  }, [isInView, controls]);

  const leftVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0 },
  };

  const rightVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0 },
  };

  const meteorCount = 5;

  return (
    <section id="contact" className="relative w-full py-20 md:py-32 scroll-mt-20 overflow-hidden">
      {Array.from({ length: meteorCount }).map((_, i) => (
        <Meteor
          key={i}
          style={{
            top: `${Math.random() * 20 - 10}%`,
            left: `auto`,
            right: `${Math.random() * 80}%`,
            animationDelay: `${Math.random() * 10}s`,
            animationDuration: `${Math.random() * 4 + 3}s`,
          }}
        />
      ))}
      <div ref={ref} className="relative container mx-auto px-4 md:px-6 z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="space-y-8">
            <motion.div
              className="space-y-3"
              variants={leftVariants}
              initial="hidden"
              animate={controls}
              transition={{ duration: 0.5, ease: 'easeOut', delay: 0 }}
            >
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl font-headline">Contact Information</h2>
              <p className="text-muted-foreground">
                Feel free to reach out to me directly or through the form. I'll get back to you as soon as possible.
              </p>
            </motion.div>
            <motion.div 
              className="space-y-4"
              variants={leftVariants}
              initial="hidden"
              animate={controls}
              transition={{ duration: 0.5, ease: 'easeOut', delay: 0.2 }}
            >
              <div className="flex items-start gap-4">
                <Phone className="mt-1 h-5 w-5 flex-shrink-0 text-accent" />
                <div>
                  <h3 className="font-semibold">Phone</h3>
                  <a href="tel:+6289616035368" className="text-muted-foreground hover:text-primary transition-colors">+62 896-1603-5368</a>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Mail className="mt-1 h-5 w-5 flex-shrink-0 text-accent" />
                <div>
                  <h3 className="font-semibold">Email</h3>
                  <a href="mailto:audialfasha@gmail.com" className="text-muted-foreground hover:text-primary transition-colors">audialfasha@gmail.com</a>
                </div>
              </div>
               <div className="flex items-start gap-4">
                <MapPin className="mt-1 h-5 w-5 flex-shrink-0 text-accent" />
                <div>
                  <h3 className="font-semibold">Address</h3>
                  <p className="text-muted-foreground">Bagan Batu, Riau - Indonesia</p>
                </div>
              </div>
            </motion.div>
            <motion.div 
              className="space-y-4 pt-4 border-t"
              variants={leftVariants}
              initial="hidden"
              animate={controls}
              transition={{ duration: 0.5, ease: 'easeOut', delay: 0.4 }}
            >
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
            </motion.div>
          </div>
          <motion.div
            variants={rightVariants}
            initial="hidden"
            animate={controls}
            transition={{ duration: 0.5, ease: 'easeOut', delay: 0.2 }}
          >
            <Card className="bg-gray-800/50 backdrop-blur-sm border border-slate-700">
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
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
