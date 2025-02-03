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
 
 Execute usando o npm ou siga os passos abaixo:
   ```sh
   npm run server
   ```

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

## Considerações Finais

Todo o projeto foi desenvolvido utilizando Bootstrap para o front-end e Node js v22.13.1 com Express para o back-end, utilizando SQLite3 como banco de dados. O projeto foi feito de maneira simples, sem levar em conta questões de estética e navegação avançadas e outros tratamentos de dados ou até mesmo segurança. O .env estará presente no repositório, excepcionalmente, para facilitar a execução do projeto, mas ressalto que isto não é uma boa prática.

