// hooks/useMessages.ts
import { useState, useCallback, useRef } from 'react';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
}

export const useMessages = (initialMessages: Message[]) => {
  const [messages, setMessages] = useState(initialMessages);
  const messagesRef = useRef(initialMessages);

  const addMessage = useCallback((message: Message) => {
    setMessages(prev => [...prev, message]);
    messagesRef.current = [...messagesRef.current, message];
  }, []);

  const updateMessage = useCallback((id: string, content: string) => {
    setMessages(prev =>
      prev.map(msg => (msg.id === id ? { ...msg, content } : msg)),
    );
    messagesRef.current = messagesRef.current.map(msg =>
      msg.id === id ? { ...msg, content } : msg,
    );
  }, []);

  return { messages, addMessage, updateMessage, messagesRef };
};
