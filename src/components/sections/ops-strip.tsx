import { Truck, Route, Package, Warehouse } from 'lucide-react';
import { cn } from '@/lib/utils';

/**
 * Strip metrik operasional — statis (bukan marquee), angka faktual dari pekerjaan.
 * Gaya: pita hitam ber-border tebal, pembagi rambut, angka display kuning.
 */
const ITEMS = [
  { icon: Truck, value: '100+', label: 'rute harian dikelola' },
  { icon: Route, value: '44,2%', label: 'efisiensi rute via ML' },
  { icon: Package, value: '−90%', label: 'human error proses PGI' },
  { icon: Warehouse, value: 'SD · WM', label: 'modul SAP yang dipakai' },
];

export default function OpsStrip() {
  return (
    <section aria-label="Ringkasan operasional" className="border-y-2 border-foreground bg-foreground">
      <div className="container px-6">
        <dl className="grid grid-cols-2 md:grid-cols-4 [&>*]:border-card/15">
          {ITEMS.map((item, i) => {
            const Icon = item.icon;
            return (
              <div
                key={item.label}
                className={cn(
                  'flex items-center gap-3 px-1 py-5 sm:px-4',
                  i % 2 === 1 && 'border-l',
                  i >= 2 && 'border-t',
                  i > 0 && 'md:border-l',
                  'md:border-t-0'
                )}
              >
                <Icon className="h-5 w-5 flex-shrink-0 text-card/50" aria-hidden="true" />
                <div className="min-w-0">
                  <dd className="font-display text-2xl uppercase leading-none tracking-tight text-secondary sm:text-3xl">
                    {item.value}
                  </dd>
                  <dt className="mt-1 font-code text-[0.58rem] uppercase leading-snug tracking-[0.22em] text-card/60">
                    {item.label}
                  </dt>
                </div>
              </div>
            );
          })}
        </dl>
      </div>
    </section>
  );
}
