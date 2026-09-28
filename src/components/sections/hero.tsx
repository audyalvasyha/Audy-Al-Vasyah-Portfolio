'use client';

import Link from 'next/link';
import { motion, type Variants } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { MessageSquare, Briefcase } from 'lucide-react';
import React from 'react';
import AnimatedTitle from '@/components/ui/animated-title';
import ParticlesBackground from '../ui/particles-background';
import Typewriter from '../ui/typewriter';

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.5,
    },
  },
};

const badgeVariants: Variants = {
  hidden: { y: -50, opacity: 0 },
  visible: { 
    y: 0, 
    opacity: 1,
    transition: { type: 'spring', stiffness: 120 } as any
  },
};

const buttonsVariants: Variants = {
  hidden: { y: 50, opacity: 0 },
  visible: { 
    y: 0, 
    opacity: 1, 
    transition: { type: 'spring', stiffness: 100 } as any
  },
}


const Hero = () => {
  return (
    <section
      id="home"
      className="bp-ruler relative isolate flex flex-col justify-center scroll-mt-20 overflow-hidden min-h-screen pt-24 pb-16"
    >
      <div className="absolute inset-0 z-0 bp-grid" aria-hidden="true"></div>
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent/10 rounded-full blur-[128px] animate-pulse"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-redline/5 rounded-full blur-[128px] animate-pulse delay-1000"></div>
      <ParticlesBackground />
      <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-background via-background/50 to-transparent z-10"></div>

      <motion.div 
        className="container relative z-20 px-6 mt-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="flex flex-col items-center text-center">
          <motion.div
            className="bp-corner-brackets relative max-w-3xl w-full border border-primary/20 bg-card/30 backdrop-blur-sm px-6 py-10 sm:px-10"
            variants={badgeVariants}
          >
            <span className="absolute -top-3 left-6 bg-background px-2 font-code text-[0.6rem] uppercase tracking-[0.3em] text-muted-foreground">
              Fig. 01
            </span>

            <div className="bp-stamp mb-8">
              Hi 👋, Siap Meluncurkan Proyek Digital Anda?
            </div>

            <AnimatedTitle
              text="Solusi Digital & Automasi"
              className="text-sm font-code uppercase tracking-[0.35em] text-muted-foreground sm:text-base max-w-3xl"
            />

            <div className="mt-6 text-center">
              <AnimatedTitle
                as="div"
                text="Audy Al Vasyah"
                className="text-3xl font-headline font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent animate-gradient"
              />
            </div>

            <div className="mx-auto mt-8 max-w-2xl text-sm text-foreground/80 sm:text-base font-code">
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
              >
                <Link href="#projects" className="flex items-center gap-2">
                  <Briefcase className="h-5 w-5" />
                  Lihat Proyek Saya
                </Link>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
