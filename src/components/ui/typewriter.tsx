'use client';

import { useState, useEffect, useRef, FC } from 'react';

interface TypewriterProps {
  text: string;
  speed?: number;
  className?: string;
  triggerOnView?: boolean;
}

const Typewriter: FC<TypewriterProps> = ({ text, speed = 50, className, triggerOnView = false }) => {
  const [displayedText, setDisplayedText] = useState('');
  const [startAnimation, setStartAnimation] = useState(!triggerOnView);
  const ref = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (!triggerOnView) {
      setDisplayedText(''); // Clear text if not in view
      return;
    };

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        if (!startAnimation) {
          setDisplayedText('');
          setStartAnimation(true);
        }
      }
    }, { threshold: 0.1 });

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [triggerOnView, startAnimation]);

  useEffect(() => {
    if (!startAnimation) return;

    if (displayedText.length < text.length) {
      const timeoutId = setTimeout(() => {
        setDisplayedText(text.substring(0, displayedText.length + 1));
      }, speed);
      return () => clearTimeout(timeoutId);
    }
  }, [displayedText, startAnimation, text, speed]);
  
  // Render the full text for SEO if animation is not active
  if (!startAnimation && triggerOnView) {
    return (
      <p ref={ref} className={className}>
        <span className="opacity-0">{text}</span>
      </p>
    );
  }

  return (
    <p ref={ref} className={className}>
      {displayedText}
      {displayedText.length < text.length && (
         <span
          style={{
            display: 'inline-block',
            width: '2px',
            height: '1em',
            backgroundColor: 'hsl(var(--primary))',
            marginLeft: '4px',
            animation: 'blink 1s step-end infinite',
            verticalAlign: 'bottom',
          }}
        />
      )}
       <style jsx global>{`
        @keyframes blink {
          from, to { opacity: 1 }
          50% { opacity: 0 }
        }
      `}</style>
    </p>
  );
};

export default Typewriter;
