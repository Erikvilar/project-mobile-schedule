import { DatabaseClient } from '@/database/DatabaseClient.ts';
import { TABLE_MESSAGE } from '@/database/schemas';

interface IMessagesRepository {
  // TODO: Adicionar propriedades
}

export class MessagesRepository {


  private db = new DatabaseClient(TABLE_MESSAGE)

  public async getAll(): Promise<any[]> {
    return await this.db.getAll();
  }

  private async _privateMethod(): Promise<void> {
    // TODO: Implementar
  }
}
