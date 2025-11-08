'use client';

import React, { useEffect, useRef } from 'react';
import { motion, useInView, useAnimation } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BrainCircuit, Bot, Database, Code, AppWindow, GitBranch, Cloud } from 'lucide-react';

const skillsData = [
  {
    category: 'Automasi & Logika Sistem',
    icon: <Bot className="h-8 w-8 text-primary" />,
    skills: [
      { name: 'Machine Learning & AI Implementation' },
      { name: 'Automation Tools Development' },
    ],
  },
  {
    category: 'Pengembangan Web',
    icon: <Code className="h-8 w-8 text-primary" />,
    skills: [{ name: 'Javascript, React, Next.js, Tailwind CSS' }],
  },
  {
    category: 'Google Cloud Platform',
    icon: <Cloud className="h-8 w-8 text-primary" />,
    skills: [
      { name: 'Gemini API' },
      { name: 'Firebase' },
    ],
  },
  {
    category: 'Sistem Enterprise',
    icon: <BrainCircuit className="h-8 w-8 text-primary" />,
    skills: [{ name: 'SAP ERP (SD & WM Modules)' }],
  },
  {
    category: 'Google Workspace',
    icon: <AppWindow className="h-8 w-8 text-primary" />,
    skills: [{ name: 'Sheets, Docs, Slide, Apps Script' }],
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 100 },
  visible: { opacity: 1, y: 0 },
};

const Skills = () => {
  return (
    <section id="skills" className="relative w-full py-12 md:py-24 lg:py-32 scroll-mt-20 overflow-hidden">
      <div className="relative container px-4 md:px-6 z-10">
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
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
          {skillsData.map((category, index) => (
            <SkillCard key={category.category} category={category} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

const SkillCard = ({ category, index }: { category: typeof skillsData[0], index: number }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.3 });
    const controls = useAnimation();
  
    useEffect(() => {
      if (isInView) {
        controls.start('visible');
      }
    }, [isInView, controls]);

    return (
        <motion.div
          ref={ref}
          variants={cardVariants}
          initial="hidden"
          animate={controls}
          transition={{ type: 'spring', stiffness: 100, damping: 10, delay: index * 0.1 }}
        >
            <Card className="flex flex-col h-full transform transition-transform duration-300 hover:scale-105 hover:shadow-lg hover:shadow-primary/10 bg-card/50 backdrop-blur-sm">
              <CardHeader className="flex flex-row items-center gap-4 space-y-0 pb-4">
                {category.icon}
                <CardTitle className="font-headline text-lg text-foreground">
                  {category.category}
                </CardTitle>
              </CardHeader>
              <CardContent className="flex-grow space-y-2">
                {category.skills.map((skill) => (
                  <div key={skill.name}>
                    <p className="text-sm font-medium text-muted-foreground">{skill.name}</p>
                  </div>
                ))}
              </CardContent>
            </Card>
        </motion.div>
    )
}

export default Skills;
