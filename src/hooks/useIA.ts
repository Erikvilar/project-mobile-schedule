import { useCallback, useMemo, useRef, useState } from 'react';
import { MLCProvider } from '@/MLC/MLCProvider';
import { CommandService } from '@/MLC/CommandService';
import { useMessages } from '@/hooks/useMessages';
import useNote from '@/hooks/useNote';
import useModelIA from "@/hooks/useModelIA.ts";

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
}

const useIA: () => {
  handlePrompt: (value: string) => void;
  initialize: () => Promise<any>;
  prompt: string;
  loadState: string;
  generating: boolean;
  messages: Message[];
  sendMessage: () => Promise<void>;
  loading: boolean;
  commands: ({ id: number; command: string; name: string; surname: string; placeHolderInfo: string })[];
  showCommands: boolean;
  stopGeneration: () => Promise<void>;
  placeHolderInput: string;
  setPlaceHolderInput: (value: (((prevState: string) => string) | string)) => void;
  progress: number;
  executeCommand: (command: string) => Promise<void>;
  fakeStream: (text: string, onChunk: (value: string) => void) => Promise<void>,
  sincronize:()=>Promise<void>;
} = () => {
  const [loading, setLoading] = useState(false);

  const [prompt, setPrompt] = useState('');

  const [loadState, setLoadState] = useState('');

  const [generating, setGenerating] = useState(false);

  const [showCommands, setShowCommands] = useState(false);

  const [placeHolderInput, setPlaceHolderInput] = useState(
    'Digite uma mensagem...',
  );
  const [progress, setProgress] = useState(0);

  const modelRef = useRef<any>(null);

  const mlcProvider = useMemo(() => new MLCProvider(), []);

  const commandService = useMemo(() => new CommandService(), []);

  const { messages, addMessage, updateMessage } = useMessages();

  const { getAllNotes } = useNote();
  const {getCurrentModel} = useModelIA();
  const commands = commandService.ListCommands();

  const createMessage = (
    content: string,
    role: 'user' | 'assistant',
  ): Message => ({
    id: role === 'assistant' ? `${Date.now()}-${role}` : `${Date.now()}`,
    role,
    content,
  });

  const registerHistory = (items: Message[]) => {
    return items
      .filter(m => m.content.trim())
      .slice(-20)
      .map(m => ({
        role: m.role,
        content: m.content,
        createdAt: new Date().toISOString(),
      }));
  };

  const initialize = useCallback(async () => {
    try {
      setLoading(true);

      return await mlcProvider.init((percentage)=>{
        setProgress(percentage);
      });
    } finally {
      setLoading(false);
    }
  }, [mlcProvider]);

  const stopGeneration = useCallback(async () => {
    try {
      await mlcProvider.stopGeneration();
    } catch {}
  }, [mlcProvider]);

  const sincronize = useCallback(async () => {
    try {
      setLoading(true);

      return await mlcProvider.syncronize(percentage => {
        setProgress(percentage);
      });
    } finally {
      setLoading(false);
    }
  }, [mlcProvider]);

  const chat = useCallback(
    async (
      model: any,
      history: Message[],
      text: string,
      onChunk?: (text: string) => void,
    ) => {
      try {
        setLoading(true);

        return await mlcProvider.streamChat(model, history, text, onChunk);
      } finally {
        setLoading(false);
      }
    },
    [mlcProvider],
  );

  const executeLocalCommand = useCallback(
    async (command: string): Promise<string> => {
      switch (command) {
        case 'note-list': {
          const notes = await getAllNotes();

          if (!notes.length) {
            return 'Nenhuma nota encontrada.';
          }

          return notes
            .map(
              (note, index) =>
                `Claro aqui estão as notas que me pediu:\n
📌 Título: ${note.title}
📄 Conteúdo:
${note.content}`,
            )
            .join('\n──────────────────\n');
        }

        case 'note-create':
          return 'Criação de nota ainda não implementada.';

        case 'note-delete':
          return 'Exclusão de nota ainda não implementada.';

        case 'note-read':
          return 'Leitura de nota ainda não implementada.';

        default:
          return 'Comando não implementado.';
      }
    },
    [getAllNotes],
  );
  const fakeStream = useCallback(
    async (text: string, onChunk: (value: string) => void) => {
      let current = '';

      for (const char of text) {
        current += char;

        onChunk(current);

        await new Promise(resolve => setTimeout(resolve, 5));
      }
    },
    [],
  );

  const executeCommand = useCallback(
    async (command: string) => {
      const commandInfo = commands.find(c => c.command === command);

      const userMessage = createMessage(
        commandInfo?.surname ?? command,
        'user',
      );

      const assistantMessage = createMessage('', 'assistant');

      addMessage(userMessage);
      addMessage(assistantMessage);

      setGenerating(true);

      try {
        const response = await executeLocalCommand(command);

        await fakeStream(response, chunk => {
          updateMessage(assistantMessage.id, chunk);
        });
      } catch {
        updateMessage(assistantMessage.id, 'Erro ao executar comando.');
      } finally {
        setGenerating(false);
      }
    },
    [addMessage, updateMessage, executeLocalCommand, fakeStream, commands],
  );

  const handlePrompt = useCallback((value: string) => {
    setPrompt(value);

    if (value.startsWith('/')) {
      setShowCommands(true);
      return;
    }

    setShowCommands(false);
  }, []);

  const sendMessage = useCallback(async () => {
    if (!prompt.trim()) {
      return;
    }

    const text = prompt.trim();

    const history = registerHistory(messages);

    const userMessage = createMessage(text, 'user');

    const assistantMessage = createMessage('', 'assistant');

    setGenerating(true);

    addMessage(userMessage);
    addMessage(assistantMessage);

    setPrompt('');

    try {
      setLoadState('Preparando modelo...');


  modelRef.current = await initialize();


      setLoadState('Gerando resposta...');

      await chat(modelRef.current, history, text, chunk => {
        updateMessage(assistantMessage.id, chunk);
      });
    } catch {
      updateMessage(assistantMessage.id, 'Erro ao gerar resposta.');
    } finally {
      setGenerating(false);
      setLoadState('');
    }
  }, [prompt, messages, addMessage, updateMessage, initialize, chat]);

  return {
    handlePrompt,
    initialize,
    prompt,
    loadState,
    generating,
    messages,
    sendMessage,
    loading,
    commands,
    showCommands,
    stopGeneration,
    placeHolderInput,
    setPlaceHolderInput,
    progress,
    executeCommand,
    fakeStream,
    sincronize
  };
};

export default useIA;
