'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu, Crosshair, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';

const NAV_LINKS = [
  { name: 'Home', href: '#home' },
  { name: 'Pengalaman', href: '#experience' },
  { name: 'Skills', href: '#skills' },
  { name: 'Tools', href: '#tool' },
  { name: 'Kontak', href: '#contact' },
];

const Header = () => {
  const [isSheetOpen, setSheetOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b-2 border-foreground bg-background">
      <div className="container flex h-16 items-center justify-between px-6">
        <div className="flex items-center">
          <Link href="/" className="mr-8 flex items-center gap-3 group">
            <div className="flex h-9 w-9 items-center justify-center border-2 border-foreground bg-secondary text-foreground transition-colors group-hover:bg-accent group-hover:text-accent-foreground">
              <Crosshair className="h-5 w-5" />
            </div>
            <span className="hidden sm:inline-block font-headline font-semibold uppercase tracking-[0.2em] text-sm text-foreground">
              A. Vasyah
              <span className="ml-2 hidden md:inline font-code text-[0.6rem] tracking-[0.25em] text-muted-foreground">
                / OPS·TECH
              </span>
            </span>
          </Link>
          <nav className="hidden md:flex items-center space-x-7 text-xs font-code font-medium uppercase tracking-[0.2em]">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-muted-foreground transition-colors hover:text-accent"
              >
                {link.name}
              </Link>
            ))}
          </nav>
        </div>

        {/* Nav mobile */}
        <div className="md:hidden flex items-center">
          <Sheet open={isSheetOpen} onOpenChange={setSheetOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Buka menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="bp-grid">
              <SheetHeader>
                <SheetTitle className="sr-only">Menu</SheetTitle>
              </SheetHeader>
              <Link href="/" className="flex items-center gap-3" onClick={() => setSheetOpen(false)}>
                <div className="flex h-9 w-9 items-center justify-center border-2 border-foreground bg-secondary text-foreground">
                  <Crosshair className="h-5 w-5" />
                </div>
                <span className="font-headline font-semibold uppercase tracking-[0.2em]">A. Vasyah</span>
              </Link>
              <div className="mt-8 flex flex-col items-start gap-5">
                {NAV_LINKS.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="text-sm font-code uppercase tracking-[0.25em] text-muted-foreground transition-colors hover:text-accent"
                    onClick={() => setSheetOpen(false)}
                  >
                    <span className="mr-2 text-redline">›</span>
                    {link.name}
                  </Link>
                ))}
              </div>
            </SheetContent>
          </Sheet>
        </div>

        <div className="flex flex-1 items-center justify-end">
          <Button asChild size="sm" className="gap-2">
            <a href="/cv-audy-al-vasyah.pdf" download="Audy-Al-Vasyah-CV.pdf">
              <Download className="h-4 w-4" />
              CV
            </a>
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
