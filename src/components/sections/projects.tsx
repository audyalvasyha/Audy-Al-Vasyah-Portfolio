'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { aiBasedTireInspectionAppDisplay } from '@/ai/flows/ai-based-tire-inspection-app-display';
import type { AiBasedTireInspectionAppDisplayOutput } from '@/ai/flows/ai-based-tire-inspection-app-display';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { CheckCircle, Loader2 } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

const Projects = () => {
  const [projectDetails, setProjectDetails] = useState<AiBasedTireInspectionAppDisplayOutput | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProjectDetails = async () => {
      try {
        setIsLoading(true);
        const details = await aiBasedTireInspectionAppDisplay({
          projectName: 'Mitra Armada AI - AI-Based Tire Inspection App',
        });
        setProjectDetails(details);
      } catch (error) {
        console.error('Failed to fetch project details:', error);
        setError('Failed to load project details. Using fallback data.');
        // Fallback data
        setProjectDetails({
          title: 'Mitra Armada AI - (AI-Based Tire Inspection App)',
          description:
            'Simplifies tire inspections using AI technology to enhance fleet safety and efficiency, featuring a supervisor dashboard for real-time monitoring.',
          features: [
            'Streamline tire inspection with AI for enhanced safety & fleet efficiency.',
            'Supervisor dashboard for real-time inspection status monitoring.',
          ],
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchProjectDetails();
  }, []);

  const projectImage = PlaceHolderImages.find(
    (img) => img.id === 'tire-inspection'
  );

  return (
    <section id="projects" className="w-full py-12 md:py-24 lg:py-32 bg-secondary">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-headline font-bold tracking-tighter sm:text-5xl">
              Featured Project
            </h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              An example of how I leverage technology to solve real-world problems.
            </p>
          </div>
        </div>
        <div className="mt-12 max-w-4xl mx-auto">
          <Card className="transform transition-transform duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-primary/20">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="p-6">
                {isLoading ? (
                   <div className="space-y-4">
                     <Skeleton className="h-8 w-3/4" />
                     <Skeleton className="h-4 w-full" />
                     <Skeleton className="h-4 w-5/6" />
                     <div className="pt-6 space-y-4">
                        <div className="flex items-start">
                            <Skeleton className="h-5 w-5 rounded-full mr-3 mt-1" />
                            <Skeleton className="h-5 w-full" />
                        </div>
                        <div className="flex items-start">
                            <Skeleton className="h-5 w-5 rounded-full mr-3 mt-1" />
                            <Skeleton className="h-5 w-full" />
                        </div>
                     </div>
                   </div>
                ) : (
                  <>
                    <CardHeader>
                      <CardTitle className="font-headline text-2xl text-primary">
                        {projectDetails?.title}
                      </CardTitle>
                      <CardDescription className="pt-2">
                        {projectDetails?.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-4">
                        {projectDetails?.features.map((feature, index) => (
                          <li key={index} className="flex items-start">
                            <CheckCircle className="h-5 w-5 text-accent mr-3 mt-1 flex-shrink-0" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </>
                )}
                 {error && <p className="text-destructive px-6 pb-6">{error}</p>}
              </div>
              {projectImage && (
                <div className="relative h-64 md:h-full w-full">
                  <Image
                    src={projectImage.imageUrl}
                    alt={projectDetails?.title || 'Featured Project'}
                    fill
                    className="object-cover rounded-r-lg"
                    data-ai-hint={projectImage.imageHint}
                  />
                </div>
              )}
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Projects;
