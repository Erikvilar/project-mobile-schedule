
import { useMemo } from 'react';
import { UserRepository } from '@/database/repository/UserRepository.ts';



export interface ProfileInterface {
  userId: string;
  bio: string;
  image: string;
  avatar_url: string | undefined;
  website: string;
  phone: string;
  created_at: string;
}
const useProfile = () => {

  const repository = useMemo(() => new UserRepository(), []);


  return {

  };
}
export default useProfile