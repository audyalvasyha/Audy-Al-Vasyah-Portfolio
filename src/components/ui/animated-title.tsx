'use client';

import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';

interface AnimatedTitleProps {
  text: string;
  className?: string;
  as?: React.ElementType;
}

const AnimatedTitle: React.FC<AnimatedTitleProps> = ({ 
  text, 
  className,
  as: Component = 'h1',
}) => {
  const rootRef = useRef<HTMLHeadingElement>(null);
  
  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const originalChars: { el: HTMLSpanElement, original: string, isSpace: boolean }[] = [];
    root.innerHTML = '';
    text.split('').forEach(char => {
        const span = document.createElement('span');
        span.style.display = 'inline-block';
        const isSpace = char === ' ';

        if (isSpace) {
            span.innerHTML = '&nbsp;'; 
            span.style.width = '0.25em';  
        } else {
            span.textContent = char;
        }

        root.appendChild(span);
        originalChars.push({ el: span, original: char, isSpace: isSpace });
    });

    const charSet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()';
    const getRandomChar = () => charSet[Math.floor(Math.random() * charSet.length)];

    const ctx = gsap.context(() => {
      originalChars.forEach((charData, index) => {
        const tl = gsap.timeline();

        tl.from(charData.el, { 
          autoAlpha: 0, 
          duration: 0.01
        }, index * 0.05); 

        if (!charData.isSpace) {
            let ticker = { value: 0 };
            tl.to(ticker, {
              value: 5, 
              duration: 0.2, 
              ease: 'steps(5)', 
              onUpdate: () => {
                  charData.el.textContent = getRandomChar();
              },
              onComplete: () => {
                charData.el.textContent = charData.original;
              }
            });
        }
      });
    }, root);

    return () => ctx.revert();
  }, [text]);

  return React.createElement(Component, {
    ref: rootRef,
    className: className,
    'aria-label': text
  });
};

export default AnimatedTitle;
