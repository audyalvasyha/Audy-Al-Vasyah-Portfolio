'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { MessageSquare, Briefcase } from 'lucide-react';
import React from 'react';
import AnimatedTitle from '@/components/ui/animated-title';
import ParticlesBackground from '../ui/particles-background';
import Typewriter from '../ui/typewriter';
import Meteor from '../ui/meteor';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.5,
    },
  },
};

const badgeVariants = {
  hidden: { y: -50, opacity: 0 },
  visible: { 
    y: 0, 
    opacity: 1,
    transition: { type: 'spring', stiffness: 120 } 
  },
};

const buttonsVariants = {
  hidden: { y: 50, opacity: 0 },
  visible: { 
    y: 0, 
    opacity: 1, 
    transition: { type: 'spring', stiffness: 100 }
  },
}


const Hero = () => {
  const meteorCount = 10;
  return (
    <section
      id="home"
      className="relative isolate flex flex-col justify-center scroll-mt-20 overflow-hidden min-h-[85vh]"
    >
      <ParticlesBackground />
      {Array.from({ length: meteorCount }).map((_, i) => (
        <Meteor
          key={i}
          style={{
            top: `${Math.random() * 20 - 10}%`,
            left: 'auto',
            right: `${Math.random() * 20 - 10}%`,
            animationDelay: `${Math.random() * 10}s`,
            animationDuration: `${Math.random() * 4 + 2}s`,
          }}
        />
      ))}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent z-10"></div>

      <motion.div 
        className="container relative z-20 px-6"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="flex flex-col items-center text-center">
          <motion.div
            className="inline-block rounded-full bg-card/80 backdrop-blur-sm border border-border text-accent px-4 py-1 text-sm font-medium mb-6 self-center"
            variants={badgeVariants}
          >
            Hi 👋, Siap Meluncurkan Proyek Digital Anda?
          </motion.div>

          <AnimatedTitle
            text="Solusi Digital & Automasi"
            className="text-xl font-body tracking-tight text-foreground sm:text-3xl md:text-4xl lg:text-5xl max-w-3xl"
          />

          <div className="mt-6 text-center">
            <AnimatedTitle
              as="div"
              text="Audy Al Vasyah"
              className="text-3xl font-headline tracking-tight sm:text-5xl md:text-6xl lg:text-7xl bg-gradient-to-r from-accent via-foreground to-accent bg-clip-text text-transparent animate-gradient"
            />
          </div>

          <div className="mt-8 max-w-3xl text-sm text-slate-300 sm:text-base font-body">
            <Typewriter 
              text="Spesialis AI & Automasi: Saya membantu bisnis meningkatkan efisiensi operasional dan mengurangi human error secara terukur (hingga 44% dan 90%) melalui solusi end-to-end sistem cerdas." 
              speed={20}
              triggerOnView={true}
            />
          </div>
          

          <motion.div
            className="mt-10 flex flex-wrap items-center justify-center gap-4"
            variants={buttonsVariants}
          >
            <Button asChild size="lg">
              <Link href="#contact" className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5" />
                Hubungi Saya
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="bg-card/80 backdrop-blur-sm"
            >
              <Link href="#projects" className="flex items-center gap-2">
                <Briefcase className="h-5 w-5" />
                Lihat Proyek Saya
              </Link>
            </Button>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
