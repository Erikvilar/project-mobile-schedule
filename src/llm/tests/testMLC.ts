import 'react-native-polyfill-globals/auto';
import { llama, downloadModel } from '@react-native-ai/llama';
import { streamText } from 'ai';
import { Alert } from 'react-native';

export default async function testAI() {
    try {
        console.log('📥 Baixando modelo...');

        // Download do HuggingFace (retorna o caminho do arquivo)
        const modelPath = await downloadModel(
            'ggml-org/SmolLM3-3B-GGUF/SmolLM3-Q4_K_M.gguf'
        );

        console.log('⚙️ Preparando modelo...');
        const model = llama.languageModel(modelPath);
        await model.prepare();

        console.log('🚀 Gerando texto...');

        // Use streamText (não generateText)
        const { textStream } =  streamText({
            model,
            prompt: 'Responda apenas: Llama funcionando',
        });

        let fullText = '';
        for await (const delta of textStream) {
            fullText += delta;
            console.log(delta); // Mostra em tempo real
        }

        console.log('✅ Resultado:', fullText);
        Alert.alert('Sucesso', fullText);

        // Limpa memória
        await model.unload();

        return fullText;

    } catch (error) {
        console.error('❌ Erro:', error);
        Alert.alert('Erro', error.message);
    }
}