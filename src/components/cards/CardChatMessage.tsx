import React, { memo, useEffect, useState } from 'react';
import {Message} from "@/database/models/Messages.ts";
import {ActivityIndicator, Text, View} from "react-native";

const CardChatMessage = memo(
  ({
    item,
    isGenerating,
    thinking,
  }: {
    item: Message;
    isGenerating: boolean;
    thinking: string;
  }) => {
    const [thinkingPhrase, setThinkingPhrase] = useState('Pensando...');

    useEffect(() => {
      setThinkingPhrase(thinking);
      return () => {
        console.log('LIMPANDO');
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
          <Text style={{ color: item.role === 'user' ? '#FFF' : '#000' }}>
            {item.content}
          </Text>
        ) : item.role === 'assistant' ? (
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
            <ActivityIndicator
              color={isGenerating ? '#666' : '#000'}
              size="small"
            />
            <Text
              style={{
                color: isGenerating ? '#666' : '#666',
                fontSize: 14,
              }}
            >
              {thinkingPhrase}
            </Text>
          </View>
        ) : null}
      </View>
    );
  },
);
export default CardChatMessage;