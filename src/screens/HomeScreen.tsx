import { useState } from 'react';
import { Dimensions, Text, View } from 'react-native';
import { TabBar, TabView } from 'react-native-tab-view';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';
import Dashboard from './Dashboard.tsx';
import SettingsScreen from '@/screens/SettingsScreen.tsx';

const routes = [
  { key: 'tab_home', title: 'Home' },
  { key: 'tab_menu', title: 'Menu' },
  { key: 'tab_perfil', title: 'Perfil' },
  { key: 'tab_about', title: 'About' },
];

const HomeScreen = () => {
  const insets = useSafeAreaInsets();
  const [index, setIndex] = useState(0);





  const renderScene = ({ route }: any) => {
    switch (route.key) {
      case 'tab_home':
        return (
          <Dashboard/>
        );
      case 'tab_menu':
        return (
          <View
            style={{
              flex: 1,
              backgroundColor: '#fff',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Text style={{ fontSize: 18 }}>Menu Tab</Text>
          </View>
        );
      case 'tab_perfil':
        return (
          <View
            style={{
              flex: 1,
              backgroundColor: '#fff',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Text style={{ fontSize: 18 }}>Perfil Tab</Text>
          </View>
        );
      case 'tab_about':
        return (
          <SettingsScreen/>
        );
      default:
        return null;
    }
  };

  const renderTabBar = (props: any) => {
    const getIconName = (routeKey: string, focused: boolean) => {
      switch (routeKey) {
        case 'tab_home':
          return focused ? 'home' : 'home-outline';
        case 'tab_menu':
          return focused ? 'menu' : 'menu-outline';
        case 'tab_perfil':
          return focused ? 'person' : 'person-outline';
        case 'tab_about':
          return focused ? 'information-circle' : 'information-circle-outline';
        default:
          return 'home-outline';
      }
    };

    const getLabel = (routeKey: string) => {
      const labels: any = {
        tab_home: 'Home',
        tab_menu: 'Menu',
        tab_perfil: 'Perfil',
        tab_about: 'About',
      };
      return labels[routeKey];
    };

    return (
      <TabBar
        {...props}
        safeAreaInsets={{
          top: 0,
          bottom: 0,
          left: insets.left,
          right: insets.right,
        }}
        indicatorStyle={{
          backgroundColor: 'black',
          height: 1,
        }}
        style={{
          backgroundColor: 'white',
          elevation: 0,
          shadowOpacity: 0,
          borderTopWidth: 1,
          borderTopColor: '#e0e0e0',
        }}
        activeColor="#000"
        inactiveColor="#555"
        tabStyle={{
          height: 60 + insets.bottom,
          paddingBottom: insets.bottom,
        }}
        renderLabel={({ route, focused }) => (
          <View style={{ alignItems: 'center', gap: 4 }}>
            <Icon
              name={getIconName(route.key, focused)}
              size={24}
              color={focused ? '#000' : '#777'}
            />
            <Text
              style={{
                color: focused ? '#000' : '#777',
                fontSize: 12,
                fontWeight: focused ? '600' : '400',
              }}
            >
              {getLabel(route.key)}
            </Text>
          </View>
        )}
      />
    );
  };

  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <TabView
        style={{ flex: 1 }}
        navigationState={{
          index,
          routes,
        }}

        renderScene={renderScene}
        onIndexChange={setIndex}
        renderTabBar={renderTabBar}
        lazy={false}
        swipeEnabled={true}
        initialLayout={{
          width: Dimensions.get('window').width,
        }}
      />
    </View>
  );
};

export default HomeScreen;
