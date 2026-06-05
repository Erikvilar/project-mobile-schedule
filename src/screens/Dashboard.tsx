import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import useUsers  from '@/hooks/useUsers.ts';
import { useEffect, useState } from 'react';
import useProfile from "@/hooks/useProfile.ts";
import Chat from '@/components/chat/Chat.tsx';
import CardWelcome from "@/components/cards/CardWelcome.tsx";

import { ActivityIndicator } from 'react-native';

const Dashboard = () => {

  const {getCurrentUser} = useUsers();
  const {getCurrentProfile} = useProfile();

 const [user, setUser] = useState<any | null>(null);

 const [profile,setProfile] = useState<any | null>(null);

 const [loading, setLoading] = useState<boolean>(false);


  useEffect(() => {
    getCurrentUser().then(user => {
      setUser(user)
    });
    getCurrentProfile().then(profile =>{
        setProfile(profile)
    });
    console.log(user)
  },[])

const showUserName = ()=>{
      return  user?.name.slice(0,1)[0].toUpperCase()+user?.name.slice(1)
}

  return (
    <View style={{ flex: 1, elevation: 1 }}>
      {/* Header */}
      <CardWelcome showUserName={showUserName}  />
      {loading ? <ActivityIndicator size={40} color={"black"} /> : <Chat />}
    </View>
  );
};

export default Dashboard;
