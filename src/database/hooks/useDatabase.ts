import { useState, useCallback } from 'react';
import {
  delete_,
  dropDatabase_,
  create_,
  readAll_,
  readById_,
  update_,
  existsByQuery_,
} from '../crud';
import { Q } from '@nozbe/watermelondb';
import { WhereDescription } from '@nozbe/watermelondb/QueryDescription';

export const useDatabase = (table:string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async ( data: any) => {
    setLoading(true);
    setError(null);
    try {
      const result = await create_(table, data);
      console.log(table,data)
      return result;
    } catch (err: any) {
      setError(err.message);
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  const getAll = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const records = await readAll_(table);
      return records;
    } catch (err: any) {
      setError(err.message);
      return [];
    } finally {
      setLoading(false);
    }
  }, []);

  const getExistsByQuery = async (query: any, table: WhereDescription):Promise<boolean | null> => {
    setLoading(true);
    setError(null);
    try {
      const record = await existsByQuery_(table, query);
      return record;
    } catch (err: any) {
      setError(err.message);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const get = useCallback(async (id: string) => {
    setLoading(true);
    setError(null);
    try {
      const record = await readById_(table, id);
      return record;
    } catch (err: any) {
      setError(err.message);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);



  const update = useCallback(
    async (id: string, data: any) => {
      setLoading(true);
      setError(null);
      try {
        const result = await update_(table, id, data);
        return result;
      } catch (err: any) {
        setError(err.message);
        return false;
      } finally {
        setLoading(false);
      }
    },
    [],
  );

  const deleteData = useCallback(async (id: string) => {
    setLoading(true);
    setError(null);
    try {
      const result = await delete_(table, id);
      return result;
    } catch (err: any) {
      setError(err.message);
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  const dropDatabase = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await dropDatabase_();
      console.log("BANCO DE DADOS APAGADO")
      return result;
    } catch (err: any) {
      setError(err.message);
      return false;
    } finally {
      setLoading(false);
    }
  }, []);
  return {
    loading,
    error,
    getExistsByQuery,
    create,
    getAll,
    dropDatabase,
    get,
    update,
    deleteData
  };
};
