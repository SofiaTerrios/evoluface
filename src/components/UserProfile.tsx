'use client';

import { useState } from 'react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import { User, BookOpen } from 'lucide-react';

export default function UserProfile() {
  const [knowledge, setKnowledge] = useState(40);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          className="relative h-10 w-auto px-2 py-2 rounded-full flex items-center gap-2"
        >
          <Avatar className="h-8 w-8">
            <AvatarImage src="https://picsum.photos/seed/user-avatar/100/100" />
            <AvatarFallback>
              <User />
            </AvatarFallback>
          </Avatar>
          <span className="hidden sm:inline text-sm font-medium">Explorador</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-60">
        <div className="grid gap-4">
          <div className="space-y-2">
            <h4 className="font-medium leading-none flex items-center gap-2">
              <BookOpen className="h-4 w-4" />
              Barra de conocimiento
            </h4>
            <p className="text-xs text-muted-foreground">
              Tu progreso a través de la historia humana.
            </p>
          </div>
          <Progress value={knowledge} className="w-full" />
        </div>
      </PopoverContent>
    </Popover>
  );
}
