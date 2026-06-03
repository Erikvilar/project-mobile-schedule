import { SetStateAction, useLayoutEffect, useRef } from 'react';
import { Animated, Easing } from 'react-native';

const useAnimations = (
  image: unknown,
  showImage: unknown,
  setShowImage: {
    (value: SetStateAction<boolean>): void;
    (arg0: boolean): void;
  },
) => {
  const fadeAnim = useRef(new Animated.Value(1)).current;
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const slideAnim = useRef(new Animated.Value(0)).current;
  const imageScaleAnim = useRef(new Animated.Value(0.7)).current;
  const imageOpacityAnim = useRef(new Animated.Value(0)).current;
  const containerSlideAnim = useRef(new Animated.Value(50)).current;
  const containerOpacityAnim = useRef(new Animated.Value(0)).current;
  const iconOpacityAnim = useRef(new Animated.Value(1)).current;

  useLayoutEffect(() => {
    Animated.parallel([
      Animated.timing(imageScaleAnim, {
        toValue: 1,
        duration: 800,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
      Animated.timing(imageOpacityAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(containerSlideAnim, {
        toValue: 0,
        duration: 800,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
      Animated.timing(containerOpacityAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  useLayoutEffect(() => {
    if (image) {
      fadeAnim.setValue(1);
      scaleAnim.setValue(1);
      slideAnim.setValue(0);

      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 600,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 0.8,
          duration: 600,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true,
        }),
        Animated.timing(slideAnim, {
          toValue: 40,
          duration: 600,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true,
        }),
        Animated.timing(iconOpacityAnim, {
          toValue: 0,
          duration: 400,
          useNativeDriver: true,
        }),
      ]).start(() => {
        setShowImage(true);
      });
    } else {
      setShowImage(false);

      fadeAnim.setValue(1);
      scaleAnim.setValue(1);
      slideAnim.setValue(0);
      iconOpacityAnim.setValue(1);
    }
  }, [image, showImage]);

  return {
    imageScaleAnim,
    imageOpacityAnim,
    scaleAnim,
    slideAnim,
    containerOpacityAnim,
    containerSlideAnim,
    iconOpacityAnim,
    fadeAnim,
  };
};

export default useAnimations;