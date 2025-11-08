'use client';

import React, { useEffect, useRef } from 'react';
import { motion, useInView, useAnimation } from 'framer-motion';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface Job {
  role: string;
  company: string;
  period: string;
  achievements: string[];
}

interface ExperienceCardProps {
  job: Job;
  index: number;
}

const ExperienceCard: React.FC<ExperienceCardProps> = ({ job, index }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const controls = useAnimation();

  const isOdd = index % 2 !== 0;

  const cardVariants = {
    hidden: { opacity: 0, x: isOdd ? 100 : -100 },
    visible: { opacity: 1, x: 0 },
  };

  useEffect(() => {
    if (isInView) {
      controls.start('visible');
    }
  }, [isInView, controls]);

  const highlightMetric = (text: string) => {
    const regex = /(\d+(?:\.\d+)?%)/g;
    return text.split(regex).map((part, index) => {
      if (regex.test(part)) {
        return (
          <span key={index} className="text-accent font-bold">
            {part}
          </span>
        );
      }
      return part;
    });
  };

  return (
    <motion.div
      ref={ref}
      variants={cardVariants}
      initial="hidden"
      animate={controls}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className={cn('w-full', 'md:w-1/2 md:px-8', isOdd ? 'pl-12 md:pl-8' : 'pl-12')}
    >
      <Card className="bg-gray-800/50 backdrop-blur-sm border border-slate-700">
        <CardHeader>
          <div
            className={cn(
              'flex flex-col md:flex-row justify-between md:items-start gap-2'
            )}
          >
            <div>
              <CardTitle className="font-headline text-xl">
                {job.role}
              </CardTitle>
              <p className="text-sm text-muted-foreground">
                {job.company}
              </p>
            </div>
            <Badge variant="default" className="self-start md:self-auto">
              {job.period}
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <ul
            className={cn(
              'list-disc pl-5 space-y-2 text-sm'
            )}
          >
            {job.achievements.map((ach, i) => (
              <li key={i} className={cn(isOdd && 'md:pr-5')}>
                {highlightMetric(ach)}
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default ExperienceCard;
