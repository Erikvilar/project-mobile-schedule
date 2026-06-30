# EtherIA Intelligence IA

<div align="center">

<img src="./src/assets/logo.png" width="180" alt="EtherIA Intelligence IA Logo"/>

### Plataforma de Produtividade e Inteligência Pessoal Offline

![Version](https://img.shields.io/badge/version-0.0.1-00E5FF)
![React Native](https://img.shields.io/badge/React%20Native-0.83.3-61DAFB)
![WatermelonDB](https://img.shields.io/badge/WatermelonDB-0.28.0-FF6B6B)
![Platform](https://img.shields.io/badge/platform-Android-3DDC84)
![Status](https://img.shields.io/badge/status-Development-yellow)

</div>

---

# Sobre

O **EtherIA Intelligence IA** é uma plataforma de produtividade e conhecimento pessoal desenvolvida para dispositivos móveis com foco em:

* execução local;
* privacidade;
* organização pessoal;
* persistência de dados;
* experiência minimalista.

A aplicação foi concebida seguindo a filosofia:

> Seus dados pertencem exclusivamente a você.

Todas as informações podem ser mantidas localmente no dispositivo, permitindo uma experiência independente de serviços externos.

---

# Principais Características

* Aplicação Offline First
* Persistência local de alta performance
* Sistema de notas
* Assistente conversacional local
* Sistema de temas dinâmicos
* Perfil de usuário
* Arquitetura modular e extensível
* Preparada para funcionalidades avançadas de conhecimento pessoal

---

# Funcionalidades

## Perfil de Usuário

* Cadastro inicial
* Configuração de perfil
* Foto de usuário
* Preferências de tema
* Persistência local

---

## Sistema de Notas

* Criação de notas
* Edição de notas
* Pesquisa instantânea
* Organização visual
* Persistência local

---

## Assistente Conversacional

* Chat local
* Streaming de respostas
* Sistema de comandos
* Interrupção de geração
* Interface otimizada para dispositivos móveis

---

## Sistema de Temas

Temas atualmente disponíveis:

* Cyber Elegancy
* Minimalist
* Tech-Noir Minimalist
* Monokai
* Monokai Pro
* Dracula
* Light Tech
* Dark Tech
* Soft Day
* ChatGPT Theme

---

# Arquitetura

```text
src/
├── assets/
├── business/
├── components/
├── constants/
├── database/
│   ├── migrations/
│   ├── models/
│   ├── repositories/
│   └── schema/
├── hooks/
├── navigation/
├── screens/
├── services/
├── theme/
├── types/
└── utils/
```

---

# Princípios do Projeto

## Offline First

A aplicação foi desenvolvida para funcionar sem dependência de conexão permanente com a internet.

## Privacidade

As informações do usuário permanecem sob seu controle.

## Performance

A arquitetura prioriza desempenho e baixa utilização de recursos.

## Simplicidade

A interface segue um modelo minimalista com foco na produtividade.

---

# Stack Tecnológica

## Mobile

* React Native 0.83.3
* TypeScript
* React Navigation

## Banco de Dados

* WatermelonDB 0.28.0
* SQLite

## Interface

* React Native Animated
* React Native Vector Icons
* React Native Safe Area Context

## Arquitetura

* Repository Pattern
* Service Layer
* Custom Hooks
* Componentização Modular
* Offline First

---

# Banco de Dados

O projeto utiliza:

```text
WatermelonDB v0.28.0 + SQLite
```

Características:

* alta performance;
* consultas reativas;
* persistência robusta;
* preparado para sincronização futura;
* otimizado para dispositivos móveis.

---

# Estrutura de Navegação

```text
Onboarding
    ↓
Dashboard
    ↓
Notas
    ↓
Perfil
    ↓
Assistente Conversacional
```

---

# Roadmap

## v0.1

* Sistema de memória
* Melhorias no chat
* Organização avançada de notas

## v0.2

* Busca semântica
* Vetores locais
* Base de conhecimento pessoal

## v0.3

* Agentes inteligentes
* Ferramentas locais
* Automações

## v1.0

* Plataforma completa de conhecimento pessoal offline

---

# Status das Funcionalidades

| Funcionalidade     | Status |
| ------------------ | ------ |
| Onboarding         | ✅      |
| Perfil de Usuário  | ✅      |
| Sistema de Temas   | ✅      |
| Sistema de Notas   | ✅      |
| Chat Local         | ✅      |
| Dashboard          | ✅      |
| Memória Contextual | 🚧     |
| Busca Semântica    | 🚧     |
| Vetorização        | 🚧     |
| Agentes            | 🚧     |

---

# Desenvolvimento

## Clonando o projeto

```bash
git clone https://github.com/seu-usuario/etheria-app.git
cd etheria-app
```

## Instalando dependências

```bash
npm install
```

ou

```bash
yarn install
```

## Executando no Android

```bash
npm run android
```

ou

```bash
yarn android
```

## Iniciando o Metro

```bash
npm start
```

ou

```bash
yarn start
```

---

# Requisitos

* Node.js 20+
* JDK 17+
* Android Studio
* Android SDK 35+
* Gradle 8+
* ADB configurado

---

# Versão Atual

```text
Application : EtherIA Intelligence IA
Version     : 0.0.1
Status      : Alpha
Platform    : Android
Architecture: Offline First
```

---

# Objetivo de Longo Prazo

O EtherIA Intelligence IA busca evoluir para uma plataforma de conhecimento pessoal capaz de oferecer:

* memória contextual;
* organização de informações;
* automações locais;
* ferramentas inteligentes;
* gestão de conhecimento pessoal.

---

<div align="center">

### EtherIA Intelligence IA

Plataforma de Produtividade e Conhecimento Pessoal Offline

</div>
