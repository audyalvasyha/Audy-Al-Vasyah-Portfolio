
'use client';
import React from 'react';
import { cn } from '@/lib/utils';
import ExperienceCard from './experience-card';

const experienceData = [
  {
    role: 'Transport Planner',
    company: 'PT. Pekanbaru Distribusindo Raya (Wings Group)',
    period: '2024 - Sekarang',
    achievements: [
      'Mengelola dan mengoptimalkan 100+ rute pengiriman harian. Merancang dan mengimplementasikan sistem penjadwalan pengiriman berbasis Machine Learning & AI, menghasilkan optimasi rute dan peningkatan efisiensi sebesar **44.21%**.',
      'Memimpin proyek digitalisasi dan automasi alur kerja tim transportasi.',
      'Mengembangkan dasbor "Mitra Armada AI" untuk real-time monitoring status inspeksi armada.',
      'Merancang UI/UX dan logika izin terpisah untuk "Deliveryman" dan "Monitor Kordel" pada aplikasi internal.'
    ],
  },
  {
    role: 'Warehouse Checker',
    company: 'PT. Pekanbaru Distribusindo Raya (Wings Group)',
    period: '2021 - 2024',
    achievements: [
      'Mengembangkan dan memanfaatkan Automation Tools (Auto Clicker) untuk mempercepat proses Post Good Issue, mengurangi potensi human error sebesar **90%**, berdampak pada penghematan waktu verifikasi hingga 2 jam per hari.',
    ],
  },
  {
    role: 'Site Enginner',
    company: 'Dinas Perumahan dan Permukiman Kota Medan',
    period: '2019 - 2019',
    achievements: [
      'Mengawasi implementasi K3 di lapangan untuk menciptakan lingkungan kerja yang aman.',
      'Berperan sebagai penghubung teknis, mengelola koordinasi harian antara Site Engineer, subkontraktor, dan logistik untuk menjaga progres tetap sesuai jadwal.',
      'Proaktif menyelesaikan tantangan teknis di lapangan guna memastikan kesesuaian spesifikasi dan kualitas konstruksi.'
    ],
  },
];

const Experience = () => {
  return (
    <section id="experience" className="relative w-full py-12 md:py-24 lg:py-32 scroll-mt-20 overflow-hidden">
      <div className="container px-4 md:px-6 z-10 relative">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-headline font-bold tracking-tighter sm:text-5xl">
              Work Experience
            </h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              A timeline of my professional journey and key accomplishments in
              driving efficiency.
            </p>
          </div>
        </div>
        <div className="relative mt-12 max-w-5xl mx-auto">
          <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-0.5 bg-border -translate-x-1/2"></div>
          
          <div className="space-y-8">
            {experienceData.map((job, index) => (
              <div
                key={index}
                className={cn(
                  'relative flex items-start gap-4',
                  'md:gap-8',
                  index % 2 !== 0 && 'md:flex-row-reverse'
                )}
              >
                <div className="z-10 absolute left-6 md:left-1/2 top-1 w-4 h-4 bg-accent rounded-full -translate-x-1/2" />
                
                <ExperienceCard
                  job={job}
                  index={index}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
