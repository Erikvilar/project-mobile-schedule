import {Alert, Image, ScrollView, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import useUsers, { UserInterface } from '@/hooks/useUsers.ts';
import { useEffect, useState } from 'react';
import useProfile from "@/hooks/useProfile.ts";
import Chat from '@/components/chat/Chat.tsx';
import CardWelcome from "@/components/cards/CardWelcome.tsx";

import { ActivityIndicator } from 'react-native';
import testMLC from '@/llm/tests/testMLC.ts';
const Dashboard = () => {
  const insets = useSafeAreaInsets();
  const {getCurrentUser} = useUsers();
  const {getCurrentProfile} = useProfile();

 const [user, setUser] = useState<any | null>(null);

 const [profile,setProfile] = useState<any | null>(null);

 const [loading, setLoading] = useState<boolean>(false);

 const testeModel = async()=>{
   try{
     setLoading(true)
     const value =  await testMLC();
     Alert.alert(value);
   }catch(err){
     console.error("Model MLC",err);
     setLoading(false);
   }finally {
     setLoading(false);
   }
 }

  useEffect(() => {
    getCurrentUser().then(user => {
      setUser(user)
    });
    getCurrentProfile().then(profile =>{
        setProfile(profile)
    });

    testeModel()
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
