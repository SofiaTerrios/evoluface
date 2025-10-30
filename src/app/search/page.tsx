"use client";

import { useState, useMemo, useEffect, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Search, LoaderCircle } from "lucide-react";
import { SearchableItem } from "@/lib/searchable-data";
import SearchResultCard from "@/components/SearchResultCard";
import { motion } from "framer-motion";
import { searchContent } from "@/ai/flows/search-content";
import UserProfile from "@/components/UserProfile";

function SearchPage() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get("q") || "";

  const [searchTerm, setSearchTerm] = useState(initialQuery);
  const [results, setResults] = useState<SearchableItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = async (query: string) => {
    if (!query) {
      setResults([]);
      return;
    }
    setIsLoading(true);
    try {
      const response = await searchContent({ query });
      setResults(
        response.results.map((item) => ({
          ...item,
          tags: [],
          type: item.type as "Hominid" | "Discovery" | "Archeology" | "Culture",
        }))
      );
    } catch (error) {
      console.error("Error performing search:", error);
      setResults([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (initialQuery) {
      handleSearch(initialQuery);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialQuery]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleSearch(searchTerm);
  };

  return (
    <div className="relative min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-20 w-full bg-background/80 backdrop-blur-sm">
        <div className="container mx-auto flex items-center justify-between p-4">
          <div className="flex items-center flex-grow max-w-xs md:max-w-md">
            <Button asChild variant="outline" size="icon" className="mr-4">
              <Link href="/">
                <ArrowLeft />
                <span className="sr-only">Volver al Menú</span>
              </Link>
            </Button>
            <form onSubmit={handleFormSubmit} className="relative flex-grow">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Buscar contenido..."
                className="w-full pl-10"
                value={searchTerm}
                onChange={handleInputChange}
              />
            </form>
          </div>
           <UserProfile />
        </div>
      </header>
      <main className="container mx-auto p-4 sm:p-8 max-w-xs md:max-w-md">
        {isLoading && (
          <div className="flex justify-center items-center mt-20">
            <LoaderCircle className="h-12 w-12 animate-spin text-primary" />
          </div>
        )}

        {!isLoading && searchTerm && (
          <p className="text-muted-foreground mb-6">
            {results.length} resultado(s) para &quot;{searchTerm}&quot;
          </p>
        )}

        {!isLoading && (
          <div className="grid gap-4">
            {results.map((item, index) => (
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
        )}

        {!isLoading && !searchTerm && results.length === 0 && (
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

export default function SearchPageWrapper() {
  return (
    <Suspense fallback={<div>Cargando búsqueda...</div>}>
      <SearchPage />
    </Suspense>
  );
}
