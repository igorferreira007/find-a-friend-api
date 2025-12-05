# Find A Friend API

> API para gerenciar organizações e pets para adoção.

## Descrição

Esta é uma API que oferece endpoints para cadastro e autenticação de organizações (`orgs`) e para criação, listagem e consulta de pets disponíveis para adoção.

O projeto usa Fastify como servidor HTTP, TypeScript como linguagem, e Prisma como ORM para PostgreSQL.

## Tecnologias

- **Node.js**
- **TypeScript**
- **Fastify**
- **Prisma** (PostgreSQL)
- **Vitest** (testes unitários e e2e)
- **tsx** (execução em TS no dev)
- **tsup** (build)

## Pré-requisitos

- Node.js (recomenda-se v18+)
- PostgreSQL (ou outra forma de prover a variável `DATABASE_URL`)
- Um gerenciador de pacotes: `npm`, `yarn` ou `pnpm`

## Instalação

1. Clone o repositório:

```
git clone <repo-url>
cd api-find-a-friend
```

2. Instale as dependências:

```bash
npm install
```

3. Inicie em modo de desenvolvimento:

```bash
npm run dev
```

### Executando com Docker Compose

Este repositório já inclui um `docker-compose.yml` que inicializa um container PostgreSQL. Ele é útil para subir rapidamente um banco de dados local sem instalar o Postgres diretamente na máquina.

Comandos básicos:

```bash
docker compose up -d
```

Após o Postgres estar rodando no container, rode as migrations e gere o client do Prisma:

```bash
# com a variável DATABASE_URL apontando para o container
npx prisma migrate dev --name init
npx prisma generate
```

## Variáveis de ambiente

O projeto usa as seguintes variáveis (definidas via `.env`):

- `NODE_ENV` : `dev` | `test` | `production` (padrão: `dev`)
- `JWT_SECRET` : chave secreta para geração de tokens JWT (obrigatório)
- `PORT` : porta onde o servidor irá escutar (padrão: `3333`)
- `DATABASE_URL` : string de conexão com o banco (ex.: `postgresql://user:pass@host:5432/dbname`)

Exemplo mínimo de `.env`:

```
NODE_ENV=dev
PORT=3333
JWT_SECRET=sua_chave_super_secreta
DATABASE_URL=postgresql://user:pass@localhost:5432/find-a-friend
```

## Scripts úteis

Os scripts disponíveis no `package.json`:

- `npm run dev` — executa o servidor em modo desenvolvimento (`tsx watch src/server.ts`).
- `npm run build` — build do projeto com `tsup` para `./build`.
- `npm run start` — executa a build (espera `build/server.js`).
- `npm run test` — executa os testes unitários (`vitest --project unit`).
- `npm run test:e2e` — executa os testes de integração/e2e (`vitest --project e2e`).
- `npm run test:watch` — roda os testes unitários em modo watch.
- `npm run test:e2e:watch` — roda os testes e2e em modo watch.
- `npm run test:coverage` — gera relatório de cobertura de testes.
- `npm run test:ui` — abre a UI do Vitest.

Exemplo:

```bash
# rodar testes e2e
npm run test:e2e
```

## Banco de dados & Prisma

O projeto usa Prisma com PostgreSQL. Principais comandos:

```bash
# gerar client (rodar após alterar schema)
npx prisma generate

# criar/rodar migrations (dev)
npx prisma migrate dev --name <nome_migration>

# aplicar migrations em produção
npx prisma migrate deploy
```

Os modelos de dados estão definidos em `prisma/schema.prisma`.

## Testes

Os testes usam `vitest` e estão organizados por projetos (`unit` e `e2e`).

Comandos básicos:

```bash
# executar todos os testes
npm run test

# executar testes e2e
npm run test:e2e

# executar testes em watch
npm run test:watch

# executar testes e2e em watch
npm run test:e2e:watch
```

## Estrutura do projeto (resumo)

- `src/server.ts` — arquivo de entrada do servidor.
- `src/app.ts` — instancia e configura o Fastify.
- `src/routes` — definições de rotas da API.
- `src/controllers` — handlers das rotas.
- `src/use-cases` — regras de negócio / casos de uso.
- `src/repositories` — abstrações e implementações de repositório (in-memory e prisma).
- `prisma/` — schema e migrations do Prisma.
