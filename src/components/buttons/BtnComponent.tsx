import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { NavigationProp } from '@react-navigation/native';

export interface Btn_props {
  text: string;
  // @ts-ignore
  navigation?: NavigationProp;
  navigationPath?: string;
  btn_has_backgound?: boolean;
  btn_text_type?: 'gray' | 'white' | 'black' | 'colored';
  variant?: 'primary' | 'secondary' | 'outline' |'normal'| 'danger' | 'success';
  disabled?: boolean;
  onPress?: () => void;
}

const BtnComponent = (props: Btn_props) => {
  const {
    text,
    navigation,
    navigationPath,
    btn_text_type = 'white',
    variant = 'primary',
    disabled = false,
    onPress,
  } = props;

  const getButtonStyle = () => {
    const variants = {
      primary: style.btn_primary,
      secondary: style.btn_secondary,
      outline: style.btn_outline,
      normal:style.btn_normal,
      danger: style.btn_danger,
      success: style.btn_success,
    };
    return variants[variant];
  };

  const getTextStyle = () => {
    const textStyles = {
      gray: style.text_gray,
      white: style.text_white,
      black: style.text_black,
      colored: style.text_colored,
    };
    return textStyles[btn_text_type];
  };

  const handlePress = () => {
    if (onPress) {
      onPress();
    } else {
      navigation.replace(navigationPath);
    }
  };

  return (
    <TouchableOpacity
      onPress={handlePress}
      disabled={disabled}
      activeOpacity={disabled ? 1 : 0.7}
      style={[getButtonStyle(), disabled && style.disabled]}
    >
      <Text style={[getTextStyle(), disabled && style.disabledText]}>
        {text}
      </Text>
    </TouchableOpacity>
  );
};

const style = StyleSheet.create({

  btn_primary: {
    backgroundColor: '#000',
    paddingVertical: 16,
    paddingHorizontal: 40,
    borderRadius: 12,
    marginTop: 20,
  },
  btn_secondary: {
    backgroundColor: '#f5f5f5',
    paddingVertical: 16,
    paddingHorizontal: 40,
    borderRadius: 12,
    marginTop: 20,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  btn_outline: {
    backgroundColor: 'transparent',
    paddingVertical: 16,
    paddingHorizontal: 40,
    borderRadius: 12,
    marginTop: 20,
    borderWidth: 2,
    borderColor: '#000',
  },
  btn_normal: {
    backgroundColor: 'transparent',
    paddingVertical: 16,
    paddingHorizontal: 40,
    borderRadius: 12,
    marginTop: 20,
  },
  btn_danger: {
    backgroundColor: '#FF6B6B',
    paddingVertical: 16,
    paddingHorizontal: 40,
    borderRadius: 12,
    marginTop: 20,
  },
  btn_success: {
    backgroundColor: '#00B894',
    paddingVertical: 16,
    paddingHorizontal: 40,
    borderRadius: 12,
    marginTop: 20,
  },

  text_gray: {
    color: '#777',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  text_white: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  text_black: {
    color: '#000',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  text_colored: {
    color: '#000',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },

  disabled: {
    opacity: 0.5,
  },
  disabledText: {
    opacity: 0.6,
  },
});

export default BtnComponent;