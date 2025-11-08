'use client';

import React, { useEffect, useRef } from 'react';
import { motion, useInView, useAnimation } from 'framer-motion';
import Image from 'next/image';
import {
  Card,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { CheckCircle, ArrowRight } from 'lucide-react';
import { Button } from '../ui/button';

interface Project {
  id: string;
  title: string;
  description: string;
  features: string[];
  technologies: string[];
  imageHint: string;
  imageWidth: number;
  imageHeight: number;
  alt: string;
}

interface ProjectCardProps {
  project: Project;
  index: number;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, index }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const controls = useAnimation();

  const cardVariants = {
    hidden: { opacity: 0, y: 100 },
    visible: { opacity: 1, y: 0 },
  };

  useEffect(() => {
    if (isInView) {
      controls.start('visible');
    }
  }, [isInView, controls]);

  const projectImage = PlaceHolderImages.find((img) => img.id === project.id);

  return (
    <motion.div
        ref={ref}
        variants={cardVariants}
        initial="hidden"
        animate={controls}
        transition={{ duration: 0.5, delay: index * 0.1, ease: 'easeOut' }}
        className="flex"
    >
      <Dialog>
        <Card className="relative group rounded-lg shadow-lg flex flex-col bg-card/50 backdrop-blur-sm border-border overflow-hidden">
          {projectImage && (
            <div className="relative w-full h-64 flex-shrink-0 bg-black overflow-hidden">
              {/* Blurred Background Image */}
              <Image
                src={projectImage.imageUrl}
                alt=""
                fill
                className="object-cover scale-110 blur-2xl opacity-40 transition-opacity duration-500 group-hover:opacity-60"
              />
              {/* Foreground Image */}
              <Image
                src={projectImage.imageUrl}
                alt={project.alt || project.title}
                fill
                priority={false}
                className="object-contain w-full h-full transform transition-transform duration-500 group-hover:scale-105"
                data-ai-hint={project.imageHint}
              />
            </div>
          )}
          <div className="p-6 flex flex-col justify-between flex-grow">
            <div>
              <CardTitle className="font-headline text-xl text-foreground">
                {project.title}
              </CardTitle>
              <CardDescription className="mt-2 text-sm text-slate-400 line-clamp-3">
                {project.description}
              </CardDescription>

              {/* Technology Badges */}
              <div className="mt-4 flex flex-wrap gap-2">
                {project.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="inline-block px-3 py-1 text-xs font-semibold text-accent bg-accent/10 border border-accent/20 rounded-full"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
            <DialogTrigger asChild>
              <Button variant="outline" className="gap-2 mt-4 self-start bg-gray-800/50 backdrop-blur-sm border-slate-700">
                Lihat Detail
                <ArrowRight />
              </Button>
            </DialogTrigger>
          </div>
        </Card>

        <DialogContent className="max-w-4xl w-[90vw] p-0 max-h-[90vh] overflow-y-auto md:overflow-hidden bg-card/70 backdrop-blur-md rounded-lg">
          <div className="grid md:grid-cols-2 h-full">
            <div className="relative w-full h-64 md:h-full flex-shrink-0 bg-black/50 overflow-hidden md:rounded-l-lg">
                 {projectImage && (
                    <>
                        {/* Blurred Background for Dialog */}
                        <Image
                            src={projectImage.imageUrl}
                            alt=""
                            fill
                            className="object-cover scale-110 blur-xl opacity-50"
                        />
                        {/* Foreground Image for Dialog */}
                        <Image
                            src={projectImage.imageUrl}
                            alt={project.alt || project.title}
                            fill
                            className="object-contain"
                        />
                    </>
                )}
            </div>
            <div className="flex flex-col p-8 overflow-y-auto">
              <DialogHeader className="text-left">
                <DialogTitle className="text-3xl font-headline font-bold">
                  {project.title}
                </DialogTitle>
                <DialogDescription className="pt-4 text-base text-muted-foreground">
                  {project.description}
                </DialogDescription>
              </DialogHeader>

              {/* Technology Badges in Dialog */}
              <div className="mt-6 flex flex-wrap gap-2">
                {project.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="inline-block px-3 py-1 text-sm font-semibold text-accent bg-accent/10 border border-accent/20 rounded-full"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <div className="mt-8">
                <h4 className="font-semibold text-lg text-foreground mb-4">
                  Fitur Utama:
                </h4>
                <ul className="space-y-4 text-muted-foreground">
                  {project.features.map((feature, i) => (
                    <li key={i} className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-accent mr-3 mt-1 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </motion.div>
  );
};

export default ProjectCard;
