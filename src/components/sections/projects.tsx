'use client';

import { projectDetails } from '@/lib/project-data';
import ProjectCard from './project-card';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import Meteor from '../ui/meteor';

const Projects = () => {
  const featuredProjects = projectDetails.slice(0, 2);
  const meteorCount = 5;

  return (
    <section
      id="projects"
      className="relative w-full py-12 md:py-24 lg:py-32 scroll-mt-20 overflow-hidden"
    >
      {Array.from({ length: meteorCount }).map((_, i) => (
        <Meteor
          key={i}
          style={{
            top: `${Math.random() * 20 - 10}%`,
            left: `auto`,
            right: `${Math.random() * 80}%`,
            animationDelay: `${Math.random() * 10}s`,
            animationDuration: `${Math.random() * 4 + 3}s`,
          }}
        />
      ))}
      {/* Darkening Gradient Overlay */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 w-full h-full bg-[radial-gradient(circle_at_center,hsl(var(--background)/0.4)_0%,hsl(var(--background))_80%)]"></div>
      </div>
      
      <div className="relative container px-4 md:px-6 z-10">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-headline font-bold tracking-tighter sm:text-5xl">
              Proyek Unggulan
            </h2>
            <p className="max-w-[900px] text-slate-300 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Contoh bagaimana saya memanfaatkan teknologi untuk memecahkan
              masalah dunia nyata.
            </p>
          </div>
        </div>
        <div className="mt-12 max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          {featuredProjects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
        <div className="mt-12 text-center">
            <Button asChild size="lg">
                <Link href="/projects" className="flex items-center gap-2">
                    Lihat Semua Proyek <ArrowRight className="h-5 w-5" />
                </Link>
            </Button>
        </div>
      </div>
    </section>
  );
};

export default Projects;
