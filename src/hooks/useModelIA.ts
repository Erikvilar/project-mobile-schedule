import { TABLE_MODEL } from '@/database/schemas';
import { ModelRepository } from '@/database/repository/ModelRepository.ts';
import { useMemo } from 'react';


const useModelIA = ()=>{


  const repository = useMemo(() => new ModelRepository(), []);

  const insertModel = async (model:any,prepared:string)=>{
    try {

     await repository.insertModel(model,prepared);

    }catch(e){
      console.log(e)
    }
  }

  const getCurrentModel = async () => {
    try {
      return await repository.getCurrentModel();
    } catch (error) {
      console.log(`error: ${TABLE_MODEL}`, error);
      return null;
    }
  };


return {
  insertModel,
  getCurrentModel,
}


}

export default  useModelIA;