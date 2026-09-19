# Novo TV Time

MVP de uma plataforma de descoberta de filmes e séries, inspirada no TV Time, feito em **React + Vite** consumindo a API do **TMDb**.

## Participantes

* **Nome:** Luiz Ademário — **RM:** 571182
* **Nome:** Lucas Gaspar — **RM:** 568616
* **Nome:** Gustavo Noleto — **RM:** 569592

## Funcionalidades

* **Home**: banner de destaque com o item em alta da semana + fileiras de filmes e séries populares.

* **Busca**: pesquisa de filmes e séries por nome.

* **Detalhes** (`/detalhes/:media_type/:id`): pôster, nota, gêneros, sinopse completa, e botões para marcar como favorito/assistido.

* **Minha Lista** (`/minha-lista`): itens salvos, filtráveis por Todos / Favoritos / Assistidos, persistidos em `localStorage`.

## Como rodar

1. Instale as dependências (o `package.json` já inclui `react-router-dom`, `axios` e `lucide-react`):

   ```bash
   npm install
   ```

2. Copie `.env.example` para `.env` e cole seu **API Read Access Token** da TMDb (gerado em [themoviedb.org](https://www.themoviedb.org/settings/api), seção "API"):

   ```bash
   cp .env.example .env
   ```

3. Rode o servidor de desenvolvimento:

   ```bash
   npm run dev
   ```

## Documentação do projeto

* [`docs/requirements.md`](./docs/requirements.md) — objetivo, user stories e critérios de aceitação.
* [`docs/architecture.md`](./docs/architecture.md) — rotas, componentes, props/estados/efeitos e fluxo de dados.
* [`docs/references/references.md`](./docs/references/references.md) — referências visuais e o que foi aproveitado de cada uma.

## Notas

* Os arquivos `src/App.css` e as imagens de exemplo do template original (`src/assets/hero.png`, `react.svg`, `vite.svg`) não são mais usados e podem ser removidos.
* Não há autenticação: a lista pessoal é local ao navegador.
