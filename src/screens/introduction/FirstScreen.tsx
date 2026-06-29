import { useEffect, useRef } from 'react';
import { Animated, Easing, Text, View, StyleSheet } from 'react-native';
import InputComponent from '@/components/inputs/InputComponent.tsx';
import Icon from 'react-native-vector-icons/Ionicons';
import BtnComponent from '@/components/buttons/BtnComponent.tsx';
import { DEFAULT_THEME } from '@/theme/constants';

const FirstScreen = ({
  user,
  setUser,
  email,
  setEmail,
  age,
  setAge,
  incrementStep,
  errors,
  validateEmail,
}: any) => {
  const theme = DEFAULT_THEME;
  const slideAnim = useRef(new Animated.Value(50)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;
  const styles = stylesBase(theme);
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
  }, [slideAnim, opacityAnim]);

  const isEmailValid = email ? validateEmail(email) : true;
  const isFormValid =
    user.trim() &&
    email.trim() &&
    age &&
    isEmailValid &&
    !errors.name &&
    !errors.email &&
    !errors.age;

  return (
    <Animated.View
      style={[
        styles.container,
        {
          opacity: opacityAnim,
          transform: [{ translateY: slideAnim }],
        },
      ]}
    >
      {/* Header */}
      <View style={styles.headerSection}>
        <View
          style={[
            styles.stepBadge,
            {
              backgroundColor: theme.colors.primary,
            },
          ]}
        >
          <Text
            style={[
              styles.stepBadgeText,
              {
                color: '#ffffff',
              },
            ]}
          >
            1
          </Text>
        </View>

        <View style={styles.headerInfo}>
          <Text
            style={[
              styles.headerTitle,
              {
                color: theme.colors.onSurface,
              },
            ]}
          >
            Dados Pessoais
          </Text>
          <Text
            style={[
              styles.headerSubtitle,
              {
                color: theme.colors.onSurfaceVariant,
              },
            ]}
          >
            Nome, email e idade
          </Text>
        </View>
      </View>

      {/* Progress Bar */}
      <View
        style={[
          styles.progressContainer,
          {
            backgroundColor: theme.colors.surfaceContainerLow,
          },
        ]}
      >
        <Animated.View
          style={[
            styles.progressBar,
            {
              width: '33%',
              backgroundColor: theme.colors.primary,
            },
          ]}
        />
      </View>

      {/* Inputs */}
      <View style={styles.inputsContainer}>
        <InputComponent
          value={user}
          setValue={setUser}
          label="Nome completo"
          labelIcon={
            <Icon
              name="person-outline"
              size={18}
              color={theme.colors.primary}
            />
          }
          placeholder="Digite seu nome completo"
          error={errors.name}
        />

        <InputComponent
          value={email}
          setValue={setEmail}
          label="Email"
          labelIcon={
            <Icon name="mail-outline" size={18} color={theme.colors.primary} />
          }
          placeholder="seu@email.com"
          keyboardType="email-address"
          autoCapitalize="none"
          error={
            errors.email || (!isEmailValid && email ? 'Email inválido' : '')
          }
        />

        <InputComponent
          value={age}

          setValue={setAge}
          label="Idade"
          labelIcon={
            <Icon
              name="calendar-outline"
              size={18}
              color={theme.colors.primary}
            />
          }
          placeholder="Sua idade"
          keyboardType="number-pad"
          error={errors.age}
        />
      </View>

      {/* Button */}
      <View style={styles.buttonContainer}>
        <BtnComponent
          text="Próximo"
          variant="primary"
          onPress={incrementStep}
          disabled={!isFormValid}
        />
      </View>
    </Animated.View>
  );
};

const stylesBase = (theme:any) => StyleSheet.create({
  container: {
    marginTop: 10,
    backgroundColor:theme.colors.background
  },

  headerSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 24,
  },

  stepBadge: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 4,
  },

  stepBadgeText: {
    fontWeight: '700',
    fontSize: 18,
    letterSpacing: 0.5,
  },

  headerInfo: {
    flex: 1,
    justifyContent: 'center',
  },

  headerTitle: {
    fontSize: 16,
    fontWeight: '600',
    letterSpacing: 0.3,
  },

  headerSubtitle: {
    fontSize: 13,
    marginTop: 4,
    fontWeight: '400',
    letterSpacing: 0.2,
  },

  progressContainer: {
    height: 6,
    borderRadius: 3,
    overflow: 'hidden',

  },

  progressBar: {
    height: '100%',
    borderRadius: 3,
  },

  inputsContainer: {


  },

  buttonContainer: {
    width: '100%',
  },
});

export default FirstScreen;
