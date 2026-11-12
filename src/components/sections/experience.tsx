'use client';

import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Truck, ShoppingCart, MonitorCog, Bot } from 'lucide-react';

const PILLARS = [
  {
    icon: <Truck className="h-7 w-7" />,
    title: 'Operasional & Transport',
    desc: 'Midaa TMS: armada, siklus servis, SKR, dan outbound dalam satu dashboard — import CSV SKR berjalan atomik lewat RPC.',
  },
  {
    icon: <ShoppingCart className="h-7 w-7" />,
    title: 'Commerce & Pembayaran',
    desc: 'GASTROS: katalog lintas publisher, checkout QRIS & transfer bank, cek status order, dan notifikasi WhatsApp.',
  },
  {
    icon: <MonitorCog className="h-7 w-7" />,
    title: 'Automasi & Dashboard',
    desc: 'Automasi PGI (−90% human error), alert error checkout, monitoring servis berbasis KPI, dan analisa ban per unit.',
  },
  {
    icon: <Bot className="h-7 w-7" />,
    title: 'Integrasi Data & AI',
    desc: 'Tanya Data: chatbot Gemini yang menjawab dari view SQL read-only dengan RLS tetap aktif; plus ML scheduling dan inspeksi ban.',
  },
];

const OperationTech = () => {
  return (
    <section
      id="experience"
      className="bp-grid relative w-full py-16 md:py-24 lg:py-32 scroll-mt-20 overflow-hidden"
    >
      <div className="container px-4 sm:px-6 z-10 relative">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <span className="bp-stamp-ghost">01 — Spesialisasi</span>
          <div className="space-y-2">
            <h2 className="font-display font-bold uppercase tracking-tighter text-[clamp(1.75rem,6.5vw,3.5rem)]">
              Operation Tech
            </h2>
            <div className="bp-dimension mx-auto w-40" aria-hidden="true"></div>
            <p className="max-w-[900px] text-base leading-relaxed text-muted-foreground sm:text-lg md:text-xl">
              Dua sistem yang saya bangun sendiri jadi buktinya: Midaa untuk
              operasional armada dan GASTROS untuk commerce. Keduanya
              menyatukan data yang tadinya tersebar, memangkas kerja manual,
              dan dipakai untuk mengambil keputusan harian.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              <a
                href="https://github.com/audyalvasyha/v2app"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 border-2 border-foreground bg-card px-3 py-1.5 font-code text-[0.6rem] uppercase tracking-[0.2em] shadow-hardsm transition-all hover:bg-secondary"
              >
                Midaa TMS <span aria-hidden="true">↗</span>
              </a>
              <a
                href="https://github.com/audyalvasyha/store"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 border-2 border-foreground bg-card px-3 py-1.5 font-code text-[0.6rem] uppercase tracking-[0.2em] shadow-hardsm transition-all hover:bg-secondary"
              >
                GASTROS <span aria-hidden="true">↗</span>
              </a>
            </div>
          </div>
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 sm:gap-6 md:mt-12 max-w-5xl mx-auto">
          {PILLARS.map((pillar) => (
            <Card
              key={pillar.title}
              className="flex flex-col h-full transition-all duration-200 hover:-translate-x-[2px] hover:-translate-y-[2px] hover:shadow-hardlg"
            >
              <CardContent className="flex flex-col gap-4 p-5 sm:p-6">
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center border-2 border-foreground bg-secondary text-foreground">
                  {pillar.icon}
                </div>
                <div>
                  <h3 className="font-display text-base uppercase tracking-tight sm:text-lg">
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
