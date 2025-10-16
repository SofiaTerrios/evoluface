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
  const b = 25; // Spiral density
  const angleStep = Math.PI; // Controls how tight the spiral is, 2*PI is a full circle

  const points: Point[] = hominids.map((_, i) => {
    const angle = i * angleStep;
    const radius = b * (1 + angle);
    const x = radius * Math.cos(angle);
    const y = radius * Math.sin(angle);
    return { x, y };
  });

  const svgPath = points
    .map((p, i) => {
      if (i === 0) return `M ${p.x} ${p.y}`;
      const prev = points[i-1];
      const cx1 = prev.x + (p.x - prev.x) * 0.5;
      const cy1 = prev.y;
      const cx2 = prev.x + (p.x - prev.x) * 0.5;
      const cy2 = p.y;
      return `C ${cx1} ${cy1}, ${cx2} ${cy2}, ${p.x} ${p.y}`;
    })
    .join(' ');
  

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <svg
        viewBox="-400 -400 800 800"
        className="absolute w-full h-full"
        style={{ transform: 'scale(1.2)' }}
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
