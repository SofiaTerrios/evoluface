'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Camera } from 'lucide-react';

export default function CameraButton() {
  return (
    <Button
      asChild
      variant="outline"
      size="icon"
      className="fixed bottom-8 right-8 z-50 h-16 w-16 rounded-full shadow-2xl bg-primary text-primary-foreground hover:bg-primary/80"
    >
      <Link href="/camera">
        <Camera className="h-8 w-8" />
        <span className="sr-only">Abrir Cámara</span>
      </Link>
    </Button>
  );
}
