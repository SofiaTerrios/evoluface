'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, useAnimation } from 'framer-motion';
import Image from 'next/image';
import {
  Search,
  Bone,
  Footprints,
  Layers,
  Microscope,
  HandMetal,
  Camera,
} from 'lucide-react';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import UserProfile from '@/components/UserProfile';

const menuItems = [
  { id: 1, title: 'EvoluFace', href: '/evoluface', icon: Bone },
  { id: 2, title: 'Linea de Tiempo', href: '/timeline', icon: Footprints },
  { id: 3, title: 'Videos por Capas', href: '/cultura', icon: Layers },
  { id: 4, title: 'Descubrimientos', href: '/hominids', icon: Microscope },
  { id: 6, title: 'Arqueología', href: '/archeology', icon: HandMetal },
  { id: 7, title: 'Cámara IA', href: '/camera', icon: Camera },
  { id: 5, title: 'Buscar', href: '/search', icon: Search },
];

const containerVariants = {
  hidden: { y: 0 },
  visible: { y: 0 },
};

const menuContainerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      staggerChildren: 0.08,
      delay: 0.3
    },
  },
};

const menuItemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1 },
};

const LandingPage = () => {
  const [showMenu, setShowMenu] = useState(false);
  const controls = useAnimation();
  const mainImage = PlaceHolderImages.find(p => p.id === 'main-logo');

  const handleDragEnd = async (event: any, info: any) => {
    if (info.offset.y < -50 && !showMenu) {
      setShowMenu(true);
      controls.start('visible');
    } else if (info.offset.y > 50 && showMenu) {
        // setShowMenu(false);
        // controls.start('hidden');
    } else if (!showMenu) {
        controls.start({ y: 0 });
    }
  };

  return (
    <main className="flex min-h-screen w-full flex-col items-center justify-center bg-background p-4 sm:p-8 text-center relative overflow-hidden">
      <div className="absolute top-4 right-4 z-20">
        <UserProfile />
      </div>
      <motion.div
        className="w-full h-full flex flex-col items-center justify-center"
        variants={containerVariants}
        initial="hidden"
        animate={controls}
        onAnimationComplete={() => {}}
      >
        <motion.div
          drag="y"
          dragConstraints={{ top: -250, bottom: 0 }}
          onDragEnd={handleDragEnd}
          dragElastic={{ top: 0.5, bottom: 0.1 }}
          className="flex flex-col items-center cursor-grab active:cursor-grabbing z-10 pt-16"
          animate={{ y: showMenu ? -250 : 0 }}
          transition={{ type: 'spring', stiffness: 100, damping: 20 }}
        >
          <motion.div 
            className="mb-6 flex flex-col items-center"
            animate={{ opacity: showMenu ? 0 : 1 }}
            transition={{ duration: 0.3 }}
          >
            <div className="h-20 w-full relative">
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
            <div className="bg-card text-card-foreground font-headline py-2 px-5 rounded-lg shadow-lg text-sm mt-2">
                HOMÍNIDOS Y HUMANIDAD
            </div>
          </motion.div>
        </motion.div>

        {showMenu && (
          <motion.div
            key="menu"
            variants={menuContainerVariants}
            initial="hidden"
            animate="visible"
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center gap-4 w-full max-w-xs mx-auto"
          >
            {menuItems.map(item => (
              <motion.div
                key={item.id}
                variants={menuItemVariants}
                className="w-full"
              >
                <Link
                  href={item.href}
                  className={`flex items-center justify-start w-full h-14 px-6 rounded-full shadow-lg transition-all duration-300
                             ${
                               item.title === 'Buscar' || item.title === 'Cámara IA'
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
      </motion.div>
    </main>
  );
};

export default LandingPage;
