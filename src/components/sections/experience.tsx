'use client';

import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Truck, Bot, MonitorCog, Route } from 'lucide-react';
import Image from 'next/image';

const PILLARS = [
  {
    icon: <Truck className="h-7 w-7" />,
    title: 'Operasional & Transport',
    desc: 'Rencana rute, jadwal armada, dan koordinasi lapangan yang tidak cuma dipikirkan — tetap dipentaskan yang jalan.',
  },
  {
    icon: <Bot className="h-7 w-7" />,
    title: 'Automasi Proses',
    desc: 'Pekerjaan repetitif dipertemukan dengan skrip dan workflow: menekan human error secara terukur dan menghemat waktu harian.',
  },
  {
    icon: <MonitorCog className="h-7 w-7" />,
    title: 'Dashboard & Tools Internal',
    desc: 'Antarmuka kerja yang dibikin sesuai ekip operasional — jelas, cepat, dan digunakan setiap hari.',
  },
  {
    icon: <Route className="h-7 w-7" />,
    title: 'Integrasi Data & AI',
    desc: 'Menghubungkan data operasional dengan sistem dan AI supaya keputusan tidak diguncang asumsi.',
  },
];

const OperationTech = () => {
  return (
    <section
      id="experience"
      className="bp-grid relative w-full py-12 md:py-24 lg:py-32 scroll-mt-20 overflow-hidden"
    >
      <div className="container px-4 md:px-6 z-10 relative">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <span className="bp-stamp-ghost">01 — Spesialisasi</span>
          <div className="space-y-2">
            <h2 className="font-display font-bold uppercase tracking-tighter text-[clamp(1.75rem,6.5vw,3.5rem)]">
              Operation Tech
            </h2>
            <div className="bp-dimension mx-auto w-40" aria-hidden="true"></div>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Saya duduk di antara dua dunia: operasional yang ngos-ngosan dan
              tim teknis yang bisa menyelesaikannya. Bukan sekadar
              birokrasi — yang saya kerjakan adalah membangun sistem
              nyata yang mengurangi beban harian tim.
            </p>
          </div>
        </div>

        {/* Banner peta rute bergaya low-poly */}
        <div className="mt-12 max-w-5xl mx-auto border-2 border-foreground bg-card shadow-hardlg overflow-hidden">
          <Image
            src="/images/route-map.svg"
            alt="Rute distribusi dari gudang ke pelanggan dengan waypoint ML scheduling"
            width={1200}
            height={400}
            className="w-full h-auto"
          />
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 max-w-5xl mx-auto">
          {PILLARS.map((pillar) => (
            <Card
              key={pillar.title}
              className="flex flex-col h-full transition-all duration-200 hover:-translate-x-[2px] hover:-translate-y-[2px] hover:shadow-hardlg"
            >
              <CardContent className="flex flex-col gap-4 p-6">
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center border-2 border-foreground bg-secondary text-foreground">
                  {pillar.icon}
                </div>
                <div>
                  <h3 className="font-display text-lg uppercase tracking-tight">
                    {pillar.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {pillar.desc}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OperationTech;
