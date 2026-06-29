import { useState } from 'react';
import { Animated, Image, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import BtnComponent from '@/components/buttons/BtnComponent';
import useAnimations from '@/hooks/useAnimations';
import { DEFAULT_THEME } from '@/theme/constants';

const theme = DEFAULT_THEME;

const SecondScreen = ({ openGallery, openCamera, image, onContinue }: any) => {
  const [showImage, setShowImage] = useState(false);

  const {
    imageScaleAnim,
    imageOpacityAnim,
    scaleAnim,
    slideAnim,
    containerOpacityAnim,
    containerSlideAnim,
    iconOpacityAnim,
    fadeAnim,
  } = useAnimations(image, showImage, setShowImage);

  return (
    <Animated.View
      style={{
        opacity: containerOpacityAnim,
        transform: [{ translateY: containerSlideAnim }],
      }}
    >
      {/* Header */}
      <View>
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
              width: 42,
              height: 42,
              borderRadius: 21,
              backgroundColor: theme.colors.primary,
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Text
              style={{
                color: theme.colors.onPrimary,
                fontWeight: '700',
                fontSize: 16,
              }}
            >
              2
            </Text>
          </View>

          <View>
            <Text
              style={{
                fontSize: 18,
                fontWeight: '700',
                color: theme.colors.text,
              }}
            >
              Foto de Perfil
            </Text>

            <Text
              style={{
                fontSize: 14,
                color: theme.colors.textSecondary,
                marginTop: 2,
              }}
            >
              Escolha uma imagem para personalizar sua conta.
            </Text>
          </View>
        </View>

        {/* Progress */}
        <View
          style={{
            height: 6,
            backgroundColor: theme.colors.surfaceContainerHighest,
            borderRadius: 999,
            overflow: 'hidden',
          }}
        >
          <Animated.View
            style={{
              width: '100%',
              height: '100%',
              backgroundColor: theme.colors.primary,
              borderRadius: 999,
            }}
          />
        </View>
      </View>

      {/* Avatar */}
      <Animated.View
        style={{
          alignItems: 'center',
          marginTop: 40,
          opacity: imageOpacityAnim,
          transform: [{ scale: imageScaleAnim }],
        }}
      >
        <View
          style={{
            width: 170,
            height: 170,
            borderRadius: 85,
            backgroundColor: theme.colors.surfaceContainer,
            justifyContent: 'center',
            alignItems: 'center',
            overflow: 'hidden',
            borderWidth: 3,
            borderColor: image
              ? theme.colors.primary
              : theme.colors.outlineVariant,
          }}
        >
          {image ? (
            <Image
              source={{ uri: image }}
              style={{
                width: '100%',
                height: '100%',
              }}
            />
          ) : (
            <Animated.View
              style={{
                opacity: iconOpacityAnim,
              }}
            >
              <Icon name="person" size={72} color={theme.colors.outline} />
            </Animated.View>
          )}
        </View>

        <Text
          style={{
            marginTop: 20,
            color: theme.colors.textSecondary,
            textAlign: 'center',
            lineHeight: 22,
            paddingHorizontal: 20,
          }}
        >
          {image
            ? 'Sua foto está pronta.'
            : 'Adicione uma foto para tornar sua experiência mais pessoal.'}
        </Text>

        {showImage && (
          <Animated.Text
            style={{
              marginTop: 12,
              color: theme.colors.primary,
              fontWeight: '700',
              fontSize: 14,
            }}
          >
            ✓ Foto carregada
          </Animated.Text>
        )}
      </Animated.View>

      {/* Buttons */}
      <Animated.View
        style={{
          gap: 12,
          marginTop: 40,
          opacity: fadeAnim,
          transform: [{ scale: scaleAnim }, { translateY: slideAnim }],
        }}
      >
        <BtnComponent
          text="Escolher da Galeria"
          variant="primary"
          onPress={openGallery}
          btn_text_type="white"
        />

        <BtnComponent
          text="Abrir Câmera"
          variant="outline"
          onPress={openCamera}
          btn_text_type="colored"
        />
      </Animated.View>

      {showImage && (
        <Animated.View
          style={{
            marginTop: 24,
            opacity: fadeAnim.interpolate({
              inputRange: [0, 1],
              outputRange: [1, 0],
            }),
            transform: [
              {
                scale: scaleAnim.interpolate({
                  inputRange: [0.8, 1],
                  outputRange: [1, 0.8],
                }),
              },
              {
                translateY: slideAnim.interpolate({
                  inputRange: [0, 40],
                  outputRange: [40, 0],
                }),
              },
            ],
          }}
        >
          <BtnComponent
            text="Finalizar Cadastro"
            variant="primary"
            onPress={onContinue}
            btn_text_type="white"
          />
        </Animated.View>
      )}
    </Animated.View>
  );
};

export default SecondScreen;
