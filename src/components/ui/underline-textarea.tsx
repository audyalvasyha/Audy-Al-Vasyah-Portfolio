import * as React from 'react';

import { cn } from '@/lib/utils';

const UnderlineTextarea = React.forwardRef<
  HTMLTextAreaElement,
  React.ComponentProps<'textarea'>
>(({ className, ...props }, ref) => {
  return (
    <textarea
      className={cn(
        'flex min-h-[80px] w-full rounded-none border-0 border-b-2 border-input bg-transparent px-1 py-2 text-base ring-offset-background placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-0 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
        className
      )}
      ref={ref}
      {...props}
    />
  );
});
UnderlineTextarea.displayName = 'UnderlineTextarea';

export { UnderlineTextarea };
