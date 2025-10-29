'use client';
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import EfficiencyTool from './efficiency-tool';
import DeliverySchedulingTool from './delivery-scheduling-tool';
import TireInspectionTool from './tire-inspection-tool';
import { GaugeCircle, CalendarClock, ScanLine, Lightbulb, Sparkles, ScanSearch } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';

const tools = [
  {
    value: 'tire-inspection',
    title: 'Tire Inspection',
    description: 'Analyze tire condition with AI.',
    icon: <ScanLine className="w-8 h-8 mb-2 text-primary" />,
  },
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
];

const AiTools = () => {
  return (
    <section id="tool" className="relative w-full py-12 md:py-24 lg:py-32 scroll-mt-20 overflow-hidden">
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
              AI Powered Tools
            </h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Explore a collection of AI-driven tools I've developed to solve real-world problems.
            </p>
          </div>
        </div>
        <div className="mt-12 max-w-6xl mx-auto">
          <Tabs defaultValue="tire-inspection" className="w-full">
            <ScrollArea className="w-full lg:overflow-visible">
              <TabsList className="inline-flex h-auto w-full p-1 bg-transparent justify-start lg:grid lg:grid-cols-3 lg:gap-6 lg:p-0">
                {tools.map((tool) => (
                  <TabsTrigger
                    key={tool.value}
                    value={tool.value}
                    className={cn(
                      'flex-1 p-2 justify-center items-center text-center',
                      'lg:relative lg:h-auto lg:p-6 lg:rounded-lg lg:border-2 lg:border-transparent lg:bg-card lg:text-card-foreground lg:shadow-md lg:transition-all lg:whitespace-normal',
                      'lg:data-[state=active]:border-primary lg:data-[state=active]:shadow-lg lg:data-[state=active]:shadow-primary/20',
                      'lg:hover:shadow-lg lg:hover:border-accent',
                      'data-[state=active]:bg-muted data-[state=active]:text-foreground data-[state=active]:shadow-none rounded-md',
                      'lg:data-[state=active]:bg-card',
                      'lg:data-[state=active]:border-b-4'
                    )}
                  >
                    {/* Desktop View */}
                    <div className="hidden lg:flex lg:flex-col lg:items-center">
                      {tool.icon}
                      <p className="text-base font-semibold">{tool.title}</p>
                      <p className="text-xs text-muted-foreground mt-1">{tool.description}</p>
                    </div>
                    {/* Mobile View */}
                    <div className="lg:hidden flex flex-col items-center text-center text-xs p-1">
                      {React.cloneElement(tool.icon, { className: "w-5 h-5 mb-1 text-primary" })}
                      <p className="font-semibold">{tool.title}</p>
                    </div>
                  </TabsTrigger>
                ))}
              </TabsList>
              <ScrollBar orientation="horizontal" />
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
