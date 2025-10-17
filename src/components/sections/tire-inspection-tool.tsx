'use client';
import { useState, useEffect } from 'react';
import { aiBasedTireInspectionAppDisplay } from '@/ai/flows/ai-based-tire-inspection-app-display';
import type { AiBasedTireInspectionAppDisplayOutput } from '@/ai/flows/ai-based-tire-inspection-app-display';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, Loader2 } from 'lucide-react';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';

const TireInspectionTool = () => {
  const [details, setDetails] = useState<AiBasedTireInspectionAppDisplayOutput | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDetails = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await aiBasedTireInspectionAppDisplay({
          projectName: 'Mitra Armada - AI-Powered Tire Inspection',
        });
        setDetails(response);
      } catch (e) {
        setError('Failed to load project details. Please try again later.');
        console.error(e);
      } finally {
        setIsLoading(false);
      }
    };
    fetchDetails();
  }, []);
  
  const projectImage = PlaceHolderImages.find(img => img.id === 'ai-tire-inspection');

  return (
    <div className="mt-12 max-w-4xl mx-auto">
        {isLoading && (
            <div className="flex justify-center items-center h-48">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
        )}
        {error && <p className="text-destructive text-center">{error}</p>}
        {details && (
            <Card className="transform transition-transform duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-primary/20">
                <div className="grid md:grid-cols-2 gap-6">
                <div className="p-6">
                    <CardHeader>
                    <CardTitle className="font-headline text-2xl text-primary">
                        {details.title}
                    </CardTitle>
                    <CardDescription className="pt-2">
                        {details.description}
                    </CardDescription>
                    </CardHeader>
                    <CardContent>
                    <ul className="space-y-4">
                        {details.features.map((feature, index) => (
                        <li key={index} className="flex items-start">
                            <CheckCircle className="h-5 w-5 text-accent mr-3 mt-1 flex-shrink-0" />
                            <span>{feature}</span>
                        </li>
                        ))}
                    </ul>
                    </CardContent>
                </div>
                {projectImage && (
                    <div className="relative h-64 md:h-full w-full">
                    <Image
                        src={projectImage.imageUrl}
                        alt={details.title || 'Proyek Unggulan'}
                        fill
                        className="object-cover rounded-r-lg"
                        data-ai-hint={projectImage.imageHint}
                    />
                    </div>
                )}
                </div>
            </Card>
        )}
    </div>
  );
};

export default TireInspectionTool;
