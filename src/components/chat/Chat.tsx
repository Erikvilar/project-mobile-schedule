import React, { useCallback, useEffect, useRef, useState, memo } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from 'react-native';

import useIA from '@/hooks/useIA.ts';
import { useMessages } from '@/hooks/useMessages';
import useUsers from '@/hooks/useUsers.ts';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
}







const ChatMessage = memo(
  ({ item, isGenerating,thinking }: { item: Message; isGenerating: boolean,thinking:string }) => {
    const [thinkingPhrase, setThinkingPhrase] = useState('Pensando...');


    useEffect(() => {

      setThinkingPhrase(thinking)
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
const Chat = () => {
  const flatListRef = useRef<FlatList>(null);
  const modelRef = useRef<any>(null);

  const [loadingModel, setLoadingModel] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [input, setInput] = useState('');
  const [loadState, setLoadState] = useState('');
  const { chat,initialize } = useIA();
  const {user} = useUsers();


  const content = "Olá" +user+" meu nome é Seiko e sou sua assistente pessoal.";
  const { messages, addMessage, updateMessage } = useMessages([
    {
      id: 'welcome',
      role: 'assistant',
      content:content,
    },
  ]);



  const sendMessage = useCallback(async () => {
    setLoadState("Preparando modelo...")
    const prompt = input.trim();
    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: prompt,
    };
    setGenerating(true);
    setLoadState("Iniciando geração da resposta...")
    const assistantId = `${Date.now()}-assistant`;
    const assistantMessage: Message = {
      id: assistantId,
      role: 'assistant',
      content: '',
    };
    setLoadState('Pensando um pouco...');
    addMessage(userMessage);
    addMessage(assistantMessage);
    setInput('');
    modelRef.current = await initialize();

    setLoadState('Reformulando resposta...');
    try {
      setLoadState('Pronto!...');
      await chat(modelRef.current, prompt, chunk => {
        updateMessage(assistantId, chunk);
      });

    } catch (err) {
      console.error('Erro geração:', err);
      updateMessage(assistantId, 'Erro ao gerar resposta.');
    } finally {
      setGenerating(false);
    }
  }, [input, generating, addMessage, updateMessage, chat]);

  const renderItem = useCallback(
    ({ item }: { item: Message }) => (
      <ChatMessage item={item} isGenerating={generating} thinking={loadState}/>
    ),
    [generating,loadState],
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
          value={input}
          onChangeText={setInput}
          placeholder="Digite uma mensagem..."
          editable={!loadingModel && !generating}
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
            opacity: loadingModel || generating || !input.trim() ? 0.5 : 1,
          }}
        >

            <Text style={{ color: '#FFF', fontWeight: '600' }}>Enviar</Text>

        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Chat;
