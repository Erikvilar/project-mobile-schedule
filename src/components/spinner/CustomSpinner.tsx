import React, { useEffect, useRef } from 'react';
import { Animated, Easing, StyleSheet, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const CustomSpinner = ({
  size = 24,
  color = 'black',
}: {
  size?: number;
  color?: string;
}) => {
  const rotation = useRef(new Animated.Value(0)).current;

  const animation = useRef<Animated.CompositeAnimation>(null);

  useEffect(() => {
    animation.current = Animated.loop(
      Animated.timing(rotation, {
        toValue: 1,
        duration: 500,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
    );

    animation.current.start();

    return () => {
      animation.current?.stop();
      rotation.stopAnimation();
    };
  }, []);

  const spin = rotation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <View style={styles.container}>
      <Animated.View
        style={{
          transform: [
            {
              rotate: spin,
            },
          ],
        }}
      >
        <Ionicons name="reload-outline" size={size} color={color} />
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default CustomSpinner;
