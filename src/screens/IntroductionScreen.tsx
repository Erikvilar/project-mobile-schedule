

import { useLayoutEffect, useState } from 'react';
import {
  Text,
  TouchableOpacity,
  View,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import useMedia from '@/hooks/useMedia.ts';
import useUsers from '@/hooks/useUsers.ts';
import SecondScreen from "@/screens/introduction/SecondScreen.tsx";

import FirstScreen from "@/screens/introduction/FirstScreen.tsx";
import { CURRENT_THEME } from '@/theme/ThemeManager.ts';

const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const IntroductionScreen = ({ navigation }: any) => {
  const theme = CURRENT_THEME;
  const [user, setUser] = useState({
    id: '',
    name: '',
    email: '',
    age:1,
  });

  const [indexStep, setIndexStep] = useState(1);

  const [errors, setErrors] = useState({
    name: '',
    email: '',
    age:''
  });

  const { insertUser } = useUsers();

  const { openCamera, openGallery, image, setImage } = useMedia();

  const handleSetName = (value: string) => {
    setUser(prev => ({ ...prev, name: value }));
    if (errors.name) {
      setErrors(prev => ({ ...prev, name: '' }));
    }
  };

  const handleSetAge = (value: number) => {

    setUser(prev => ({ ...prev, age: value }));
    if (errors.name) {
      setErrors(prev => ({ ...prev, age: '' }));
    }
  };

  const handleSetEmail = (value: string) => {
    setUser(prev => ({ ...prev, email: value }));
    if (errors.email) {
      setErrors(prev => ({ ...prev, email: '' }));
    }
  };

  const incrementStep = () => {
    setIndexStep(prev => prev + 1);
  };

  const goBackStep = () => {
    setIndexStep(prev => prev - 1);
    setImage(undefined);
  };

  const RenderHeader = ()=>(
    <TouchableOpacity
      style={{
        marginTop: 10,
        padding: 10,
        marginLeft: 10,
        borderRadius: 10,
        width: '15%',
        backgroundColor: theme.colors.surfaceContainerHigh,
      }}
      onPress={() =>
        indexStep === 1 ? navigation.navigate('Presentation') : goBackStep()
      }
    >
      <Icon name="chevron-back" size={24} color={theme.colors.onSurface} />
    </TouchableOpacity>
)

  const navigateNextStep = async () => {
    if (!validateEmail(user.email)) {
      setErrors({
        name: user.name.trim() === '' ? 'Nome é obrigatório' : '',
        email: 'Email inválido',
        age:''
      });
      return;
    }

    if (!user.name.trim()) {
      setErrors({
        name: 'Nome é obrigatório',
        email: '',
        age:''
      });
      return;
    }

    try {
      setErrors({ name: '', email: '',age:'' });
      incrementStep();
    } catch (error) {
      console.error('Erro ao salvar:', error);
      setErrors({
        name: '',
        email: 'Erro ao salvar usuário',
        age:''
      });
    }
  };

  const handleContinueWithPhoto = async () => {
    try {
      console.log('Foto confirmada:', image);
     await handleSave();
      incrementStep();
    } catch (error) {
      console.error('Erro ao continuar:', error);
    }
  };

  const handleSave = async()=>{
    try {

      const userId = Date.now().toString();
      const userData = {
        id: userId,
        name: user.name,
        email: user.email,
        age: user.age,
        profile: {
          userId: userId,
          bio: '',
          image: image,
          avatar_url: image,
          website:'',
          phone:'',
          theme:'',
          logged:'true',
          created_at: Date.now().toLocaleString(),
        },
      };

      await insertUser(userData);
      navigation.navigate('LoadApp');
    }catch(error){
      console.error('Erro ao salvar:', error);
    }
  }

  const renderStep = () => {
    switch (indexStep) {
      case 1:
        return (
          <FirstScreen
            user={user.name}
            setUser={handleSetName}
            email={user.email}
            age={user.age}
            validateEmail={validateEmail}
            setAge={handleSetAge}
            setEmail={handleSetEmail}
            incrementStep={navigateNextStep}
            errors={errors}
          />
        );
      case 2:
        return (
          <SecondScreen
            openGallery={openGallery}
            openCamera={openCamera}
            image={image}

            onContinue={handleContinueWithPhoto}
          />
        );
      default:
        return null;
    }
  };

  return (
    <View
      style={{
        flex: 1,

        backgroundColor: theme.colors.background,
      }}
    >
      <RenderHeader/>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          backgroundColor: theme.colors.background,
          paddingHorizontal:10,
          paddingTop: 24,

        }}
      >
        <View

        >
          <Text
            style={{
              fontSize: 30,
              fontWeight: '700',
              color: theme.colors.text,
              marginBottom: 12,
              letterSpacing: -0.5,
            }}
          >
            {indexStep === 1 ? 'Bem-vindo' : 'Quase lá'}
          </Text>

          <Text
            style={{
              fontSize: 15,
              color: theme.colors.textSecondary,
              lineHeight: 24,
            }}
          >
            {indexStep === 1
              ? 'Precisamos de algumas informações para personalizar sua experiência offline.'
              : 'Escolha uma foto de perfil para concluir sua configuração inicial.'}
          </Text>
        </View>

        <View
          style={{

            backgroundColor: theme.colors.surfaceContainerLow,
            borderRadius: 20,
            borderWidth: 1,
            borderColor: theme.colors.outlineVariant,
            padding: 24,
          }}
        >
          {renderStep()}
        </View>

      </ScrollView>
    </View>
  );
};

export default IntroductionScreen;