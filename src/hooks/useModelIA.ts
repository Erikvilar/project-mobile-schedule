import { useDatabase } from '@/database/hooks/useDatabase.ts';
import { TABLE_MODEL, TABLE_USERS } from '@/database/schemas';
import { Q } from '@nozbe/watermelondb';
interface  ModelProps{
  name:string;
  prepared:string;
}
const useModelIA = ()=>{
const {
  loading,
  error,
  create,
  getAll,
  getExistsByQuery,
  dropDatabase,
  get,
  update,
  deleteData,
} = useDatabase(TABLE_MODEL);

  const insertModel = async (model:any,prepared:string)=>{
    try {

     await create({
        id:model,
        name:model,
        prepared:prepared
      })

    }catch(e){
      console.log(e)
    }
  }

  const getExistentModel = async (value:string):Promise<ModelProps> => {
    const model = await getExistsByQuery(
      'model',
      Q.where('name', Q.like(`%${value}%`)),
    );
    return model;
  };


  const getCurrentModel = async () => {
    try {
      const result = await getAll();

      if (!result.length) {
        return null;
      }

      const { _status, _changed, ...modelIA } = result[0]._raw;

      return modelIA;
    } catch (error) {
      console.log(`error: ${TABLE_MODEL}`, error);
      return null;
    }
  };
return {
  insertModel,
  getCurrentModel,
  getExistentModel,
}
}

export default  useModelIA;