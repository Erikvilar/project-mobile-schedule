import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import useUsers  from '@/hooks/useUsers.ts';
import { useEffect, useState } from 'react';
import useProfile from "@/hooks/useProfile.ts";
import Chat from '@/components/chat/Chat.tsx';
import CardWelcome from "@/components/cards/CardWelcome.tsx";

import { ActivityIndicator } from 'react-native';

const DashboardScreen = () => {



  return (
    <View style={{ flex: 1, elevation: 1 }}>
      {/* Header */}
      <CardWelcome  />
      <Chat />
    </View>
  );
};

export default DashboardScreen;
