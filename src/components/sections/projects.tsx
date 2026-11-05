'use client';

import { Package } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { projectDetails } from '@/lib/projects-data';

const PLACEHOLDER_TEXT = 'Konten menyusul — slot ini disiapkan untuk proyek berikutnya.';

function ProjectCard({ project }: { project: (typeof projectDetails)[number] }) {
  const empty = !project.title;

  return (
    <Card className="group flex flex-col h-full overflow-hidden transition-all duration-200 hover:-translate-x-[2px] hover:-translate-y-[2px] hover:shadow-hardlg">
      {/* Area visual: kosong (dashed) sampai datanya diisi */}
      <div className="relative flex h-52 items-center justify-center overflow-hidden border-b-2 border-foreground bg-background">
        {empty ? (
          <div
            className="flex h-full w-full flex-col items-center justify-center gap-3 border-2 border-dashed border-foreground/30 m-3"
            aria-hidden="true"
          >
            <Package className="h-10 w-10 text-foreground/30" />
            <span className="font-code text-[0.6rem] uppercase tracking-[0.3em] text-muted-foreground">
              Gambar · menyusul
            </span>
          </div>
        ) : (
          <ProjectVisual projectId={project.id} />
        )}
      </div>

      <div className="flex flex-col p-6 flex-grow">
        <div className="flex flex-wrap gap-2">
          <span className="inline-block border-2 border-foreground bg-secondary px-3 py-1 font-code text-[0.65rem] uppercase tracking-[0.15em] text-secondary-foreground">
            {project.category ?? 'Kategori'}
          </span>
          <span className="inline-block border-2 border-foreground bg-card px-3 py-1 font-code text-[0.65rem] uppercase tracking-[0.15em] text-muted-foreground">
            {project.year ?? 'Tahun'}
          </span>
        </div>

        <h3 className="mt-4 font-display text-xl uppercase tracking-tight sm:text-2xl">
          {project.title ?? `Proyek ${project.id.replace('project-', '0').slice(-2)}`}
        </h3>

        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
          {project.description ?? PLACEHOLDER_TEXT}
        </p>

        {project.results.length > 0 && (
          <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
            {project.results.map((result, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="mt-[7px] h-1.5 w-1.5 flex-shrink-0 bg-accent" aria-hidden="true" />
                <span>{result}</span>
              </li>
            ))}
          </ul>
        )}

        {project.link && (
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 inline-flex items-center gap-2 self-start border-2 border-foreground bg-card px-4 py-2 font-code text-xs uppercase tracking-[0.2em] text-foreground shadow-hardsm transition-all hover:bg-secondary hover:shadow-hard active:translate-x-0 active:translate-y-0 active:shadow-none"
          >
            GitHub ↗
          </a>
        )}
      </div>
    </Card>
  );
}

/* Placeholder visual — nanti diganti Image saat data & gambar siap */
function ProjectVisual({ projectId }: { projectId: string }) {
  void projectId;
  return null;
}

const Projects = () => {
  return (
    <section
      id="projects"
      className="bp-grid relative w-full py-12 md:py-24 lg:py-32 scroll-mt-20 overflow-hidden"
    >
      <div className="container px-4 md:px-6 z-10 relative">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <span className="bp-stamp-ghost">02 — Register</span>
          <div className="space-y-2">
            <h2 className="font-display font-bold uppercase tracking-tighter text-[clamp(1.75rem,6.5vw,3.5rem)]">
              Proyek
            </h2>
            <div className="bp-dimension mx-auto w-40" aria-hidden="true"></div>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Dua slot terbuka — dipakai untuk pekerjaan &amp; proyek yang
              datanya nanti diisi satu per satu.
            </p>
          </div>
        </div>

        <div className="mt-12 grid gap-8 max-w-5xl mx-auto md:grid-cols-2">
          {projectDetails.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
