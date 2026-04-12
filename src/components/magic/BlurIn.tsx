'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface BlurInProps {
  word: string;
  className?: string;
  variant?: {
    hidden: { filter: string; opacity: number };
    visible: { filter: string; opacity: number };
  };
  duration?: number;
}

const defaultVariant = {
  hidden: { filter: 'blur(10px)', opacity: 0 },
  visible: { filter: 'blur(0px)', opacity: 1 },
};

export function BlurIn({ word, className, variant = defaultVariant, duration = 1 }: BlurInProps) {
  return (
    <motion.p
      initial="hidden"
      animate="visible"
      transition={{ duration }}
      variants={variant}
      className={cn('font-sans', className)}
    >
      {word}
    </motion.p>
  );
}
