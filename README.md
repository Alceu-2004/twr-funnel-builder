# 🚀 Funnel Builder

Aplicação web que permite criar e gerenciar visualmente funis de marketing por meio de uma interface interativa.

Construída com **React Flow** e **shadcn/ui**, a aplicação possibilita criar, conectar, editar e simular etapas de um funil de forma simples e intuitiva.

---

## 🌐 Demo

Acesse a aplicação online:

https://twr-funnel-builder.vercel.app/

---

## 📌 Funcionalidades

* ✅ Criação de etapas do funil (Start, Email, SMS, Delay, Condition, End)
* 🔗 Conexão manual entre etapas (drag-and-drop)
* ✏️ Edição de conexões (reconectar arrastando)
* ➕ Inserção de novos nodes entre etapas existentes
* ❌ Remoção de conexões
* 📊 Simulação de métricas ao longo do funil
* 💾 Persistência de dados no navegador (LocalStorage)

---

## 🎯 Objetivo

O objetivo do projeto é fornecer uma interface simples e funcional para construção e visualização de funis de marketing, com foco na experiência do usuário e flexibilidade de uso.

---

## 🧠 Simulação de Métricas

As métricas exibidas em cada etapa (envios, aberturas, cliques e conversões) são **valores simulados**.

> ⚠️ Observação: Os valores foram propositalmente ajustados para serem maiores do que cenários reais.
> Isso foi feito para facilitar a visualização do comportamento do funil,
> já que taxas de conversão realistas tendem a resultar em valores muito próximos de zero nas etapas finais, o que dificultaria a demonstração da ferramenta.

---

## 🛠️ Tecnologias Utilizadas

* React + TypeScript
* Vite
* React Flow
* Zustand
* TailwindCSS
* shadcn/ui

---

## 📦 Instalação e Execução

```bash
# Clonar o repositório
git clone https://github.com/seu-usuario/funnel-builder.git

# Acessar a pasta do projeto
cd funnel-builder

# Instalar dependências
npm install

# Rodar o projeto
npm run dev
```

---

## 🧩 Como Utilizar

* Utilize a barra de ferramentas para adicionar novas etapas
* Arraste de um node para outro para criar conexões
* Clique em uma conexão para:

  * Inserir um novo node entre as etapas
  * Remover a conexão
* Arraste conexões existentes para alterar o fluxo
* Utilize a simulação de métricas para visualizar o desempenho do funil

---

## 📁 Estrutura do Projeto

```
src/
 ├── components/
 ├── store/
 ├── hooks/
 ├── factory/
 ├── services/
 ├── types/
 └── utils/
```

---

## 🚀 Possíveis Melhorias Futuras

* Substituir prompts por interface visual (popover/modal)
* Suporte a bifurcações condicionais (fluxos YES/NO)
* Melhor posicionamento automático dos nodes
* Integração com backend para persistência real de dados

---

## 📄 Licença

Este projeto está sob a licença MIT.

---

## 👨‍💻 Autor

Desenvolvido por Alceu Botelho
