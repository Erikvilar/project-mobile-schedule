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
      <View style={{ flexDirection: 'row' }}>
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
    <View style={{ flex: 1, backgroundColor: '#FFF' }}>
      <FlatList
        ref={flatListRef}
        data={messages}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        contentContainerStyle={{ padding: 16 }}
        onContentSizeChange={() => {
          flatListRef.current?.scrollToEnd({ animated: true });
        }}
      />


      <View
        style={{
          flexDirection: 'row',
          padding: 12,
          borderTopWidth: 0.2,
          borderTopColor: '#E5E7EB',
          alignItems: 'center',
        }}
      >
        <TextInput
          value={prompt}
          onChangeText={handlePrompt}
          placeholder={placeHolderInput}
          style={{
            flex: 1,
            borderWidth: 1,
            borderColor: '#D1D5DB',
            borderRadius: 24,
            paddingHorizontal: 16,
            marginRight: 8,
            height: 48,
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
        >
          <Text>{generating ? 'Parar' : 'Enviar'}</Text>
        </TouchableOpacity>
      </View>
      <View
        style={{
          flexDirection: 'row',
          padding: 12,
          borderTopWidth: 0.2,
          borderTopColor: '#E5E7EB',
          alignItems: 'center',
        }}
      >
        {renderListCommands(showCommands,handlePrompt,commands,setPlaceHolderInput,executeCommand)}
      </View>
    </View>
  );
};

export default Chat;
