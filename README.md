# Projeto

Este repositório contém um projeto que inclui uma API e uma interface web.

## Funcionalidades

- Controle de cadastro de usuários e tarefas.
- Exibição de um gráfico de pizza na página inicial com um resumo da quantidade de tarefas por status.
- Tratativas de erro na tela de usuários.

## Caso de Teste Sugerido

- Tentar cadastrar um usuário com um e-mail já presente no banco de dados para verificar o tratamento de erro.

## Requisitos

- Node.js instalado. Versão utilizada no projeto: v22.13.1

## Como executar o projeto

### Executando a API

1. Instale as dependências do projeto:
   ```sh
   npm install
   ```
2. Inicie o projeto:
   ```sh
   npm run start
   ```
   Isso executará as migrations e iniciará a API.

### Executando a interface
 
 Execute usando o ```sh npm run server``` ou siga os passos abaixo:


1. Navegue até a pasta `public` em outra guia do terminal:
   ```sh
   cd ./public
   ```
2. Inicie um servidor local:
   ```sh
   npx http-server
   ```
3. Acesse a interface no navegador:
   ```
   http://localhost:8080/
   ```

## Entidades do Sistema

### Users (Usuários)
A tabela `users` armazena as informações dos usuários do sistema.

- `id` (INTEGER, PRIMARY KEY AUTOINCREMENT) - Identificador único do usuário.
- `name` (TEXT, NOT NULL) - Nome do usuário.
- `email` (TEXT, UNIQUE, NOT NULL) - E-mail único do usuário.
- `github_username` (TEXT, DEFAULT NULL) - Nome de usuário do GitHub (opcional).
- `avatar` (TEXT, DEFAULT NULL) - URL do avatar do usuário (opcional).
- `is_admin` (BOOLEAN, DEFAULT 0) - Indica se o usuário possui privilégios administrativos.
- `created_at` (DATETIME, DEFAULT CURRENT_TIMESTAMP) - Data de criação do registro.
- `updated_at` (DATETIME, DEFAULT CURRENT_TIMESTAMP) - Data da última atualização do registro.
- `deleted_at` (DATETIME, NULL) - Data da exclusão lógica do usuário (NULL se não estiver deletado).

### Tasks (Tarefas)
A tabela `tasks` armazena as informações das tarefas cadastradas no sistema.

- `id` (INTEGER, PRIMARY KEY AUTOINCREMENT) - Identificador único da tarefa.
- `person_id` (INTEGER, NOT NULL) - Referência ao usuário responsável pela tarefa.
- `title` (TEXT, NOT NULL) - Título da tarefa.
- `description` (TEXT, NULL) - Descrição detalhada da tarefa (opcional).
- `status` (TEXT, CHECK) - Status da tarefa, podendo ser `pendente`, `em_progresso` ou `finalizada`. O padrão é `pendente`.
- `priority` (TEXT, CHECK) - Prioridade da tarefa, podendo ser `baixa`, `media` ou `alta`. O padrão é `media`.
- `created_at` (DATETIME, DEFAULT CURRENT_TIMESTAMP) - Data de criação do registro.
- `updated_at` (DATETIME, DEFAULT CURRENT_TIMESTAMP) - Data da última atualização do registro.
- `deleted_at` (DATETIME, NULL) - Data da exclusão lógica da tarefa (NULL se não estiver deletada).

## Considerações Finais

Todo o projeto foi desenvolvido utilizando Bootstrap para o front-end e Node js v22.13.1 com Express para o back-end, utilizando SQLite3 como banco de dados. O projeto foi feito de maneira simples, sem levar em conta questões de estética e navegação avançadas e outros tratamentos de dados ou até mesmo segurança. O .env estará presente no repositório, excepcionalmente, para facilitar a execução do projeto, mas ressalto que isto não é uma boa prática.

