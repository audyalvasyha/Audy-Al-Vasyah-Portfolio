'use client';
import React, { useRef, useEffect } from 'react';
import { motion, useInView, useAnimation } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import DeliverySchedulingTool from './delivery-scheduling-tool';
import TireInspectionTool from './tire-inspection-tool';
import { CalendarClock, ScanLine } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ScrollArea } from '../ui/scroll-area';

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
    <section id="tool" className="bp-grid relative w-full py-12 md:py-24 lg:py-32 scroll-mt-20 overflow-hidden">
      <div className="relative container px-4 md:px-6 z-10">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <span className="bp-stamp-ghost">05 — LAB TOOLS</span>
          <div className="space-y-2">
            <h2 className="text-3xl font-headline font-bold uppercase tracking-tighter sm:text-5xl">
              Tools yang Saya Bangun
            </h2>
            <div className="bp-dimension mx-auto w-40" aria-hidden="true"></div>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
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
            className="mt-12 max-w-6xl mx-auto"
        >
          <Tabs defaultValue="tire-inspection" className="w-full">
            <ScrollArea className="w-full pb-4">
              <TabsList className="flex w-full sm:w-auto sm:mx-auto h-auto p-1.5 rounded-none">
                {tools.map((tool) => (
                  <TabsTrigger
                    key={tool.value}
                    value={tool.value}
                    className={cn(
                      'flex-1 flex items-center justify-center gap-2 h-auto p-2.5 rounded-none font-code uppercase tracking-[0.1em] transition-all whitespace-nowrap text-muted-foreground'
                    )}
                  >
                    {tool.icon}
                    <span className="text-sm font-medium">{tool.title}</span>
                  </TabsTrigger>
                ))}
              </TabsList>
            </ScrollArea>
            <div className="mt-6">
              {tools.map(tool => (
                <TabsContent key={tool.value} value={tool.value}>
                    <Card className="shadow-hardlg">
                        <CardContent className="p-6 md:p-8">
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
