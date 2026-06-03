import { useState } from 'react';
import useAnimations from '@/hooks/useAnimations.ts';
import { Animated, Image, Text, View } from 'react-native';
import Btn_component from '@/components/buttons/Btn_component.tsx';
import Icon from 'react-native-vector-icons/Ionicons';
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
    fadeAnim
  } = useAnimations(image, showImage, setShowImage);



  return (
    <Animated.View
      style={{
        opacity: containerOpacityAnim,
        transform: [{ translateY: containerSlideAnim }],
      }}
    >
      <View style={{ marginBottom: 10,marginTop: 10 }}>
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
              2
            </Text>
          </View>
          <View>
            <Text style={{ fontSize: 16, fontWeight: '600', color: '#000' }}>
              Foto de Perfil
            </Text>
          </View>
        </View>

        <View
          style={{
            height: 2,
            backgroundColor: '#E8E8E8',
            borderRadius: 1,
            overflow: 'hidden',
          }}
        >
          <Animated.View
            style={{
              height: '100%',
              width: '100%',
              backgroundColor: '#000',
              borderRadius: 1,
            }}
          />
        </View>
      </View>

      <Animated.View
        style={{
          alignItems: 'center',
          opacity: imageOpacityAnim,
          transform: [{ scale: imageScaleAnim }],
        }}
      >
        <View
          style={{
            width: 160,
            height: 160,
            borderRadius: 80,
            marginTop: 30,
            backgroundColor: '#F5F5F5',
            justifyContent: 'center',
            alignItems: 'center',
            borderWidth: 2,
            borderColor: image ? '#000' : '#E0E0E0',
            overflow: 'hidden',
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 12 },
            shadowOpacity: 0.15,
            shadowRadius: 16,
            elevation: 10,
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
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Icon name="person" size={60} color="#BDBDBD" />
            </Animated.View>
          )}
        </View>

        {showImage && (
          <Animated.Text
            style={{
              marginTop: 16,
              color: '#000',
              fontSize: 14,
              fontWeight: '600',
            }}
          >
            Foto carregada
          </Animated.Text>
        )}
      </Animated.View>


      <Animated.View
        style={{
          gap: 12,
          opacity: fadeAnim,
          transform: [{ scale: scaleAnim }, { translateY: slideAnim }],
        }}
      >
        <Btn_component
          text="Galeria"
          variant="primary"
          onPress={openGallery}
          btn_text_type="white"
        />
        <Btn_component
          text="Câmera"
          variant="outline"
          onPress={openCamera}
          btn_text_type="colored"
        />
      </Animated.View>

      {showImage && (
        <Animated.View
          style={{
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
            marginTop: 20,
          }}
        >
          <View style={{ position: 'absolute', top: -100, left: 50 }}>
            <Btn_component
              text="Finalizar Cadastro"
              variant="primary"
              onPress={onContinue}
              btn_text_type="white"
            />
          </View>
        </Animated.View>
      )}
    </Animated.View>
  );
};
export default SecondScreen;