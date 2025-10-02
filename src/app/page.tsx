'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

const LandingPage = () => {
  const [isExiting, setIsExiting] = useState(false);
  const router = useRouter();

  const handleEnter = () => {
    setIsExiting(true);
  };

  useEffect(() => {
    if (isExiting) {
      const timer = setTimeout(() => {
        router.push('/menu');
      }, 700); // Duración de la animación de salida
      return () => clearTimeout(timer);
    }
  }, [isExiting, router]);


  return (
    <AnimatePresence>
      {!isExiting && (
        <motion.main
          initial={{ opacity: 1 }}
          exit={{ y: '-100vh', opacity: 0 }}
          transition={{ duration: 0.7, ease: 'easeInOut' }}
          className="flex min-h-screen w-full flex-col items-center justify-center bg-background p-4 sm:p-8 text-center"
        >
          <div className="absolute top-16">
            <div className="w-48 h-12 bg-card rounded-lg mx-auto opacity-0"></div>
          </div>

          <motion.div 
            layoutId="hominids-humanity-title"
            className="flex flex-col items-center cursor-pointer"
            onClick={handleEnter}
            >
            <Image
              src="/evolution.png"
              alt="Evolución Humana"
              width={400}
              height={100}
              className="mb-8"
              data-ai-hint="human evolution"
              priority
            />
            <div
              className="bg-card text-card-foreground font-headline py-3 px-6 rounded-lg shadow-lg hover:bg-primary hover:text-primary-foreground transition-colors"
            >
              HOMÍNIDOS Y HUMANIDAD
            </div>
          </motion.div>
        </motion.main>
      )}
    </AnimatePresence>
  );
};

export default LandingPage;
