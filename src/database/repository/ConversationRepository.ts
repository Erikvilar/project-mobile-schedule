
import { DatabaseClient } from '@/database/DatabaseClient.ts';
import { TABLE_CONVERSATION, TABLE_MODEL } from '@/database/schemas';

interface IConversationRepository {
  // TODO: Adicionar propriedades
}

export class ConversationRepository {
  private db = new DatabaseClient(TABLE_CONVERSATION);
  public async getAll(): Promise<any[]> {
    // TODO: Implementar
    return [];
  }

  private async _privateMethod(): Promise<void> {
    // TODO: Implementar
  }
}
