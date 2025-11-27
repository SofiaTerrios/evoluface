"use client";

import { useEffect, useState } from "react";
import { HOMINID_STAGES, HominidStage } from "@/lib/hominids";

interface HominidWithId extends HominidStage {
  id: string;
}

export function useHominids() {
  const [hominids, setHominids] = useState<HominidWithId[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadHominids = () => {
      try {
        const saved = localStorage.getItem("hominids_data");
        if (saved) {
          setHominids(JSON.parse(saved));
        } else {
          // Si no hay datos guardados, usar los datos por defecto
          const defaultData = HOMINID_STAGES.map((h, index) => ({
            ...h,
            id: `hominid-${index}`,
          }));
          setHominids(defaultData);
          localStorage.setItem("hominids_data", JSON.stringify(defaultData));
        }
      } catch (error) {
        console.error("Error loading hominids:", error);
        // En caso de error, usar datos por defecto
        const defaultData = HOMINID_STAGES.map((h, index) => ({
          ...h,
          id: `hominid-${index}`,
        }));
        setHominids(defaultData);
      } finally {
        setLoading(false);
      }
    };

    loadHominids();

    // Escuchar cambios en localStorage (para actualizar cuando se edita desde admin)
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "hominids_data" && e.newValue) {
        setHominids(JSON.parse(e.newValue));
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  return { hominids, loading };
}
