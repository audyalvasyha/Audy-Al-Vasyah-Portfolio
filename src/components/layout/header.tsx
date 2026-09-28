'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu, Crosshair, Download } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';

const NAV_LINKS = [
  { name: 'Home', href: '#home' },
  { name: 'Experience', href: '#experience' },
  { name: 'Projects', href: '#projects' },
  { name: 'Skills', href: '#skills' },
  { name: 'AI Tool', href: '#tool' },
  { name: 'Contact', href: '#contact' },
];


const Header = () => {
  const [isSheetOpen, setSheetOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-primary/25 bg-background/85 backdrop-blur-md">
      <div className="container flex h-16 items-center justify-between px-6">
        <div className="flex items-center">
          <Link href="/" className="mr-8 flex items-center gap-3 group">
            <div className="flex h-9 w-9 items-center justify-center border border-accent/60 bg-accent/10 text-accent transition-colors group-hover:bg-accent/20">
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

        {/* Mobile Nav */}
        <div className="md:hidden flex items-center">
          <Sheet open={isSheetOpen} onOpenChange={setSheetOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="bp-grid border-primary/30 bg-background/95">
              <SheetHeader>
                <SheetTitle className="sr-only">Mobile Menu</SheetTitle>
              </SheetHeader>
              <Link
                href="/"
                className="flex items-center gap-3"
                onClick={() => setSheetOpen(false)}
              >
                <div className="flex h-9 w-9 items-center justify-center border border-accent/60 bg-accent/10 text-accent">
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
          <Button size="sm" className="gap-2">
            <Download className="h-4 w-4" />
            <a href="/Audy Al Vasyah 10-25.pdf" download="Audy-Al-Vasyah-CV.pdf">
              CV
            </a>
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
