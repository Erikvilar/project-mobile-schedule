import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
} from 'react-native';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
}

export default function Chat() {
  const [input, setInput] = useState('');
  const flatListRef = useRef<FlatList>(null);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '',
      role: 'assistant',
      content: '',
    },
  ]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
    };

    setMessages(prev => [...prev, userMessage]);

    setInput('');

    // Aqui você vai futuramente:
    // 1 - Buscar memórias
    // 2 - Montar contexto
    // 3 - Chamar LLM

    const fakeResponse: Message = {
      id: `${Date.now()}-assistant`,
      role: 'assistant',
      content: `Recebi: "${userMessage.content}"`,
    };

    setTimeout(() => {
      setMessages(prev => [...prev, fakeResponse]);
    }, 500);
  };

  const renderItem = ({ item }: { item: Message }) => (
    <View
      style={{
        alignSelf: item.role === 'user' ? 'flex-end' : 'flex-start',

        backgroundColor: item.role === 'user' ? '#000' : '#F3F4F6',

        padding: 12,
        borderRadius: 16,
        marginVertical: 4,
        maxWidth: '80%',
      }}
    >
      <Text
        style={{
          color: item.role === 'user' ? '#fff' : '#000',
        }}
      >
        {item.content}
      </Text>
    </View>
  );

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#fff',
      }}
    >
      <FlatList
        ref={flatListRef}
        inverted
        data={[...messages].reverse()}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        contentContainerStyle={{
          padding: 16,
        }}
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
        }}
      >
        <TextInput
          value={input}
          onChangeText={setInput}
          placeholder="Digite uma mensagem..."
          style={{
            flex: 1,
            borderWidth: 1,
            borderColor: '#D1D5DB',
            borderRadius: 24,
            paddingHorizontal: 16,
            marginRight: 8,
          }}
        />

        <TouchableOpacity
          onPress={sendMessage}
          style={{
            backgroundColor: '#000',
            borderRadius: 24,
            justifyContent: 'center',
            paddingHorizontal: 20,
          }}
        >
          <Text
            style={{
              color: '#fff',
              fontWeight: '600',
            }}
          >
            Enviar
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
