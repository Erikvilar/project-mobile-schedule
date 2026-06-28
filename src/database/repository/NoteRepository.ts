import { DatabaseClient } from '@/database/DatabaseClient';

const TABLE_NOTES = 'notes';
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
export class NoteRepository {
  private db = new DatabaseClient(TABLE_NOTES);

  async getAllNotes() {
    const result = await this.db.getAll();

    return result
      .map(item => item._raw as unknown as NoteDTO)
      .filter(note => !note.is_deleted);
  }

  async getNoteById(id: string) {
    const result = await this.db.get(id);

    return result?._raw ?? null;
  }

  async createNote(data: {
    title: string;
    content: string;
    color?: string;
    category?: string;
  }) {
    return this.db.create({
      title: data.title,
      content: data.content,
      color: data.color ?? '#FFFFFF',
      category: data.category ?? null,

      is_pinned: false,
      is_archived: false,
      is_favorite: false,
      is_deleted: false,

      created_at: Date.now(),
      updated_at: Date.now(),
      synced_at: null,
    });
  }

  async updateNote(
    id: string,
    data: Partial<{
      title: string;
      content: string;
      color: string;
      category: string;
    }>,
  ) {
    return this.db.update(id, {
      ...data,
      updated_at: Date.now(),
    });
  }

  async pinNote(id: string) {
    return this.db.update(id, {
      is_pinned: true,
      updated_at: Date.now(),
    });
  }

  async unpinNote(id: string) {
    return this.db.update(id, {
      is_pinned: false,
      updated_at: Date.now(),
    });
  }

  async archiveNote(id: string) {
    return this.db.update(id, {
      is_archived: true,
      updated_at: Date.now(),
    });
  }

  async unarchiveNote(id: string) {
    return this.db.update(id, {
      is_archived: false,
      updated_at: Date.now(),
    });
  }

  async favoriteNote(id: string) {
    return this.db.update(id, {
      is_favorite: true,
      updated_at: Date.now(),
    });
  }

  async unfavoriteNote(id: string) {
    return this.db.update(id, {
      is_favorite: false,
      updated_at: Date.now(),
    });
  }

  async moveToTrash(id: string) {
    return this.db.update(id, {
      is_deleted: true,
      updated_at: Date.now(),
    });
  }

  async restoreFromTrash(id: string) {
    return this.db.update(id, {
      is_deleted: false,
      updated_at: Date.now(),
    });
  }

  async deletePermanently(id: string) {
    return this.db.delete(id);
  }
}
