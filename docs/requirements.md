# Requisitos — Novo TV Time

## 1. Objetivo

Construir uma plataforma web responsiva para **descoberta de filmes e séries**, permitindo ao
usuário explorar conteúdos em alta e populares, visualizar sinopses e informações detalhadas, e
organizar o que já assistiu ou deseja assistir em uma lista pessoal.

O MVP consome dados reais da **API pública do TMDb (The Movie Database)** e mantém a lista pessoal
do usuário persistida em `localStorage`, sem backend próprio.

## 2. Público-alvo

Entusiastas de cinema e séries que já usam apps como TV Time, Letterboxd ou Trakt para acompanhar
o que assistem, e que querem uma forma rápida de descobrir o que está em alta e não perder o
controle do que já viram.

## 3. User Stories

### US-01 — Descobrir conteúdos em alta
> Como usuário, quero ver na página inicial os filmes e séries em alta e populares no momento,
> para descobrir o que assistir sem precisar pesquisar manualmente.

**Critérios de aceitação**
- A home exibe um banner de destaque com o item nº1 em "Trending" da semana.
- A home exibe uma seção "Filmes Populares" e uma seção "Séries Populares", cada uma com no
  mínimo 10 itens vindos da API.
- Enquanto os dados carregam, um estado de carregamento é exibido em cada seção.
- Se uma chamada à API falhar, a seção correspondente exibe uma mensagem de erro amigável, sem
  quebrar o restante da página.

### US-02 — Buscar um filme ou série específico
> Como usuário, quero buscar por nome um filme ou série, para encontrar rapidamente um conteúdo
> específico que eu já tenho em mente.

**Critérios de aceitação**
- Existe um campo de busca acessível a partir do layout principal (sidebar).
- Ao digitar e confirmar a busca, o usuário vê os resultados correspondentes (filmes e séries)
  em `/buscar?q=termo`.
- Se a busca não retornar nenhum resultado, é exibido um estado vazio explicando a situação e
  sugerindo tentar outro termo.

### US-03 — Ver detalhes de um conteúdo
> Como usuário, quero abrir a página de detalhes de um filme ou série, para ler a sinopse
> completa e ver informações como nota, gêneros e ano, antes de decidir assistir.

**Critérios de aceitação**
- Ao clicar em um card (na home, na busca ou na minha lista), o usuário é levado para
  `/detalhes/:media_type/:id`.
- A página exibe pôster, título, ano, nota (rating), gêneros e sinopse completa.
- Enquanto os detalhes carregam, um estado de carregamento é exibido.
- Se o item não existir ou a API falhar, é exibida uma mensagem de erro com opção de voltar.

### US-04 — Organizar favoritos e assistidos
> Como usuário, quero marcar um filme ou série como "favorito" ou "assistido", para manter minha
> lista pessoal organizada e consultá-la depois.

**Critérios de aceitação**
- Na página de detalhes, existem dois botões independentes: "Adicionar aos Favoritos" e "Marcar
  como Assistido". Cada um alterna entre ativado/desativado (toggle).
- O estado dos botões é persistido em `localStorage` e restaurado ao recarregar a página.
- A página `/minha-lista` exibe todos os itens marcados, com filtros para "Todos", "Favoritos" e
  "Assistidos".
- Se a lista (ou o filtro ativo) estiver vazia, é exibido um estado vazio convidando o usuário a
  explorar a home.

## 4. Regras do produto

- Um item pode estar em favoritos, assistidos, ambos, ou nenhum — os dois estados são
  independentes um do outro.
- Não há autenticação: a lista pessoal é local ao navegador (sem sincronização entre
  dispositivos). Isso é assumido conscientemente como limitação do MVP.
- `media_type` (`movie` ou `tv`) é sempre tratado explicitamente, já que a TMDb usa endpoints e
  campos de título diferentes para cada tipo (`title`/`release_date` para filme,
  `name`/`first_air_date` para série).
- A aplicação deve permanecer usável em telas de celular (≥ 360px de largura); a sidebar colapsa
  para navegação inferior/compacta nesse breakpoint.
