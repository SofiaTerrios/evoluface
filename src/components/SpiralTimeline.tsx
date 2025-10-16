'use client';

import { motion } from 'framer-motion';
import type { HominidStage } from '@/lib/hominids';
import { Footprints } from 'lucide-react';

interface SpiralTimelineProps {
  hominids: HominidStage[];
}

const SpiralTimeline = ({ hominids }: SpiralTimelineProps) => {
  const quadrants = [];
  let x = 0;
  let y = 0;
  const scale = 80; // Increased scale for a larger, more readable spiral
  const fibSequence = [1, 1, 2, 3, 5, 8, 13, 21]; 
  const hominidsToDisplay = hominids.slice(0, fibSequence.length);

  for (let i = 0; i < hominidsToDisplay.length; i++) {
    const direction = i % 4;
    const size = fibSequence[i] * scale;
    let pathD, markerPos, textPos;
    let textAnchor: 'start' | 'end' | 'middle' = 'middle';
    
    switch (direction) {
      case 0: // Bottom-right
        pathD = `M ${x} ${y + size} A ${size} ${size} 0 0 1 ${x + size} ${y}`;
        markerPos = { x: x + size * 0.5, y: y + size * 0.5 };
        textPos = { x: x + size / 2, y: y + size / 2 };
        textAnchor = 'middle';
        x += size;
        break;
      case 1: // Top-right
        pathD = `M ${x - size} ${y} A ${size} ${size} 0 0 1 ${x} ${y - size}`;
        markerPos = { x: x - size * 0.5, y: y - size * 0.5 };
        textPos = { x: x - size / 2, y: y - size / 2 };
        textAnchor = 'middle';
        y -= size;
        break;
      case 2: // Top-left
        pathD = `M ${x} ${y + size} A ${size} ${size} 0 0 1 ${x - size} ${y}`;
        markerPos = { x: x - size * 0.5, y: y + size * 0.5 };
        textPos = { x: x - size / 2, y: y + size / 2 };
        textAnchor = 'middle';
        x -= size;
        break;
      case 3: // Bottom-left
        pathD = `M ${x + size} ${y} A ${size} ${size} 0 0 1 ${x} ${y + size}`;
        markerPos = { x: x + size * 0.5, y: y + size * 0.5 };
        textPos = { x: x + size / 2, y: y + size / 2 };
        textAnchor = 'middle';
        y += size;
        break;
      default:
        pathD = '';
        markerPos = {x: 0, y: 0};
        textPos = {x: 0, y: 0};
    }

    quadrants.push({
      hominid: hominidsToDisplay[i],
      pathD,
      markerPos,
      textPos,
      textAnchor,
    });
  }

  // Calculate viewBox to fit all elements
  const allX = quadrants.flatMap(p => [p.markerPos.x, p.textPos.x]);
  const allY = quadrants.flatMap(p => [p.markerPos.y, p.textPos.y]);
  const minX = Math.min(...allX, 0);
  const maxX = Math.max(...allX, 0);
  const minY = Math.min(...allY, 0);
  const maxY = Math.max(...allY, 0);
  const padding = 150;

  const totalWidth = maxX - minX + padding * 2;
  const totalHeight = maxY - minY + padding * 2;
  const viewBox = `${minX - padding} ${minY - padding} ${totalWidth} ${totalHeight}`;

  return (
    <div className="relative w-full h-full flex items-center justify-center p-4 md:p-12">
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
                    y={p.textPos.y - 12}
                    textAnchor={p.textAnchor}
                    dominantBaseline="middle"
                    className="font-headline text-3xl font-bold fill-primary"
                  >
                    {p.hominid.name}
                  </text>
                  <text
                    x={p.textPos.x}
                    y={p.textPos.y + 18}
                    textAnchor={p.textAnchor}
                    dominantBaseline="middle"
                    className="text-lg fill-muted-foreground"
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
