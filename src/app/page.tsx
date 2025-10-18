'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Search } from 'lucide-react';

const menuItems = [
  { id: 1, title: 'EvoluFace', href: '/evoluface' },
  { id: 2, title: 'Linea de Tiempo', href: '/timeline' },
  { id: 3, title: 'Videos por Capas', href: '/cultura' },
  { id: 4, title: 'Mesa de Descubrimientos', href: '/hominids' },
  { id: 6, title: 'Mesa de Arqueología', href: '/archeology' },
];

const LandingPage = () => {
  return (
    <main className="flex min-h-screen w-full flex-col items-center justify-center bg-background p-4 sm:p-8 text-center relative overflow-hidden">
      <div className="flex flex-col items-center mb-16">
        <div className="mb-8 h-24 w-full relative">
          <Image
            src="/evolution.png"
            alt="Evolución humana"
            fill
            className="object-contain"
            priority
          />
        </div>
        <div
          className="bg-card text-card-foreground font-headline py-3 px-6 rounded-lg shadow-lg"
        >
          HOMÍNIDOS Y HUMANIDAD
        </div>
      </div>

      <div className="grid grid-cols-3 gap-8">
        {menuItems.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
            className={index === 4 ? 'col-start-2' : ''}
          >
            <Link
              href={item.href}
              className={`flex items-center justify-center w-36 h-36 rounded-full shadow-lg transition-colors bg-primary text-primary-foreground hover:bg-primary/90`}
            >
              <span className="text-center font-headline px-2">{item.title}</span>
            </Link>
          </motion.div>
        ))}
         <motion.div
            key="search"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 + menuItems.length * 0.1 }}
            className="col-start-2"
          >
            <Link
              href="/search"
              className={`flex flex-col items-center justify-center w-36 h-36 rounded-full shadow-lg transition-colors bg-accent text-accent-foreground hover:bg-accent/90`}
            >
              <Search className="h-10 w-10" />
              <span className="text-center font-headline px-2 mt-2">Buscar</span>
            </Link>
          </motion.div>
      </div>
    </main>
  );
};

export default LandingPage;
