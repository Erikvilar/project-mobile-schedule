import { useEffect, useMemo, useState } from 'react';
import { UserRepository } from '@/database/repository/UserRepository';

const useUsers = () => {
  const repository = useMemo(() => new UserRepository(), []);
  const [user, setUser] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = async (userData: {
    id: string;
    name: string;
    email: string;
    age: number;
    profile?: { userId: string; avatar_url: string | undefined; logged:string };
  }): Promise<string | null> => {
    try {
      setLoading(true);
      setError(null);

      const exists = await repository.getExistentUsers(userData.email, 'email');
      if (exists) {
        const errorMsg = 'Um email existente já está cadastrado';
        setError(errorMsg);
        return errorMsg;
      }

      if (!validateEmail(userData.email)) {
        const errorMsg = 'Email inválido';
        setError(errorMsg);
        return errorMsg;
      }
      const user = {
        id: userData.id,
        email: userData.email,
        name: userData.name,
      }
      await repository.create(user);

      if (userData.profile) {
        await repository.createProfile({
          userId: user.id,
          bio: '',
          image: userData.profile.avatar_url || '',
          avatar_url: userData.profile.avatar_url,
          website: '',
          phone: '',
          location: '',
          theme: '',
          logged: 'true'
        });
      }

      setUser(userData.name);
      return null;
    } catch (err) {
      const errorMsg =
        err instanceof Error ? err.message : 'Erro ao criar usuário';
      setError(errorMsg);
      console.error('Erro ao criar usuário:', err);
      return errorMsg;
    } finally {
      setLoading(false);
    }
  };

  const getExistentUsers = async (
    value: string,
    field: string,
  ): Promise<boolean> => {
    try {
      const exists = await repository.getExistentUsers(value, field);
      return exists;
    } catch (error) {
      console.error('Erro ao verificar usuário existente:', error);
      return false;
    }
  };

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email.trim());
  };

  const getUser = async () => {
    try{
      const currentUser  = await repository.getAll();
      return currentUser[0]?._raw;
    }catch(error){
      console.log(error)
    }
  }

  const getCurrentUser = async () => {
    try {
      setLoading(true);
      const users = await repository.getAll();

      if (!users.length) {
        return null;
      }

      const userData = users[0];
      const userName = userData?.name || userData?._raw?.name;
      const formatted = userName
        ? userName.charAt(0).toUpperCase() + userName.slice(1)
        : null;

      return formatted;
    } catch (error) {
      console.error('Erro ao obter usuário atual:', error);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const getUserById = async (id: string) => {
    try {
      return await repository.findById(id);
    } catch (error) {
      console.error('Erro ao buscar usuário:', error);
      return null;
    }
  };

  const getUserByEmail = async (email: string) => {
    try {
      return await repository.findByEmailOrId(email, 'email');
    } catch (error) {
      console.error('Erro ao buscar usuário por email:', error);
      return null;
    }
  };

  const updateUser = async (
    userId: string,
    data: { name?: string; email?: string; age?: number },
  ) => {
    try {
      setLoading(true);
      setError(null);

      if (data.email && data.email !== user) {
        const exists = await getExistentUsers(data.email, 'email');
        if (exists) {
          const errorMsg = 'Este email já está em uso';
          setError(errorMsg);
          return false;
        }
      }

      await repository.updateUser(userId, data);

      if (data.name) {
        setUser(data.name);
      }

      return true;
    } catch (err) {
      const errorMsg =
        err instanceof Error ? err.message : 'Erro ao atualizar usuário';
      setError(errorMsg);
      console.error('Erro ao atualizar usuário:', err);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const deleteUser = async (userId: string) => {
    try {
      setLoading(true);
      setError(null);

      await repository.deleteUser(userId);
      setUser('');

      return true;
    } catch (err) {
      const errorMsg =
        err instanceof Error ? err.message : 'Erro ao deletar usuário';
      setError(errorMsg);
      console.error('Erro ao deletar usuário:', err);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const getProfile = async (userId: string) => {
    try {
      return await repository.findProfileByUserId(userId);
    } catch (error) {
      console.error('Erro ao obter perfil:', error);
      return null;
    }
  };

  const saveProfilePhoto = async (userId: string, photoUri: string) => {
    try {
      setLoading(true);
      setError(null);

      await repository.updateProfile(userId, {
        image: photoUri,
        avatar_url: photoUri,
      });

      return true;
    } catch (err) {
      const errorMsg =
        err instanceof Error ? err.message : 'Erro ao salvar foto';
      setError(errorMsg);
      console.error('Erro ao salvar foto:', err);
      return false;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getCurrentUser().then(currentUser => {
      if (currentUser) {
        setUser(currentUser);
      }
    });
  }, []);

  return {
    user,
    loading,
    error,
    insertUser: create,
    validateEmail,
    getExistentUsers,
    getCurrentUser,
    getUserById,
    getUser,
    getUserByEmail,
    updateUser,
    deleteUser,
    getProfile,
    saveProfilePhoto,
  };
};

export default useUsers;
