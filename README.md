# Loja Virtual — Node.js

E-commerce desenvolvido em **Node.js, Express, EJS e MySQL**, com autenticação e painel para gerenciamento dos principais cadastros da loja.

> Projeto desenvolvido por **Liandre e Everton**.

## Funcionalidades

- autenticação de usuários
- gerenciamento de produtos
- gerenciamento de marcas
- gerenciamento de categorias
- gerenciamento de usuários
- gerenciamento de perfis
- upload e organização de imagens de produtos
- views renderizadas com EJS

## Stack

- Node.js
- Express
- EJS
- MySQL / mysql2
- Cookie Parser
- Multer

## Arquitetura

O projeto está organizado em rotas, controllers, models, middlewares e views, separando acesso aos dados, regras da aplicação e interface.

```text
routes/
controllers/
models/
middlewares/
views/
public/
db/
```

## Executando localmente

1. Configure o banco MySQL usado pelo projeto.
2. Instale as dependências.
3. Inicie o servidor.

```bash
npm install
node server.js
```

Por padrão, a aplicação inicia na porta `5000`.
