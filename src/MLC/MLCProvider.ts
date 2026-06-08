import { mlc, MLCEngine } from '@react-native-ai/mlc';
import { ModelRepository } from '@/database/repository/ModelRepository.ts';
import { AgenteService } from '@/MLC/AgenteService.ts';

export const MODEL_DEFAULT = 'Llama-3.2-3B-Instruct';






export class MLCProvider {
  private modelRepository = new ModelRepository();
  private agente = new AgenteService();

  async init(onProgress?: (percentage: number) => void): Promise<any> {
    try {
      const modelExists = await this.modelRepository.getCurrentModel();

      const model = mlc.languageModel(MODEL_DEFAULT);
      if (modelExists?.prepared === 'true') {
        await model.prepare();
        return model;
      }

      await model.download(event => {
        onProgress?.(event.percentage);
        console.log(event.percentage);
      });

      await model.prepare();

      await this.modelRepository.insertModel(MODEL_DEFAULT, 'true');

      return model;
    } catch (e) {
      console.error(e);
    }
  }

  public async streamChat(
      model: any,
      userMessage: string,
      onChunk?: (text: string) => void,
  ) {
    try {
      console.log('Preparando modelo...');

      await model.prepare();

      console.log('Iniciando geração');

      const response = await model.doStream({
        prompt: [
          {
            role: 'system',
            content: [
              {
                type: 'text',
                text: this.agente.buildSystemPrompt(),
              },
            ],
          },
          {
            role: 'user',
            content: [
              {
                type: 'text',
                text: this.agente.buildUserInstruction(userMessage),
              },
            ],
          },
        ],

        temperature: 0.2,
        topP: 0.7,
        topK: 40,
        maxTokens: 128,
        repetitionPenalty: 1.1,
      });

      const { stream } = response;

      if (!stream) {
        await model.unload?.();
        return '';
      }

      const reader = stream.getReader();

      let fullText = '';

      while (true) {
        const { done, value } = await reader.read();

        if (done) {
          break;
        }

        if (value?.type === 'text-delta') {
          fullText += value.delta;
          onChunk?.(fullText);
        }
      }

      console.log('Resposta final:', fullText);

      return fullText;
    } catch (err) {
      console.error('streamChat error', err);
      return '';
    } finally {
      try {
        console.log('Descarregando modelo...');

        await model.unload?.();

        console.log('Modelo descarregado');
      } catch (unloadError) {
        console.error('Erro ao descarregar modelo', unloadError);
      }
    }
  }
}
