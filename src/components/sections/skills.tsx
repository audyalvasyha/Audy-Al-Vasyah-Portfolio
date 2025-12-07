'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motion, useInView, useAnimation } from 'framer-motion';
import { Card, CardContent, CardTitle } from '@/components/ui/card';
import { BrainCircuit, Bot, Code, Cloud, AppWindow } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import Meteor from '../ui/meteor';

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

  const [meteors, setMeteors] = useState<React.CSSProperties[]>([]);

  useEffect(() => {
    if (isInView) {
      controls.start('visible');
    }
  }, [isInView, controls]);

  useEffect(() => {
    const meteorCount = 5;
    const newMeteors = Array.from({ length: meteorCount }).map(() => ({
        top: `${Math.random() * 20 - 10}%`,
        left: `auto`,
        right: `${Math.random() * 80}%`,
        animationDelay: `${Math.random() * 10}s`,
        animationDuration: `${Math.random() * 4 + 3}s`,
    }));
    setMeteors(newMeteors);
  }, []);
  
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
      className="relative w-full py-12 md:py-24 lg:py-32 scroll-mt-20 overflow-hidden"
    >
      {meteors.map((style, i) => (
        <Meteor key={i} style={style} />
      ))}
      <div ref={ref} className="relative container px-4 md:px-6 z-10">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-headline font-bold tracking-tighter sm:text-5xl">
              Hard Skills
            </h2>
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
  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
  };

  return (
    <motion.div variants={cardVariants} className="h-full">
      <Card className="flex flex-col h-full bg-card/50 backdrop-blur-sm border-border">
        <CardContent className="flex flex-col flex-grow p-6">
          <div className="flex items-start gap-4 mb-4">
            <div className="text-accent mt-1 flex-shrink-0">{category.icon}</div>
            <div className="flex-1">
              <CardTitle className="font-headline text-lg text-foreground">
                {category.category}
              </CardTitle>
            </div>
          </div>
          <div className="flex-grow flex flex-wrap gap-2 content-start">
            {category.skills.map((skill) => (
              <Badge
                key={skill.name}
                variant="secondary"
                className="font-normal bg-accent/10 text-accent border border-accent/20 backdrop-blur-sm"
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
