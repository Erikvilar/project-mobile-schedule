import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { enableScreens } from 'react-native-screens';
import HomeScreen from '../screens/HomeScreen.tsx';
import PresentationScreen from '../screens/PresentationScreen.tsx';
import IntroductionScreen from "@/screens/IntroductionScreen.tsx";
import LoadAppScreen from '@/screens/LoadAppScreen.tsx';

enableScreens(true);

const Stack = createNativeStackNavigator();


export const SCREEN_PRESENTATION = 'Presentation';

const Routes = () => {



  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
        freezeOnBlur: true,
      }}
    >
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={({ route }) => ({ headerShown: false })}
      />
      <Stack.Screen
        name="Presentation"
        component={PresentationScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="LoadApp"

        component={LoadAppScreen}
        options={({ route }) => ({ headerShown: false })}
      />
      <Stack.Screen
        name="Introduction"
        component={IntroductionScreen}
        options={{
          headerShown: true,

          title: '',
          headerShadowVisible: false,
        }}
      />
    </Stack.Navigator>
  );
};

export default Routes;
