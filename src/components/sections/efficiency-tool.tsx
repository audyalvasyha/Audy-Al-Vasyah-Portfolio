'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { getEfficiencyPrediction } from '@/lib/actions';
import type { EfficiencyPredictionOutput } from '@/ai/flows/efficiency-prediction-tool';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Loader2, ArrowDown, ArrowUp } from 'lucide-react';

const formSchema = z.object({
  currentDeliveryTime: z.coerce.number().min(1, 'Must be at least 1 hour'),
  currentWarehouseTime: z.coerce.number().min(1, 'Must be at least 1 hour'),
  automationStrategy: z
    .string()
    .min(10, 'Please describe your strategy in at least 10 characters.'),
});

const EfficiencyTool = () => {
  const [result, setResult] = useState<EfficiencyPredictionOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      currentDeliveryTime: 24,
      currentWarehouseTime: 8,
      automationStrategy:
        'Implementing an AI-powered route optimization and automated warehouse sorting system.',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setError(null);
    setResult(null);
    try {
      const prediction = await getEfficiencyPrediction(values);
      setResult(prediction);
    } catch (e) {
      setError('Failed to get prediction. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }

  const TimeChange = ({
    label,
    oldTime,
    newTime,
  }: {
    label: string;
    oldTime: number;
    newTime: number;
  }) => {
    const change = newTime - oldTime;
    const percentageChange = ((change / oldTime) * 100).toFixed(2);
    const isImprovement = change < 0;

    return (
      <div className="flex flex-col items-center">
        <span className="text-sm text-muted-foreground">{label}</span>
        <div className="flex items-end gap-2">
            <span className="text-3xl font-bold">{newTime.toFixed(1)}h</span>
            <span className="text-lg text-muted-foreground line-through">{oldTime.toFixed(1)}h</span>
        </div>
        <div className={`flex items-center font-semibold ${isImprovement ? 'text-green-400' : 'text-red-400'}`}>
           {isImprovement ? <ArrowDown size={16} /> : <ArrowUp size={16} />}
           <span>{Math.abs(parseFloat(percentageChange))}%</span>
        </div>
      </div>
    );
  };

  return (
    <section id="tool" className="w-full py-12 md:py-24 lg:py-32 bg-secondary">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-headline font-bold tracking-tighter sm:text-5xl">
              Efficiency Prediction Tool
            </h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Use this AI-powered tool to forecast potential improvements in
              delivery and warehouse times.
            </p>
          </div>
        </div>
        <div className="mt-12 grid gap-8 md:grid-cols-2 max-w-6xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle className="font-headline">Input Parameters</CardTitle>
              <CardDescription>
                Provide your current metrics and proposed strategy.
              </CardDescription>
            </CardHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <CardContent className="space-y-4">
                  <FormField
                    control={form.control}
                    name="currentDeliveryTime"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Current Delivery Time (hours)</FormLabel>
                        <FormControl>
                          <Input type="number" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="currentWarehouseTime"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Current Warehouse Time (hours)</FormLabel>
                        <FormControl>
                          <Input type="number" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="automationStrategy"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Automation Strategy</FormLabel>
                        <FormControl>
                          <Textarea rows={4} {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
                <CardFooter>
                  <Button type="submit" disabled={isLoading}>
                    {isLoading && (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    )}
                    {isLoading ? 'Predicting...' : 'Predict Efficiency'}
                  </Button>
                </CardFooter>
              </form>
            </Form>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="font-headline">AI Prediction</CardTitle>
              <CardDescription>
                Predicted outcomes based on your inputs.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {isLoading && (
                <div className="flex justify-center items-center h-full">
                  <Loader2 className="h-8 w-8 animate-spin text-primary" />
                </div>
              )}
              {error && <p className="text-destructive">{error}</p>}
              {result && (
                <div className="space-y-6">
                  <div className="flex justify-around text-center border rounded-lg p-4 bg-background">
                    <TimeChange label="Delivery Time" oldTime={form.getValues('currentDeliveryTime')} newTime={result.predictedDeliveryTime} />
                    <TimeChange label="Warehouse Time" oldTime={form.getValues('currentWarehouseTime')} newTime={result.predictedWarehouseTime} />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Reasoning:</h4>
                    <p className="text-sm text-muted-foreground">{result.reasoning}</p>
                  </div>
                </div>
              )}
               {!isLoading && !result && !error && (
                <div className="flex justify-center items-center h-48 text-muted-foreground">
                    <p>Results will be displayed here.</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default EfficiencyTool;
