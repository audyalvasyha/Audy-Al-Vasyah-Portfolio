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
    <div>
        <div className="text-center mb-8">
            <h3 className="text-2xl font-headline font-bold">Delivery Scheduling</h3>
            <p className="text-muted-foreground">Learn about the ML-powered system.</p>
        </div>
        <div className="grid gap-8 md:grid-cols-2">
            <Card className="bg-transparent border-0 shadow-none md:border md:bg-card md:shadow-sm">
                <CardHeader className="p-0 md:p-6">
                <CardTitle className="font-headline sr-only md:not-sr-only">Tanya Tentang Sistem</CardTitle>
                <CardDescription className="sr-only md:not-sr-only">
                    Ajukan pertanyaan kepada AI tentang Sistem Penjadwalan Pengiriman Berbasis ML.
                </CardDescription>
                </CardHeader>
                <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <CardContent className="p-0 md:p-6 md:pt-0">
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
                    <CardFooter className="p-0 md:p-6 md:pt-0">
                    <Button type="submit" disabled={isLoading} className="mt-4">
                        {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        {isLoading ? 'Menanyakan...' : 'Tanya AI'}
                    </Button>
                    </CardFooter>
                </form>
                </Form>
            </Card>
            <Card className="bg-transparent border-0 shadow-none md:border md:bg-card md:shadow-sm">
                <CardHeader className="p-0 md:p-6">
                <CardTitle className="font-headline sr-only md:not-sr-only">Respons AI</CardTitle>
                <CardDescription className="sr-only md:not-sr-only">Penjelasan sistem dari AI.</CardDescription>
                </CardHeader>
                <CardContent className="p-0 md:p-6 md:pt-0">
                {isLoading && (
                    <div className="flex justify-center items-center min-h-48">
                    <Loader2 className="h-8 w-8 animate-spin text-primary" />
                    </div>
                )}
                {error && <p className="text-destructive">{error}</p>}
                {result && (
                    <div className="min-h-48">
                    <p className="text-sm text-muted-foreground">{result.details}</p>
                    </div>
                )}
                {!isLoading && !result && !error && (
                    <div className="flex flex-col text-center justify-center items-center h-48 text-muted-foreground min-h-48">
                        <Sparkles className="h-10 w-10 mb-4 text-primary/50" />
                        <p>Respons AI akan muncul di sini setelah Anda mengajukan pertanyaan.</p>
                    </div>
                )}
                </CardContent>
            </Card>
        </div>
    </div>
  );
};

export default DeliverySchedulingTool;
