'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { HominidStage } from '@/lib/hominids';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Footprints } from 'lucide-react';

interface SpiralTimelineProps {
  hominids: HominidStage[];
}

interface Point {
  x: number;
  y: number;
}

const SpiralTimeline = ({ hominids }: SpiralTimelineProps) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const numPoints = hominids.length;
  const a = 0; // Center offset
  const b = 25; // Spiral density / distance between arms
  const angleStep = (Math.PI * 2) / 1.618; // Use golden angle for nice distribution

  const points: Point[] = hominids.map((_, i) => {
    // Increase angle for each point
    const angle = i * angleStep;
    // Radius grows as angle increases
    const radius = a + b * Math.sqrt(angle); // Use sqrt for a tighter center
    const x = radius * Math.cos(angle);
    const y = radius * Math.sin(angle);
    return { x, y };
  });

  // Create a smooth path through all points
  const svgPath = points
    .map((p, i) => {
      if (i === 0) return `M ${p.x} ${p.y}`;
      const prev = points[i-1];
      // Create a bezier curve to the next point
      const midX = (prev.x + p.x) / 2;
      const midY = (prev.y + p.y) / 2;
      return `Q ${prev.x} ${prev.y}, ${midX} ${midY} T ${p.x} ${p.y}`;
    })
    .join(' ');
  

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <svg
        viewBox="-400 -400 800 800"
        className="absolute w-full h-full"
        style={{ transform: 'scale(1.2) rotate(-90deg)' }}
      >
        <motion.path
          d={svgPath}
          fill="none"
          stroke="hsl(var(--border))"
          strokeWidth="2"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 3, ease: 'easeInOut' }}
        />
      </svg>
      {points.map((point, i) => (
        <motion.div
          key={hominids[i].name}
          className="absolute"
          style={{
            width: 180,
            height: 120,
            x: point.x,
            y: point.y,
          }}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: i * 0.2 + 1, duration: 0.5 }}
          onHoverStart={() => setHoveredIndex(i)}
          onHoverEnd={() => setHoveredIndex(null)}
        >
          <motion.div
            animate={{
              scale: hoveredIndex === i ? 1.2 : 1,
              zIndex: hoveredIndex === i ? 10 : 1,
            }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            className="relative w-full h-full"
          >
            <Card className="w-full h-full shadow-lg bg-card/80 backdrop-blur-sm text-card-foreground p-2 flex flex-col justify-center">
              <CardHeader className="p-2 text-center">
                <CardTitle className="font-headline text-sm text-primary">
                  {hominids[i].name}
                </CardTitle>
              </CardHeader>
              <CardContent className="p-2 text-center">
                <p className="text-xs text-muted-foreground">{hominids[i].years}</p>
              </CardContent>
            </Card>
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-primary flex items-center justify-center border-2 border-background">
                <Footprints className="w-3 h-3 text-primary-foreground" />
            </div>
          </motion.div>
        </motion.div>
      ))}
    </div>
  );
};

export default SpiralTimeline;
