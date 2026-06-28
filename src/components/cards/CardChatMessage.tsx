import React, { memo, useEffect, useState } from 'react';
import {Message} from "@/database/models/Messages.ts";
import {ActivityIndicator, Text, View} from "react-native";
import CustomSpinner from '@/components/spinner/CustomSpinner.tsx';

const CardChatMessage = memo(
  ({
    item,
    isGenerating,
    thinking,
    fakeStream
  }: {
    item: Message;
    isGenerating: boolean;
    thinking: string;
    fakeStream:(value:string,chunk:any)=>void;
  }) => {
    const [thinkingPhrase, setThinkingPhrase] = useState('Pensando...');

    useEffect(() => {
      setThinkingPhrase(thinking);
      return () => {

      };
    }, [isGenerating, thinking]);

    return (
      <View
        style={{
          alignSelf: item.role === 'user' ? 'flex-end' : 'flex-start',
          backgroundColor: item.role === 'user' ? '#000' : '#F3F4F6',
          padding: 12,
          borderRadius: 16,
          marginVertical: 4,
          maxWidth: '80%',
          minHeight: item.role === 'assistant' && !item.content ? 48 : 'auto',
          justifyContent: 'center',
        }}
      >
        {item.content ? (
          <Text
            style={{
              fontWeight: 500,
              color: item.role === 'user' ? '#FFF' : '#292828' ,
            }}
          >
            {item.content}
          </Text>
        ) : item.role === 'assistant' ? (
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
            <CustomSpinner color={'#292828'} size={14} />
            <Text style={{ fontWeight: 300, color: '#292828', fontSize: 12 }}>
              {thinkingPhrase}
            </Text>
          </View>
        ) : null}
      </View>
    );
  },
);
export default CardChatMessage;