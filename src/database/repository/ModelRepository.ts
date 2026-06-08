import { TABLE_MODEL } from '@/database/schemas';
import { DatabaseClient } from '@/database/DatabaseClient.ts';

export class ModelRepository {

  private db = new DatabaseClient(TABLE_MODEL);

  public async getCurrentModel() {
    const result = await this.db.getAll();

    if (!result.length) {
      return null;
    }

    return result[0]._raw;
  }

  public async insertModel(name: string, prepared: string) {
    return this.db.create({
      id: name,
      name,
      prepared,
    });
  }

}
