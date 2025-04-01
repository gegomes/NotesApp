'use client';

import { useState } from 'react';
import { Input, Textarea, Badge, Button } from '@/components/ui';
import { ActionButtons } from './ActionButtons';

interface Note {
  id: string;
  title: string;
  tags: string[];
  content: string;
  createdAt: Date;
  archived?: boolean;
  description?: string;
}

interface NoteEditorProps {
  note: Note | null;
  isEditing?: boolean;
  showEditButton?: boolean;
  onChange: (note: Note) => void;
  onSave: () => void;
  onCancel: () => void;
  onArchive: () => void;
  onDelete: () => void;
  onSelectTag?: (tag: string) => void;
  labels: Record<string, string>;
  allNotes?: Note[];
  onSelectNote?: (note: Note) => void;
}

export function NoteEditor({
  note,
  isEditing: initialEditing = false,
  showEditButton = true,
  onChange,
  onSave,
  onCancel,
  onArchive,
  onDelete,
  onSelectTag,
  labels,
  allNotes = [],
  onSelectNote,
}: NoteEditorProps) {
  const [isEditing, setIsEditing] = useState(initialEditing);
  const uniqueTags = Array.from(new Set(allNotes.flatMap(n => n.tags)));

  if (!note) {
    return (
      <div className="text-muted-foreground mt-8 text-center text-sm animate-fade-in">
        {labels.noNote}
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-white dark:bg-zinc-900 rounded-xl shadow-md p-6 border border-zinc-200 dark:border-zinc-700 animate-fade-in">
      {/* Conteúdo do editor */}
      <div className="flex-1 flex flex-col overflow-y-auto space-y-4">
        {isEditing ? (
          <Input
            className="text-2xl font-semibold text-zinc-800 dark:text-white placeholder:text-zinc-400 dark:placeholder:text-zinc-500"
            value={note.title}
            onChange={(e) => onChange({ ...note, title: e.target.value })}
            placeholder="Título da nota"
          />
        ) : (
          <h2 className="text-2xl font-semibold text-zinc-800 dark:text-white">
            {note.title}
          </h2>
        )}

        {isEditing ? (
          <Textarea
            className="resize-none bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-white placeholder:text-zinc-500 dark:placeholder:text-zinc-500"
            value={note.description || ''}
            onChange={(e) => onChange({ ...note, description: e.target.value })}
            placeholder="Descrição da nota"
          />
        ) : (
          note.description && (
            <p className="text-sm text-zinc-600 dark:text-zinc-300 whitespace-pre-wrap">
              {note.description}
            </p>
          )
        )}

        {/* Tags da nota */}
        <div className="flex gap-2 flex-wrap">
          {note.tags.map((tag, index) => (
            <Badge
              key={index}
              className="flex items-center gap-1 bg-zinc-200 dark:bg-zinc-700 text-zinc-800 dark:text-white cursor-pointer"
              onClick={() => onSelectTag?.(tag)}
            >
              {tag}
              {isEditing && (
                <button
                  className="text-red-500 ml-1"
                  onClick={() => {
                    const updatedTags = note.tags.filter((t) => t !== tag);
                    onChange({ ...note, tags: updatedTags });
                  }}
                  title="Remover tag"
                >
                  ×
                </button>
              )}
            </Badge>
          ))}
        </div>

        {/* Adicionar nova tag */}
        {isEditing && (
          <div>
            <Input
              placeholder="Digite a tag e pressione Enter para adicioná-la"
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  const value = (e.target as HTMLInputElement).value.trim();
                  if (value && !note.tags.includes(value)) {
                    onChange({ ...note, tags: [...note.tags, value] });
                    (e.target as HTMLInputElement).value = '';
                  }
                }
              }}
            />
            <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
              Pressione <kbd className="bg-zinc-800 text-white px-1 rounded">Enter</kbd> para adicionar a tag
            </p>
          </div>
        )}

        {/* Última edição */}
        <p className="text-xs text-zinc-500 dark:text-zinc-400">
          {labels.lastEdited} {note.createdAt.toLocaleTimeString()}
        </p>
      </div>

      {/* Botões sempre no final */}
      <div className="mt-6 pt-4 border-t border-zinc-200 dark:border-zinc-700">
        <ActionButtons
          isEditing={isEditing}
          showEditButton={showEditButton}
          labels={labels}
          onSave={() => { setIsEditing(false); onSave(); }}
          onCancel={() => { setIsEditing(false); onCancel(); }}
          onEdit={() => setIsEditing(true)}
          onArchive={onArchive}
          onDelete={onDelete}
          isArchived={note.archived} // 👈 necessário para mudar o botão
        />

      </div>
    </div>
  );
}
