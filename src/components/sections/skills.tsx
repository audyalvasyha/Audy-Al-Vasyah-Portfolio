'use client';

import React, { useEffect, useRef } from 'react';
import { motion, useInView, useAnimation, type Variants } from 'framer-motion';
import { Card, CardContent, CardTitle } from '@/components/ui/card';
import { BrainCircuit, Bot, Code, Cloud, AppWindow } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const skillsData = [
  {
    category: 'Automasi & Logika Sistem',
    icon: <Bot className="h-8 w-8 text-accent" />,
    skills: [
      { name: 'Machine Learning & AI Implementation' },
      { name: 'Automation Tools Development' },
    ],
  },
  {
    category: 'Pengembangan UI & Dasbor Automasi/AI',
    icon: <Code className="h-8 w-8 text-accent" />,
    skills: [
      { name: 'Javascript' },
      { name: 'React' },
      { name: 'Next.js' },
      { name: 'Tailwind CSS' },
    ],
  },
  {
    category: 'Google Cloud Platform',
    icon: <Cloud className="h-8 w-8 text-accent" />,
    skills: [{ name: 'Gemini API' }, { name: 'Firebase' }],
  },
  {
    category: 'Sistem Enterprise',
    icon: <BrainCircuit className="h-8 w-8 text-accent" />,
    skills: [{ name: 'SAP ERP (SD & WM Modules)' }],
  },
  {
    category: 'Automasi Proses Bisnis Google Workspace',
    icon: <AppWindow className="h-8 w-8 text-accent" />,
    skills: [
      { name: 'Sheets' },
      { name: 'Docs' },
      { name: 'Slide' },
      { name: 'Apps Script' },
    ],
  },
];

const Skills = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start('visible');
    }
  }, [isInView, controls]);
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  return (
    <section
      id="skills"
      className="bp-grid relative w-full py-12 md:py-24 lg:py-32 scroll-mt-20 overflow-hidden"
    >
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-background via-transparent to-background" aria-hidden="true"></div>
      <div ref={ref} className="relative container px-4 md:px-6 z-10">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <span className="bp-stamp-ghost">SEC. 04 — Capabilities Matrix</span>
          <div className="space-y-2">
            <h2 className="text-3xl font-headline font-bold uppercase tracking-tighter sm:text-5xl">
              Hard Skills
            </h2>
            <div className="bp-dimension mx-auto w-40" aria-hidden="true"></div>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              A showcase of my technical capabilities and expertise.
            </p>
          </div>
        </div>
        <motion.div
          className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          animate={controls}
        >
          {skillsData.map((category) => (
            <SkillCard key={category.category} category={category} />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

const SkillCard = ({ category }: { category: (typeof skillsData)[0] }) => {
  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } as any },
  };

  return (
    <motion.div variants={cardVariants} className="h-full">
      <Card className="bp-corner-brackets flex flex-col h-full bg-card/30 border border-primary/25 hover:border-accent/40 transition-all duration-300 group/skill">
        <CardContent className="flex flex-col flex-grow p-6">
          <div className="flex items-start gap-4 mb-4">
            <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center border border-accent/40 bg-accent/10 text-accent">
              {category.icon}
            </div>
            <div className="flex-1">
              <CardTitle className="font-headline text-base text-foreground">
                {category.category}
              </CardTitle>
            </div>
          </div>
          <div className="flex-grow flex flex-wrap gap-2 content-start">
            {category.skills.map((skill) => (
              <Badge
                key={skill.name}
                variant="secondary"
                className="font-code bg-primary/5 text-foreground/80 border-primary/25"
              >
                {skill.name}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default Skills;
