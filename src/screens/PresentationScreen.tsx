import React, { useEffect, useState } from 'react';
import {
  Text,
  Image,
  StyleSheet,
  View,
  ScrollView,
  Animated,
  Dimensions,
} from 'react-native';
import { EdgeInsets, useSafeAreaInsets } from 'react-native-safe-area-context';

import {  Theme } from '@/theme/constants';

// @ts-ignore
import appConfig from '../business/appConfig.json';

import BtnComponent from '@/components/buttons/BtnComponent.tsx';
import PaperComponent from '@/components/paper/Paper.tsx';
import { CURRENT_THEME } from '@/theme/ThemeManager.ts';



const PresentationScreen = ({ navigation }: any) => {
  const insets = useSafeAreaInsets();
  const theme = CURRENT_THEME
  const [fadeAnim] = useState(new Animated.Value(0));
  const [scaleAnim] = useState(new Animated.Value(0.95));

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
    ]).start();
  }, [fadeAnim, scaleAnim]);

  const styles = functionStyles(insets, theme);

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.content,
          {
            opacity: fadeAnim,
            transform: [{ scale: scaleAnim }],
          },
        ]}
      >
          <Image source={require('../assets/logo.png')} style={styles.logo} />
        <View>
          <View style={styles.buttons}>
            <BtnComponent
              text="Começar"
              navigation={navigation}
              navigationPath="Introduction"
              variant="secondary"
              btn_text_type="black"
            />

            <BtnComponent
              text="Pular"
              navigation={navigation}
              navigationPath="Home"
              variant="normal"
              btn_text_type="gray"
            />
          </View>
        </View>

        {/* Bottom */}
        <View style={styles.privacyContainer}>
          <View style={styles.privacyDot} />
          <Text style={styles.privacyText}>Inteligência 100% Offline</Text>
        </View>
      </Animated.View>
    </View>
  );
};

const functionStyles = (insets: EdgeInsets, theme: Theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
      paddingTop: insets.top + 24,
      paddingBottom: insets.bottom + 24,
      paddingHorizontal: 24,
    },

    content: {
      flex: 1,
      justifyContent: 'space-between',
    },

    logoSection: {
      alignItems: 'center',
      paddingTop: 40,
    },

    logo: {
      width: '100%',
      paddingTop: 40,
      height: '60%',
      resizeMode: 'contain',
    },

    centerSection: {
      alignItems: 'center',
      justifyContent: 'center',
    },

    label: {
      fontSize: 17,
      fontWeight: '600',
      color: theme.colors.primary,
      textAlign: 'center',
      marginBottom: 12,
    },



    buttons: {
      width: '100%',
      gap: 14,
    },

    privacyContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      paddingBottom: 12,
    },

    privacyDot: {
      width: 8,
      height: 8,
      borderRadius: 2,
      backgroundColor: theme.colors.primaryContainer,
      marginRight: 8,
    },

    privacyText: {
      color: theme.colors.textSecondary,
      fontSize: 12,
      fontFamily: 'JetBrains Mono',
    },
  });
export default PresentationScreen;
