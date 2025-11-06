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
    alt: 'Tampilan antarmuka aplikasi inspeksi ban berbasis AI yang menampilkan dasbor analitik.',
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
    alt: 'Halaman utama platform e-commerce SaldoIn untuk top up game dan voucher.',
  },
];

const Projects = () => {
  return (
    <section
      id="projects"
      className="relative w-full py-12 md:py-24 lg:py-32 scroll-mt-20 overflow-hidden"
    >
      {/* Darkening Gradient Overlay */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 w-full h-full bg-[radial-gradient(circle_at_center,hsl(var(--background)/0.4)_0%,hsl(var(--background))_80%)]"></div>
      </div>
      
      {/* Overlay Efek Vintage */}
      <div className="absolute inset-0 w-full h-full bg-transparent pointer-events-none z-0">
        <div className="absolute inset-0 w-full h-full bg-[repeating-linear-gradient(to_bottom,transparent_0,hsl(var(--background)/0.02)_1px,transparent_2px)]"></div>
        <div
          className="absolute inset-0 w-full h-full"
          style={{
            backgroundImage:
              'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'hsl(222, 47%, 11%)\' fill-opacity=\'0.03\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
            opacity: 0.3,
          }}
        />
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
          {projectDetails.map((project) => {
            const projectImage = PlaceHolderImages.find(
              (img) => img.id === project.id
            );
            return (
              <Dialog key={project.id}>
                <Card className="relative group overflow-hidden rounded-lg shadow-lg border-0 h-[500px] flex flex-col">
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
                  <div className="p-6 flex flex-col justify-between flex-grow bg-card">
                    <div>
                      <CardTitle className="font-headline text-xl text-foreground">
                        {project.title}
                      </CardTitle>
                      <CardDescription className="mt-2 text-sm text-muted-foreground line-clamp-3">
                        {project.description}
                      </CardDescription>
                    </div>
                    <DialogTrigger asChild>
                      <Button variant="secondary" className="gap-2 mt-4 self-start">
                        Lihat Detail
                        <ArrowRight />
                      </Button>
                    </DialogTrigger>
                  </div>
                </Card>

                <DialogContent className="max-w-4xl w-[90vw] p-0 max-h-[90vh] flex flex-col md:flex-row overflow-hidden">
                  {projectImage && (
                    <div className="relative w-full h-64 md:h-full md:w-1/2 flex-shrink-0">
                      <Image
                        src={projectImage.imageUrl}
                        alt={project.alt || project.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}
                  <div className="flex flex-col flex-1 overflow-y-auto">
                      <DialogHeader className="p-6 pb-0 flex-shrink-0">
                        <DialogTitle className="text-2xl font-headline">
                          {project.title}
                        </DialogTitle>
                        <DialogDescription className="pt-2 text-base text-muted-foreground">
                          {project.description}
                        </DialogDescription>
                      </DialogHeader>
                      <div className="p-6">
                        <h4 className="font-semibold text-foreground mb-3">
                          Fitur Utama:
                        </h4>
                        <ul className="space-y-3 text-muted-foreground">
                          {project.features.map((feature, i) => (
                            <li key={i} className="flex items-start">
                              <CheckCircle className="h-5 w-5 text-accent mr-3 mt-1 flex-shrink-0" />
                              <span>{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                  </div>
                </DialogContent>
              </Dialog>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Projects;
