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
import Dashboard from './Dashboard.tsx';
import SettingsScreen from '@/screens/SettingsScreen.tsx';

interface Tab {
  key: string;
  icon: string;
  iconFocused: string;
  title: string;
  component: React.ReactNode;
}

// Memoizar Dashboard
const MemoizedDashboard = memo(Dashboard);

const HomeScreen = () => {
  const insets = useSafeAreaInsets();
  const [activeTab, setActiveTab] = useState(0);
  const [isGenerating, setIsGenerating] = useState(false);
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
        <View style={styles.centerContainer}>
          <Icon name="chatbubbles-outline" size={48} color="#007AFF" />
        </View>
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
      component: <SettingsScreen />,
    },
  ];

  const renderTabBar = () => {
    return (
      <View style={[styles.tabBar, { paddingBottom: insets.bottom }]}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.tabContainer}
          scrollEnabled={false} // Nunca deixa scroll na tabbar
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
                  size={22}
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
        pagingEnabled={!isGenerating} // Desabilita paging durante geração
        scrollEventThrottle={16}
        onScroll={handleScroll}
        showsHorizontalScrollIndicator={false}
        scrollEnabled={!isGenerating}
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    flex: 1,
  },
  tabBar: {
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
    elevation: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    minHeight: 70,
  },
  tabContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingHorizontal: 8,
  },
  tabButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    minHeight: 70,
  },
  tabButtonActive: {
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
  },
  tabIcon: {
    marginBottom: 4,
  },
  indicator: {
    position: 'absolute',
    bottom: 0,
    left: 8,
    right: 8,
    height: 2,
    backgroundColor: '#000',
    borderRadius: 1,
  },
  centerContainer: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default HomeScreen;