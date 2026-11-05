import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function NotFound() {
  return (
    <main className="bp-grid relative flex min-h-dvh flex-col items-center justify-center px-6 text-center">
      <span className="bp-stamp-ghost">OOPS — 404</span>
      <h1 className="mt-4 font-headline text-5xl font-bold uppercase tracking-tighter sm:text-7xl">
        404
      </h1>
      <div className="bp-dimension mx-auto mt-6 w-40" aria-hidden="true" />
      <p className="mt-6 max-w-sm text-muted-foreground">
        Halaman yang kamu cari nggak ada di situs ini. Mungkin salah ketik —
        atau emang belum dibuat.
      </p>
      <Button asChild className="mt-8">
        <Link href="/">Kembali ke halaman utama</Link>
      </Button>
    </main>
  );
}
