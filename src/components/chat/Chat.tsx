import React, { useCallback,  useRef} from 'react';
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
import useUsers from "@/hooks/useUsers.ts";


const Chat = () => {
  const flatListRef = useRef<FlatList>(null);
    const { user } = useUsers();
  const {
    handlePrompt,
    prompt,
    loadState,
    generating,
    messages,
    sendMessage,
  } = useIA(user);


  const renderItem = useCallback(
    ({ item }: { item: Message }) => (
      <CardChatMessage item={item} isGenerating={generating} thinking={loadState} />
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
          borderTopWidth: 1,
          borderTopColor: '#E5E7EB',
          alignItems: 'center',
        }}
      >
        <TextInput
          value={prompt}
          onChangeText={handlePrompt}
          placeholder="Digite uma mensagem..."
          editable={!generating}
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
          onPress={sendMessage}
          style={{
            backgroundColor: '#000',
            borderRadius: 24,
            justifyContent: 'center',
            alignItems: 'center',
            paddingHorizontal: 20,
            height: 48,
            opacity: generating || !prompt.trim() ? 0.5 : 1,
          }}
        >

            <Text style={{ color: '#FFF', fontWeight: '600' }}>Enviar</Text>

        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Chat;
