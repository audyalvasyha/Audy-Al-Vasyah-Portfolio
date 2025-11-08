'use client';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import ProjectCard from './project-card';

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
          {projectDetails.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
