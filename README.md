# Projeto Node.js com Express, Prisma, TypeScript e outras dependências

Este é um projeto backend desenvolvido com Node.js, Express, Prisma e TypeScript. Abaixo estão listadas as dependências e dev dependências que o projeto utiliza.

> :construction: Projeto em construção :construction:

## Dependências

As dependências principais do projeto são:

- **@prisma/client**: Cliente para interação com o banco de dados usando o Prisma ORM.
  - Versão: `^6.2.1`

- **bcrypt**: Biblioteca para encriptação de senhas.
  - Versão: `^5.1.1`

- **dotenv**: Carregamento de variáveis de ambiente a partir de arquivos `.env`.
  - Versão: `^16.4.7`

- **ejs**: Template engine para renderização de páginas HTML.
  - Versão: `^3.1.10`

- **express**: Framework para construir o servidor HTTP.
  - Versão: `^4.21.2`

- **express-session**: Middleware para gerenciar sessões de usuário.
  - Versão: `^1.18.1`

- **helmet**: Middleware para proteger o aplicativo Express de vulnerabilidades comuns.
  - Versão: `^8.0.0`

- **method-override**: Middleware para modificar o método HTTP de uma requisição (por exemplo, usando `POST` para simular um `DELETE`).
  - Versão: `^3.0.0`

- **nodemon**: Ferramenta de desenvolvimento que reinicia o servidor automaticamente ao detectar mudanças no código.
  - Versão: `^3.1.9`

- **typescript**: Suporte para TypeScript no projeto.
  - Versão: `^5.7.3`

## Dependências de Desenvolvimento (Dev Dependencies)

As dependências de desenvolvimento são bibliotecas e ferramentas necessárias apenas para desenvolvimento:

- **@types/bcrypt**: Tipagens TypeScript para a biblioteca `bcrypt`.
  - Versão: `^5.0.2`

- **@types/ejs**: Tipagens TypeScript para a biblioteca `ejs`.
  - Versão: `^3.1.5`

- **@types/express**: Tipagens TypeScript para o framework `express`.
  - Versão: `^5.0.0`

- **@types/express-session**: Tipagens TypeScript para o middleware `express-session`.
  - Versão: `^1.18.1`

- **@types/method-override**: Tipagens TypeScript para o middleware `method-override`.
  - Versão: `^3.0.0`

- **@types/node**: Tipagens TypeScript para as APIs nativas do Node.js.
  - Versão: `^22.10.7`

- **@types/nodemon**: Tipagens TypeScript para o `nodemon`.
  - Versão: `^1.19.6`

- **prisma**: Ferramenta para geração e migração de banco de dados com Prisma ORM.
  - Versão: `^6.2.1`


## Como instalar 

1.Clone este repositorio

```bash 

git clone <url-do-repositorio>

cd <nome-do-diretorio>

npm install

npm run dev
