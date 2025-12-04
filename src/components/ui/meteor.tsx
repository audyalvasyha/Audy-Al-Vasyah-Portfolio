import { cn } from '@/lib/utils';
import React from 'react';

interface MeteorProps {
  className?: string;
  style?: React.CSSProperties;
}

const Meteor: React.FC<MeteorProps> = ({ className, style }) => {
  return (
    <div
      className={cn(
        'pointer-events-none absolute h-0.5 w-0.5 rounded-full bg-slate-500 shadow-[0_0_0_1px_#ffffff10] rotate-[215deg]',
        'animate-meteor',
        className
      )}
      style={style}
    >
      <div className="absolute top-1/2 -translate-y-1/2 h-px w-[50px] sm:w-[150px] bg-gradient-to-r from-accent to-transparent" />
    </div>
  );
};

export default Meteor;
