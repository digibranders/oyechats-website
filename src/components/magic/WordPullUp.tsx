'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface WordPullUpProps {
  words: string;
  delayMultiple?: number;
  wrapperFramerProps?: object;
  framerProps?: object;
  className?: string;
}

export function WordPullUp({
  words,
  wrapperFramerProps = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
    },
  },
  framerProps = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1 },
  },
  className,
}: WordPullUpProps) {
  return (
    <motion.h2
      variants={wrapperFramerProps as never}
      initial="hidden"
      animate="show"
      className={cn('font-bold tracking-[-0.02em]', className)}
    >
      {words.split(' ').map((word, i) => (
        <motion.span
          key={i}
          variants={framerProps as never}
          className="inline-block px-1"
        >
          {word === '' ? <span>&nbsp;</span> : word}
        </motion.span>
      ))}
    </motion.h2>
  );
}
