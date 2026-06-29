import React, { useCallback,  useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,

} from 'react-native';

import useIA from '@/hooks/useIA.ts';
import {Message} from "@/database/models/Messages.ts";
import CardChatMessage from "@/components/cards/CardChatMessage.tsx";


import {DEFAULT_THEME} from "@/theme/constants";
const renderListCommands = (
  showCommands: boolean,
  handlePrompt: (prompt: string) => void,
  commands:Array<{
    id: number;
    command: string;
    name: string;
    surname:string,
    placeHolderInfo:string
  }>,
  setPlaceHolderInput:(value:string)=>void,
  executeCommand:(command:string)=>void
) => {



  if (showCommands) {

    return (
      <View style={{ flexDirection: 'row',padding:12 }}>
        <FlatList
          scrollEnabled={true}
          showsHorizontalScrollIndicator={false}
          horizontal={true}
          data={commands}
          renderItem={item => (
            <Text
              style={{
                marginRight:12,
                borderRadius: 15,
                fontWeight:500,
                backgroundColor: 'black',
                color: 'white',
                textAlign: 'center',
                padding: 10
              }}
              onPress={() => {
                executeCommand(item.item.command)
                setPlaceHolderInput(item.item.placeHolderInfo);

              }
              }
            >
              {item.item.surname}
            </Text>
          )}
        />
      </View>
    );
  }
};

const Chat = () => {
  const flatListRef = useRef<FlatList>(null);


    const theme = DEFAULT_THEME;
  const {
    handlePrompt,
    prompt,
    loadState,
    generating,
    messages,
    showCommands,
    sendMessage,
    commands,
    stopGeneration,
    placeHolderInput,
    setPlaceHolderInput,
    executeCommand,
      fakeStream
  } = useIA();


  const renderItem = useCallback(
    ({ item }: { item: Message }) => (
      <CardChatMessage item={item} isGenerating={generating} thinking={loadState} fakeStream={fakeStream} />
    ),
    [generating, loadState],
  );



    return (
      <View
        style={{
          flex: 1,
          backgroundColor: theme.colors.background,
        }}
      >
        <FlatList
          ref={flatListRef}
          data={messages}
          keyExtractor={item => item.id}
          renderItem={renderItem}
          contentContainerStyle={{
            padding: 20,
          }}
          onContentSizeChange={() => {
            flatListRef.current?.scrollToEnd({
              animated: true,
            });
          }}
        />

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginHorizontal: 16,
            marginBottom: 12,
            paddingHorizontal: 16,
            paddingVertical: 12,

            backgroundColor: theme.colors.surfaceContainerLow,

            borderRadius: 28,

            borderWidth: 1,
            borderColor: 'rgba(255,255,255,0.08)',
          }}
        >
          <TextInput
            value={prompt}
            onChangeText={handlePrompt}
            placeholder={placeHolderInput}
            placeholderTextColor={theme.colors.textSecondary}
            style={{
              flex: 1,
              color: theme.colors.text,
              fontSize: 16,
              paddingVertical: 0,
            }}
          />

          <TouchableOpacity
            onPress={() => {
              if (generating) {
                stopGeneration();
                return;
              }

              sendMessage();
            }}
            style={{
              width: 42,
              height: 42,
              borderRadius: 21,

              backgroundColor: generating
                ? theme.colors.errorContainer
                : theme.colors.primaryContainer,

              justifyContent: 'center',
              alignItems: 'center',
              marginLeft: 12,
            }}
          >
            <Text
              style={{
                color: generating
                  ? theme.colors.error
                  : theme.colors.onPrimaryContainer,
                fontWeight: '600',
              }}
            >
              {generating ? '■' : '➜'}
            </Text>
          </TouchableOpacity>
        </View>

        {showCommands && (
          <View
            style={{
              paddingHorizontal: 16,
              paddingBottom: 16,
              backgroundColor: theme.colors.background,
            }}
          >
            {renderListCommands(
              showCommands,
              handlePrompt,
              commands,
              setPlaceHolderInput,
              executeCommand,
            )}
          </View>
        )}
      </View>
    );
};

export default Chat;
