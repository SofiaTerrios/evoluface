'use client';

import { motion } from 'framer-motion';
import type { HominidStage } from '@/lib/hominids';
import { Footprints } from 'lucide-react';

interface SpiralTimelineProps {
  hominids: HominidStage[];
}

// Based on Fibonacci sequence for quadrant sizes
const FIB_SEQUENCE = [1, 1, 2, 3, 5, 8, 13, 21];

const SpiralTimeline = ({ hominids }: SpiralTimelineProps) => {
  const quadrants = [];
  let x = 0;
  let y = 0;
  const scale = 50; // Increased scale for a larger spiral

  const hominidsToDisplay = hominids.slice(0, FIB_SEQUENCE.length);

  for (let i = 0; i < hominidsToDisplay.length; i++) {
    const direction = i % 4;
    const size = FIB_SEQUENCE[i] * scale;

    let quadrantX = x;
    let quadrantY = y;
    let arcStartX, arcStartY, arcEndX, arcEndY;
    let textAnchor: 'start' | 'end' | 'middle' = 'start';
    let textOffset = { x: 0, y: 0 };

    switch (direction) {
      case 0: // Bottom-right
        arcStartX = x;
        arcStartY = y + size;
        arcEndX = x + size;
        arcEndY = y;
        x += size;
        textAnchor = 'end';
        textOffset = { x: -20, y: 0 };
        break;
      case 1: // Top-right
        quadrantY = y - size;
        arcStartX = x - size;
        arcStartY = y;
        arcEndX = x;
        arcEndY = y - size;
        y -= size;
        textAnchor = 'end';
        textOffset = { x: -20, y: 20 };
        break;
      case 2: // Top-left
        quadrantX = x - size;
        quadrantY = y;
        arcStartX = x;
        arcStartY = y + size;
        arcEndX = x - size;
        arcEndY = y;
        x -= size;
        textAnchor = 'start';
        textOffset = { x: 20, y: 20 };
        break;
      case 3: // Bottom-left
        quadrantX = x;
        quadrantY = y;
        arcStartX = x + size;
        arcStartY = y;
        arcEndX = x;
        arcEndY = y + size;
        y += size;
        textAnchor = 'start';
        textOffset = { x: 20, y: 0 };
        break;
      default: // Should not happen
        arcStartX=0; arcStartY=0; arcEndX=0; arcEndY=0;
    }

    quadrants.push({
      hominid: hominidsToDisplay[i],
      size: size,
      qX: quadrantX,
      qY: quadrantY,
      pathD: `M ${arcStartX} ${arcStartY} A ${size} ${size} 0 0 1 ${arcEndX} ${arcEndY}`,
      markerPos: {
          x: (arcStartX + arcEndX) / 2 + (direction === 1 || direction === 2 ? size/2 : -size/2) * (Math.sqrt(2)-1),
          y: (arcStartY + arcEndY) / 2 + (direction === 2 || direction === 3 ? -size/2 : size/2) * (Math.sqrt(2)-1)
      },
      textPos: {
          x: quadrantX + size / 2,
          y: quadrantY + size / 2,
      },
      textAnchor: textAnchor,
    });
  }

  // Calculate viewBox to fit all elements
  const allX = quadrants.flatMap(p => [p.qX, p.qX + p.size]);
  const allY = quadrants.flatMap(p => [p.qY, p.qY + p.size]);
  const minX = Math.min(...allX);
  const maxX = Math.max(...allX);
  const minY = Math.min(...allY);
  const maxY = Math.max(...allY);
  const padding = 100;

  const totalWidth = maxX - minX + padding * 2;
  const totalHeight = maxY - minY + padding * 2;
  const viewBox = `${minX - padding} ${minY - padding} ${totalWidth} ${totalHeight}`;

  return (
    <div className="relative w-full h-full flex items-center justify-center p-4 md:p-12">
        <div className="absolute top-1/2 -left-4 -translate-y-1/2 transform -rotate-90">
            <span className="text-sm uppercase tracking-widest text-muted-foreground">Línea de Tiempo</span>
        </div>
        <div className="absolute left-1/2 top-0 -translate-x-1/2">
            <span className="text-sm uppercase tracking-widest text-muted-foreground">Evolución</span>
        </div>
      <svg
        viewBox={viewBox}
        className="w-full h-full overflow-visible"
      >
        <g>
          {quadrants.map((p, i) => (
            <motion.g
                key={p.hominid.name}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: i * 0.2 }}
            >
              {/* Optional: Draw the fibonacci squares for reference */}
              {/* <rect
                x={p.qX}
                y={p.qY}
                width={p.size}
                height={p.size}
                fill="rgba(255,255,255,0.05)"
                stroke="rgba(255,255,255,0.1)"
              /> */}

              <motion.path
                d={p.pathD}
                fill="none"
                stroke="hsl(var(--border))"
                strokeWidth="2"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ delay: i * 0.3, duration: 0.5, ease: 'easeInOut' }}
              />

              <motion.g
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: i * 0.3 + 0.4, duration: 0.3 }}
              >
                <circle
                  cx={p.markerPos.x}
                  cy={p.markerPos.y}
                  r="12"
                  fill="hsl(var(--primary))"
                  stroke="hsl(var(--background))"
                  strokeWidth="4"
                />
                <Footprints
                  className="w-4 h-4 text-primary-foreground"
                  x={p.markerPos.x - 8}
                  y={p.markerPos.y - 8}
                />
              </motion.g>

              <motion.g
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.3 + 0.3, duration: 0.4 }}
              >
                  <text
                    x={p.textPos.x}
                    y={p.textPos.y - 10}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    className="font-headline text-2xl font-bold fill-primary"
                  >
                    {p.hominid.name}
                  </text>
                  <text
                    x={p.textPos.x}
                    y={p.textPos.y + 20}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    className="text-base fill-muted-foreground"
                  >
                    {p.hominid.years}
                  </text>
              </motion.g>
            </motion.g>
          ))}
        </g>
      </svg>
    </div>
  );
};

export default SpiralTimeline;
