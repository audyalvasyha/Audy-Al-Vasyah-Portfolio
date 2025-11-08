import React from 'react';
import Link from 'next/link';
import { projectDetails } from '@/lib/project-data';
import ProjectCard from '@/components/sections/project-card';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

const AllProjectsPage = () => {
  return (
    <main className="relative isolate py-24 sm:py-32 scroll-mt-20 overflow-hidden">
      {/* Consistent Background */}
      <div className="absolute inset-0 -z-10 h-full w-full bg-transparent">
        <div className="absolute h-full w-full bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:50px_50px]"></div>
        <div className="absolute inset-0 h-full w-full bg-[radial-gradient(circle_500px_at_50%_200px,hsl(var(--background)/0.1),hsl(var(--background)))]"></div>
      </div>

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
                <Link href="/#home" className="flex items-center gap-2">
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
