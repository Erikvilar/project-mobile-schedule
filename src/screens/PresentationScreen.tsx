import {  Text, Image, StyleSheet } from 'react-native';
import { EdgeInsets, useSafeAreaInsets } from 'react-native-safe-area-context';

// @ts-ignore
import appConfig from '../business/appConfig.json';

import BtnComponent from '@/components/buttons/BtnComponent.tsx';
import PaperComponent from '@/components/paper/Paper.tsx';

const PresentationScreen = ({ navigation }: any) => {
  const insets = useSafeAreaInsets();
  const style = functionStyles(insets);
  return (
    <PaperComponent>
      <Image source={require('../assets/logo.png')} style={style.logo_image} />

      <Text style={style.text_title}>{appConfig.title_app}</Text>

      <Text style={style.text}>" {appConfig.labelDescription} "</Text>
      <Text style={style.text}>" {appConfig.description} "</Text>

      <BtnComponent
        text="Começar"
        navigation={navigation}
        navigationPath="Introduction"
        variant="primary"
        btn_text_type="white"
      />

      <BtnComponent
        text="Pular"
        navigation={navigation}
        navigationPath="Home"
        variant="normal"
        btn_text_type="gray"
      />
    </PaperComponent>
  );
};
const functionStyles = (insets: EdgeInsets) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: 20,
      paddingTop: insets.top,
      paddingBottom: insets.bottom,
    },
    logo_image: {
      width: '80%',
      height: '30%',
      marginBottom: 40,
      resizeMode: 'contain',
    },
    text_title: {
      fontSize: 28,
      fontWeight: '700',
      color: '#000',
      marginBottom: 10,
      textAlign: 'center',
    },
    text: {
      fontSize: 14,
      fontWeight: '500',
      color: '#000',
      marginBottom: 10,
      textAlign: 'center',
    },
  });
export default PresentationScreen;