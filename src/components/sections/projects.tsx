'use client';

import Image from 'next/image';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { CheckCircle } from 'lucide-react';

// Static project details to avoid slow AI calls on page load
const projectDetails = [
  {
    id: 'ai-tire-inspection',
    title: 'Aplikasi Inspeksi Ban Berbasis AI',
    description:
      'Menyederhanakan inspeksi ban menggunakan teknologi AI untuk meningkatkan keamanan dan efisiensi armada, menampilkan dasbor supervisor untuk pemantauan waktu nyata.',
    features: [
      'Perampingan inspeksi ban dengan AI untuk meningkatkan keamanan & efisiensi armada.',
      'Dasbor supervisor untuk pemantauan status inspeksi waktu nyata.',
    ],
    imageHint: 'Gambar aplikasi inspeksi ban berbasis AI',
  },
  {
    id: 'ml-delivery-scheduling',
    title: 'Sistem Penjadwalan Pengiriman Bertenaga ML',
    description:
      'Mengoptimalkan rute pengiriman dan jadwal menggunakan machine learning untuk meningkatkan efisiensi dan mengurangi biaya operasional.',
    features: [
      'Penjadwalan dan perutean pengiriman otomatis.',
      'Dasbor untuk memantau status pengiriman dan kinerja armada.',
      'Prediksi waktu pengiriman yang akurat.',
    ],
    imageHint: 'Gambar sistem penjadwalan pengiriman bertenaga ML',
  },
];

const Projects = () => {
  return (
    <section id="projects" className="w-full py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-headline font-bold tracking-tighter sm:text-5xl">
              Proyek Unggulan
            </h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Contoh bagaimana saya memanfaatkan teknologi untuk memecahkan masalah dunia nyata.
            </p>
          </div>
        </div>
        <div className="mt-12 max-w-4xl mx-auto">
          <Carousel>
            <CarouselContent>
              {projectDetails.map((project, index) => {
                const projectImage = PlaceHolderImages.find(
                  (img) => img.id === project.id
                );
                return (
                  <CarouselItem key={index}>
                    <Card className="transform transition-transform duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-primary/20">
                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="p-6">
                          <CardHeader>
                            <CardTitle className="font-headline text-2xl text-primary">
                              {project.title}
                            </CardTitle>
                            <CardDescription className="pt-2">
                              {project.description}
                            </CardDescription>
                          </CardHeader>
                          <CardContent>
                            <ul className="space-y-4">
                              {project.features.map((feature, index) => (
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
                              alt={project.title || 'Proyek Unggulan'}
                              fill
                              className="object-cover rounded-r-lg"
                              data-ai-hint={project.imageHint}
                            />
                          </div>
                        )}
                      </div>
                    </Card>
                  </CarouselItem>
                );
              })}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      </div>
    </section>
  );
};

export default Projects;
