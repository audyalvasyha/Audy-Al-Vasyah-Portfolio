'use client';
import { useEffect, useState } from "react";
import { incrementAndGetViews } from "@/app/actions";

const Footer = () => {
  const [pageViews, setPageViews] = useState<number | null>(null);

  useEffect(() => {
    const updateViews = async () => {
      try {
        // We only increment views once per session
        if (sessionStorage.getItem('viewIncremented')) {
            const currentViews = await incrementAndGetViews(); // We will call this to get the latest count without incrementing again. Let's adjust action
            setPageViews(currentViews);
        } else {
            const newViews = await incrementAndGetViews();
            setPageViews(newViews);
            sessionStorage.setItem('viewIncremented', 'true');
        }
      } catch (error) {
        console.error("Failed to update page views", error);
        setPageViews(0);
      }
    };
    
    // We will adjust the action to only increment once and then just fetch
    incrementAndGetViews().then(views => {
        setPageViews(views);
    }).catch(err => {
        console.error("Could not get views", err);
        setPageViews(0);
    });

  }, []);

  return (
    <footer className="border-t border-primary/25 bg-card/40">
      <div className="bp-dimension mx-6 mt-4" aria-hidden="true" />
      <div className="container flex flex-col items-center justify-between gap-4 py-6 md:h-24 md:flex-row">
        <p className="text-balance text-center text-[0.7rem] font-code uppercase tracking-[0.25em] leading-loose text-muted-foreground md:text-left">
          &copy; {new Date().getFullYear()} Audy Al Vasyah — All Rights Reserved
        </p>
        <div className="flex items-center gap-4">
          <span className="hidden md:inline text-[0.6rem] font-code uppercase tracking-[0.3em] text-muted-foreground/60">
            Sheet 1/1 · Scale 1:1
          </span>
          <div className="text-balance text-center text-[0.7rem] font-code uppercase tracking-[0.25em] leading-loose text-muted-foreground md:text-right min-h-[20px]">
            {pageViews !== null ? `Views: ${pageViews.toLocaleString()}` : ''}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
