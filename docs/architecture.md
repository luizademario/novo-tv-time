# Arquitetura — Novo TV Time

## 1. Stack

- **React 19** + **Vite** (já configurados no projeto)
- **react-router-dom** — rotas e navegação
- **axios** — cliente HTTP para a API do TMDb
- **lucide-react** — ícones
- Estado global simples via **Context API** (`MyListContext`), sem Redux/Zustand
- Persistência client-side via `localStorage`

## 2. Rotas

| Rota | Componente | Descrição |
|---|---|---|
| `/` | `pages/Home` | Descoberta: banner em destaque + grids de populares |
| `/buscar` | `pages/Search` | Resultados de busca (lê `?q=` da URL) |
| `/detalhes/:media_type/:id` | `pages/Details` | Detalhes de um filme (`movie`) ou série (`tv`) |
| `/minha-lista` | `pages/MyList` | Itens favoritados/assistidos, com filtro |
| `*` | `pages/NotFound` | Rota não encontrada |

Todas as rotas são filhas de um `Layout` (via `<Outlet />`) que renderiza a `Sidebar` fixa.

## 3. Estrutura de pastas (dentro de `src/`)

```
src/
├── api/
│   └── tmdb.js              # instância axios + funções de chamada à API
├── context/
│   └── MyListContext.jsx    # Provider global da lista pessoal (localStorage)
├── hooks/
│   └── useMyList.js         # hook de acesso ao MyListContext
├── components/
│   ├── layout/
│   │   ├── Sidebar.jsx / .css
│   │   └── Layout.jsx / .css
│   ├── MediaCard.jsx / .css       # card de pôster (filme ou série)
│   ├── MediaRow.jsx / .css        # linha horizontal (carrossel) de MediaCard
│   ├── MediaGrid.jsx / .css       # grid responsivo de MediaCard (busca/lista)
│   ├── HeroBanner.jsx / .css      # banner de destaque (trending #1)
│   ├── RatingBadge.jsx / .css     # nota em badge circular
│   ├── LoadingState.jsx / .css    # spinner de carregamento
│   └── EmptyState.jsx / .css      # estado vazio / erro reutilizável
├── pages/
│   ├── Home.jsx / .css
│   ├── Search.jsx / .css
│   ├── Details.jsx / .css
│   ├── MyList.jsx / .css
│   └── NotFound.jsx / .css
├── App.jsx                  # definição das <Routes>
└── main.jsx                 # BrowserRouter + MyListProvider + App
```

## 4. Componentes, Props, Estados e Efeitos

### `Layout`
- Sem props. Renderiza `Sidebar` + `<Outlet />` para a página ativa.

### `Sidebar`
- **Estado:** `searchTerm` (`useState`) — valor do campo de busca.
- **Comportamento:** ao submeter a busca, navega para `/buscar?q=searchTerm` via `useNavigate`.
- Links de navegação usam `NavLink` para destacar a rota ativa.

### `HeroBanner`
- **Props:** `item` (objeto de mídia da TMDb), `mediaType`.
- Sem estado próprio; é "burro" (apresentacional). O card clicável leva para `/detalhes/...`.

### `MediaCard`
- **Props:** `item`, `mediaType`.
- Sem estado; exibe pôster, título, ano e `RatingBadge`. É um `Link` para a página de detalhes.

### `MediaRow` / `MediaGrid`
- **Props:** `title` (opcional, só no `MediaRow`), `items`, `mediaType`, `loading`, `error`.
- Sem estado próprio; decide entre `LoadingState`, `EmptyState` ou a lista de `MediaCard`.

### `RatingBadge`
- **Props:** `value` (nota de 0–10).
- Calcula cor/estilo com base na nota (função pura, sem estado).

### `LoadingState` / `EmptyState`
- **Props:** `message`, e no `EmptyState` opcionalmente `actionLabel` + `onAction`.

### `pages/Home`
- **Estado:** `trending`, `movies`, `series` (dados), e um objeto `status` por seção
  (`loading` | `success` | `error`).
- **Efeito:** um único `useEffect` no mount dispara as 3 chamadas (`getTrending`,
  `getPopularMovies`, `getPopularSeries`) em paralelo, atualizando cada seção
  independentemente conforme cada Promise resolve.

### `pages/Search`
- **Estado:** `results`, `status`.
- **Efeito:** `useEffect` com dependência no parâmetro `q` da URL (`useSearchParams`); dispara
  `searchMulti(q)` sempre que o termo muda.

### `pages/Details`
- **Estado:** `item` (detalhes completos), `status`.
- **Efeito:** `useEffect` com dependência em `[media_type, id]` (via `useParams`); busca
  `getDetails(media_type, id)`.
- Usa `useMyList()` para ler/alternar os estados de favorito e assistido deste item específico.

### `pages/MyList`
- **Estado:** `filter` (`'todos' | 'favoritos' | 'assistidos'`).
- Sem `useEffect` de rede — lê diretamente do `MyListContext`.

### `context/MyListContext`
- **Estado:** array `items`, cada item no formato:
  ```js
  { id, media_type, title, poster_path, favorito: boolean, assistido: boolean }
  ```
- **Efeito:** um `useEffect` sincroniza `items` com `localStorage` a cada mudança; leitura
  inicial acontece via `useState(() => JSON.parse(localStorage.getItem(...)) ?? [])`.
- **Funções expostas:** `toggleFavorito(item)`, `toggleAssistido(item)`, `getStatus(id, media_type)`.

## 5. Camada de API (`api/tmdb.js`)

- Instância `axios.create` com `baseURL: https://api.themoviedb.org/3` e o token da TMDb lido de
  `import.meta.env.VITE_TMDB_API_KEY` (Bearer token via header `Authorization`).
- Funções exportadas: `getTrending()`, `getPopularMovies()`, `getPopularSeries()`,
  `getDetails(mediaType, id)`, `searchMulti(query)`.
- Cada função apenas retorna os dados já tratados (`response.data`); tratamento de erro/loading
  fica nas páginas, que envolvem as chamadas em `try/catch`.

## 6. Fluxo de dados (resumo)

```
TMDb API  →  api/tmdb.js  →  useEffect da página  →  useState da página  →  render (MediaRow/Grid)
                                                                 │
localStorage  ⇄  MyListContext  ⇄  useMyList()  ⇄  Details / MyList (favoritos e assistidos)
```
