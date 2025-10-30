'use client';

import './globals.css';
import { Toaster } from "@/components/ui/toaster"
import { MotionConfig } from "framer-motion"
import VoiceControl from '@/components/VoiceControl';
import { KnowledgeProvider } from '@/context/KnowledgeContext';


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
       <head>
        <title>EvoluFace</title>
        <meta name="description" content="Desliza para viajar en el tiempo y ver la evolución del rostro humano." />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@700&family=Open+Sans:wght@400;600&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased">
        <KnowledgeProvider>
          <MotionConfig>
            <main>{children}</main>
          </MotionConfig>
          <VoiceControl />
          <Toaster />
        </KnowledgeProvider>
      </body>
    </html>
  );
}
