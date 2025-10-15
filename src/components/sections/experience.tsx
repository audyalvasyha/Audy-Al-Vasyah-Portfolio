import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

const experienceData = [
  {
    role: 'Transport Planner',
    company: 'PT. Pekanbaru Distribusindo Raya (Wings Group)',
    period: '2024 - Sekarang',
    achievements: [
      'Merancang dan mengimplementasikan sistem penjadwalan pengiriman berbasis Machine Learning & AI, menghasilkan optimasi rute dan efisiensi waktu sebesar 44.21%',
      'Memimpin proyek digitalisasi dan automasi alur kerja tim transportasi.',
    ],
  },
  {
    role: 'Warehouse Checker',
    company: 'PT. Pekanbaru Distribusindo Raya (Wings Group)',
    period: '2021 - 2023',
    achievements: [
      'Mengembangkan dan memanfaatkan Automation Tools (Auto Clicker) untuk mempercepat proses Post Good Issue, mengurangi potensi human error sebesar 90%',
    ],
  },
];

const Experience = () => {
  const highlightMetric = (text: string) => {
    const regex = /(\d+(?:\.\d+)?%)/g;
    return text.split(regex).map((part, index) => {
      if (regex.test(part)) {
        return (
          <span key={index} className="text-primary font-bold">
            {part}
          </span>
        );
      }
      return part;
    });
  };

  return (
    <section id="experience" className="w-full py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-headline font-bold tracking-tighter sm:text-5xl">
              Work Experience
            </h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              A timeline of my professional journey and key accomplishments in
              driving efficiency.
            </p>
          </div>
        </div>
        <div className="relative mt-12 max-w-5xl mx-auto">
          <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-0.5 bg-border -translate-x-1/2"></div>
          
          <div className="space-y-8">
            {experienceData.map((job, index) => (
              <div
                key={index}
                className={cn(
                  'relative flex items-start gap-4',
                  'md:gap-8',
                  index % 2 !== 0 && 'md:flex-row-reverse'
                )}
              >
                <div className="z-10 absolute left-6 md:left-1/2 top-1 w-4 h-4 bg-primary rounded-full -translate-x-1/2" />
                
                <div
                  className={cn(
                    'w-full pl-12', 
                    'md:w-1/2 md:px-8'
                  )}
                >
                  <Card>
                    <CardHeader>
                      <div
                        className={cn(
                          'flex flex-col md:flex-row justify-between md:items-start gap-2'
                        )}
                      >
                        <div> 
                          <CardTitle className="font-headline text-xl">
                            {job.role}
                          </CardTitle>
                          <p className="text-sm text-muted-foreground">
                            {job.company}
                          </p>
                        </div>
                        <Badge variant="destructive" className="self-start md:self-auto">
                          {job.period}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <ul
                        className={cn(
                          'list-disc pl-5 space-y-2 text-sm'
                        )}
                      >
                        {job.achievements.map((ach, i) => (
                          <li key={i} className={cn(index % 2 !== 0 && 'md:pr-5')}>{highlightMetric(ach)}</li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
