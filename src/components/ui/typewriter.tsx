'use client';

import { useState, useEffect, useRef, FC } from 'react';

interface TypewriterProps {
  text: string;
  speed?: number;
  className?: string;
  triggerOnView?: boolean;
}

const Typewriter: FC<TypewriterProps> = ({ text, speed = 100, className, triggerOnView = false }) => {
  const [displayedText, setDisplayedText] = useState(triggerOnView ? '' : text);
  const [startAnimation, setStartAnimation] = useState(!triggerOnView);
  const ref = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (!triggerOnView) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setStartAnimation(true);
      } else {
        setStartAnimation(false);
        setDisplayedText('');
      }
    }, { threshold: 0.5 });

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [triggerOnView]);

  useEffect(() => {
    if (!startAnimation) return;

    if (displayedText.length < text.length) {
      const timeoutId = setTimeout(() => {
        setDisplayedText(text.substring(0, displayedText.length + 1));
      }, speed);
      return () => clearTimeout(timeoutId);
    }
  }, [displayedText, startAnimation, text, speed]);

  const showCursor = startAnimation && displayedText.length < text.length;

  return (
    <h1 ref={ref} className={className}>
      {displayedText}
      {showCursor && (
         <span
          style={{
            display: 'inline-block',
            width: '3px',
            height: '1em',
            backgroundColor: 'hsl(var(--foreground))',
            marginLeft: '8px',
            animation: 'blink 1s step-end infinite',
          }}
        />
      )}
       <style jsx global>{`
        @keyframes blink {
          from, to { opacity: 1 }
          50% { opacity: 0 }
        }
      `}</style>
    </h1>
  );
};

export default Typewriter;
