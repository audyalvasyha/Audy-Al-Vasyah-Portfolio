
'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BrainCircuit, Bot, Database, Code, AppWindow, GitBranch, Cloud } from 'lucide-react';

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
    category: 'Pengembangan Web',
    icon: <Code className="h-8 w-8 text-accent" />,
    skills: [{ name: 'Javascript, React, Next.js, Tailwind CSS' }],
  },
  {
    category: 'Google Cloud Platform',
    icon: <Cloud className="h-8 w-8 text-accent" />,
    skills: [
      { name: 'Gemini API' },
      { name: 'Firebase' },
    ],
  },
  {
    category: 'Sistem Enterprise',
    icon: <BrainCircuit className="h-8 w-8 text-accent" />,
    skills: [{ name: 'SAP ERP (SD & WM Modules)' }],
  },
  {
    category: 'Google Workspace',
    icon: <AppWindow className="h-8 w-8 text-accent" />,
    skills: [{ name: 'Sheets, Docs, Slide, Apps Script' }],
  },
];


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
          {skillsData.map((category) => (
            <Card key={category.category} className="flex flex-col transform transition-transform duration-300 hover:scale-105 hover:shadow-lg hover:shadow-primary/10">
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
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
