# 🔄 Migrations no WatermelonDB

## O que é uma Migration?

Uma migration é um script que **altera a estrutura do banco de dados** sem perder dados existentes.

Exemplos:
- Adicionar uma nova coluna
- Remover uma coluna
- Renomear uma coluna
- Criar uma nova tabela
- Alterar tipo de dados

---

## Estrutura de Pastas

```
src/
├── database/
│   ├── schema.ts          (Define estrutura inicial)
│   ├── migrations.ts      (Define as migrations)
│   └── index.ts           (Inicializa o banco)
```

---

## 1️⃣ Definir Schema Inicial

```typescript
// src/database/schema.ts
import { appSchema, tableSchema } from '@nozbe/watermelondb';

export const schema = appSchema({
  version: 1,
  tables: [
    tableSchema({
      name: 'users',
      columns: [
        { name: 'id', type: 'string', isIndexed: true },
        { name: 'name', type: 'string' },
        { name: 'email', type: 'string' },
        { name: 'created_at', type: 'number' },
        { name: 'updated_at', type: 'number' },
      ],
    }),
    tableSchema({
      name: 'posts',
      columns: [
        { name: 'id', type: 'string', isIndexed: true },
        { name: 'user_id', type: 'string', isIndexed: true },
        { name: 'title', type: 'string' },
        { name: 'created_at', type: 'number' },
      ],
    }),
  ],
});
```

---

## 2️⃣ Criar uma Migration

### Passo 1: Incrementar Version

```typescript
// Antes (v1)
version: 1

// Depois (v2)
version: 2
```

### Passo 2: Definir a Migration

```typescript
// src/database/migrations.ts
import { schemaMigrations } from '@nozbe/watermelondb/Schema';
import { addColumns, createTable } from '@nozbe/watermelondb/Schema/migrations';

export const migrations = schemaMigrations({
  migrations: [
    {
      toVersion: 2,
      steps: [
        addColumns({
          table: 'users',
          columns: [
            { name: 'phone', type: 'string', isOptional: true },
            { name: 'avatar_url', type: 'string', isOptional: true },
          ],
        }),
      ],
    },
    {
      toVersion: 3,
      steps: [
        createTable({
          name: 'comments',
          columns: [
            { name: 'id', type: 'string', isIndexed: true },
            { name: 'post_id', type: 'string', isIndexed: true },
            { name: 'user_id', type: 'string', isIndexed: true },
            { name: 'text', type: 'string' },
            { name: 'created_at', type: 'number' },
          ],
        }),
      ],
    },
  ],
});
```

---

## 📝 Tipos de Migrations

### 1. Adicionar Coluna

```typescript
{
  toVersion: 2,
  steps: [
    addColumns({
      table: 'users',
      columns: [
        { name: 'bio', type: 'string', isOptional: true },
        { name: 'age', type: 'number', isOptional: true },
      ],
    }),
  ],
}
```

### 2. Criar Tabela

```typescript
{
  toVersion: 3,
  steps: [
    createTable({
      name: 'notifications',
      columns: [
        { name: 'id', type: 'string', isIndexed: true },
        { name: 'user_id', type: 'string', isIndexed: true },
        { name: 'message', type: 'string' },
        { name: 'read', type: 'boolean' },
        { name: 'created_at', type: 'number' },
      ],
    }),
  ],
}
```

### 3. Remover Coluna (Raw SQL)

```typescript
import { unsafeExecuteSql } from '@nozbe/watermelondb/Schema/migrations';

{
  toVersion: 4,
  steps: [
    unsafeExecuteSql('ALTER TABLE users RENAME COLUMN old_name TO new_name'),
  ],
}
```

---

## 🔧 Inicializar Banco com Migrations

```typescript
// src/database/index.ts
import { Database } from '@nozbe/watermelondb';
import SQLiteAdapter from '@nozbe/watermelondb/adapters/sqlite';
import { schema } from './schema';
import { migrations } from './migrations';
import User from './models/User';
import Post from './models/Post';

const adapter = new SQLiteAdapter({
  schema,
  migrations,
  dbName: 'seikohealthdb',
  onSetUpError: error => {
    console.error('Erro ao inicializar banco:', error);
  },
});

export const database = new Database({
  adapter,
  modelClasses: [User, Post],
});
```

---

## 📊 Exemplo Completo: Adicionar Campo a Usuario

### ANTES (v1):

```typescript
// schema.ts
version: 1,
tables: [
  tableSchema({
    name: 'users',
    columns: [
      { name: 'id', type: 'string', isIndexed: true },
      { name: 'name', type: 'string' },
      { name: 'email', type: 'string' },
    ],
  }),
]
```

### DEPOIS (v2):

```typescript
// schema.ts
version: 2,
tables: [
  tableSchema({
    name: 'users',
    columns: [
      { name: 'id', type: 'string', isIndexed: true },
      { name: 'name', type: 'string' },
      { name: 'email', type: 'string' },
      { name: 'phone', type: 'string', isOptional: true }, // NOVO
    ],
  }),
]

// migrations.ts
migrations: [
  {
    toVersion: 2,
    steps: [
      addColumns({
        table: 'users',
        columns: [
          { name: 'phone', type: 'string', isOptional: true },
        ],
      }),
    ],
  },
]
```

---

## ⚠️ Boas Práticas

### ✅ Faça:

```typescript
// Sempre incremente version
version: 1 -> version: 2

// Use isOptional para colunas novas
{ name: 'novo_campo', type: 'string', isOptional: true }

// Sempre tenha uma migration para cada versão
toVersion: 2, toVersion: 3, toVersion: 4...

// Teste localmente antes de fazer deploy
```

### ❌ Não Faça:

```typescript
// Não pule versões
version: 1 -> version: 3 (falta v2!)

// Não modifique migrations já criadas
// Uma migration é histórico - nunca mude o que já foi feito

// Não esqueça de sincronizar schema.ts com migrations.ts
```

---

## 🚀 Fluxo Prático

### 1. Você quer adicionar campo "phone" na tabela "users"

```typescript
// Passo 1: Incrementar version
version: 2

// Passo 2: Adicionar coluna no schema
{ name: 'phone', type: 'string', isOptional: true }

// Passo 3: Criar migration
{
  toVersion: 2,
  steps: [
    addColumns({
      table: 'users',
      columns: [{ name: 'phone', type: 'string', isOptional: true }],
    }),
  ],
}

// Passo 4: Reiniciar app
// WatermelonDB automaticamente executa a migration
// Usuários existentes ganham o novo campo vazio
```

### 2. O que WatermelonDB faz automaticamente

```
App inicia
    ↓
Verifica version do schema atual (2)
    ↓
Verifica version do banco (1)
    ↓
Versões diferentes? Sim!
    ↓
Executa migrations de 1 → 2
    ↓
Adiciona coluna "phone" em todos os usuários
    ↓
Marca banco como v2
    ↓
App continua funcionando
    ↓
✅ Dados antigos preservados!
```

---

## 📱 Exemplo Real: Sistema de Posts

### Versão 1:

```typescript
schema: {
  version: 1,
  tables: [
    tableSchema({ name: 'users', ... }),
    tableSchema({ name: 'posts', columns: ['id', 'title', 'content'] }),
  ]
}
```

### Versão 2 (Adicionar likes):

```typescript
schema: {
  version: 2,
  tables: [
    tableSchema({ name: 'users', ... }),
    tableSchema({ 
      name: 'posts', 
      columns: ['id', 'title', 'content', 'likes'] 
    }),
  ]
}

migrations: {
  toVersion: 2,
  steps: [
    addColumns({
      table: 'posts',
      columns: [{ name: 'likes', type: 'number', isOptional: true }],
    }),
  ],
}
```

### Versão 3 (Criar tabela de comentários):

```typescript
schema: {
  version: 3,
  tables: [..., tableSchema({ name: 'comments', ... })]
}

migrations: {
  toVersion: 3,
  steps: [
    createTable({
      name: 'comments',
      columns: ['id', 'post_id', 'text', 'created_at'],
    }),
  ],
}
```

---

## ✅ Checklist para Criar uma Migration

- [ ] Incrementei a `version` no schema
- [ ] Atualizei as `tables` no schema
- [ ] Criei a `migration` correspondente
- [ ] A migration tem o `toVersion` correto
- [ ] As novas colunas têm `isOptional: true`
- [ ] Testei localmente
- [ ] Dados antigos foram preservados
- [ ] Não modifiquei migrations antigas

---

## 🎯 Resumo

| Conceito | O que é | Exemplo |
|----------|---------|---------|
| **schema** | Estrutura final do banco | v1, v2, v3... |
| **migration** | Como ir de v1 → v2 | addColumns, createTable |
| **version** | Número da versão atual | 1, 2, 3... |
| **isOptional** | Campo pode ficar vazio | true para novos campos |

**WatermelonDB executa migrations automaticamente quando o app inicia!**

Pronto! Agora você entende migrations! 🚀