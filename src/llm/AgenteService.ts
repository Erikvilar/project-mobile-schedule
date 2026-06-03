import {MemoryService} from "@/llm/MemoryService.ts";
import {PromptBuilder} from "@/llm/PromptBuilder.ts";
import {MLCProvider} from "@/llm/MLCProvider.ts";

export class AgentService {
  constructor(
    private memoryService: MemoryService,
    private promptBuilder: PromptBuilder,
    private llm: MLCProvider,
  ) {}

  async chat(userId: string, conversationId: string, question: string) {}
}
