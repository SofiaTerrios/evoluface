'use client';

import { motion } from 'framer-motion';
import type { HominidStage } from '@/lib/hominids';
import { Footprints } from 'lucide-react';

interface SpiralTimelineProps {
  hominids: HominidStage[];
}

const quadrantStyles = [
  // Bottom-left
  {
    textAnchor: 'end' as const,
    textPosition: { x: -0.5, y: 0.5 },
    path: (size: number) => `M 0,${-size} A ${size},${size} 0 0 0 ${size},0`,
  },
  // Top-left
  {
    textAnchor: 'end' as const,
    textPosition: { x: -0.5, y: -0.5 },
    path: (size: number) => `M ${size},0 A ${size},${size} 0 0 0 0,${size}`,
  },
  // Top-right
  {
    textAnchor: 'start' as const,
    textPosition: { x: 0.5, y: -0.5 },
    path: (size: number) => `M 0,${size} A ${size},${size} 0 0 0 ${-size},0`,
  },
  // Bottom-right
  {
    textAnchor: 'start' as const,
    textPosition: { x: 0.5, y: 0.5 },
    path: (size: number) => `M ${-size},0 A ${size},${size} 0 0 0 0,${-size}`,
  },
];

const SpiralTimeline = ({ hominids }: SpiralTimelineProps) => {
  const fibSequence = [1, 1, 2, 3, 5, 8, 13, 21].slice(0, hominids.length).reverse();
  const scale = 30;

  let currentX = 0;
  let currentY = 0;
  const positions = [];

  // Previous size needed for positioning
  let prevSize = 0;

  for (let i = 0; i < hominids.length; i++) {
    const size = fibSequence[i] * scale;
    const direction = i % 4;

    switch (direction) {
        case 0: // Bottom-left arc, from (0, -prev) to (size, 0)
            currentX = size;
            break;
        case 1: // Top-left arc, from (size, 0) to (0, size)
            currentY = size;
            break;
        case 2: // Top-right arc, from (0, size) to (-size, 0)
            currentX = -prevSize;
            currentY = size;
            break;
        case 3: // Bottom-right arc, from (-prev, size) to (0, -size)
            currentX = -prevSize;
            currentY = -size;
            break;
    }
     if (i > 0) {
      const prevDirection = (i - 1) % 4;
      if (prevDirection === 0) currentY += size;
      if (prevDirection === 1) currentX -= prevSize;
      if (prevDirection === 2) currentX -= size;
      if (prevDirection === 3) currentY -= prevSize;
    }


    positions.push({
      hominid: hominids[i],
      size: size,
      pathD: quadrantStyles[direction].path(size),
      transform: `translate(${currentX}, ${currentY})`,
      textAnchor: quadrantStyles[direction].textAnchor,
      textX: currentX + (quadrantStyles[direction].textPosition.x * size),
      textY: currentY + (quadrantStyles[direction].textPosition.y * size)
    });
     
    prevSize = size;
  }
  
  const allX = positions.flatMap(p => [p.textX-100, p.textX + 100]);
  const allY = positions.flatMap(p => [p.textY-50, p.textY + 50]);

  const minX = Math.min(...allX) - 50;
  const maxX = Math.max(...allX) + 50;
  const minY = Math.min(...allY) - 50;
  const maxY = Math.max(...allY) + 50;

  const totalWidth = maxX - minX;
  const totalHeight = maxY - minY;


  return (
     <div className="relative w-full h-full flex items-center justify-center p-4 md:p-12">
      <div className="absolute top-1/2 -left-4 -translate-y-1/2 transform -rotate-90">
        <span className="text-sm uppercase tracking-widest text-muted-foreground">Línea de Tiempo</span>
      </div>
       <div className="absolute left-1/2 top-0 -translate-x-1/2">
        <span className="text-sm uppercase tracking-widest text-muted-foreground">Evolución</span>
      </div>
      <svg
        viewBox={`${minX} ${minY} ${totalWidth} ${totalHeight}`}
        className="absolute w-full h-full overflow-visible"
      >
        <g>
          {positions.map((p, i) => (
            <g key={p.hominid.name} transform={p.transform}>
              <motion.path
                d={p.pathD}
                fill="none"
                stroke="hsl(var(--border))"
                strokeWidth="2"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ delay: i * 0.4, duration: 0.5, ease: 'easeInOut' }}
              />
              <motion.g
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: i * 0.4 + 0.4, duration: 0.3 }}
              >
                  <circle
                    cx={ p.size / Math.sqrt(2) * ( i % 4 === 0 || i % 4 === 1 ? 1 : -1 ) }
                    cy={ p.size / Math.sqrt(2) * ( i % 4 === 1 || i % 4 === 2 ? 1 : -1 ) }
                    r="10"
                    fill="hsl(var(--primary))"
                    stroke="hsl(var(--background))"
                    strokeWidth="4"
                  />
                   <Footprints className="w-3 h-3 text-primary-foreground" 
                    x={ p.size / Math.sqrt(2) * ( i % 4 === 0 || i % 4 === 1 ? 1 : -1 ) - 6}
                    y={ p.size / Math.sqrt(2) * ( i % 4 === 1 || i % 4 === 2 ? 1 : -1 ) - 6}
                   />
              </motion.g>
              <foreignObject
                  x={ (quadrantStyles[i%4].textPosition.x * p.size) - 100 }
                  y={ (quadrantStyles[i%4].textPosition.y * p.size) - 50 }
                  width="200" 
                  height="100"
                  style={{overflow: 'visible'}}
              >
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.4 + 0.3, duration: 0.4 }}
                    className="w-full h-full"
                >
                    <div
                        style={{
                            textAlign: p.textAnchor,
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            height: '100%',
                            padding: '10px'
                        }}
                    >
                        <p className="font-headline text-base font-bold text-primary">{p.hominid.name}</p>
                        <p className="text-xs text-muted-foreground">{p.hominid.years}</p>
                    </div>
                </motion.div>
              </foreignObject>
            </g>
          ))}
        </g>
      </svg>
    </div>
  );
};

export default SpiralTimeline;
