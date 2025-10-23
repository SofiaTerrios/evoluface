'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence, useAnimation } from 'framer-motion';
import Image from 'next/image';
import {
  Search,
  Bone,
  Footprints,
  Layers,
  Microscope,
  HandMetal,
} from 'lucide-react';
import { PlaceHolderImages } from '@/lib/placeholder-images';

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
  const controls = useAnimation();
  const mainImage = PlaceHolderImages.find(p => p.id === 'main-logo');

  const handleDragEnd = async (event: any, info: any) => {
    if (info.offset.y < -50) {
      // If dragged up enough
      await controls.start({
        y: '-50vh', // Move up by 50% of the viewport height
        opacity: 0,
        transition: { duration: 0.4, ease: 'easeInOut' },
      });
      setShowMenu(true);
    } else {
      // Snap back if not dragged enough
      controls.start({ y: 0, opacity: 1, transition: { duration: 0.4, ease: 'easeInOut' } });
    }
  };

  return (
    <main className="flex min-h-screen w-full flex-col items-center justify-center bg-background p-4 sm:p-8 text-center relative overflow-hidden">
      <AnimatePresence>
        {!showMenu && (
          <motion.div
            drag="y"
            dragConstraints={{ top: -300, bottom: 0 }}
            onDragEnd={handleDragEnd}
            animate={controls}
            initial={{ y: 0, opacity: 1 }}
            exit={{ y: '-50vh', opacity: 0 }}
            dragElastic={{ top: 0.8, bottom: 0.1 }}
            className="flex flex-col items-center cursor-grab active:cursor-grabbing z-10"
          >
            <div className="mb-6 h-20 w-full relative">
              {mainImage && (
                <Image
                  src={mainImage.imageUrl}
                  alt={mainImage.description}
                  data-ai-hint={mainImage.imageHint}
                  fill
                  className="object-contain"
                  priority
                />
              )}
            </div>
            <div className="bg-card text-card-foreground font-headline py-2 px-5 rounded-lg shadow-lg text-sm">
              HOMÍNIDOS Y HUMANIDAD
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showMenu && (
          <motion.div
            key="menu"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="absolute inset-0 flex flex-col items-center justify-center gap-4 w-full max-w-xs"
          >
            {menuItems.map(item => (
              <motion.div
                key={item.id}
                variants={itemVariants}
                className="w-full"
              >
                <Link
                  href={item.href}
                  className={`flex items-center justify-start w-full h-14 px-6 rounded-full shadow-lg transition-all duration-300
                             ${
                               item.title === 'Buscar'
                                 ? 'bg-accent text-accent-foreground hover:bg-accent/90'
                                 : 'bg-primary text-primary-foreground hover:bg-primary/90'
                             }
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
