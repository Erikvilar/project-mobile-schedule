
import { DatabaseClient } from '@/database/DatabaseClient.ts';
import { TABLE_USERS } from '@/database/schemas';
import { Q } from '@nozbe/watermelondb';

interface IUserRepository {
  // TODO: Adicionar propriedades
}

export class UserRepository {

  private db = new DatabaseClient(TABLE_USERS);

  public async create(user:any): Promise<void> {
    await this.db.create(user);
  }
 public async getExistentUsers(value:string,field:string):Promise<boolean | null> {
    return this.db.existsByQuery(Q.where(field, Q.like(`%${value}%`)));


  };
  public async getAll(): Promise<any[]> {
    return this.db.getAll();
  }
}
