'use client';

import React, { useEffect, useRef } from 'react';
import { motion, useInView, useAnimation } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BrainCircuit, Bot, Code, Cloud, AppWindow } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const skillsData = [
  {
    category: 'Automasi & Logika Sistem',
    icon: <Bot className="h-8 w-8" />,
    skills: [
      { name: 'Machine Learning & AI Implementation' },
      { name: 'Automation Tools Development' },
    ],
  },
  {
    category: 'Pengembangan Web',
    icon: <Code className="h-8 w-8" />,
    skills: [{ name: 'Javascript, React, Next.js, Tailwind CSS' }],
  },
  {
    category: 'Google Cloud Platform',
    icon: <Cloud className="h-8 w-8" />,
    skills: [{ name: 'Gemini API' }, { name: 'Firebase' }],
  },
  {
    category: 'Sistem Enterprise',
    icon: <BrainCircuit className="h-8 w-8" />,
    skills: [{ name: 'SAP ERP (SD & WM Modules)' }],
  },
  {
    category: 'Google Workspace',
    icon: <AppWindow className="h-8 w-8" />,
    skills: [{ name: 'Sheets, Docs, Slide, Apps Script' }],
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
      className="relative w-full py-12 md:py-24 lg:py-32 scroll-mt-20 overflow-hidden"
    >
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
        <CardHeader className="flex flex-row items-center gap-4 space-y-0 pb-2">
          <div className="text-accent">{category.icon}</div>
          <CardTitle className="font-headline text-lg text-foreground">
            {category.category}
          </CardTitle>
        </CardHeader>
        <CardContent className="flex-grow pt-2">
          <div className="flex flex-wrap gap-2">
            {category.skills.map((skill) => (
              <Badge
                key={skill.name}
                variant="secondary"
                className="font-normal"
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
