'use client';

import type { HominidStageTimeline } from '@/lib/hominids';
import { motion } from 'framer-motion';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

const TOTAL_YEARS = 4; // Total span in millions of years for the timeline (e.g., 0 to 4 Ma)

const HominidBar = ({
  stage,
  index,
}: {
  stage: HominidStageTimeline;
  index: number;
}) => {
  const startPercent = (stage.startMa / TOTAL_YEARS) * 100;
  const widthPercent = ((stage.endMa - stage.startMa) / TOTAL_YEARS) * 100;

  const barColors = [
    'bg-chart-1',
    'bg-chart-2',
    'bg-chart-3',
    'bg-chart-4',
    'bg-chart-5',
  ];

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <motion.div
            className="relative h-10 flex items-center group cursor-pointer"
            style={{
              right: `${startPercent}%`,
              width: `${widthPercent}%`,
              top: `${index * 3.5}rem`, // Stagger vertically
            }}
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
          >
            <div
              className={`absolute inset-0 ${barColors[index % barColors.length]} rounded-md shadow-lg transition-all duration-300 group-hover:scale-105 group-hover:shadow-2xl opacity-80 group-hover:opacity-100 border-2 border-transparent group-hover:border-white/50`}
            />
            <span className="relative pl-3 text-sm font-bold text-white mix-blend-difference truncate">
              {stage.name}
            </span>
          </motion.div>
        </TooltipTrigger>
        <TooltipContent className="bg-background text-foreground border-primary">
          <p className="font-bold">{stage.name}</p>
          <p>{stage.years}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export const HominidTimeline = ({
  stages,
}: {
  stages: HominidStageTimeline[];
}) => {
  const totalHeight = stages.length * 3.5 + 4; // Calculate total height for the container

  return (
    <div className="w-full">
      {/* Timeline Axis & Labels */}
      <div className="relative h-8 mb-4">
        {[...Array(TOTAL_YEARS + 1)].map((_, i) => (
          <div
            key={i}
            className="absolute h-full flex flex-col items-center"
            style={{ left: `${(i / TOTAL_YEARS) * 100}%` }}
          >
            <span className="text-xs text-muted-foreground -translate-x-1/2">
              {i > 0 ? `${i} Ma` : 'Presente'}
            </span>
            <div className="h-4 w-px bg-border mt-1"></div>
          </div>
        ))}
         <div className="absolute top-1/2 left-0 w-full h-px bg-border -translate-y-1/2" />
      </div>

      {/* Hominid Bars Container */}
      <div className="relative" style={{ height: `${totalHeight}rem` }}>
        {stages.map((stage, index) => (
          <HominidBar key={stage.name} stage={stage} index={index} />
        ))}
      </div>
    </div>
  );
};
