'use client';

import type { HominidStage } from '@/lib/hominids';
import { motion } from 'framer-motion';
import { Leaf } from 'lucide-react';

const TimelineCard = ({
  stage,
  index,
}: {
  stage: HominidStage;
  index: number;
}) => {
  const side = index % 2 === 0 ? 'left' : 'right';

  const cardVariants = {
    hidden: { opacity: 0, x: side === 'left' ? -50 : 50 },
    visible: { opacity: 1, x: 0 },
  };

  return (
    <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-4">
      {/* Card Section */}
      <div className={`${side === 'left' ? 'col-start-1' : 'col-start-3'} ${side === 'right' ? 'text-left' : 'text-right'}`}>
        <motion.div
          variants={cardVariants}
          className="bg-card/80 backdrop-blur-sm p-6 rounded-lg shadow-md border border-black/5"
        >
          <h3 className="font-headline text-xl font-bold text-primary">{stage.name}</h3>
          <p className="text-sm text-muted-foreground mt-1">{stage.years}</p>
          <p className="text-sm text-card-foreground/80 mt-4">{stage.facialFeatures}</p>
        </motion.div>
      </div>

      {/* Timeline Axis Elements */}
      <div className="col-start-2 flex flex-col items-center h-full">
         <div className="h-full w-0.5 bg-[#d3cbb9]" />
         <div className="relative my-4">
            <div className="absolute inset-0.5 rounded-full bg-[#f4f1e9]"></div>
            <Leaf className="h-6 w-6 text-green-800/70 relative" />
         </div>
         <div className="h-full w-0.5 bg-[#d3cbb9]" />
      </div>

      {/* Empty space filler */}
      <div className="col-start-auto"></div>
    </div>
  );
};


export const HominidTimeline = ({ stages }: { stages: HominidStage[] }) => {
  return (
    <div className="relative w-full max-w-3xl mx-auto">
        {/* Draw the main line behind the cards */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-0.5 bg-[#d3cbb9] h-full" />
        
        <motion.div
            initial="hidden"
            animate="visible"
            variants={{
                visible: {
                transition: {
                    staggerChildren: 0.3,
                },
                },
            }}
            className="flex flex-col gap-12"
        >
            {stages.map((stage, index) => (
                <TimelineCard key={stage.name} stage={stage} index={index} />
            ))}
      </motion.div>
    </div>
  );
};