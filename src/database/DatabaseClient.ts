import {
  create_,
  readAll_,
  readById_,
  update_,
  delete_,
  dropDatabase_,
  existsByQuery_,
} from './layer/accessDatabaseLayer.ts';

import { WhereDescription } from '@nozbe/watermelondb/QueryDescription';

export class DatabaseClient {
  constructor(private table: string) {}

  async create(data: any) {
    return create_(this.table, data);
  }

  async getAll() {
    return readAll_(this.table);
  }

  async get(id: string) {
    return readById_(this.table, id);
  }

  async update(id: string, data: any) {
    return update_(this.table, id, data);
  }

  async delete(id: string) {
    return delete_(this.table, id);
  }

  async existsByQuery(query: WhereDescription) {
    return existsByQuery_(query, this.table);
  }

  async dropDatabase() {
    return dropDatabase_();
  }
}
