'use client';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { mlPoweredDeliverySchedulingSystem } from '@/ai/flows/ml-powered-delivery-scheduling-system';
import type { MlPoweredDeliverySchedulingSystemOutput } from '@/ai/flows/ml-powered-delivery-scheduling-system';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Loader2, Sparkles } from 'lucide-react';

const formSchema = z.object({
  query: z.string().min(10, 'Silakan ajukan pertanyaan minimal 10 karakter.'),
});

const DeliverySchedulingTool = () => {
  const [result, setResult] = useState<MlPoweredDeliverySchedulingSystemOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      query: 'Ceritakan tentang peningkatan efisiensi dari sistem ini.',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setError(null);
    setResult(null);
    try {
      const response = await mlPoweredDeliverySchedulingSystem(values);
      setResult(response);
    } catch (e) {
      setError('Gagal mendapatkan detail. Silakan coba lagi.');
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="mt-12 grid gap-8 md:grid-cols-2 max-w-6xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle className="font-headline">Tanya Tentang Sistem</CardTitle>
          <CardDescription>
            Ajukan pertanyaan kepada AI tentang Sistem Penjadwalan Pengiriman Berbasis ML.
          </CardDescription>
        </CardHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <CardContent>
              <FormField
                control={form.control}
                name="query"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Pertanyaan Anda</FormLabel>
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
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {isLoading ? 'Menanyakan...' : 'Tanya AI'}
              </Button>
            </CardFooter>
          </form>
        </Form>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle className="font-headline">Respons AI</CardTitle>
          <CardDescription>Penjelasan sistem dari AI.</CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading && (
            <div className="flex justify-center items-center h-full">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          )}
          {error && <p className="text-destructive">{error}</p>}
          {result && (
            <div>
              <p className="text-sm text-muted-foreground">{result.details}</p>
            </div>
          )}
          {!isLoading && !result && !error && (
            <div className="flex flex-col text-center justify-center items-center h-48 text-muted-foreground">
                <Sparkles className="h-10 w-10 mb-4 text-primary/50" />
                <p>Respons AI akan muncul di sini setelah Anda mengajukan pertanyaan.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default DeliverySchedulingTool;
