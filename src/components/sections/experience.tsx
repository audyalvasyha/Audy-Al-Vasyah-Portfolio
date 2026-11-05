'use client';
import React from 'react';
import { cn } from '@/lib/utils';
import ExperienceCard from './experience-card';
import { experienceData } from '@/lib/experience-data';

const Experience = () => {
  return (
    <section id="experience" className="bp-grid relative w-full py-12 md:py-24 lg:py-32 scroll-mt-20 overflow-hidden">
      <div className="container px-4 md:px-6 z-10 relative">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <span className="bp-stamp-ghost">02 — JEJAK KERJA</span>
          <div className="space-y-2">
            <h2 className="text-3xl font-headline font-bold uppercase tracking-tighter sm:text-5xl">
              Pengalaman
            </h2>
            <div className="bp-dimension mx-auto w-40" aria-hidden="true"></div>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Bagaimana saya bekerja: lihat prosesnya, ukur waktunya, lalu
              bangun sistem supaya tidak diulang manual lagi.
            </p>
          </div>
        </div>
        <div className="relative mt-20 max-w-5xl mx-auto">
          <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-accent/40 to-transparent -translate-x-1/2"></div>

          <div className="space-y-12">
            {experienceData.map((job, index) => (
              <div
                key={job.role}
                className={cn(
                  'relative flex items-start gap-4',
                  'md:gap-8',
                  index % 2 !== 0 && 'md:flex-row-reverse'
                )}
              >
                <div className="z-10 absolute left-6 md:left-1/2 top-1.5 w-3 h-3 rotate-45 bg-accent -translate-x-1/2 ring-4 ring-accent/20 ring-offset-2 ring-offset-background" />

                <ExperienceCard job={job} index={index} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
