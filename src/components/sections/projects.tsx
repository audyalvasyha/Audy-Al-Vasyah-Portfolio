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
import Autoplay from "embla-carousel-autoplay"

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
    imageWidth: 1280,
    imageHeight: 832,
  },
  {
    id: 'saldoin-topup',
    title: 'SaldoIn - Top Up Game & Voucher E-commerce',
    description:
      'Platform e-commerce untuk top-up game dan voucher yang mengutamakan kecepatan transaksi, keamanan data, dan pengalaman pengguna yang optimal dengan arsitektur modern.',
    features: [
      'Implementasi sistem pembayaran yang terintegrasi untuk berbagai metode (misalnya QRIS, Virtual Account).',
      'Manajemen inventaris digital (voucher dan produk game) secara real-time.',
      'Dirancang dengan keamanan data pengguna dan transaksi yang solid, memanfaatkan keahlian di Google Cloud Platform (GCP) dan Firebase.',
      'Antarmuka pengguna yang responsif, modern, dan sederhana untuk navigasi produk yang cepat.',
    ],
    imageHint: 'toko top up game online',
    imageWidth: 1080,
    imageHeight: 1080,
  },
];

const Projects = () => {
  return (
    <section id="projects" className="w-full py-12 md:py-24 lg:py-32 scroll-mt-20">
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
          <Carousel
            plugins={[
              Autoplay({
                delay: 4000,
                stopOnInteraction: true,
              }),
            ]}
          >
            <CarouselContent>
              {projectDetails.map((project, index) => {
                const projectImage = PlaceHolderImages.find(
                  (img) => img.id === project.id
                );
                return (
                  <CarouselItem key={index}>
                    <Card className="relative group overflow-hidden rounded-lg shadow-lg border-0 h-[550px]">
                      {projectImage && (
                        <Image
                          src={projectImage.imageUrl}
                          alt={project.title || 'Proyek Unggulan'}
                          fill
                          priority={false}
                          className="object-cover w-full h-full transform transition-transform duration-500 group-hover:scale-105"
                          data-ai-hint={project.imageHint}
                        />
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-black/10 transition-all duration-300 group-hover:from-black/95"></div>
                      <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-8">
                        <CardHeader className="p-0">
                          <CardTitle className="font-headline text-2xl md:text-3xl text-white">
                            {project.title}
                          </CardTitle>
                          <CardDescription className="pt-2 text-gray-300">
                            {project.description}
                          </CardDescription>
                        </CardHeader>
                        <CardContent className="p-0 mt-4">
                          <ul className="space-y-3 text-gray-200">
                            {project.features.map((feature, i) => (
                              <li key={i} className="flex items-start">
                                <CheckCircle className="h-5 w-5 text-accent mr-3 mt-1 flex-shrink-0" />
                                <span>{feature}</span>
                              </li>
                            ))}
                          </ul>
                        </CardContent>
                      </div>
                    </Card>
                  </CarouselItem>
                );
              })}
            </CarouselContent>
            <CarouselPrevious className="hidden md:flex" />
            <CarouselNext className="hidden md:flex" />
          </Carousel>
        </div>
      </div>
    </section>
  );
};

export default Projects;
