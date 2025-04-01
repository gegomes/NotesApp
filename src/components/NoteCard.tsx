'use client';

import { Card, CardContent } from '@/components/ui';

interface NoteCardProps {
  title: string;
  tags: string[];
  createdAt: Date;
  description?: string;
  content?: string;
  onClick: () => void;
}

export function NoteCard({
  title,
  tags,
  createdAt,
  description,
  content,
  onClick
}: NoteCardProps) {
  const previewText = description?.trim() || content?.trim() || '';

  const formattedDate = new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(new Date(createdAt));

  return (
    <Card
      onClick={onClick}
      className="cursor-pointer border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-900 hover:bg-zinc-100 dark:hover:bg-zinc-800
        transition-all duration-200 rounded-2xl shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-zinc-400 m-4"
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && onClick()}
    >
      <CardContent className="m-4 h-auto min-h-[5rem] max-h-[8rem] flex flex-col justify-between">
        <h3 className="text-sm font-semibold text-zinc-800 dark:text-white line-clamp-1 break-words">
          {title || 'Sem título'}
        </h3>

        {previewText && (
          <p className="text-xs text-zinc-600 dark:text-zinc-300 mt-1 overflow-hidden break-words line-clamp-2">
            {previewText}
          </p>
        )}

        <p className="text-[10px] text-zinc-500 dark:text-zinc-400 mt-2 ">
          Última edição: {formattedDate}
        </p>
      </CardContent>
    </Card>
  );
}
