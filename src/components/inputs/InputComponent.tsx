import {
  StyleSheet,
  TextInput,
  View,
  Text,
  TextInputProps,
  StyleProp,
  ViewStyle,
  TextStyle,
} from 'react-native';

import { ReactNode } from 'react';

export interface Input_props extends TextInputProps {
  value: string;

  setValue: (value: string) => void;

  placeholder?: string;

  variant?: 'primary' | 'secondary' | 'outline' | 'normal' | 'danger';

  text_type?: 'gray' | 'white' | 'black' | 'colored';

  disabled?: boolean;

  label?: string;

  labelIcon?: ReactNode;

  containerStyle?: StyleProp<ViewStyle>;

  inputStyle?: StyleProp<TextStyle>;

  labelStyle?: StyleProp<TextStyle>;

  labelContainerStyle?: StyleProp<ViewStyle>;

  error?:string
}

const InputComponent = (props: Input_props) => {
  const {
    value,
    setValue,
    placeholder,
    variant = 'primary',
    text_type = 'black',
    disabled = false,
    label,
    error,
    labelIcon,
    containerStyle,
    inputStyle,
    labelStyle,
    labelContainerStyle,
    ...rest
  } = props;

  const getInputStyle = () => {
    const variants = {
      primary: style.input_primary,
      secondary: style.input_secondary,
      outline: style.input_outline,
      normal: style.input_normal,
      danger: style.input_danger,
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

    return textStyles[text_type];
  };

  return (
    <View style={[style.container, containerStyle]}>
      {label && (
        <View style={[style.label_container, labelContainerStyle]}>
          {labelIcon && (
            <View style={style.label_icon_container}>{labelIcon}</View>
          )}

          <Text style={[style.label, getTextStyle(), labelStyle]}>{label}</Text>
        </View>
      )}

      <TextInput
        {...rest}
        value={value}
        editable={!disabled}
        placeholder={placeholder}
        placeholderTextColor="#999"
        onChangeText={setValue}
        style={[
          getInputStyle(),
          getTextStyle(),
          disabled && style.disabled,
          inputStyle,
          error && { borderColor: '#FF4444', borderWidth: 1.5 },
        ]}
      />
      {error && (
        <Text
          style={{
            color: '#FF4444',
            fontSize: 12,
            marginTop: 6,
            fontWeight: '500',
          }}
        >
          {error}
        </Text>
      )}
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    width: '100%',
    marginTop: 16,
  },

  label_container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },

  label_icon_container: {
    marginRight: 6,
  },

  label: {
    fontSize: 14,
    fontWeight: '600',
  },

  // ===== INPUT VARIANTS =====

  input_primary: {
    backgroundColor: '#f5f5f5',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    fontSize: 16,
  },

  input_secondary: {
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderWidth: 1,
    borderColor: '#dcdcdc',
    fontSize: 16,
  },

  input_outline: {
    backgroundColor: 'transparent',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderWidth: 2,
    borderColor: '#000',
    fontSize: 16,
  },

  input_normal: {
    backgroundColor: 'transparent',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
  },

  input_danger: {
    backgroundColor: '#FFF5F5',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderWidth: 1,
    borderColor: '#FF6B6B',
    fontSize: 16,
  },

  // ===== TEXT TYPES =====

  text_gray: {
    color: '#777',
  },

  text_white: {
    color: '#fff',
  },

  text_black: {
    color: '#000',
  },

  text_colored: {
    color: '#6C5CE7',
  },

  // ===== STATES =====

  disabled: {
    opacity: 0.5,
  },
});

export default InputComponent;
