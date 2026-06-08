import { useMemo, useState } from 'react';
import { MLCProvider } from '@/MLC/MLCProvider.ts';

console.log('ReadableStream', typeof ReadableStream);
console.log('WritableStream', typeof WritableStream);
console.log('TransformStream', typeof TransformStream);










const useIA = () => {
  const [loading, setLoading] = useState<boolean>(false);

  const [status, setStatus] = useState<string>('');

  const mlcProvider = useMemo(() =>  new MLCProvider(), [])


async function chat(
    model: any,
    input: string,
    onChunk?: (text: string) => void,
  ) {
    try {
      setLoading(true);
      return mlcProvider.streamChat(model,input,onChunk);
    } catch (err) {
      console.error('runStream error', err);
      return '';
    }finally {
      setLoading(false);
    }
  }

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


  return {
    chat,
    initialize,
    status,
    loading,
  };
};

export default useIA;
