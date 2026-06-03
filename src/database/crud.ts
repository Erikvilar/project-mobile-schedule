import { database } from './index';


// ============ CREATE ============
export const create_ = async (tableName: string, data: any) => {
  try {
    const collection = database.get(tableName);
    await database.write(async () => {
      await collection.create((record: any) => {
        Object.keys(data).forEach(key => {
          record[key] = data[key];
        });
      });
    });
    console.log(`✅ ${tableName} criado`);
  } catch (error) {
    console.log(`❌ Erro ao criar ${tableName}:`, error);
  }
};

// ============ READ (All) ============
export const readAll_ = async (tableName: string) => {
  try {
    const collection = database.get(tableName);
    const records = await collection.query().fetch();
    return records;
  } catch (error) {
    console.log(`❌ Erro ao ler ${tableName}:`, error);
    return [];
  }
};

// ============ READ (By ID) ============
export const readById_ = async (tableName: string, id: string) => {
  try {
    const collection = database.get(tableName);
    const record = await collection.find(id);
    return record;
  } catch (error) {
    console.log(`❌ Erro ao encontrar ${tableName}:`, error);
    return null;
  }
};
export const existsByQuery_ = async (query: any, table:string): Promise<boolean> => {
  const records = await database.get(table).query(query).fetch();
  return records.length > 0;
};

// ============ READ (With Query) ============
export const readQuery_ = async (tableName: string, query: any) => {
  try {
    const collection = database.get(tableName);
    const records = await collection.query(query).fetch();
    return records;
  } catch (error) {
    console.log(`❌ Erro ao fazer query em ${tableName}:`, error);
    return [];
  }
};

// ============ UPDATE ============
export const update_ = async (tableName: string, id: string, data: any) => {
  try {
    const collection = database.get(tableName);
    const record = await collection.find(id);

    await database.write(async () => {
      await record.update((record: any) => {
        Object.keys(data).forEach(key => {
          record[key] = data[key];
        });
      });
    });
    console.log(`✅ ${tableName} atualizado`);
  } catch (error) {
    console.log(`❌ Erro ao atualizar ${tableName}:`, error);
  }
};




// ============ DELETE ============
export const delete_ = async (tableName: string, id: string) => {
  try {
    const collection = database.get(tableName);
    const record = await collection.find(id);

    await database.write(async () => {
      await record.destroyPermanently();
    });
    console.log(`✅ ${tableName} deletado`);
  } catch (error) {
    console.log(`❌ Erro ao deletar ${tableName}:`, error);
  }
};


    export const dropDatabase_ = async () => {
      try {
        console.log('⚠️  Deletando banco de dados completo...');

        // Deleta o arquivo do banco
        await database.unsafeResetDatabase();

        console.log('✅ Banco de dados deletado com sucesso!');
        return true;
      } catch (error) {
        console.log('❌ Erro ao deletar banco:', error);
        return false;
      }

};
