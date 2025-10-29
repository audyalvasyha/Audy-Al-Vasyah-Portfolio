import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const skillsData = [
  {
    category: 'Automasi & Logika Sistem',
    skills: [
      { name: 'Machine Learning & AI Implementation', level: 90 },
      { name: 'Automation Tools Development', level: 95 },
    ],
  },
  {
    category: 'Google Cloud Platform',
    skills: [
      { name: 'Gemini API', level: 85 },
      { name: 'Firebase', level: 80 },
    ],
  },
  {
    category: 'Sistem Enterprise',
    skills: [{ name: 'SAP ERP (SD & WM Modules)', level: 75 }],
  },
  {
    category: 'Pengembangan Web',
    skills: [{ name: 'Javascript, React, Next.js, Tailwind CSS', level: 90 }],
  },
  {
    category: 'Google Workspace',
    skills: [{ name: 'Sheets, Docs, Slide, Apps Script', level: 90 }],
  },
];

const SkillBar = ({ level }: { level: number }) => (
  <div className="w-full bg-muted rounded-full h-2.5">
    <div
      className="bg-primary h-2.5 rounded-full"
      style={{ width: `${level}%` }}
    ></div>
  </div>
);

const Skills = () => {
  return (
    <section id="skills" className="w-full py-12 md:py-24 lg:py-32 scroll-mt-20">
      
      <div className="container px-4 md:px-6">
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
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-5 max-w-6xl mx-auto">
          {skillsData.map((category) => (
            <Card key={category.category}>
              <CardHeader>
                <CardTitle className="font-headline text-xl text-primary">
                  {category.category}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {category.skills.map((skill) => (
                  <div key={skill.name}>
                    <p className="mb-2 text-sm font-medium">{skill.name}</p>
                    <SkillBar level={skill.level} />
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
