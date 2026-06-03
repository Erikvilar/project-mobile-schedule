/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */


import {
  ActivityIndicator,
  StatusBar,

  View,
} from 'react-native';
import {
  SafeAreaProvider,
} from 'react-native-safe-area-context';
import {NavigationContainer} from "@react-navigation/native";

import Routes from "./src/router/routes.app.tsx";
import {GestureHandlerRootView} from "react-native-gesture-handler";
import { useEffect, useState } from 'react';
import { database } from '@/database';




function App() {
  const [isDBReady, setIsDBReady] = useState(false);


  useEffect(() => {
    const initApp = async () => {
      try {

        await database.write(async () => {});

          console.log('✅ App inicializado com sucesso!');
          setIsDBReady(true);

      } catch (err) {
        console.log('❌ Erro ao inicializar app:', err);
        setIsDBReady(true);
      }
    };

    initApp();
  }, []);


  if (!isDBReady) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#000" />
      </View>
    );
  }


  return (
    <SafeAreaProvider>
      <StatusBar  backgroundColor="black"/>
      <AppContent />
    </SafeAreaProvider>
  );
}

function AppContent() {


  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <NavigationContainer>
          <Routes />
        </NavigationContainer>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}

export default App;
