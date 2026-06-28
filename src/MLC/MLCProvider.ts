
import { mlc } from '@react-native-ai/mlc';
import { ModelRepository } from '@/database/repository/ModelRepository';
import { AgenteService } from '@/MLC/AgenteService';
import MemoryModule from '@/native/MemoryModule';
import { Message } from '@/database/models/Messages.ts';
export const MODEL_DEFAULT = 'Llama-3.2-3B-Instruct';

export class MLCProviderError extends Error {
  constructor(
    message: string,
    public readonly cause?: unknown,
  ) {
    super(message);
    this.name = 'MLCProviderError';
  }
}

export class MLCProvider {
  private readonly modelRepository = new ModelRepository();
  private readonly agente = new AgenteService();
  private currentReader?: ReadableStreamDefaultReader<any>;
  public async init(onProgress?: (percentage: number) => void): Promise<any> {
    try {
      const currentModel = await this.modelRepository.getCurrentModel();

      const model = mlc.languageModel(MODEL_DEFAULT);

      if (currentModel?.prepared === 'true') {
        await model.prepare();
        return model;
      }

      await model.download(event => {
        onProgress?.(event.percentage);
      });

      await model.prepare();

      await this.modelRepository.insertModel(MODEL_DEFAULT, 'true');

      return model;
    } catch (error) {
      this.handleError('Falha ao inicializar o modelo', error);
    }
  }
  public async stopGeneration() {
    try {
      await this.currentReader?.cancel();
    } catch {
      //
    }

    this.currentReader = undefined;
  }




  public async streamChat(
    model: any,
    history:Message[],
    userMessage: string,
    onChunk?: (text: string) => void,
  ): Promise<string> {
    try {
      await model.prepare();

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
          ...history.map(message => ({
            role: message.role,
            content: [
              {
                type: 'text',
                text: message.content,
              },
            ],
          })),
          {
            role: 'user',
            content: [
              {
                type: 'text',
                text: userMessage,
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

      if (!response?.stream) {
        throw new MLCProviderError(
          'O modelo não retornou um stream de resposta.',
        );
      }

      return await this.consumeStream(response.stream, onChunk);
    } catch (error) {
      this.handleError('Falha ao gerar resposta', error);
    } finally {
      await this.safeUnload(model);
    }
  }

  private async consumeStream(
    stream: ReadableStream<any>,
    onChunk?: (text: string) => void,
  ): Promise<string> {
    const reader = stream.getReader();

    this.currentReader = reader;

    const chunks: string[] = [];
    let buffer = '';
    let lastEmit = Date.now();

    try {
      while (true) {
        const { done, value } = await reader.read();

        if (done) {
          break;
        }

        if (value?.type === 'text-delta') {
          chunks.push(value.delta);
          buffer += value.delta;

          const now = Date.now();

          if (now - lastEmit > 20) {
            onChunk?.(buffer);
            lastEmit = now;
          }
        }
      }

      return chunks.join('').trim();
    } finally {
      this.currentReader = undefined;

      try {
        await reader.cancel();
      } catch {}

      try {
        MemoryModule.releaseMemory();
      } catch {}
    }
  }

  private async safeUnload(model: any): Promise<void> {
    try {
      await model?.unload?.();
    } catch {
      // opcional:
      // enviar para Crashlytics/Sentry
    }
  }

  private handleError(message: string, error: unknown): never {
    if (error instanceof MLCProviderError) {
      throw error;
    }

    if (error instanceof Error) {
      throw new MLCProviderError(`${message}: ${error.message}`, error);
    }

    throw new MLCProviderError(message, error);
  }
}

