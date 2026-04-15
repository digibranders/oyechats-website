'use client';

import { cn } from '@/lib/utils';

interface BackgroundBeamsProps {
  className?: string;
}

export function BackgroundBeams({ className }: BackgroundBeamsProps) {
  return (
    <div
      className={cn(
        'pointer-events-none absolute inset-0 overflow-hidden',
        className
      )}
    >
      <svg
        className="absolute h-full w-full"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1440 900"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <radialGradient id="beam1" cx="50%" cy="0%" r="60%">
            <stop offset="0%" stopColor="#2563EB" stopOpacity="0.15" />
            <stop offset="100%" stopColor="transparent" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="beam2" cx="20%" cy="30%" r="40%">
            <stop offset="0%" stopColor="#6366F1" stopOpacity="0.1" />
            <stop offset="100%" stopColor="transparent" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="beam3" cx="80%" cy="60%" r="35%">
            <stop offset="0%" stopColor="#06B6D4" stopOpacity="0.08" />
            <stop offset="100%" stopColor="transparent" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="lineGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#60A5FA" stopOpacity="0" />
            <stop offset="50%" stopColor="#60A5FA" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#60A5FA" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="lineGrad2" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#6366F1" stopOpacity="0" />
            <stop offset="50%" stopColor="#6366F1" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#6366F1" stopOpacity="0" />
          </linearGradient>
        </defs>
        <rect width="100%" height="100%" fill="url(#beam1)" />
        <rect width="100%" height="100%" fill="url(#beam2)" />
        <rect width="100%" height="100%" fill="url(#beam3)" />
        {/* Diagonal beams */}
        <line x1="-200" y1="-200" x2="800" y2="1100" stroke="url(#lineGrad1)" strokeWidth="1" />
        <line x1="200" y1="-200" x2="1200" y2="1100" stroke="url(#lineGrad1)" strokeWidth="0.5" />
        <line x1="600" y1="-200" x2="1600" y2="1100" stroke="url(#lineGrad2)" strokeWidth="1" />
        <line x1="900" y1="-200" x2="1900" y2="1100" stroke="url(#lineGrad2)" strokeWidth="0.5" />
        <line x1="-100" y1="200" x2="900" y2="1300" stroke="url(#lineGrad1)" strokeWidth="0.3" />
      </svg>
    </div>
  );
}
