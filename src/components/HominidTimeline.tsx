'use client';

import type { HominidStage } from '@/lib/hominids';
import { motion } from 'framer-motion';

type TimelineStage = HominidStage & {
  start: number;
  end: number;
};

// Simple function to parse year strings like "Hace 3.9 – 2.9 millones de años"
const parseYears = (yearString: string): { start: number; end: number } => {
  if (yearString.includes('presente')) {
    const startMatch = yearString.match(/(\d{3}),000/);
    const start = startMatch ? parseFloat(startMatch[1]) / 1000 : 0;
    return { start, end: 0 };
  }

  const numbers = yearString.match(/(\d+\.?\d*)/g);
  if (!numbers || numbers.length < 2) {
    const singleNumberMatch = yearString.match(/(\d{3}),000/);
     if (singleNumberMatch) {
        const val = parseFloat(singleNumberMatch[1]) / 1000;
        return {start: val, end: val - 0.1}; // Assume a short period for single values
    }
    return { start: 0, end: 0 };
  }

  const isMillions = yearString.includes('millones');
  const factor = isMillions ? 1 : 0.001;

  const n1 = parseFloat(numbers[0].replace(',', '.'));
  const n2 = parseFloat(numbers[1].replace(',', '.'));

  return {
    start: Math.max(n1, n2) * factor,
    end: Math.min(n1, n2) * factor,
  };
};

const colors = [
  'bg-chart-1',
  'bg-chart-2',
  'bg-chart-3',
  'bg-chart-4',
  'bg-chart-5',
  'bg-indigo-500',
  'bg-pink-500',
];

export const HominidTimeline = ({ stages }: { stages: HominidStage[] }) => {
  const timelineData: TimelineStage[] = stages.map(stage => ({
    ...stage,
    ...parseYears(stage.years),
  })).sort((a, b) => b.start - a.start);

  const totalDuration = timelineData[0]?.start || 4; // Max time ago in millions
  const timelineHeight = 2000; // px

  return (
    <div className="relative w-full" style={{ height: `${timelineHeight}px` }}>
      {/* Central timeline axis */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-0.5 h-full bg-border" />
      
      {/* Time markers */}
      {Array.from({ length: Math.floor(totalDuration) + 1 }).map((_, i) => {
          const year = Math.floor(totalDuration) - i;
          const topPosition = (i / totalDuration) * 100;
          return (
              <div key={`marker-${year}`} className="absolute w-full" style={{top: `${topPosition}%`}}>
                  <div className="absolute left-1/2 -translate-x-[calc(100%+1rem)] text-right text-sm text-muted-foreground pr-2 w-28">
                      Hace {year} M.A.
                  </div>
                  <div className="absolute left-1/2 w-2 h-0.5 bg-border -translate-x-1/2"/>
              </div>
          )
      })}
       <div className="absolute w-full" style={{top: `100%`}}>
            <div className="absolute left-1/2 -translate-x-[calc(100%+1rem)] text-right text-sm text-muted-foreground pr-2 w-28">
                Presente
            </div>
            <div className="absolute left-1/2 w-2 h-0.5 bg-border -translate-x-1/2"/>
        </div>


      {/* Hominid bars */}
      <div className="relative h-full">
        {timelineData.map((stage, index) => {
          const top = ((totalDuration - stage.start) / totalDuration) * 100;
          const height = ((stage.start - stage.end) / totalDuration) * 100;
          const side = index % 2 === 0 ? 'left' : 'right';

          return (
            <motion.div
              key={stage.name}
              initial={{ opacity: 0, x: side === 'left' ? -50 : 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="absolute group"
              style={{
                top: `${top}%`,
                height: `${height}%`,
                left: side === 'left' ? '5%' : '55%',
                width: '40%',
              }}
            >
              <div className={`h-full p-2 rounded-lg shadow-md flex items-center justify-center ${colors[index % colors.length]}`}>
                <div className="text-center text-primary-foreground">
                    <p className="font-bold text-sm md:text-base">{stage.name}</p>
                    <p className="text-xs hidden sm:block">{stage.years}</p>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};
