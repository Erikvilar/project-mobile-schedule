import { Database } from '@nozbe/watermelondb';
import { DatabaseClient } from '@/database/DatabaseClient.ts';
import { TABLE_MEMORY, TABLE_MODEL } from '@/database/schemas';

interface IMemoryRepository {
  // TODO: Adicionar propriedades
}

export class MemoryRepository {

  private db = new DatabaseClient(TABLE_MEMORY);

  public async getAll(): Promise<any[]> {
    // TODO: Implementar
    return [];
  }

  private async _privateMethod(): Promise<void> {
    // TODO: Implementar
  }
}
