'use client';

import React, { useEffect, useRef } from 'react';
import { motion, useInView, useAnimation } from 'framer-motion';
import Image from 'next/image';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
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
    >
      <Dialog>
        <Card className="relative group overflow-hidden rounded-lg shadow-lg h-[500px] flex flex-col bg-card/50 backdrop-blur-sm border-border">
          {projectImage && (
            <div className="relative w-full h-64 flex-shrink-0">
              <Image
                src={projectImage.imageUrl}
                alt={project.alt || project.title}
                fill
                priority={false}
                className="object-cover w-full h-full transform transition-transform duration-500 group-hover:scale-105"
                data-ai-hint={project.imageHint}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
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
            </div>
            <DialogTrigger asChild>
              <Button variant="outline" className="gap-2 mt-4 self-start">
                Lihat Detail
                <ArrowRight />
              </Button>
            </DialogTrigger>
          </div>
        </Card>

        <DialogContent className="max-w-4xl w-[90vw] p-0 max-h-[90vh] flex md:flex-row overflow-hidden bg-card/70 backdrop-blur-md">
          <div className="relative w-full md:w-1/2 flex-shrink-0 h-64 md:h-full">
            {projectImage && (
              <Image
                src={projectImage.imageUrl}
                alt={project.alt || project.title}
                fill
                className="object-cover"
              />
            )}
          </div>
          <div className="flex flex-col flex-1 overflow-hidden">
            <div className="p-6 pb-0 flex-shrink-0">
              <DialogHeader>
                <DialogTitle className="text-2xl font-headline">
                  {project.title}
                </DialogTitle>
                <DialogDescription className="pt-2 text-base text-muted-foreground">
                  {project.description}
                </DialogDescription>
              </DialogHeader>
            </div>
            <div className="p-6 overflow-y-auto">
              <h4 className="font-semibold text-foreground mb-3">
                Fitur Utama:
              </h4>
              <ul className="space-y-3 text-muted-foreground">
                {project.features.map((feature, i) => (
                  <li key={i} className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-primary mr-3 mt-1 flex-shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </motion.div>
  );
};

export default ProjectCard;
