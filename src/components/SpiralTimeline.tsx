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
    textAnchor: 'end',
    transform: 'translate(-10px, -10px)',
    path: (size: number) => `M ${size},0 A ${size},${size} 0 0 0 0,${size}`,
  },
  // Top-left
  {
    textAnchor: 'end',
    transform: 'translate(-10px, 10px) translateY(1em)',
    path: (size: number) => `M 0,-${size} A ${size},${size} 0 0 0 -${size},0`,
  },
  // Top-right
  {
    textAnchor: 'start',
    transform: 'translate(10px, 10px) translateY(1em)',
    path: (size: number) => `M -${size},0 A ${size},${size} 0 0 0 0,-${size}`,
  },
  // Bottom-right
  {
    textAnchor: 'start',
    transform: 'translate(10px, -10px)',
    path: (size: number) => `M 0,${size} A ${size},${size} 0 0 0 ${size},0`,
  },
];

const SpiralTimeline = ({ hominids }: SpiralTimelineProps) => {
  const fibSequence = [1, 2, 3, 5, 8, 13, 21, 34].slice(0, hominids.length).reverse();
  const scale = 25;

  let currentX = 0;
  let currentY = 0;
  const positions = [];

  for (let i = 0; i < hominids.length; i++) {
    const size = fibSequence[i] * scale;
    const direction = i % 4;

    let textX = currentX;
    let textY = currentY;
    let pathX = currentX;
    let pathY = currentY;
    
    let nextX = currentX;
    let nextY = currentY;

    if (direction === 0) { // Bottom-left -> move left by `size`
      textX -= size / 2;
      textY += size / 2;
      nextX -= size;
    } else if (direction === 1) { // Top-left -> move up by `size`
      pathX -= size;
      textX -= size / 2;
      textY -= size / 2;
      nextY -= size;
    } else if (direction === 2) { // Top-right -> move right by `size`
       pathX -= size;
       pathY -= size;
       textX += size / 2;
       textY -= size / 2;
       nextX += size;
    } else if (direction === 3) { // Bottom-right -> move down by `size`
       pathY -= size;
       textX += size / 2;
       textY += size / 2;
       nextY += size;
    }
    
    const quadrant = quadrantStyles[direction];

    positions.push({
      hominid: hominids[i],
      size: size,
      textX,
      textY,
      pathX,
      pathY,
      quadrant,
    });
    
    currentX = nextX;
    currentY = nextY;
  }
  
  const totalWidth = Math.max(...positions.map(p => Math.abs(p.textX))) * 2.2;
  const totalHeight = Math.max(...positions.map(p => Math.abs(p.textY))) * 2.2;

  return (
     <div className="relative w-full h-full flex items-center justify-center">
      <div className="absolute top-1/2 -left-4 -translate-y-1/2 transform -rotate-90">
        <span className="text-sm uppercase tracking-widest text-muted-foreground">Línea de Tiempo</span>
      </div>
       <div className="absolute left-1/2 -top-4 -translate-x-1/2">
        <span className="text-sm uppercase tracking-widest text-muted-foreground">Evolución</span>
      </div>
      <svg
        viewBox={`${-totalWidth / 2} ${-totalHeight / 2} ${totalWidth} ${totalHeight}`}
        className="absolute w-full h-full overflow-visible"
      >
        <g>
          {positions.map((p, i) => (
            <g key={p.hominid.name}>
              <motion.path
                d={p.quadrant.path(p.size)}
                transform={`translate(${p.pathX}, ${p.pathY})`}
                fill="none"
                stroke="hsl(var(--border))"
                strokeWidth="2"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ delay: i * 0.4, duration: 0.5, ease: 'easeInOut' }}
              />
              <motion.circle
                cx={p.pathX + (p.size * (p.quadrant.path(1).includes('A 1,1 0 0 0 -1,0') ? -1 : 1) / Math.sqrt(2))}
                cy={p.pathY + (p.size * (p.quadrant.path(1).includes('M 0,-1') || p.quadrant.path(1).includes('A 1,1 0 0 0 0,-1') ? -1 : 1) / Math.sqrt(2))}
                r="10"
                fill="hsl(var(--primary))"
                stroke="hsl(var(--background))"
                strokeWidth="4"
                 initial={{ scale: 0, opacity: 0 }}
                 animate={{ scale: 1, opacity: 1 }}
                 transition={{ delay: i * 0.4 + 0.4, duration: 0.3 }}
              >
                  <Footprints className="w-3 h-3 text-primary-foreground" />
              </motion.circle>
                 <foreignObject
                    x={p.textX - 100} 
                    y={p.textY - 50} 
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
                            textAlign: p.quadrant.textAnchor === 'end' ? 'right' : 'left',
                            transform: p.quadrant.transform,
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            height: '100%'
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
