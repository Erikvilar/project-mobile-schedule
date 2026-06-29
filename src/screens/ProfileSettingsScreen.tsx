import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  TextInput,
  ActivityIndicator,
  Alert,
  Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import useUsers from '@/hooks/useUsers';
import useProfile from '@/hooks/useProfile';
import { DEFAULT_THEME } from '@/theme/constants';

const { width } = Dimensions.get('window');

const ProfileSettingsScreen = ({ navigation }: any) => {
  const theme = DEFAULT_THEME;
  const { user: userName } = useUsers();
  const { profile, loading, updateBasicInfo } = useProfile();

  const [profileData, setProfileData] = useState({
    bio: '',
    website: '',
    phone: '',
    location: '',
    image: '',
  });

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (profile) {
      setProfileData({
        bio: profile.bio || '',
        website: profile.website || '',
        phone: profile.phone || '',
        location: profile.location || '',
        image: profile.avatar_url || profile.image || '',
      });
    }
  }, [profile]);

  const handleSaveProfile = async () => {
    try {
      setIsLoading(true);
      const success = await updateBasicInfo(userName, {
        bio: profileData.bio,
        website: profileData.website,
        phone: profileData.phone,
        location: profileData.location,
      });
      setIsLoading(false);

      if (success) {
        Alert.alert('Sucesso', 'Perfil atualizado com sucesso!');
      } else {
        Alert.alert('Erro', 'Falha ao atualizar o perfil');
      }
    } catch (error) {
      console.error('Erro ao salvar perfil:', error);
      setIsLoading(false);
      Alert.alert('Erro', 'Erro ao atualizar o perfil');
    }
  };

  if (loading) {
    return (
      <View
        style={[styles.container, { backgroundColor: theme.colors.background }]}
      >
        <ActivityIndicator size="large" color={theme.colors.primary} />
      </View>
    );
  }

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: theme.colors.background }]}
      showsVerticalScrollIndicator={false}
    >
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation?.goBack?.()}>
          <Icon name="chevron-back" size={28} color={theme.colors.onSurface} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: theme.colors.onSurface }]}>
          Configurações de Perfil
        </Text>
        <View style={{ width: 28 }} />
      </View>

      {/* Foto do Perfil */}
      <View style={styles.photoSection}>
        <View
          style={[
            styles.photoContainer,
            {
              backgroundColor: theme.colors.surfaceContainer,
              borderColor: theme.colors.primary,
            },
          ]}
        >
          {profileData.image ? (
            <Image source={{ uri: profileData.image }} style={styles.photo} />
          ) : (
            <Icon
              name="person-circle"
              size={120}
              color={theme.colors.primary}
            />
          )}
        </View>

        <Text style={[styles.userName, { color: theme.colors.onSurface }]}>
          {userName || 'Usuário'}
        </Text>
      </View>

      {/* Seção de Informações Básicas */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: theme.colors.onSurface }]}>
          Informações Básicas
        </Text>

        <View
          style={[
            styles.inputContainer,
            {
              backgroundColor: theme.colors.surfaceContainer,
              borderColor: theme.colors.outline,
            },
          ]}
        >
          <Icon name="pencil" size={18} color={theme.colors.onSurfaceVariant} />
          <TextInput
            style={[styles.input, { color: theme.colors.onSurface }]}
            placeholder="Bio"
            placeholderTextColor={theme.colors.onSurfaceVariant}
            value={profileData.bio}
            onChangeText={text =>
              setProfileData(prev => ({ ...prev, bio: text }))
            }
            maxLength={150}
            multiline
          />
        </View>

        <View
          style={[
            styles.inputContainer,
            {
              backgroundColor: theme.colors.surfaceContainer,
              borderColor: theme.colors.outline,
            },
          ]}
        >
          <Icon name="globe" size={18} color={theme.colors.onSurfaceVariant} />
          <TextInput
            style={[styles.input, { color: theme.colors.onSurface }]}
            placeholder="Website"
            placeholderTextColor={theme.colors.onSurfaceVariant}
            value={profileData.website}
            onChangeText={text =>
              setProfileData(prev => ({ ...prev, website: text }))
            }
          />
        </View>

        <View
          style={[
            styles.inputContainer,
            {
              backgroundColor: theme.colors.surfaceContainer,
              borderColor: theme.colors.outline,
            },
          ]}
        >
          <Icon name="call" size={18} color={theme.colors.onSurfaceVariant} />
          <TextInput
            style={[styles.input, { color: theme.colors.onSurface }]}
            placeholder="Telefone"
            placeholderTextColor={theme.colors.onSurfaceVariant}
            value={profileData.phone}
            onChangeText={text =>
              setProfileData(prev => ({ ...prev, phone: text }))
            }
            keyboardType="phone-pad"
          />
        </View>

        <View
          style={[
            styles.inputContainer,
            {
              backgroundColor: theme.colors.surfaceContainer,
              borderColor: theme.colors.outline,
            },
          ]}
        >
          <Icon
            name="location"
            size={18}
            color={theme.colors.onSurfaceVariant}
          />
          <TextInput
            style={[styles.input, { color: theme.colors.onSurface }]}
            placeholder="Localização"
            placeholderTextColor={theme.colors.onSurfaceVariant}
            value={profileData.location}
            onChangeText={text =>
              setProfileData(prev => ({ ...prev, location: text }))
            }
          />
        </View>
      </View>

      {/* Botão Salvar */}
      <TouchableOpacity
        onPress={handleSaveProfile}
        disabled={isLoading}
        style={[
          styles.saveButton,
          {
            backgroundColor: theme.colors.primary,
            opacity: isLoading ? 0.6 : 1,
          },
        ]}
      >
        {isLoading ? (
          <ActivityIndicator color="#ffffff" />
        ) : (
          <>
            <Icon name="checkmark" size={20} color="#ffffff" />
            <Text style={styles.saveButtonText}>Salvar Alterações</Text>
          </>
        )}
      </TouchableOpacity>

      <View style={{ height: 30 }} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 16,
    paddingTop: 12,
  },

  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    letterSpacing: 0.3,
  },

  // Seção de Foto
  photoSection: {
    alignItems: 'center',
    paddingVertical: 24,
    paddingHorizontal: 16,
  },

  photoContainer: {
    width: 140,
    height: 140,
    borderRadius: 70,
    borderWidth: 3,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    position: 'relative',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    elevation: 8,
  },

  photo: {
    width: '100%',
    height: '100%',
  },

  userName: {
    fontSize: 22,
    fontWeight: '700',
    marginTop: 16,
    letterSpacing: -0.5,
  },

  // Seções
  section: {
    paddingHorizontal: 16,
    paddingVertical: 20,
    gap: 12,
  },

  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 0.3,
    marginBottom: 4,
  },

  // Inputs
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 1,
    gap: 10,
  },

  input: {
    flex: 1,
    fontSize: 15,
    fontWeight: '500',
    paddingVertical: 4,
  },

  // Botão Salvar
  saveButton: {
    marginHorizontal: 16,
    marginVertical: 16,
    paddingVertical: 14,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 6,
  },

  saveButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
    letterSpacing: 0.3,
  },
});

export default ProfileSettingsScreen;
