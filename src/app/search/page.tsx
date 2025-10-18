'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ArrowLeft, Search } from 'lucide-react';
import { getAllSearchableData, SearchableItem } from '@/lib/searchable-data';
import SearchResultCard from '@/components/SearchResultCard';
import { motion } from 'framer-motion';

export default function SearchPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const allData = useMemo(() => getAllSearch_dev(), []);

  const filteredResults = useMemo(() => {
    if (!searchTerm) {
      return [];
    }
    const lowerCaseSearchTerm = searchTerm.toLowerCase();
    return allData.filter(
      (item) =>
        item.title.toLowerCase().includes(lowerCaseSearchTerm) ||
        item.description.toLowerCase().includes(lowerCaseSearchTerm) ||
        (item.tags &&
          item.tags.some((tag) => tag.toLowerCase().includes(lowerCaseSearchTerm)))
    );
  }, [searchTerm, allData]);

  return (
    <div className="relative min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-20 w-full bg-background/80 backdrop-blur-sm">
        <div className="container mx-auto flex items-center p-4 max-w-md">
          <Button asChild variant="outline" size="icon" className="mr-4">
            <Link href="/">
              <ArrowLeft />
              <span className="sr-only">Volver al Menú</span>
            </Link>
          </Button>
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Buscar contenido..."
              className="w-full pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </header>
      <main className="container mx-auto p-4 sm:p-8 max-w-md">
        {searchTerm && (
          <p className="text-muted-foreground mb-6">
            {filteredResults.length} resultado(s) para &quot;{searchTerm}&quot;
          </p>
        )}
        <div className="grid gap-4">
          {filteredResults.map((item, index) => (
            <motion.div
              key={item.id + item.type}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <SearchResultCard item={item} />
            </motion.div>
          ))}
        </div>
        {!searchTerm && (
           <div className="text-center mt-20 text-muted-foreground">
                <Search className="mx-auto h-12 w-12 mb-4" />
                <h2 className="text-xl font-semibold">Busca en la historia</h2>
                <p>Usa la barra de búsqueda para encontrar lo que te interese.</p>
           </div>
        )}
      </main>
    </div>
  );
}

// NOTE: In a real app, you might fetch this or have it in a more optimized format.
function getAllSearch_dev(): SearchableItem[] {
    return getAllSearchableData();
}
