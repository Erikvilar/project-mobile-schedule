import { useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  Easing,

} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import useIA from '@/hooks/useIA.ts';



import { DEFAULT_THEME } from '@/theme/constants';
import { CURRENT_THEME } from '@/theme/ThemeManager.ts';
const LoadAppScreen = () => {
  const navigation = useNavigation<any>();
  const { sincronize,progress } = useIA();
  const spinAnim = useRef(new Animated.Value(0)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;
  const loadingBarAnim = useRef(new Animated.Value(0)).current;
  const theme = CURRENT_THEME;
  const styles = stylesBase(theme);
  // Pulsing aura animations
  useEffect(() => {
    Animated.loop(
      Animated.timing(spinAnim, {
        toValue: 1,
        duration: 2000,
        easing: Easing.inOut(Easing.ease),
        useNativeDriver: true,
      }),
    ).start();
  }, [spinAnim]);

  // Loading bar animation
  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(loadingBarAnim, {
          toValue: 1,
          duration: 1500,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(loadingBarAnim, {
          toValue: 0,
          duration: 0,
          useNativeDriver: true,
        }),
      ]),
    ).start();
  }, [loadingBarAnim]);

  // Fade in init sequence
  useEffect(() => {
    setTimeout(() => {
      Animated.timing(opacityAnim, {
        toValue: 1,
        duration: 1000,
        easing: Easing.ease,
        useNativeDriver: true,
      }).start();
    }, 200);
  }, [opacityAnim]);

  // Initialize model
  useEffect(() => {
    const loadModel = async () => {
      try {
        await sincronize();
        setTimeout(() => {
          navigation.replace('Home');
        }, 1000);
      } catch (error) {
        console.error('Erro ao carregar:', error);
      }
    };

    loadModel();
  }, [sincronize, navigation]);

  const scale1 = spinAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0.8, 1.5],
  });

  const scale2 = spinAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0.8, 1.5],
  });

  const opacity1 = spinAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0.5, 0],
  });

  const opacity2 = spinAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0.5, 0],
  });

  const loadingBarTranslate = loadingBarAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [-100, 300],
  });

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        {/* Logo with pulsing aura */}
        <View style={styles.logoContainer}>
          {/* Aura 1 */}
          <Animated.View
            style={[
              styles.aura1,
              {
                transform: [{ scale: scale1 }],
                opacity: opacity1,
              },
            ]}
          />

          {/* Aura 2 */}
          <Animated.View
            style={[
              styles.aura2,
              {
                transform: [{ scale: scale2 }],
                opacity: opacity2,
              },
            ]}
          />

          {/* Logo Text */}
          <Text style={styles.title}>Etheria</Text>
        </View>

        {/* Initialization Sequence */}
        <Animated.View
          style={[
            styles.initSequence,
            {
              opacity: opacityAnim,
            },
          ]}
        >
          {/* Loading Bar */}
          <View style={styles.loadingBarContainer}>
            <Animated.View
              style={[
                styles.loadingBar,
                {
                  transform: [{ translateX: loadingBarTranslate }],
                },
              ]}
            />
          </View>

          {/* Message */}
          <Text style={styles.message}>Sua inteligência offline</Text>
        </Animated.View>
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>Inicializando módulo local... {progress} %</Text>
      </View>
    </View>
  );
};

const stylesBase = (theme:any) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },

  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },

  logoContainer: {
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 56,
  },

  aura1: {
    position: 'absolute',
    width: 180,
    height: 180,
    borderRadius: 90,
    backgroundColor: '#BD00FF20',
  },

  aura2: {
    position: 'absolute',
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#00EEFC20',
  },

  title: {
    fontSize: 44,
    fontWeight: '700',
    color: theme.colors.onBackground,
    letterSpacing: -1.5,
    textShadowColor: '#BD00FF60',
    textShadowRadius: 18,
  },

  initSequence: {
    alignItems: 'center',
  },

  loadingBarContainer: {
    width: 120,
    height: 4,
    borderRadius: 999,
    overflow: 'hidden',
    backgroundColor: theme.colors.surfaceContainerHighest,
    marginBottom: 18,
  },

  loadingBar: {
    width: 40,
    height: '100%',
    backgroundColor: theme.colors.secondaryContainer,
    borderRadius: 999,
  },

  message: {
    fontSize: 16,
    color: theme.colors.onSurfaceVariant,
    textAlign: 'center',
    lineHeight: 24,
  },

  footer: {
    paddingBottom: 32,
    alignItems: 'center',
  },

  footerText: {
    fontSize: 12,
    color: theme.colors.outline,
    letterSpacing: 1,
    fontWeight: '500',
  },
});

export default LoadAppScreen;
