import { useState, useRef, useCallback, memo, useEffect } from 'react';
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
import {  Theme, } from '@/theme/constants';
import ProfileSettingsScreen from '@/screens/ProfileSettingsScreen.tsx';
import { CURRENT_THEME, loadThemeFromDB } from '@/theme/ThemeManager.ts';


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
  const theme:Theme = CURRENT_THEME;
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
      icon: 'hardware-chip-outline',
      iconFocused: 'hardware-chip',
      title: 'IA',
      component: <MemoizedDashboard />,
    },
    {
      key: 'tab_menu',
      icon: 'menu-outline',
      iconFocused: 'menu',
      title: 'Menu',
      component: <MemoizedNote />,
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
                  color={
                    isActive
                      ? theme.isDarkTheme
                        ? '#000000'
                        : '#FFFFFF'
                      : theme.colors.onSurfaceVariant
                  }
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

const stylesBase = (theme: Theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },

    content: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },

    tabBar: {
      backgroundColor: theme.colors.surfaceContainerLowest,
      borderTopWidth: StyleSheet.hairlineWidth,
      borderTopColor: theme.colors.outlineVariant,
      minHeight: 76,

      shadowColor: theme.isDarkTheme ? '#000' : theme.colors.onSurface,

      shadowOpacity: theme.isDarkTheme ? 0.25 : 0.08,
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
      justifyContent: 'center',
      alignItems: 'center',
    },

    tabButtonActive: {
      backgroundColor: theme.colors.surfaceContainerHigh,
      borderWidth: 1,
      borderColor: theme.colors.outlineVariant,
      shadowColor: theme.isDarkTheme ? '#000' : theme.colors.primary,

      shadowOpacity: theme.isDarkTheme ? 0.35 : 0.15,
      shadowRadius: 12,
      elevation: 8,
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
      backgroundColor: theme.colors.primary,
    },

    centerContainer: {
      flex: 1,
      backgroundColor: theme.colors.background,
      justifyContent: 'center',
      alignItems: 'center',
    },
  });

export default HomeScreen;