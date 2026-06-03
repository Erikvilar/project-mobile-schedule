# 🔗 Criar Dados Relacionados no WatermelonDB

## O Problema

Você tem:
- **User** (1) → (Many) **Profile**
- Quer salvar User + Profile com foto **na mesma operação**

---

## ✅ Solução: Usar Transação

```typescript
// 1. Salvar User e Profile juntos
await database.write(async () => {
  // Criar User
  const user = await usersCollection.create((u: any) => {
    u.name = 'João';
    u.email = 'joao@email.com';
    u.age = 25;
  });

  // Criar Profile com a foto, usando o user_id
  const profile = await profileCollection.create((p: any) => {
    p.user_id = user.id;      // RELACIONAMENTO!
    p.bio = 'Developer';
    p.image = '/path/to/photo.jpg';
    p.avatar_url = 'https://...';
    p.location = 'São Paulo';
  });
});
```

---

## 🎯 Passo a Passo Simples

### Passo 1: Criar função para criar User + Profile

```typescript
export const createUserWithProfile = async (
  userData: { name: string; email: string; age: number },
  profileData: { bio: string; image: string; location: string }
) => {
  try {
    const usersCollection = database.get('users');
    const profileCollection = database.get('profile');

    // Transação = operação atômica (tudo ou nada)
    await database.write(async () => {
      // 1. Criar usuário
      const user = await usersCollection.create((record: any) => {
        record.name = userData.name;
        record.email = userData.email;
        record.age = userData.age;
      });

      // 2. Criar perfil com a relação
      await profileCollection.create((record: any) => {
        record.user_id = user.id;        // FK - Liga ao usuário!
        record.bio = profileData.bio;
        record.image = profileData.image;
        record.location = profileData.location;
        record.avatar_url = '';          // Vazio no início
      });
    });

    console.log('✅ Usuário e perfil criados com sucesso');
    return true;
  } catch (error) {
    console.error('❌ Erro:', error);
    return false;
  }
};
```

### Passo 2: Usar a função

```typescript
// Na sua tela de cadastro
const handleCreateUserWithPhoto = async (photoUri: string) => {
  const success = await createUserWithProfile(
    {
      name: user.name,
      email: user.email,
      age: user.age,
    },
    {
      bio: 'Meu perfil',
      image: photoUri,
      location: 'Rio de Janeiro',
    }
  );

  if (success) {
    navigation.navigate('Home');
  }
};
```

---

## 📊 Como Funciona o Relacionamento

### No Banco (WatermelonDB):

```
TABELA: users
┌────┬────────┬──────────────────┬─────┐
│ id │ name   │ email            │ age │
├────┼────────┼──────────────────┼─────┤
│ 1  │ João   │ joao@email.com   │ 25  │
└────┴────────┴──────────────────┴─────┘

TABELA: profile
┌────┬─────────┬──────────────┬─────────────┬────────────┐
│ id │ user_id │ bio          │ image       │ location   │
├────┼─────────┼──────────────┼─────────────┼────────────┤
│ 1  │ 1       │ Developer    │ /photo.jpg  │ São Paulo  │
└────┴─────────┴──────────────┴─────────────┴────────────┘

user_id = 1 → Liga Profile ao User!
```

---

## 🔍 Recuperar User Com Profile

```typescript
// Pegar usuário com seu perfil
const user = await database.get('users').find('user_id_aqui');
const profile = user.profile;  // Acessa o perfil!

console.log(user.name);        // João
console.log(profile.bio);      // Developer
console.log(profile.image);    // /photo.jpg
```

---

## ⚡ Versão Melhorada: Adicionar foto depois

Se a foto vem **depois** do cadastro:

```typescript
// 1. Criar user e profile vazios
await createUserWithProfile(userData, { bio: '', image: '', location: '' });

// 2. Depois, atualizar profile com a foto
export const updateProfilePhoto = async (userId: string, photoUri: string) => {
  try {
    const profileCollection = database.get('profile');
    
    // Encontra o profile do usuário
    const profile = await profileCollection.query(
      Q.where('user_id', userId)
    ).fetch();

    if (profile.length === 0) {
      console.error('Perfil não encontrado');
      return;
    }

    await database.write(async () => {
      await profile[0].update((record: any) => {
        record.image = photoUri;
      });
    });

    console.log('✅ Foto atualizada');
  } catch (error) {
    console.error('❌ Erro:', error);
  }
};
```

---

## 📝 Resumo das Operações

### 1. Criar User + Profile Junto

```typescript
await database.write(async () => {
  const user = await usersCollection.create(userData);
  const profile = await profileCollection.create({
    ...profileData,
    user_id: user.id  // ← RELACIONAMENTO
  });
});
```

### 2. Atualizar Profile com Foto

```typescript
await database.write(async () => {
  await profile.update((record: any) => {
    record.image = novaFoto;
  });
});
```

### 3. Recuperar Dados Relacionados

```typescript
const user = await database.get('users').find(userId);
const profile = user.profile;  // Acessa perfil automaticamente
```

---

## 🎯 No Seu Caso (Cadastro + Foto)

```typescript
const handleContinueWithPhoto = async () => {
  try {
    // 1. Criar user e profile com foto
    await database.write(async () => {
      const user = await usersCollection.create((u: any) => {
        u.name = user.name;
        u.email = user.email;
        u.age = user.age;
      });

      // Profile já com a foto!
      await profileCollection.create((p: any) => {
        p.user_id = user.id;        // Liga ao usuário
        p.image = image;            // Foto selecionada
        p.bio = '';
        p.location = '';
      });
    });

    console.log('✅ Usuário criado com perfil e foto!');
    incrementStep();
  } catch (error) {
    console.error('❌ Erro:', error);
  }
};
```

---

## ⚠️ Pontos Importantes

✅ **Faça:**
- Use `database.write()` para operações múltiplas
- Sempre passe `user_id` ao criar Profile
- A foto vai em `profile.image`

❌ **Não Faça:**
- Não crie user sem user_id no profile
- Não esqueça de usar `await`
- Não acesse `user.profile` antes de salvar

---

## 💡 Analogia Simples

```
USER é como uma CONTA NO INSTAGRAM
PROFILE é como a BIO + FOTO DA CONTA

Quando você cria a conta:
1. Sistema cria o usuário (name, email)
2. Sistema cria o perfil (bio, foto, link)
3. Sistema liga perfil ao usuário (user_id)

Quando você atualiza a foto:
1. Sistema encontra seu perfil (pelo user_id)
2. Sistema atualiza a foto no perfil
3. Pronto!
```

Agora você consegue criar User + Profile com foto na mesma operação! 🚀