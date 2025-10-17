'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { efficiencyPredictionTool } from '@/ai/flows/efficiency-prediction-tool';
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
  currentDeliveryTime: z.coerce.number().min(1, 'Minimal harus 1 jam'),
  currentWarehouseTime: z.coerce.number().min(1, 'Minimal harus 1 jam'),
  automationStrategy: z
    .string()
    .min(10, 'Harap jelaskan strategi Anda dalam setidaknya 10 karakter.'),
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
        'Menerapkan sistem pengoptimalan rute bertenaga AI dan penyortiran gudang otomatis.',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setError(null);
    setResult(null);
    try {
      const instructedData = {
        ...values,
        automationStrategy: `${values.automationStrategy}. Tolong berikan kolom 'reasoning' dalam Bahasa Indonesia.`
      };
      const prediction = await efficiencyPredictionTool(instructedData);
      setResult(prediction);
    } catch (e) {
      setError('Gagal mendapatkan prediksi. Silakan coba lagi.');
      console.error(e);
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
    <div className="mt-12 grid gap-8 md:grid-cols-2 max-w-6xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle className="font-headline">Parameter Masukan</CardTitle>
          <CardDescription>
            Berikan metrik Anda saat ini dan strategi yang diusulkan.
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
                    <FormLabel>Waktu Pengiriman Saat Ini (jam)</FormLabel>
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
                    <FormLabel>Waktu Gudang Saat Ini (jam)</FormLabel>
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
                    <FormLabel>Strategi Otomatisasi</FormLabel>
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
                {isLoading ? 'Memprediksi...' : 'Prediksi Efisiensi'}
              </Button>
            </CardFooter>
          </form>
        </Form>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="font-headline">Prediksi AI</CardTitle>
          <CardDescription>
            Hasil yang diprediksi berdasarkan masukan Anda.
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
                <TimeChange label="Waktu Pengiriman" oldTime={form.getValues('currentDeliveryTime')} newTime={result.predictedDeliveryTime} />
                <TimeChange label="Waktu Gudang" oldTime={form.getValues('currentWarehouseTime')} newTime={result.predictedWarehouseTime} />
              </div>
              <div>
                <h4 className="font-semibold mb-2">Alasan:</h4>
                <p className="text-sm text-muted-foreground">{result.reasoning}</p>
              </div>
            </div>
          )}
           {!isLoading && !result && !error && (
            <div className="flex justify-center items-center h-48 text-muted-foreground">
                <p>Hasil akan ditampilkan di sini.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default EfficiencyTool;
