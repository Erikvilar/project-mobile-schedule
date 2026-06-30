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
import { CURRENT_THEME } from '@/theme/ThemeManager.ts';

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
    text_type = 'white',
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
  const theme = CURRENT_THEME;
  const style = styleBase(theme)
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

const styleBase = (theme:any) => StyleSheet.create({
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
    color: theme.colors.text,
  },

  input_primary: {
    backgroundColor: theme.colors.surfaceContainerLow,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderWidth: 1,
    borderColor: theme.colors.outlineVariant,
    color: theme.colors.text,
    fontSize: 16,
  },

  input_secondary: {
    backgroundColor: theme.colors.surfaceContainer,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderWidth: 1,
    borderColor: theme.colors.outlineVariant,
    color: theme.colors.text,
    fontSize: 16,
  },

  input_outline: {
    backgroundColor: 'transparent',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderWidth: 1,
    borderColor: theme.colors.primaryContainer,
    color: theme.colors.text,
    fontSize: 16,
  },

  input_normal: {
    backgroundColor: 'transparent',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    color: theme.colors.text,
    fontSize: 16,
  },

  input_danger: {
    backgroundColor: theme.colors.errorContainer,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderWidth: 1,
    borderColor: theme.colors.error,
    color: theme.colors.onErrorContainer,
    fontSize: 16,
  },

  text_gray: {
    color: theme.colors.textSecondary,
  },

  text_white: {
    color: theme.colors.text,
  },

  text_black: {
    color: theme.colors.text,
  },

  text_colored: {
    color: theme.colors.primaryContainer,
  },

  disabled: {
    opacity: 0.45,
  },
});

export default InputComponent;
