'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

const LandingPage = () => {
  const [showLanding, setShowLanding] = useState(true);
  const router = useRouter();

  const handleEnter = () => {
    setShowLanding(false);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
        if (!showLanding) {
            router.push('/menu');
        }
    }, 1000); 
    return () => clearTimeout(timer);
  }, [showLanding, router]);


  return (
    <AnimatePresence>
      {showLanding && (
        <motion.main
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: -100 }}
          transition={{ duration: 1, ease: 'easeInOut' }}
          className="flex min-h-screen w-full flex-col items-center justify-center bg-background p-4 sm:p-8 text-center"
        >
          <div className="absolute top-16">
            <div className="w-48 h-12 bg-card rounded-lg mx-auto"></div>
          </div>

          <motion.div 
            layoutId="hominids-humanity-title"
            className="flex flex-col items-center"
            >
            <Image
              src="/evolution.png"
              alt="Evolución Humana"
              width={400}
              height={100}
              className="mb-8"
              data-ai-hint="human evolution"
            />
            <button
              onClick={handleEnter}
              className="bg-card text-card-foreground font-headline py-3 px-6 rounded-lg shadow-lg hover:bg-primary hover:text-primary-foreground transition-colors"
            >
              HOMÍNIDOS Y HUMANIDAD
            </button>
          </motion.div>
        </motion.main>
      )}
    </AnimatePresence>
  );
};

export default LandingPage;
