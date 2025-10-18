'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { Search, Bone, Footprints, Layers, Microscope, HandMetal } from 'lucide-react';

const menuItems = [
  { id: 1, title: 'EvoluFace', href: '/evoluface', icon: Bone },
  { id: 2, title: 'Linea de Tiempo', href: '/timeline', icon: Footprints },
  { id: 3, title: 'Videos por Capas', href: '/cultura', icon: Layers },
  { id: 4, title: 'Descubrimientos', href: '/hominids', icon: Microscope },
  { id: 6, title: 'Arqueología', href: '/archeology', icon: HandMetal },
  { id: 5, title: 'Buscar', href: '/search', icon: Search },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: 'spring',
      stiffness: 100,
    },
  },
};

const LandingPage = () => {
  const [showMenu, setShowMenu] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowMenu(true);
    }, 1500); // Delay before starting the animation

    return () => clearTimeout(timer);
  }, []);

  return (
    <main className="flex min-h-screen w-full flex-col items-center justify-center bg-background p-4 sm:p-8 text-center relative overflow-hidden">
      <motion.div
        animate={{ y: showMenu ? -100 : 0 }}
        transition={{ duration: 0.8, ease: 'easeInOut' }}
        className="flex flex-col items-center"
      >
        <div className="mb-6 h-20 w-full relative">
          <Image
            src="/evolution.png"
            alt="Evolución humana"
            fill
            className="object-contain"
            priority
          />
        </div>
        <div
          className="bg-card text-card-foreground font-headline py-2 px-5 rounded-lg shadow-lg text-sm"
        >
          HOMÍNIDOS Y HUMANIDAD
        </div>
      </motion.div>

      <AnimatePresence>
        {showMenu && (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="absolute top-1/2 mt-12 flex flex-col items-center gap-6 w-full max-w-xs"
          >
            {menuItems.map((item) => (
              <motion.div
                key={item.id}
                variants={itemVariants}
                className="w-full"
              >
                <Link
                  href={item.href}
                  className={`flex items-center justify-start w-full h-16 px-6 rounded-full shadow-lg transition-all duration-300
                             ${item.title === 'Buscar' 
                                ? 'bg-accent text-accent-foreground hover:bg-accent/90' 
                                : 'bg-primary text-primary-foreground hover:bg-primary/90'}
                             hover:scale-105 active:scale-100`}
                >
                  <item.icon className="h-6 w-6 mr-4" />
                  <span className="text-lg font-headline">{item.title}</span>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
};

export default LandingPage;
