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
      { name: 'AI data chat — text-to-SQL' },
    ],
  },
  {
    category: 'Web & Dashboard',
    icon: <Code className="h-7 w-7 text-accent" />,
    skills: [
      { name: 'Next.js (App Router)' },
      { name: 'React' },
      { name: 'TypeScript' },
      { name: 'Tailwind CSS' },
      { name: 'shadcn/ui + Radix' },
      { name: 'Visualisasi data (Recharts)' },
    ],
  },
  {
    category: 'Cloud & Database',
    icon: <Cloud className="h-7 w-7 text-accent" />,
    skills: [
      { name: 'Supabase (Postgres, Auth, RLS)' },
      { name: 'MongoDB' },
      { name: 'Firebase (Firestore, RTDB)' },
      { name: 'Google Cloud Platform' },
      { name: 'Vercel' },
    ],
  },
  {
    category: 'Automasi & Integrasi',
    icon: <Workflow className="h-7 w-7 text-accent" />,
    skills: [
      { name: 'n8n' },
      { name: 'Python — UI automation' },
      { name: 'Google Apps Script' },
      { name: 'WhatsApp API (Fonnte)' },
      { name: 'QRIS & transfer bank' },
    ],
  },
  {
    category: 'ERP & Operasional',
    icon: <Warehouse className="h-7 w-7 text-accent" />,
    skills: [
      { name: 'SAP ERP (SD & WM)' },
      { name: 'Perencanaan transportasi' },
      { name: 'Optimasi rute distribusi' },
      { name: 'Manajemen armada & servis' },
      { name: 'Analitik biaya & KPI' },
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
      className="bp-grid relative w-full py-16 md:py-24 lg:py-32 scroll-mt-20 overflow-hidden"
    >
      <div ref={ref} className="relative container px-4 sm:px-6 z-10">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <span className="bp-stamp-ghost">03 — SKILL UTAMA</span>
          <div className="space-y-2">
            <h2 className="font-display font-bold uppercase tracking-tighter text-[clamp(1.75rem,6.5vw,3.5rem)]">
              Kapabilitas
            </h2>
            <div className="bp-dimension mx-auto w-40" aria-hidden="true"></div>
            <p className="max-w-[900px] text-base leading-relaxed text-muted-foreground sm:text-lg md:text-xl">
              Kombinasi kemampuan teknis dan pemahaman operasional &mdash;
              dipakai langsung untuk membangun produk, mengelola data, dan
              memperbaiki proses kerja.
            </p>
          </div>
        </div>
        <motion.div
          className="mt-10 grid gap-5 sm:grid-cols-2 sm:gap-6 md:mt-12 lg:grid-cols-3 max-w-6xl mx-auto"
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
        <CardContent className="flex flex-col flex-grow p-5 sm:p-6">
          <div className="flex items-start gap-4 mb-4">
            <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center border-2 border-foreground bg-secondary text-foreground">
              {category.icon}
            </div>
            <div className="flex-1">
              <CardTitle className="font-headline text-sm text-foreground sm:text-base">
                {category.category}
              </CardTitle>
            </div>
          </div>
          <div className="flex-grow flex flex-wrap gap-2 content-start">
            {category.skills.map((skill) => (
              <Badge
                key={skill.name}
                variant="secondary"
                className="max-w-full whitespace-normal break-words py-1 font-code leading-snug"
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
