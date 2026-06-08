

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
import Paper from "@/components/paper/Paper.tsx";
import FirstScreen from "@/screens/introduction/FirstScreen.tsx";

const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const IntroductionScreen = ({ navigation }: any) => {

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

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () =>
        indexStep > 1 ? (
          <TouchableOpacity
            style={{
              marginTop:10,
              padding: 10,
              borderRadius: 10,
              backgroundColor: '#F5F5F5',
            }}
            onPress={goBackStep}
          >
            <Icon name="chevron-back" size={24} color="#000" />
          </TouchableOpacity>
        ) : null,
    });
  }, [navigation, indexStep]);

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
    <Paper>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ width: '100%',marginTop:10 }}>
          <Text
            style={{
              fontSize: 28,
              fontWeight: '800',
              color: '#000',
              marginBottom: 8,

            }}
          >
            {indexStep === 1 ? 'Bem-vindo!' : 'Quase lá!'}
          </Text>
          <Text style={{ fontSize: 15, color: '#999', lineHeight: 22 }}>

            {indexStep === 1
              ? 'Precisamos de algumas informações para criar sua conta'
              : 'Escolha uma foto de perfil para completar seu cadastro'}
          </Text>
        </View>
        {renderStep()}
      </ScrollView>
    </Paper>
  );
};

export default IntroductionScreen;