'use client';

import { Button } from '@/components/ui/button';
import {
  Archive,
  ArchiveRestore,
  Trash2,
  Save,
  X,
  Pencil,
} from 'lucide-react';

interface ActionButtonsProps {
  isEditing: boolean;
  showEditButton: boolean;
  labels: Record<string, string>;
  onSave: () => void;
  onCancel: () => void;
  onEdit: () => void;
  onArchive: () => void;
  onDelete: () => void;
  isArchived?: boolean;
}

export function ActionButtons({
  isEditing,
  showEditButton,
  labels,
  onSave,
  onCancel,
  onEdit,
  onArchive,
  onDelete,
  isArchived = false,
}: ActionButtonsProps) {
  return (
    <div className="w-full flex flex-wrap justify-end gap-3 mt-auto pt-4 border-t border-zinc-200 dark:border-zinc-700">
      {isEditing ? (
        <>
          <Button
            onClick={onSave}
            className="bg-green-600 hover:bg-green-700 text-white font-medium px-5 py-2 rounded-lg shadow-sm"
          >
            <Save className="w-4 h-4 mr-2" />
            {labels.save}
          </Button>

          <Button
            onClick={onCancel}
            className="bg-zinc-600 hover:bg-zinc-700 text-white font-medium px-5 py-2 rounded-lg shadow-sm"
          >
            <X className="w-4 h-4 mr-2" />
            {labels.cancel}
          </Button>
        </>
      ) : (
        showEditButton && (
          <Button
            onClick={onEdit}
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-5 py-2 rounded-lg shadow-sm"
          >
            <Pencil className="w-4 h-4 mr-2" />
            Editar
          </Button>
        )
      )}

      <Button
        onClick={onArchive}
        className={`font-medium px-5 py-2 rounded-lg shadow-sm text-white ${
          isArchived
            ? 'bg-zinc-500 hover:bg-zinc-600'
            : 'bg-yellow-500 hover:bg-yellow-600'
        }`}
      >
        {isArchived ? (
          <>
            <ArchiveRestore className="w-4 h-4 mr-2" />
            Desarquivar
          </>
        ) : (
          <>
            <Archive className="w-4 h-4 mr-2" />
            {labels.archive}
          </>
        )}
      </Button>

      <Button
        onClick={onDelete}
        className="bg-red-600 hover:bg-red-700 text-white font-medium px-5 py-2 rounded-lg shadow-sm"
      >
        <Trash2 className="w-4 h-4 mr-2" />
        {labels.delete}
      </Button>
    </div>
  );
}
