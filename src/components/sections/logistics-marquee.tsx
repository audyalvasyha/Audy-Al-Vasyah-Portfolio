import { Truck, Package, Warehouse, Bot, Route, Boxes } from 'lucide-react';

const ITEMS = [
  { icon: <Truck className="h-5 w-5" />, text: 'TRUCK ON TIME' },
  { icon: <Package className="h-5 w-5" />, text: 'PGI AUTOMATION' },
  { icon: <Route className="h-5 w-5" />, text: 'ML SCHEDULING' },
  { icon: <Warehouse className="h-5 w-5" />, text: 'WAREHOUSE OPS' },
  { icon: <Bot className="h-5 w-5" />, text: 'N8N WORKFLOW' },
  { icon: <Boxes className="h-5 w-5" />, text: 'INVENTORY REAL-TIME' },
  { icon: <Truck className="h-5 w-5" />, text: 'OPTIMASI RUTE' },
  { icon: <Package className="h-5 w-5" />, text: 'SAP SD & WM' },
];

function Row({ hidden = false }: { hidden?: boolean }) {
  return (
    <div className="flex items-center gap-10 pr-10" aria-hidden={hidden}>
      {ITEMS.map((item, i) => (
        <span
          key={i}
          className="flex items-center gap-3 whitespace-nowrap font-code text-sm uppercase tracking-[0.3em] text-secondary"
        >
          {item.icon}
          {item.text}
          <span className="ml-7 text-redline">✦</span>
        </span>
      ))}
    </div>
  );
}

export default function LogisticsMarquee() {
  return (
    <div className="overflow-hidden border-y-2 border-foreground bg-foreground py-3">
      <div className="flex w-max animate-marquee">
        <Row />
        <Row hidden />
      </div>
    </div>
  );
}
