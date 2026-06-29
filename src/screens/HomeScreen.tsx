import { useState, useRef, useCallback, memo } from 'react';
import {
  Dimensions,
  StyleSheet,
  View,
  TouchableOpacity,
  ScrollView,
  Text,
  NativeScrollEvent,
  NativeSyntheticEvent,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';
import DashboardScreen from './DashboardScreen.tsx';
import NotesScreen from "@/screens/NoteScreen.tsx";
import { DEFAULT_THEME, THEMES } from '@/theme/constants';
import ProfileSettingsScreen from '@/screens/ProfileSettingsScreen.tsx';


interface Tab {
  key: string;
  icon: string;
  iconFocused: string;
  title: string;
  component: React.ReactNode;
}

// Memoizar DashboardScreen
const MemoizedDashboard = memo(DashboardScreen);
const MemoizedNote = memo(NotesScreen)

const HomeScreen = () => {
  const insets = useSafeAreaInsets();
  const theme = DEFAULT_THEME;
  const styles = stylesBase(theme);
  const [activeTab, setActiveTab] = useState(0);
  const scrollViewRef = useRef<ScrollView>(null);
  const screenWidth = Dimensions.get('window').width;


  const handleScroll = useCallback(
    (event: NativeSyntheticEvent<NativeScrollEvent>) => {
      const contentOffsetX = event.nativeEvent.contentOffset.x;
      const currentIndex = Math.round(contentOffsetX / screenWidth);
      setActiveTab(currentIndex);
    },
    [screenWidth]
  );

  const handleTabPress = useCallback(
    (index: number) => {
      setActiveTab(index);
      scrollViewRef.current?.scrollTo({
        x: index * screenWidth,
        animated: true,
      });
    },
    [screenWidth]
  );



  const tabs: Tab[] = [
    {
      key: 'tab_home',
      icon: 'rocket-outline',
      iconFocused: 'rocket',
      title: 'Home',
      component: (
        <MemoizedDashboard  />
      ),
    },
    {
      key: 'tab_menu',
      icon: 'menu-outline',
      iconFocused: 'menu',
      title: 'Menu',
      component: (

        <MemoizedNote/>
      ),
    },
    {
      key: 'tab_perfil',
      icon: 'person-outline',
      iconFocused: 'person',
      title: 'Perfil',
      component: (
        <View style={styles.centerContainer}>
          <Icon name="person-outline" size={48} color="#007AFF" />
        </View>
      ),
    },
    {
      key: 'tab_about',
      icon: 'information-circle-outline',
      iconFocused: 'information-circle',
      title: 'About',
      component: <ProfileSettingsScreen />,
    },
  ];

  const renderTabBar = () => {
    return (
      <View style={[styles.tabBar, { paddingBottom: insets.bottom }]}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.tabContainer}
          scrollEnabled={false}
        >
          {tabs.map((tab, index) => {
            const isActive = activeTab === index;
            return (
              <TouchableOpacity
                key={tab.key}
                onPress={() => handleTabPress(index)}
                style={[styles.tabButton, isActive && styles.tabButtonActive]}
                activeOpacity={0.7}
              >
                <Icon
                  name={isActive ? tab.iconFocused : tab.icon}
                  size={18}
                  color={isActive ? '#000' : '#999'}
                  style={styles.tabIcon}
                />

                {isActive && <View style={styles.indicator} />}
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled={false} // Desabilita paging durante geração
        scrollEventThrottle={16}
        onScroll={handleScroll}
        showsHorizontalScrollIndicator={false}
        scrollEnabled={false}
        style={styles.content}
      >
        {tabs.map(tab => (
          <View key={tab.key} style={{ width: screenWidth }}>
            {tab.component}
          </View>
        ))}
      </ScrollView>

      {renderTabBar()}
    </View>
  );
};

const stylesBase = (theme:any) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },

  content: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },

  tabBar: {
    backgroundColor: theme.colors.surfaceContainerLow,

    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.08)',

    minHeight: 76,

    shadowColor: theme.colors.primaryContainer,
    shadowOpacity: 0.2,
    shadowRadius: 16,
    shadowOffset: {
      width: 0,
      height: -2,
    },
    elevation: 12,
  },

  tabContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingHorizontal: 12,
  },

  tabButton: {
    width: 52,
    height: 52,
    borderRadius: 26,

    alignItems: 'center',
    justifyContent: 'center',
  },

  tabButtonActive: {
    backgroundColor: theme.colors.surfaceContainer,

    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',

    shadowColor: theme.colors.primaryContainer,
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 6,
  },

  tabIcon: {
    marginBottom: 0,
  },

  indicator: {
    position: 'absolute',
    bottom: 6,

    width: 4,
    height: 4,
    borderRadius: 2,

    backgroundColor: theme.colors.secondaryContainer,
  },

  centerContainer: {
    flex: 1,
    backgroundColor: theme.colors.background,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default HomeScreen;