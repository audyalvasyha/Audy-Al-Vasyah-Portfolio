'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu, Code2 } from 'lucide-react';

import { NAV_LINKS } from '@/lib/constants';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

const Header = () => {
  const [isSheetOpen, setSheetOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="mr-4 hidden md:flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <Code2 className="h-6 w-6 text-primary" />
            <span className="hidden font-bold sm:inline-block font-headline">
              Audy Al Vasyah
            </span>
          </Link>
          <nav className="flex items-center space-x-6 text-sm font-medium">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="transition-colors hover:text-primary"
              >
                {link.name}
              </Link>
            ))}
          </nav>
        </div>

        {/* Mobile Nav */}
        <div className="md:hidden">
          <Sheet open={isSheetOpen} onOpenChange={setSheetOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left">
              <Link
                href="/"
                className="flex items-center"
                onClick={() => setSheetOpen(false)}
              >
                <Code2 className="h-6 w-6 text-primary" />
                <span className="ml-2 font-bold font-headline">Audy Al Vasyah</span>
              </Link>
              <div className="mt-8 flex flex-col space-y-4">
                {NAV_LINKS.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="text-lg transition-colors hover:text-primary"
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
            <a href="/Audy Al Vasyah 10-25.pdf" download="Audy Al Vasyah CV.pdf">Download CV</a>
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
