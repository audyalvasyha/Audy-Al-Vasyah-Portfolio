
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
    <section id="skills" className="relative w-full py-12 md:py-24 lg:py-32 scroll-mt-20 overflow-hidden">
      {/* Overlay Efek Vintage */}
      <div className="absolute inset-0 w-full h-full bg-transparent pointer-events-none z-0">
        <div className="absolute inset-0 w-full h-full bg-[repeating-linear-gradient(to_bottom,transparent_0,hsl(var(--background)/0.02)_1px,transparent_2px)]"></div>
        <div
          className="absolute inset-0 w-full h-full"
          style={{
            backgroundImage:
              'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'hsl(222, 47%, 11%)\' fill-opacity=\'0.03\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
            opacity: 0.3,
          }}
        />
      </div>
      
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
