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



const LoadAppScreen = () => {
  const navigation = useNavigation();
  const { initialize } = useIA();
  const spinAnim = useRef(new Animated.Value(0)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;
  const loadingBarAnim = useRef(new Animated.Value(0)).current;

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

        setTimeout(() => {
          navigation.replace('Home');
        }, 1000);
      } catch (error) {
        console.error('Erro ao carregar:', error);
      }
    };

    loadModel();
  }, [initialize, navigation]);

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
          <Text style={styles.title}>Seiko</Text>
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
        <Text style={styles.footerText}>Inicializando módulo local...</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9ff',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  logoContainer: {
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 48,
  },
  aura1: {
    position: 'absolute',
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: '#dce2f3',
  },
  aura2: {
    position: 'absolute',
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#e2e8f8',
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: '#000000',
    letterSpacing: -0.02,
    zIndex: 10,
  },
  initSequence: {
    alignItems: 'center',
    gap: 16,
  },
  loadingBarContainer: {
    width: 48,
    height: 2,
    backgroundColor: '#dce2f3',
    borderRadius: 1,
    overflow: 'hidden',
  },
  loadingBar: {
    width: '33%',
    height: '100%',
    backgroundColor: '#000000',
    borderRadius: 1,
  },
  message: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '400',
    color: '#4c4546',
    textAlign: 'center',
  },
  footer: {
    paddingBottom: 20,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 12,
    lineHeight: 16,
    letterSpacing: 0.02,
    fontWeight: '500',
    color: '#7e7576',
  },
});

export default LoadAppScreen;
