import { useMemo } from 'react';
import { NoteRepository } from '@/database/repository/NoteRepository';
export interface NoteDTO {
  id: string;
  title: string;
  content: string;
  color?: string;
  category?: string;
  is_pinned?: boolean;
  is_archived?: boolean;
  is_favorite?: boolean;
  is_deleted?: boolean;
}
const useNote = () => {
  const repository = useMemo(() => new NoteRepository(), []);

  const createNote = async (data: {
    title: string;
    content: string;
    color?: string;
    category?: string;
  }) => {
    try {
      return await repository.createNote(data);
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  const getAllNotes = async () => {
    try {
      return await repository.getAllNotes();
    } catch (error) {
      console.log(error);
      return [];
    }
  };

  const getNoteById = async (id: string) => {
    try {
      return await repository.getNoteById(id);
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  const updateNote = async (
    id: string,
    data: Partial<{
      title: string;
      content: string;
      color: string;
      category: string;
    }>,
  ) => {
    try {
      return await repository.updateNote(id, data);
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  const pinNote = async (id: string) => {
    try {
      return await repository.pinNote(id);
    } catch (error) {
      console.log(error);
    }
  };

  const unpinNote = async (id: string) => {
    try {
      return await repository.unpinNote(id);
    } catch (error) {
      console.log(error);
    }
  };

  const archiveNote = async (id: string) => {
    try {
      return await repository.archiveNote(id);
    } catch (error) {
      console.log(error);
    }
  };

  const unarchiveNote = async (id: string) => {
    try {
      return await repository.unarchiveNote(id);
    } catch (error) {
      console.log(error);
    }
  };

  const favoriteNote = async (id: string) => {
    try {
      return await repository.favoriteNote(id);
    } catch (error) {
      console.log(error);
    }
  };

  const unfavoriteNote = async (id: string) => {
    try {
      return await repository.unfavoriteNote(id);
    } catch (error) {
      console.log(error);
    }
  };

  const moveToTrash = async (id: string) => {
    try {
      return await repository.moveToTrash(id);
    } catch (error) {
      console.log(error);
    }
  };

  const restoreFromTrash = async (id: string) => {
    try {
      return await repository.restoreFromTrash(id);
    } catch (error) {
      console.log(error);
    }
  };

  const deletePermanently = async (id: string) => {
    try {
      return await repository.deletePermanently(id);
    } catch (error) {
      console.log(error);
    }
  };

  return {
    createNote,
    getAllNotes,
    getNoteById,
    updateNote,

    pinNote,
    unpinNote,

    archiveNote,
    unarchiveNote,

    favoriteNote,
    unfavoriteNote,

    moveToTrash,
    restoreFromTrash,

    deletePermanently,
  };
};

export default useNote;
