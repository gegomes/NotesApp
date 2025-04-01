'use client';

import { useEffect, useState } from 'react';
import { Sidebar } from '@/components/Sidebar';
import { NoteCard } from '@/components/NoteCard';
import { NoteEditor } from '@/components/NoteEditor';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

interface Note {
  id: string;
  title: string;
  tags: string[];
  content: string;
  createdAt: Date;
  archived?: boolean;
  description?: string;
}

const LANGS = {
  en: {
    allNotes: 'All notes',
    archivedNotes: 'Archived notes',
    create: '+ Create new note',
    search: 'Search...',
    lastEdited: 'Last edited',
    save: 'Save note',
    cancel: 'Cancel',
    archive: 'Archive note',
    delete: 'Delete note',
    noNote: 'Create a new note or select an existing one to start editing. This space is used to display and edit your notes.',
    noTitle: "see your notes here"

  },
  pt: {
    allNotes: 'Todas as notas',
    archivedNotes: 'Notas arquivadas',
    create: '+ Nova nota',
    search: 'Buscar...',
    lastEdited: 'Última edição',
    save: 'Salvar nota',
    cancel: 'Cancelar',
    archive: 'Arquivar nota',
    delete: 'Excluir nota',
    noNote: 'Crie uma nova nota ou selecione uma existente para começar a editar. Este espaço é usado para exibir e editar o conteúdo das suas anotações.',
    noTitle: "Veja aqui suas notas"

  },
};

export default function Page() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);
  const [language, setLanguage] = useState<'en' | 'pt'>('en');
  const [showArchived, setShowArchived] = useState(false);
  const [creatingNew, setCreatingNew] = useState(false);

  const [searchTerm, setSearchTerm] = useState('');



  const filteredNotes = notes.filter(note => {
    const matchesArchive = showArchived ? note.archived : !note.archived;
    const matchesSearch = note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      note.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesArchive && matchesSearch;
  });


  const t = LANGS[language];

  useEffect(() => {
    const stored = localStorage.getItem('notes');
    if (stored) {
      const parsed = JSON.parse(stored);
      parsed.forEach((n: any) => (n.createdAt = new Date(n.createdAt)));
      setNotes(parsed);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('notes', JSON.stringify(notes));
  }, [notes]);

  const handleCreate = () => {
    const newNote: Note = {
      id: String(Date.now()),
      title: '',
      tags: [],
      content: '',
      description: '',
      createdAt: new Date(),
    };
    setSelectedNote(newNote);
    setCreatingNew(true);
  };



  const handleSave = () => {
    if (!selectedNote) return;
    const alreadyExists = notes.some(n => n.id === selectedNote.id);
    const updatedNotes = alreadyExists
      ? notes.map(n => (n.id === selectedNote.id ? selectedNote : n))
      : [selectedNote, ...notes];

    setNotes(updatedNotes);
    setSelectedNote(null);
    setCreatingNew(false);

    toast.success(
      alreadyExists
        ? 'Nota atualizada com sucesso!'
        : 'Nota criada com sucesso!'
    );
  };


  const handleArchive = () => {
    if (!selectedNote) return;

    const isArchived = selectedNote.archived;

    setNotes(notes.map(n =>
      n.id === selectedNote.id ? { ...n, archived: !n.archived } : n
    ));
    setSelectedNote(null);
    setCreatingNew(false);

    toast.success(isArchived ? 'Nota desarquivada com sucesso!' : 'Nota arquivada com sucesso!');
  };



  const handleDelete = () => {
    if (!selectedNote) return;

    setNotes(notes.filter(n => n.id !== selectedNote.id));
    setSelectedNote(null);
    setCreatingNew(false);

    toast.success('Nota excluída com sucesso!');
  };




  return (
    <div className="grid grid-cols-[280px_520px_1fr] h-screen bg-[#1D1E42] overflow-hidden">
      <Sidebar
        t={t}
        language={language}
        setLanguage={setLanguage}
        showArchived={showArchived}
        setShowArchived={setShowArchived}
        onCreate={handleCreate}
        notes={notes}
        selectedTag={null}
        onSelectNoteByTag={(tag) => {
          const note = notes.find(n => n.tags.includes(tag));
          if (note) setSelectedNote(note);
        }}
        onSearch={(term) => setSearchTerm(term)} // ✅ Correto aqui dentro do return
      />


      <div className="overflow-y-auto">

        {filteredNotes.map(note => (
          <NoteCard
            key={note.id}
            title={note.title}
            tags={note.tags}
            createdAt={note.createdAt}
            onClick={() => {
              setSelectedNote(note);
              setCreatingNew(false);
            }}
            description={note.description || ''}
          />
        ))}

      </div>

      <div className="flex-1 overflow-y-auto space-y-2 scrollbar-thin scrollbar-thumb-zinc-600">
        {selectedNote && (
          <NoteEditor
            key={`${selectedNote?.id}-${creatingNew}`} // 🔑 força novo render sempre que mudar
            note={selectedNote}
            isEditing={creatingNew || selectedNote?.title === ''}
            showEditButton={!creatingNew}
            onChange={(note) => setSelectedNote(note)}
            onSave={handleSave}
            onCancel={() => {
              setSelectedNote(null);
              setCreatingNew(false);
            }}
            onArchive={handleArchive}
            onDelete={handleDelete}
            labels={t}
            allNotes={notes}
            onSelectNote={(note) => setSelectedNote(note)}
          />

        )}
        {!selectedNote && (
          // <div className="text-muted-foreground text-sm p-4 ">
          //   {t.noNote}
          // </div>

          <div className="flex flex-col items-center justify-center h-full text-center text-muted-foreground px-4 animate-fade-in">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-12 h-12 mb-4 text-zinc-400 dark:text-zinc-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5h6M9 9h6m-7 4h8m-9 4h10M5 5v14a2 2 0 002 2h10a2 2 0 002-2V5H5z" />
            </svg>
            <p className="text-sm font-medium">
             {t.noTitle}
            </p>
            <p className="text-xs mt-1">
              {t.noNote}
            </p>
          </div>

        )}
      </div>
    </div>
  );
}
