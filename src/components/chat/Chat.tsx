import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from 'react-native';

import useInitializeIA from "@/MLC/hooks/useInitializeIA.ts";
import useIA from "@/MLC/hooks/useIA.ts";

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
}


interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
}

export default function Chat() {
  const flatListRef = useRef<FlatList>(null);
  const modelRef = useRef<any>(null);

  const [loadingModel, setLoadingModel] = useState(true);
  const [generating, setGenerating] = useState(false);
const [statusModel,setStatusModel] = useState('')
  const [input, setInput] = useState('');
  const {initialize,status,loading} = useInitializeIA()
    const {runGenerate} = useIA();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      role: 'assistant',
      content: 'Olá! Sou sua IA local.',
    },
  ]);

  useEffect(() => {
    const initModel = async () => {
      try {
        setLoadingModel(loading);
        setStatusModel(status)
        const model= await initialize();

        modelRef.current = model;


        console.log('✅ Modelo carregado');
      } catch (err) {
        console.error('Erro ao carregar modelo', err);
      } finally {
        setLoadingModel(false);
      }
    };

    initModel();
  }, []);
  useEffect(() => {
    setStatusModel(status)
    setLoadingModel(loading)
  }, [status,loading]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    if (!modelRef.current) {
      console.warn('Modelo não carregado');
      return;
    }

    if (generating) return;

    const prompt = input.trim();

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: prompt,
    };

    const assistantId = `${Date.now()}-assistant`;

    const assistantMessage: Message = {
      id: assistantId,
      role: 'assistant',
      content: '',
    };

    setMessages(prev => [...prev, userMessage, assistantMessage]);

    setInput('');
    setGenerating(true);

    try {
         console.log(modelRef.current);
      const response = await runGenerate(modelRef.current, prompt);

      setMessages(prev =>
        prev.map(msg =>
          msg.id === assistantId
            ? {
                ...msg,
                content: response || 'Sem resposta',
              }
            : msg,
        ),
      );
    } catch (err) {
      console.error('Erro geração:', err);

      setMessages(prev =>
        prev.map(msg =>
          msg.id === assistantId
            ? {
                ...msg,
                content: 'Erro ao gerar resposta.',
              }
            : msg,
        ),
      );
    } finally {
      setGenerating(false);
    }
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
          color: item.role === 'user' ? '#FFF' : '#000',
        }}
      >
        {item.content}
      </Text>
    </View>
  );


const LoadRender = useCallback(()=>{
  return loadingModel && (
    <View
      style={{
        padding: 12,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <ActivityIndicator />

      <Text
        style={{
          marginLeft: 8,
        }}
      >
        {statusModel}
      </Text>
    </View>
  )
},[statusModel,loadingModel])
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#FFF',
      }}
    >
     <LoadRender/>

      <FlatList
        ref={flatListRef}
        data={messages}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        contentContainerStyle={{
          padding: 16,
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
          disabled={loadingModel || generating || !input.trim()}
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
          {generating ? (
            <ActivityIndicator color="#FFF" />
          ) : (
            <Text
              style={{
                color: '#FFF',
                fontWeight: '600',
              }}
            >
              Enviar
            </Text>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
}
