
import { TABLE_USERS } from '@/database/schemas';
import { useEffect, useMemo, useState } from 'react';
import { UserRepository } from '@/database/repository/UserRepository.ts';



const useUsers = ()=>{

  const repository = useMemo(()=> new UserRepository(), []);
  const [user,setUser] =useState('');
  const create = async (user: {
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

      await repository.create(user);

    } catch (error) {
      console.log('error: ' + TABLE_USERS, error);
    }
  };

  const getExistentUsers = async (value:string,field:string):Promise<boolean | null> => {
    const users = await repository.getExistentUsers(value,field);
    console.log(users);
return users

  };

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email.trim());
  };

  const getCurrentUser = async () => {
    try {
      const result = await repository.getAll();

      if (!result.length) {
        return null;
      }

      const { _status, _changed, ...user } = result[0]._raw;
      console.log("USUARIO",result[0]._raw)
      return user?.name.slice(0, 1)[0].toUpperCase() + user?.name.slice(1);
    } catch (error) {
      console.log(`error: ${TABLE_USERS}`, error);
      return null;
    }
  };

  useEffect(() => {
    getCurrentUser().then((current)=>{
      setUser(current)
    })
    console.log("usuario carregado",user)
  }, []);

  return {
    insertUser: create,
    user,
    validateEmail,
  }

}
export default  useUsers;