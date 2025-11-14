import React from 'react';
import Link from 'next/link';
import { projectDetails } from '@/lib/project-data';
import ProjectCard from '@/components/sections/project-card';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import InteractiveGridBackground from '@/components/ui/interactive-grid-background';

const AllProjectsPage = () => {
  return (
    <main className="relative isolate py-24 sm:py-32 scroll-mt-20 overflow-hidden">
      <InteractiveGridBackground />

      <div className="container relative z-10 px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
            <div className="space-y-2">
                <h1 className="text-3xl font-headline font-bold tracking-tighter sm:text-5xl">
                    Arsip Proyek
                </h1>
                <p className="max-w-[900px] text-slate-300 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                    Berikut adalah koleksi lengkap proyek-proyek yang pernah saya kerjakan.
                </p>
            </div>
             <Button asChild variant="ghost" className="self-center">
                <Link href="/" className="flex items-center gap-2">
                    <ArrowLeft className="h-4 w-4" />
                    Kembali ke Halaman Utama
                </Link>
            </Button>
        </div>

        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          {projectDetails.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>
    </main>
  );
};

export default AllProjectsPage;
