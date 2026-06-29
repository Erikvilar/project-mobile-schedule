// hooks/useMessages.ts
import { useState, useCallback, useRef, useEffect } from 'react';
import { isDayTime } from '@/components/cards/CardWelcome.tsx';
import useUsers from '@/hooks/useUsers.ts';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
}

export const useMessages = () => {


  const [messages, setMessages] = useState<Message[]>([]);

  const messagesRef = useRef<Message[]>([]);


  const addMessage = useCallback((message: Message) => {
    messagesRef.current.push(message);
    setMessages(prev => [...prev, message]);
  }, []);

  const updateMessage = useCallback((id: string, content: string) => {
    messagesRef.current = messagesRef.current.map(msg =>
      msg.id === id ? { ...msg, content } : msg,
    );

    setMessages(prev =>
      prev.map(msg => (msg.id === id ? { ...msg, content } : msg)),
    );
  }, []);

  return {
    messages,
    addMessage,
    updateMessage,
    messagesRef,
  };
};