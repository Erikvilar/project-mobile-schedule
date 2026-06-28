import { useEffect, useRef } from 'react';
import { Animated, Easing, Text, View } from 'react-native';
import InputComponent from '@/components/inputs/InputComponent.tsx';
import Icon from 'react-native-vector-icons/Ionicons';
import BtnComponent from '@/components/buttons/BtnComponent.tsx';

const FirstScreen = ({
  user,
  setUser,
  email,
  setEmail,
  age,
  setAge,
  incrementStep,
  errors,
}: any) => {
  const slideAnim = useRef(new Animated.Value(50)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 700,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
      Animated.timing(opacityAnim, {
        toValue: 1,
        duration: 700,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  return (
    <Animated.View
      style={{
        opacity: opacityAnim,
        transform: [{ translateY: slideAnim }],
      }}
    >
      <View style={{ marginBottom: 20, marginTop: 10 }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: 12,
            marginBottom: 20,
          }}
        >
          <View
            style={{
              width: 40,
              height: 40,
              borderRadius: 20,
              backgroundColor: '#000',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Text style={{ color: '#fff', fontWeight: '700', fontSize: 16 }}>
              1
            </Text>
          </View>
          <View>
            <Text style={{ fontSize: 16, fontWeight: '600', color: '#000' }}>
              Dados Pessoais
            </Text>
            <Text style={{ fontSize: 12, color: '#999', marginTop: 2 }}>
              Nome e email
            </Text>
          </View>
        </View>

        <View
          style={{
            height: 2,
            backgroundColor: '#E8E8E8',
            borderRadius: 1,
          }}
        >
          <Animated.View
            style={{
              height: '100%',
              width: '50%',
              backgroundColor: '#000',
              borderRadius: 1,
            }}
          />
        </View>
      </View>

      <View style={{ gap: 16, marginBottom: 30 }}>
        <InputComponent
          value={user}
          setValue={setUser}
          label="Nome completo"
          labelIcon={<Icon name="person-outline" size={18} color="#000" />}
          placeholder="nome completo"
          error={errors.name}
        />

        <InputComponent
          value={email}
          setValue={setEmail}
          label="Email"
          labelIcon={<Icon name="mail-outline" size={18} color="#000" />}
          placeholder="seu@email.com"
          keyboardType="email-address"
          autoCapitalize="none"
          error={errors.email}
        />

      </View>

      <View style={{ width: '100%' }}>
        <BtnComponent
          text="Próximo"
          variant="primary"
          onPress={incrementStep}
          btn_text_type="white"
          disabled={!!errors.name || !!errors.email}
        />
      </View>
    </Animated.View>
  );
};
export default FirstScreen