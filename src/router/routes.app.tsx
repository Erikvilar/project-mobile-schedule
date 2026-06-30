import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { enableScreens } from 'react-native-screens';
import HomeScreen from '../screens/HomeScreen.tsx';
import PresentationScreen from '../screens/PresentationScreen.tsx';
import IntroductionScreen from "@/screens/IntroductionScreen.tsx";
import LoadAppScreen from '@/screens/LoadAppScreen.tsx';
import useUsers from '@/hooks/useUsers.ts';
import { useEffect, useState } from 'react';
import useProfile from "@/hooks/useProfile.ts";
import { loadThemeFromDB } from '@/theme/ThemeManager.ts';

enableScreens(true);

const Stack = createNativeStackNavigator();



const Routes = () => {


  const {getCurrentProfile} = useProfile();
    const [initialRoute, setInitialRoute] = useState<
      'Presentation' | 'LoadApp' | null
    >(null);

    useEffect(() => {
      const init = async () => {
        await loadThemeFromDB();
        const profile = await getCurrentProfile();

        if (profile?.logged === 'true') {
          setInitialRoute('LoadApp');
        } else {
          setInitialRoute('Presentation');
        }
      };

      init();
    }, []);

    if (initialRoute === null) {
      return null;
    }

    return (
    <Stack.Navigator
      initialRouteName={ initialRoute }
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
          headerShadowVisible: false,
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

export default Routes;
