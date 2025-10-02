'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

const menuItems = [
  { id: 1, title: 'EvoluFace', href: '/evoluface' },
  { id: 2, title: 'Próximamente', href: '#' },
  { id: 3, title: 'Próximamente', href: '#' },
  { id: 4, title: 'Próximamente', href: '#' },
];

const MenuPage = () => {
  return (
    <main className="flex min-h-screen w-full flex-col items-center justify-center bg-background p-4 sm:p-8 text-center relative">
      <motion.div
        layoutId="hominids-humanity-title"
        className="absolute top-16 bg-card text-card-foreground font-headline py-3 px-6 rounded-lg shadow-lg"
      >
        HOMÍNIDOS Y HUMANIDAD
      </motion.div>

      <div className="grid grid-cols-2 gap-8 mt-40">
        {menuItems.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
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
    </main>
  );
};

export default MenuPage;
