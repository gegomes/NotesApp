'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { LanguageSelect } from './LanguageSelect';
import { Badge } from '@/components/ui/badge';
import clsx from 'clsx';

interface Note {
  id: string;
  title: string;
  tags: string[];
  content: string;
  createdAt: Date;
  archived?: boolean;
  description?: string;
}

interface SidebarProps {
  t: any;
  language: 'en' | 'pt';
  setLanguage: (lang: 'en' | 'pt') => void;
  showArchived: boolean;
  setShowArchived: (show: boolean) => void;
  onCreate: () => void;
  notes?: Note[];
  onSelectNoteByTag: (tag: string) => void;
  selectedTag?: string | null;
  onSearch: (term: string) => void;
}

export function Sidebar({
  t,
  language,
  setLanguage,
  showArchived,
  setShowArchived,
  onCreate,
  notes = [],
  onSelectNoteByTag,
  selectedTag = null,
  onSearch,
}: SidebarProps) {
  const [search, setSearch] = useState('');

  const filteredNotes = notes.filter(
    note =>
      note.tags.some(tag => tag.toLowerCase().includes(search.toLowerCase()))
  );

  const uniqueTags = Array.from(new Set(filteredNotes.flatMap(n => n.tags)));

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearch(value);
    onSearch(value);
  };

  return (
    <aside className="border-r bg-zinc-50 dark:bg-zinc-900 w-full h-full flex flex-col">
      <div className="p-4 flex flex-col gap-6 overflow-y-auto h-full">
        <h1 className="text-2xl font-bold text-zinc-800 dark:text-white">NotesApp</h1>

        <Button
          onClick={onCreate}
          className="w-full text-sm font-medium bg-green-600 hover:bg-green-700 text-white transition shadow-md"
        >
          {t.create}
        </Button>

        <div className="space-y-2">
          <Button
            variant={showArchived ? 'ghost' : 'default'}
            className={clsx(
              'w-full justify-start text-left border-none',
              !showArchived && 'bg-zinc-800 text-white hover:bg-zinc-700 shadow-sm'
            )}
            onClick={() => setShowArchived(false)}
          >
            {t.allNotes}
          </Button>
          <Button
            variant={showArchived ? 'default' : 'ghost'}
            className={clsx(
              'w-full justify-start text-left',
              showArchived && 'bg-zinc-800 text-white hover:bg-zinc-700 shadow-sm'
            )}
            onClick={() => setShowArchived(true)}
          >
            {t.archivedNotes}
          </Button>
        </div>

        <div className="mt-4">
          <Input
            placeholder={t.search || 'Buscar...'}
            value={search}
            onChange={handleSearchChange}
            className="w-full focus-visible:ring-0 focus-visible:ring-offset-0"
          />
        </div>

        <div className="mt-4">
          <LanguageSelect 
          language={language} setLanguage={setLanguage} />
        </div>


        {uniqueTags.length > 0 && (
          <div className="mt-6">
            <h2 className="text-sm font-semibold text-zinc-700 dark:text-zinc-300 mb-2">Tags</h2>
            <div className="flex flex-wrap gap-2">
              {uniqueTags.map((tag, idx) => (
                <Badge
                  key={idx}
                  onClick={() => onSelectNoteByTag(tag)}
                  className={clsx(
                    'cursor-pointer text-zinc-800 dark:text-white hover:bg-zinc-300 dark:hover:bg-zinc-600',
                    tag === selectedTag
                      ? 'bg-zinc-800 text-white dark:bg-white dark:text-zinc-900'
                      : 'bg-zinc-200 dark:bg-zinc-700 opacity-80'
                  )}
                >
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        )}
      </div>
    </aside>
  );
}
