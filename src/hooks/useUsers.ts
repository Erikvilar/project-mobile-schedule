
import { TABLE_USERS } from '@/database/schemas';
import { useDatabase } from '@/database/hooks/useDatabase.ts';
import {Q} from "@nozbe/watermelondb";
import useProfile, { ProfileInterface } from '@/hooks/useProfile.ts';


export interface UserInterface {
  id: string;
  name: string;
  email: string;
  age: number;
  profile?:ProfileInterface;
}
const useUsers = ()=>{


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
  } = useDatabase(TABLE_USERS);

  const {insertProfile}  = useProfile();


  const insertUser = async (user: {
    id: string;
    name: string;
    email: string;
    age: number;
    profile: { userId: string; avatar_url: string | undefined };
  }): Promise<any> => {
    try {
      const exists = await getExistentUsers(user.email, 'email');
      if (exists) {
        return 'Um email existente já esta cadastrado';
      }

      await create(user);
      await insertProfile(user.profile!);
    } catch (error) {
      console.log('error: ' + TABLE_USERS, error);
    }
  };

  const getExistentUsers = async (value:string,field:string):Promise<boolean | null> => {
    const users = await getExistsByQuery(
      'users',
      Q.where(field, Q.like(`%${value}%`)),
    );
    console.log(users);
return users

  };
  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email.trim());
  };


  const getCurrentUser = async () => {
    try {
      const result = await getAll();

      if (!result.length) {
        return null;
      }

      const { _status, _changed, ...user } = result[0]._raw;

      return user;
    } catch (error) {
      console.log(`error: ${TABLE_USERS}`, error);
      return null;
    }
  };


  return {
    insertUser,
    getCurrentUser,
    validateEmail,
  }

}
export default  useUsers;