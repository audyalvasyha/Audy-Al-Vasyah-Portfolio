'use client';
import React, { useRef, useEffect } from 'react';
import { motion, useInView, useAnimation } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import DeliverySchedulingTool from './delivery-scheduling-tool';
import TireInspectionTool from './tire-inspection-tool';
import { CalendarClock, ScanLine } from 'lucide-react';
import { cn } from '@/lib/utils';

const tools = [
  {
    value: 'tire-inspection',
    title: 'Tire Inspection',
    icon: <ScanLine className="w-5 h-5" />,
    component: <TireInspectionTool />,
  },
  {
    value: 'delivery-scheduler',
    title: 'Delivery Scheduling',
    icon: <CalendarClock className="w-5 h-5" />,
    component: <DeliverySchedulingTool />,
  },
];

const AiTools = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start('visible');
    }
  }, [isInView, controls]);

  const cardVariants = {
    hidden: { opacity: 0, y: 100 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <section id="tool" className="bp-grid relative w-full py-16 md:py-24 lg:py-32 scroll-mt-20 overflow-hidden">
      <div className="relative container px-4 sm:px-6 z-10">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <span className="bp-stamp-ghost">04 — LAB TOOLS</span>
          <div className="space-y-2">
            <h2 className="font-display font-bold uppercase tracking-tighter text-[clamp(1.75rem,6.5vw,3.5rem)]">
              Tools yang Saya Bangun
            </h2>
            <div className="bp-dimension mx-auto w-40" aria-hidden="true"></div>
            <p className="max-w-[900px] text-base leading-relaxed text-muted-foreground sm:text-lg md:text-xl">
              Dua tools yang saya bangun dan pakai di pekerjaan. Silakan dicoba
              langsung &mdash; keduanya berjalan di server ini dengan Gemini.
            </p>
          </div>
        </div>
        <motion.div 
            ref={ref}
            variants={cardVariants}
            initial="hidden"
            animate={controls}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="mt-10 max-w-6xl mx-auto md:mt-12"
        >
          <Tabs defaultValue="tire-inspection" className="w-full">
            <TabsList className="flex h-auto w-full flex-col gap-1.5 p-1.5 sm:mx-auto sm:w-auto sm:flex-row">
              {tools.map((tool) => (
                <TabsTrigger
                  key={tool.value}
                  value={tool.value}
                  className={cn(
                    'flex h-auto w-full flex-1 items-center justify-center gap-2 whitespace-normal p-2.5 rounded-none font-code uppercase tracking-[0.1em] transition-all text-muted-foreground sm:w-auto sm:whitespace-nowrap'
                  )}
                >
                  {tool.icon}
                  <span className="text-xs font-medium sm:text-sm">{tool.title}</span>
                </TabsTrigger>
              ))}
            </TabsList>
            <div className="mt-6">
              {tools.map(tool => (
                <TabsContent key={tool.value} value={tool.value}>
                    <Card className="shadow-hardlg">
                        <CardContent className="p-4 sm:p-6 md:p-8">
                             {tool.component}
                        </CardContent>
                    </Card>
                </TabsContent>
              ))}
            </div>
          </Tabs>
        </motion.div>
      </div>
    </section>
  );
};

export default AiTools;
