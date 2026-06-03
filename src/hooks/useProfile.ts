import { TABLE_PROFILE, TABLE_USERS } from '@/database/schemas';
import { useDatabase } from '@/database/hooks/useDatabase.ts';



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
  } = useDatabase(TABLE_PROFILE);

  const insertProfile = async (profile: {
    userId: string;
    avatar_url: string | undefined;
  }) => {
    try {
      await create(profile);
    } catch (error) {
      console.error(error);
    }
  };
  const getCurrentProfile = async () => {
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
    insertProfile,
    getCurrentProfile
  };
}
export default useProfile