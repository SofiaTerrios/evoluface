"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Loader2 } from "lucide-react";
import SpiralTimeline from "@/components/SpiralTimeline";
import UserProfile from "@/components/UserProfile";
import { useHominids } from "@/hooks/use-hominids";

export default function TimelinePage() {
  const { hominids, loading } = useHominids();

  return (
    <div className="bg-background min-h-screen text-foreground overflow-hidden">
      <header className="container mx-auto px-4 pt-8 sm:px-8 w-full z-10">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center">
            <Button asChild variant="outline" size="icon" className="mr-4">
              <Link href="/">
                <ArrowLeft />
                <span className="sr-only">Volver al Menú</span>
              </Link>
            </Button>
            <div className="text-left flex-grow">
              <h1 className="text-3xl md:text-4xl font-headline font-bold tracking-tight text-primary">
                Línea de Tiempo Evolutiva
              </h1>
              <p className="text-muted-foreground mt-1 text-sm">
                Un viaje en espiral a través de nuestra historia.
              </p>
            </div>
          </div>
          <UserProfile />
        </div>
      </header>
      <main className="w-full h-full flex items-center justify-center">
        {loading ? (
          <Loader2 className="h-12 w-12 animate-spin text-primary" />
        ) : (
          <SpiralTimeline stages={hominids} />
        )}
      </main>
    </div>
  );
}
