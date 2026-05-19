'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu, Code2 } from 'lucide-react';

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
    <header className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-6xl border border-white/10 bg-black/40 backdrop-blur-xl rounded-full shadow-2xl transition-all duration-300">
      <div className="container flex h-14 items-center justify-between px-6">
        <div className="flex items-center">
          <Link href="/" className="mr-8 flex items-center space-x-2 group">
            <div className="p-1.5 rounded-lg bg-accent/10 group-hover:bg-accent/20 transition-colors">
              <Code2 className="h-5 w-5 text-accent" />
            </div>
            <span className="hidden font-bold sm:inline-block font-headline tracking-tight">
              Audy Al Vasyah
            </span>
          </Link>
          <nav className="hidden md:flex items-center space-x-8 text-sm font-medium">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-foreground/70 transition-colors hover:text-accent"
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
            <SheetContent side="left">
              <SheetHeader>
                <SheetTitle className="sr-only">Mobile Menu</SheetTitle>
              </SheetHeader>
              <Link
                href="/"
                className="flex items-center"
                onClick={() => setSheetOpen(false)}
              >
                <Code2 className="h-6 w-6 text-accent" />
                <span className="ml-2 font-bold font-headline">Audy Al Vasyah</span>
              </Link>
              <div className="mt-8 flex flex-col space-y-4">
                {NAV_LINKS.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="text-lg transition-colors hover:text-accent"
                    onClick={() => setSheetOpen(false)}
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
            </SheetContent>
          </Sheet>
        </div>

        <div className="flex flex-1 items-center justify-end space-x-4">
          <Button asChild>
            <a href="/Audy Al Vasyah 10-25.pdf" download="Audy-Al-Vasyah-CV.pdf">Download CV</a>
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
