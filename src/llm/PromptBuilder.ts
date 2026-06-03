export class PromptBuilder {
  async build({ memories, messages, question }) {
    return `
Você é um assistente útil.

Memórias:
${memories}

Histórico:
${messages}

Usuário:
${question}
`;
  }
}
