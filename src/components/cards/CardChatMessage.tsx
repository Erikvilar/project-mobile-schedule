import React, { memo, useEffect, useState } from 'react';
import { Message } from '@/database/models/Messages.ts';
import { Text, View } from 'react-native';
import CustomSpinner from '@/components/spinner/CustomSpinner.tsx';
import { DEFAULT_THEME, THEMES } from '@/theme/constants.ts';
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
    const theme = DEFAULT_THEME;
    useEffect(() => {
      setThinkingPhrase(thinking);
    }, [thinking]);

    const isUser = item.role === 'user';

    return (
      <View
        style={{
          alignSelf: isUser ? 'flex-end' : 'flex-start',

          backgroundColor: isUser
            ? theme.colors.primaryContainer
            : theme.colors.surfaceContainerLow,

          borderRadius: 24,

          paddingHorizontal: 16,
          paddingVertical: 14,

          marginVertical: 6,

          maxWidth: '88%',

          minHeight:
            item.role === 'assistant' && !item.content ? 56 : undefined,

          justifyContent: 'center',

          borderWidth: 1,
          borderColor: isUser
            ? 'rgba(255,255,255,0.08)'
            : 'rgba(255,255,255,0.06)',

          borderTopWidth: isUser ? 1 : 2,

          borderTopColor: isUser
            ? theme.colors.primary
            : theme.colors.secondaryContainer,
        }}
      >
        {item.content ? (
          <Text
            style={{
              color: isUser
                ? theme.colors.onPrimaryContainer
                : theme.colors.onSurface,

              fontSize: 15,
              lineHeight: 24,
              fontWeight: '400',
            }}
          >
            {item.content}
          </Text>
        ) : item.role === 'assistant' ? (
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}
          >
            <CustomSpinner color={theme.colors.secondaryContainer} size={16} />

            <Text
              style={{
                marginLeft: 12,
                color: theme.colors.onSurfaceVariant,
                fontSize: 12,
                fontWeight: '300',
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