// ✅ NotesList.tsx (usabilidade aprimorada)
'use client';

import { NoteCard } from './NoteCard';
import { Button, Badge, Card, CardContent, Input, Textarea, Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui';

interface Note {
  id: string;
  title: string;
  tags: string[];
  content: string;
  createdAt: Date;
  archived?: boolean;
  description?: string;
}

interface NotesListProps {
  notes: Note[];
  onSelect: (note: Note) => void;
  onCreate: () => void;
  createLabel: string;
}

export function NotesList({ notes, onSelect, onCreate, createLabel }: NotesListProps) {
  return (
    <div className="overflow-y-auto flex-1 space-y-3 px-2">
      <Button onClick={onCreate} className="w-full mb-2">
        {createLabel}
      </Button>
      {notes.map(note => (
        <NoteCard
          key={note.id}
          title={note.title}
          tags={note.tags}
          createdAt={note.createdAt}
          onClick={() => onSelect(note)}
          //@ts-ignore
          description={note.description}
        />
      ))}
    </div>
  );
}