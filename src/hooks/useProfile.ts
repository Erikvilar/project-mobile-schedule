import { useMemo, useState, useCallback } from 'react';
import { UserRepository } from '@/database/repository/UserRepository';

export interface ProfileInterface {
  userId: string;
  bio: string;
  image: string;
  avatar_url: string | undefined;
  website: string;
  phone: string;
  theme: string;
  location: string;
  created_at: string;
  updated_at: string;
}

const useProfile = () => {
  const repository = useMemo(() => new UserRepository(), []);
  const [profile, setProfile] = useState<ProfileInterface | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  /**
   * Busca o perfil do usuário
   */
  const getProfile = useCallback(
    async (userId: string): Promise<ProfileInterface | null> => {
      try {
        setLoading(true);
        setError(null);
        const userProfile = await repository.findProfileByUserId(userId);
        if (userProfile) {
          setProfile(userProfile as ProfileInterface);
          return userProfile as ProfileInterface;
        }
        return null;
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : 'Erro ao buscar perfil';
        setError(errorMessage);
        console.error('Error fetching profile:', err);
        return null;
      } finally {
        setLoading(false);
      }
    },
    [repository],
  );

  /**
   * Atualiza o perfil do usuário
   */
  const updateProfile = useCallback(
    async (
      userId: string,
      profileData: Partial<ProfileInterface>,
    ): Promise<boolean> => {
      try {
        setLoading(true);
        setError(null);

        const updatedProfile = {
          userId,
          ...profileData,
          updated_at: new Date().toISOString(),
        };

        await repository.updateProfile(userId, updatedProfile);

        setProfile(prev => (prev ? { ...prev, ...updatedProfile } : null));

        return true;
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : 'Erro ao atualizar perfil';
        setError(errorMessage);
        console.error('Error updating profile:', err);
        return false;
      } finally {
        setLoading(false);
      }
    },
    [repository],
  );

  /**
   * Atualiza a foto do perfil
   */
  const updateProfileImage = useCallback(
    async (userId: string, imageUri: string): Promise<boolean> => {
      return updateProfile(userId, {
        image: imageUri,
        avatar_url: imageUri,
      });
    },
    [updateProfile],
  );

  /**
   * Atualiza o tema do usuário
   */
  const updateTheme = useCallback(
    async (userId: string, theme: string): Promise<boolean> => {
      return updateProfile(userId, { theme });
    },
    [updateProfile],
  );

  /**
   * Atualiza informações básicas do perfil
   */
  const updateBasicInfo = useCallback(
    async (
      userId: string,
      data: {
        bio?: string;
        website?: string;
        phone?: string;
        location?: string;
      },
    ): Promise<boolean> => {
      return updateProfile(userId, data);
    },
    [updateProfile],
  );

  /**
   * Limpa o perfil do cache
   */
  const clearProfile = useCallback(() => {
    setProfile(null);
    setError(null);
  }, []);

  return {
    profile,
    loading,
    error,
    getProfile,
    updateProfile,
    updateProfileImage,
    updateTheme,
    updateBasicInfo,
    clearProfile,
  };
};

export default useProfile;
