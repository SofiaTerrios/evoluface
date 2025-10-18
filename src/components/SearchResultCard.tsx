'use client';

import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import type { SearchableItem } from '@/lib/searchable-data';
import { ArrowRight, Calendar, Landmark, Layers, Microscope, Type } from 'lucide-react';

interface SearchResultCardProps {
  item: SearchableItem;
}

const typeInfo: Record<string, { icon: React.ElementType, label: string }> = {
    'Hominid': { icon: Type, label: 'Homínido' },
    'Discovery': { icon: Microscope, label: 'Descubrimiento' },
    'Archeology': { icon: Landmark, label: 'Arqueología' },
    'Culture': { icon: Layers, label: 'Cultura' },
}

export default function SearchResultCard({ item }: SearchResultCardProps) {
  const { icon: Icon, label } = typeInfo[item.type] || { icon: Calendar, label: item.type };

  return (
    <Link href={item.path} className="h-full">
      <Card className="h-full hover:border-primary/80 hover:shadow-lg transition-all flex flex-col">
        <CardHeader>
          <div className="flex justify-between items-start">
            <CardTitle className="font-headline text-lg text-primary">{item.title}</CardTitle>
            <Badge variant="secondary" className="flex items-center gap-1 shrink-0">
               <Icon className="h-3 w-3" />
               {label}
            </Badge>
          </div>
          {item.subtitle && <CardDescription>{item.subtitle}</CardDescription>}
        </CardHeader>
        <CardContent className="flex-grow">
          <p className="text-sm text-card-foreground/80 line-clamp-3">{item.description}</p>
        </CardContent>
        <div className="p-4 pt-0 flex justify-end">
            <ArrowRight className="h-5 w-5 text-primary/50 group-hover:text-primary transition-colors" />
        </div>
      </Card>
    </Link>
  );
}
