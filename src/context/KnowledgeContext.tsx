'use client';

import React, { createContext, useState, useEffect, useCallback } from 'react';

interface KnowledgeContextType {
  knowledge: number;
  increaseKnowledge: (amount: number) => void;
  hasBeenSeen: (id: string) => boolean;
  markAsSeen: (id: string) => void;
}

export const KnowledgeContext = createContext<KnowledgeContextType>({
  knowledge: 0,
  increaseKnowledge: () => {},
  hasBeenSeen: () => false,
  markAsSeen: () => {},
});

const KNOWLEDGE_KEY = 'userKnowledge';
const SEEN_ITEMS_KEY = 'userSeenItems';

export const KnowledgeProvider = ({ children }: { children: React.ReactNode }) => {
  const [knowledge, setKnowledge] = useState<number>(0);
  const [seenItems, setSeenItems] = useState<Set<string>>(new Set());
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    try {
      const storedKnowledge = localStorage.getItem(KNOWLEDGE_KEY);
      if (storedKnowledge) {
        setKnowledge(Math.min(100, Number(storedKnowledge)));
      }
      const storedSeenItems = localStorage.getItem(SEEN_ITEMS_KEY);
      if (storedSeenItems) {
        setSeenItems(new Set(JSON.parse(storedSeenItems)));
      }
    } catch (error) {
      console.error("Failed to access localStorage:", error);
    }
  }, []);

  useEffect(() => {
    if (isMounted) {
      try {
        localStorage.setItem(KNOWLEDGE_KEY, String(knowledge));
      } catch (error) {
        console.error("Failed to save knowledge to localStorage:", error);
      }
    }
  }, [knowledge, isMounted]);

  useEffect(() => {
    if (isMounted) {
      try {
        localStorage.setItem(SEEN_ITEMS_KEY, JSON.stringify(Array.from(seenItems)));
      } catch (error) {
        console.error("Failed to save seen items to localStorage:", error);
      }
    }
  }, [seenItems, isMounted]);

  const increaseKnowledge = useCallback((amount: number) => {
    setKnowledge((prev) => Math.min(100, prev + amount));
  }, []);

  const markAsSeen = useCallback((id: string) => {
    setSeenItems((prev) => new Set(prev).add(id));
  }, []);

  const hasBeenSeen = useCallback((id: string) => {
    return seenItems.has(id);
  }, [seenItems]);

  if (!isMounted) {
    return null; // or a loading spinner
  }

  return (
    <KnowledgeContext.Provider value={{ knowledge, increaseKnowledge, hasBeenSeen, markAsSeen }}>
      {children}
    </KnowledgeContext.Provider>
  );
};
