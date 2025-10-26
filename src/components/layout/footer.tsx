import { updatePageViews } from "@/app/actions";

const Footer = async () => {
  const pageViews = await updatePageViews();

  return (
    <footer className="py-6 md:px-8 md:py-0 border-t border-border/40">
      <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
        <p className="text-balance text-center text-sm leading-loose text-muted-foreground md:text-left">
          &copy; {new Date().getFullYear()} Audy Al Vasyah. All Rights Reserved.
        </p>
        <p className="text-balance text-center text-sm leading-loose text-muted-foreground md:text-right">
          Views: {pageViews.toLocaleString()}
        </p>
      </div>
    </footer>
  );
};

export default Footer;
