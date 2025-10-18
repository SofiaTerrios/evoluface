'use client';

import { motion } from 'framer-motion';

export default function SpiralPath() {
  return (
    <svg className="absolute inset-0 w-full h-full" viewBox="0 0 500 500">
      <defs>
        <linearGradient
          id="spiralGradient"
          x1="0%"
          y1="0%"
          x2="100%"
          y2="100%"
        >
          <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.6" />
          <stop offset="50%" stopColor="hsl(var(--accent))" stopOpacity="0.6" />
          <stop offset="100%" stopColor="hsl(var(--secondary))" stopOpacity="0.6" />
        </linearGradient>
      </defs>

      <motion.path
        d="M 250 250 m -40 0 a 40 40 0 1 1 80 0 a 80 80 0 1 1 -160 0 a 120 120 0 1 1 240 0 a 160 160 0 1 1 -320 0 a 200 200 0 1 1 400 0 a 240 240 0 1 1 -480 0"
        fill="none"
        stroke="url(#spiralGradient)"
        strokeWidth="2"
        strokeDasharray="4,6"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{
          pathLength: 1,
          opacity: 0.7,
        }}
        transition={{
          pathLength: { duration: 4, ease: 'easeInOut' },
          opacity: { duration: 1, delay: 0.5 },
        }}
      />

       {[60, 120, 180, 240].map((radius, i) => (
        <motion.circle
          key={i}
          cx="250"
          cy="250"
          r={radius}
          fill="none"
          stroke="hsl(var(--border) / 0.5)"
          strokeWidth="1"
          strokeDasharray="1,8"
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            opacity: 0.3,
            scale: 1,
            rotate: 360,
          }}
          transition={{
            opacity: { delay: 1 + i * 0.3 },
            scale: { delay: 1 + i * 0.3 },
            rotate: {
              duration: 40 + i * 20,
              repeat: Infinity,
              ease: 'linear',
            },
          }}
        />
      ))}
    </svg>
  );
}
