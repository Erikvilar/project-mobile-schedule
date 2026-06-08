import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import useUsers from '@/hooks/useUsers.ts';

const CardWelcome = () => {
  const now = new Date();
  const { user } = useUsers();


  const isDayTime = now.getHours() >= 6 && now.getHours() < 18;


  const dateText = now.toLocaleDateString('pt-BR', {
    weekday: 'long',
    day: '2-digit',
    month: 'long',
  });

  const formattedDate = dateText.charAt(0).toUpperCase() + dateText.slice(1);
  const style = styles(isDayTime)
  return (
    <View
      style={style.container}
    >
      <View style={{ flex: 1 }}>
        <Text
          style={{
            fontSize: 18,
            fontWeight: '700',
            color: '#000',
          }}
        >
          {user}
        </Text>

        <Text
          style={{
            fontSize: 12,
            color: '#777',
            marginTop: 4,
          }}
        >
          {formattedDate}
        </Text>
      </View>

      <View
        style={style.boxRoundedIcon}
      >
        <Icon
          name={isDayTime ? 'sunny' : 'moon'}
          size={28}
          color={isDayTime ? '#F5A623' : '#4F6DFF'}
        />
      </View>
    </View>
  );
};
const styles = (isDayTime:boolean) => StyleSheet.create({
  container: {
    marginBottom: 24,

    padding: 16,
    backgroundColor: '#FFF',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
  },
  boxRoundedIcon: {
    width: 35,
    height: 35,
    borderRadius: 26,
    backgroundColor: isDayTime ? '#FFF7E0' : '#EEF2FF',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
export default CardWelcome;
