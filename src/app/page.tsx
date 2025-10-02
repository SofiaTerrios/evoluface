'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

const menuItems = [
  { id: 1, title: 'EvoluFace', href: '/evoluface' },
  { id: 2, title: 'Linea de Tiempo', href: '/timeline' },
  { id: 3, title: 'Video', href: '#' },
  { id: 4, title: 'Cultura', href: '#' },
];

const LandingPage = () => {
  const [showMenu, setShowMenu] = useState(false);

  const handleTitleClick = () => {
    if (!showMenu) {
      setShowMenu(true);
    }
  };

  return (
    <main className="flex min-h-screen w-full flex-col items-center justify-center bg-background p-4 sm:p-8 text-center relative overflow-hidden">
      <motion.div
        layoutId="hominids-humanity-title"
        onClick={handleTitleClick}
        animate={showMenu ? { y: -250 } : { y: 0 }}
        transition={{ type: 'spring', stiffness: 200, damping: 30 }}
        className={`flex flex-col items-center ${!showMenu ? 'cursor-pointer' : ''}`}
      >
        <div className="mb-8 h-24 w-full relative">
          {!showMenu && (
             <Image
                src="/evolution.png"
                alt="Evolución humana"
                fill
                style={{ objectFit: 'contain' }}
                priority
              />
          )}
        </div>
        <div
          className="bg-card text-card-foreground font-headline py-3 px-6 rounded-lg shadow-lg hover:bg-primary hover:text-primary-foreground transition-colors"
        >
          HOMÍNIDOS Y HUMANIDAD
        </div>
      </motion.div>

      <AnimatePresence>
        {showMenu && (
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 mt-20">
            <div className="grid grid-cols-2 gap-8">
              {menuItems.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                >
                  <Link href={item.href} legacyBehavior>
                    <a className={`flex items-center justify-center w-32 h-32 rounded-full shadow-lg transition-colors
                      ${item.href === '#' ? 'bg-muted text-muted-foreground cursor-not-allowed' : 'bg-primary text-primary-foreground hover:bg-primary/90'}`}>
                      <span className="text-center font-headline">{item.title}</span>
                    </a>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </AnimatePresence>
    </main>
  );
};

export default LandingPage;
