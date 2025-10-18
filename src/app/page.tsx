'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
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

const LandingPage = () => {
  return (
    <main className="flex min-h-screen w-full flex-col items-center justify-center bg-background p-4 sm:p-8 text-center relative overflow-hidden">
      <div className="flex flex-col items-center mb-12">
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
      </div>

      <div className="flex flex-col items-center gap-6 w-full max-w-xs">
        {menuItems.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 + index * 0.1 }}
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
      </div>
    </main>
  );
};

export default LandingPage;
