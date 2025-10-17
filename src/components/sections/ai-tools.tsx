'use client';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import EfficiencyTool from './efficiency-tool';
import DeliverySchedulingTool from './delivery-scheduling-tool';
import TireInspectionTool from './tire-inspection-tool';

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
            <TabsList className="grid w-full grid-cols-1 h-auto sm:h-10 sm:grid-cols-3 mb-6">
              <TabsTrigger value="efficiency-predictor">Efficiency Predictor</TabsTrigger>
              <TabsTrigger value="delivery-scheduler">Delivery Scheduling</TabsTrigger>
              <TabsTrigger value="tire-inspection">Tire Inspection</TabsTrigger>
            </TabsList>
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
