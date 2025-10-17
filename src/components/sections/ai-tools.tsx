'use client';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import EfficiencyTool from './efficiency-tool';
import DeliverySchedulingTool from './delivery-scheduling-tool';
import TireInspectionTool from './tire-inspection-tool';
import { GaugeCircle, CalendarClock, ScanLine } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';

const tools = [
  {
    value: 'efficiency-predictor',
    title: 'Efficiency Predictor',
    description: 'Forecast potential time savings.',
    icon: <GaugeCircle className="w-8 h-8 mb-2 text-primary" />,
  },
  {
    value: 'delivery-scheduler',
    title: 'Delivery Scheduling',
    description: 'Learn about the ML-powered system.',
    icon: <CalendarClock className="w-8 h-8 mb-2 text-primary" />,
  },
  {
    value: 'tire-inspection',
    title: 'Tire Inspection',
    description: 'Analyze tire condition with AI.',
    icon: <ScanLine className="w-8 h-8 mb-2 text-primary" />,
  },
];

const AiTools = () => {
  return (
    <section id="tool" className="w-full py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-headline font-bold tracking-tighter sm:text-5xl">
              AI Powered Tools
            </h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Explore a collection of AI-driven tools I've developed to solve real-world problems.
            </p>
          </div>
        </div>
        <div className="mt-12 max-w-6xl mx-auto">
          <Tabs defaultValue="efficiency-predictor" className="w-full">
            <ScrollArea className="w-full whitespace-nowrap">
              <TabsList className="inline-flex h-auto w-max space-x-4 bg-transparent p-4 lg:w-full lg:grid lg:grid-cols-3 lg:space-x-0 lg:gap-6">
                {tools.map((tool) => (
                  <TabsTrigger
                    key={tool.value}
                    value={tool.value}
                    className={cn(
                      'relative h-auto w-full min-w-[240px] p-6 rounded-lg border-2 border-transparent bg-card text-card-foreground shadow-md transition-all whitespace-normal',
                      'data-[state=active]:border-primary data-[state=active]:shadow-lg data-[state=active]:shadow-primary/20 data-[state=active]:-translate-y-1',
                      'hover:shadow-lg hover:border-accent hover:-translate-y-1'
                    )}
                  >
                    <div className="flex flex-col items-center text-center">
                      {tool.icon}
                      <p className="text-base font-semibold">{tool.title}</p>
                      <p className="text-xs text-muted-foreground mt-1">{tool.description}</p>
                    </div>
                  </TabsTrigger>
                ))}
              </TabsList>
              <ScrollBar orientation="horizontal" className="lg:hidden" />
            </ScrollArea>
            <TabsContent value="efficiency-predictor">
              <EfficiencyTool />
            </TabsContent>
            <TabsContent value="delivery-scheduler">
              <DeliverySchedulingTool />
            </TabsContent>
            <TabsContent value="tire-inspection">
              <TireInspectionTool />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </section>
  );
};

export default AiTools;
