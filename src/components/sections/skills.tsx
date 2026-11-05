'use client';

import React, { useEffect, useRef } from 'react';
import { motion, useInView, useAnimation, type Variants } from 'framer-motion';
import { Card, CardContent, CardTitle } from '@/components/ui/card';
import { Bot, Code, Cloud, Workflow, Warehouse } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const skillsData = [
  {
    category: 'Implementasi AI & ML',
    icon: <Bot className="h-7 w-7 text-accent" />,
    skills: [
      { name: 'Google Gemini API' },
      { name: 'Genkit (flow & prompt)' },
      { name: 'Computer vision — inspeksi ban' },
    ],
  },
  {
    category: 'Web & Dashboard',
    icon: <Code className="h-7 w-7 text-accent" />,
    skills: [
      { name: 'Next.js' },
      { name: 'React' },
      { name: 'TypeScript' },
      { name: 'Tailwind CSS' },
    ],
  },
  {
    category: 'Cloud & Database',
    icon: <Cloud className="h-7 w-7 text-accent" />,
    skills: [
      { name: 'Firebase (Firestore, RTDB)' },
      { name: 'Google Cloud Platform' },
    ],
  },
  {
    category: 'Automasi',
    icon: <Workflow className="h-7 w-7 text-accent" />,
    skills: [
      { name: 'n8n' },
      { name: 'Python — UI automation' },
      { name: 'Google Apps Script' },
    ],
  },
  {
    category: 'ERP & Operasional',
    icon: <Warehouse className="h-7 w-7 text-accent" />,
    skills: [
      { name: 'SAP ERP (SD & WM)' },
      { name: 'Perencanaan transportasi' },
      { name: 'Optimasi rute distribusi' },
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
      transition: { staggerChildren: 0.1 },
    },
  };

  return (
    <section
      id="skills"
      className="bp-grid relative w-full py-12 md:py-24 lg:py-32 scroll-mt-20 overflow-hidden"
    >
      <div ref={ref} className="relative container px-4 md:px-6 z-10">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <span className="bp-stamp-ghost">03 — SKILL UTAMA</span>
          <div className="space-y-2">
            <h2 className="font-display font-bold uppercase tracking-tighter text-[clamp(1.75rem,6.5vw,3.5rem)]">
              Kapabilitas
            </h2>
            <div className="bp-dimension mx-auto w-40" aria-hidden="true"></div>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Daftar ini bukan tagihan &mdash; semua dipakai nyata di pekerjaan
              atau proyek di atas.
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

const SkillCard = ({
  category,
}: {
  category: (typeof skillsData)[0];
}) => {
  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
    },
  };

  return (
    <motion.div variants={cardVariants} className="h-full">
      <Card className="flex flex-col h-full group/skill transition-all duration-200 hover:-translate-x-[2px] hover:-translate-y-[2px] hover:shadow-hardlg">
        <CardContent className="flex flex-col flex-grow p-6">
          <div className="flex items-start gap-4 mb-4">
            <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center border-2 border-foreground bg-secondary text-foreground">
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
                className="font-code"
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
