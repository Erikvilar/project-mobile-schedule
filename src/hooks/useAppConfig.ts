import { useState, useCallback, useEffect } from 'react';
import { database } from '@/database';
import {
  APP_CONFIG_KEYS,
  DEFAULT_APP_CONFIG,
} from '@/database/schemas/appConfigSchema.ts';

export const useAppConfig = () => {
  const [config, setConfig] = useState<Record<string, any>>({});
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    initializeConfig();
  }, []);

  const initializeConfig = async () => {
    try {
      setLoading(true);
      const appConfigCollection = database.get('app_config');
      const records = await appConfigCollection.query().fetch();

      // Se não tiver dados, cria os padrões
      if (records.length === 0) {
        await createDefaultConfig();
      } else {
        // Carrega as configurações existentes
        const configData: Record<string, any> = {};
        records.forEach((record: any) => {
          configData[record.key] = parseValue(record.value, record.type);
        });
        setConfig(configData);
      }
    } catch (error) {
      console.log('❌ Erro ao inicializar config:', error);
    } finally {
      setLoading(false);
    }
  };

  const createDefaultConfig = async () => {
    try {
      const appConfigCollection = database.get('app_config');

      await database.write(async () => {
        for (const [key, value] of Object.entries(DEFAULT_APP_CONFIG)) {
          await appConfigCollection.create((record: any) => {
            record.key = key;
            record.value = value;
            record.type = detectType(value);
            record.created_at = Date.now();
            record.updated_at = Date.now();
          });
        }
      });

      setConfig(DEFAULT_APP_CONFIG);
      console.log('✅ Configurações padrão criadas');
    } catch (error) {
      console.log('❌ Erro ao criar config padrão:', error);
    }
  };

  const getConfig = useCallback(
    (key: keyof typeof APP_CONFIG_KEYS, defaultValue?: any) => {
      const value = config[APP_CONFIG_KEYS[key]];
      return value !== undefined ? value : defaultValue;
    },
    [config],
  );

  const setConfig_ = useCallback(
    async (key: keyof typeof APP_CONFIG_KEYS, value: any) => {
      try {
        const appConfigCollection = database.get('app_config');
        const keyString = APP_CONFIG_KEYS[key];
        const stringValue = stringifyValue(value);
        const type = detectType(stringValue);

        // Tenta encontrar o registro
        const records = await appConfigCollection
          .query(q => q.where('key', keyString))
          .fetch();

        if (records.length > 0) {
          // Atualiza
          await database.write(async () => {
            await records[0].update((record: any) => {
              record.value = stringValue;
              record.type = type;
              record.updated_at = Date.now();
            });
          });
        } else {
          // Cria novo
          await database.write(async () => {
            await appConfigCollection.create((record: any) => {
              record.key = keyString;
              record.value = stringValue;
              record.type = type;
              record.created_at = Date.now();
              record.updated_at = Date.now();
            });
          });
        }

        // Atualiza o estado local
        setConfig(prev => ({
          ...prev,
          [keyString]: value,
        }));

        console.log(`✅ ${keyString} atualizado`);
        return true;
      } catch (error) {
        console.log(`❌ Erro ao salvar ${key}:`, error);
        return false;
      }
    },
    [],
  );

  const deleteConfig = useCallback(
    async (key: keyof typeof APP_CONFIG_KEYS) => {
      try {
        const appConfigCollection = database.get('app_config');
        const keyString = APP_CONFIG_KEYS[key];
        const records = await appConfigCollection
          .query(q => q.where('key', keyString))
          .fetch();

        if (records.length > 0) {
          await database.write(async () => {
            await records[0].destroyPermanently();
          });

          setConfig(prev => {
            const newConfig = { ...prev };
            delete newConfig[keyString];
            return newConfig;
          });

          console.log(`✅ ${keyString} deletado`);
          return true;
        }
        return false;
      } catch (error) {
        console.log(`❌ Erro ao deletar ${key}:`, error);
        return false;
      }
    },
    [],
  );

  const resetToDefaults = useCallback(async () => {
    try {
      const appConfigCollection = database.get('app_config');
      const records = await appConfigCollection.query().fetch();

      await database.write(async () => {
        await Promise.all(
          records.map((record: any) => record.destroyPermanently()),
        );
      });

      await createDefaultConfig();
      console.log('✅ Configurações resetadas para padrão');
      return true;
    } catch (error) {
      console.log('❌ Erro ao resetar config:', error);
      return false;
    }
  }, []);

  const getAllConfig = useCallback(() => config, [config]);

  return {
    loading,
    getConfig,
    setConfig: setConfig_,
    deleteConfig,
    resetToDefaults,
    getAllConfig,
  };
};



function detectType(value: string): 'boolean' | 'string' | 'number' | 'json' {
  if (value === 'true' || value === 'false') {
    return 'boolean';
  }
  if (!isNaN(Number(value))) {
    return 'number';
  }
  try {
    JSON.parse(value);
    return 'json';
  } catch {
    return 'string';
  }
}


function stringifyValue(value: any): string {
  if (typeof value === 'string') {
    return value;
  }
  if (typeof value === 'boolean') {
    return value ? 'true' : 'false';
  }
  if (typeof value === 'number') {
    return value.toString();
  }
  return JSON.stringify(value);
}

function parseValue(value: string, type: string): any {
  switch (type) {
    case 'boolean':
      return value === 'true';
    case 'number':
      return Number(value);
    case 'json':
      try {
        return JSON.parse(value);
      } catch {
        return value;
      }
    default:
      return value;
  }
}
