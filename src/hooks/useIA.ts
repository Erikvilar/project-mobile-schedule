import { useCallback, useMemo, useRef, useState } from 'react';
import { MLCProvider } from '@/MLC/MLCProvider.ts';
import { isDayTime } from '@/components/cards/CardWelcome.tsx';
import { useMessages } from '@/hooks/useMessages.ts';
import useUsers from '@/hooks/useUsers.ts';

console.log('ReadableStream', typeof ReadableStream);
console.log('WritableStream', typeof WritableStream);
console.log('TransformStream', typeof TransformStream);







interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
}


const useIA: (user: string) => {
  handlePrompt: (value: string) => void;
  initialize: () => Promise<any>;
  prompt: string;
  loadState: string;
  generating: boolean;
  messages: Message[];
  sendMessage: () => Promise<void>;
  loading: boolean
} = (user:string) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [prompt, setPrompt] = useState('');
  const [loadState, setLoadState] = useState('');
  const mlcProvider = useMemo(() =>  new MLCProvider(), [])
  const [generating, setGenerating] = useState(false);
  const modelRef = useRef<any>(null);


  const teste = "Erik";
  console.log("MODELO USER",typeof teste)
  const content = `${
    isDayTime ? 'Bom dia' : 'Boa noite'
  } ${user}, sou Seiko.`;
console.log(content)
  const { messages, addMessage, updateMessage } = useMessages([
    {
      id: 'welcome',
      role: 'assistant',
      content: content,
    },
  ]);

  async function initialize() {
    try {
      setLoading(true);
     return await mlcProvider.init();
    } catch (err) {
      console.log(err);
    }finally {
      setLoading(false);
    }
  }

  const handlePrompt = (value: string) => {
    setPrompt(value);
  };
  async function chat(
    model: any,
    history: Array<{
      role: string;
      content: string;
    }>,
    prompt:string,
    onChunk?: (text: string) => void,
  ) {
    try {
      setLoading(true);
      return mlcProvider.streamChat(model, history,prompt, onChunk);
    } catch (err) {
      console.error('runStream error', err);
      return '';
    } finally {
      setLoading(false);
    }
  }

  const sendMessage = useCallback(async () => {
    if (!prompt.trim()) {
      return;
    }

    setLoadState('Preparando modelo...');

    const _prompt = prompt.trim();

    const history = messages
      .filter(message => message.content.trim())
      .slice(-20)
      .map(message => ({
        role: message.role,
        content: message.content,
        createdAt: new Date().toISOString(),
      }));

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: _prompt,
    };

    const assistantId = `${Date.now()}-assistant`;

    const assistantMessage: Message = {
      id: assistantId,
      role: 'assistant',
      content: '',
    };

    setGenerating(true);

    addMessage(userMessage);
    addMessage(assistantMessage);

    setPrompt('');

    setLoadState('Preparando modelo...');

    modelRef.current = await initialize();

    try {
      setLoadState('Gerando resposta...');

      await chat(modelRef.current, history, _prompt, chunk => {
        updateMessage(assistantId, chunk);
      });
    } catch (err) {
      console.error('Erro geração:', err);

      updateMessage(assistantId, 'Erro ao gerar resposta.');
    } finally {
      setGenerating(false);
    }
  }, [prompt, messages, addMessage, updateMessage, chat]);
  return {
    handlePrompt,
    initialize,
    prompt,
    loadState,
    generating,
    messages,
    sendMessage,
    loading,
  };
};

export default useIA;
