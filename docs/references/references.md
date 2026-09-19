# Referências Visuais — Novo TV Time

> As imagens originais podem ser salvas em `docs/references/imagens/`. Abaixo, a descrição de
> cada referência e o que foi efetivamente aproveitado no MVP.

## Referência 1 — Dashboard em Dark Mode

**Padrão observado:** sidebar lateral escura fixa com navegação por ícone + label, área de
conteúdo à direita com cards organizados em carrossel/grid, forte contraste entre fundo escuro e
cards de destaque.

**O que foi aplicado no projeto:**
- `Sidebar` fixa à esquerda (colapsa para navegação inferior compacta em telas pequenas).
- Fundo global escuro (`--bg`, `--surface`) com pôsteres/imagens como principal fonte de cor.
- Seções "Em Alta", "Filmes Populares" e "Séries Populares" organizadas como linhas horizontais
  roláveis (`MediaRow`), inspiradas no carrossel do dashboard de referência.

## Referência 2 — Página de Detalhes de Conteúdo

**Padrão observado:** pôster grande em destaque à esquerda, painel lateral/direito com
metadados (nota, ano, categoria) e sinopse, hierarquia clara entre imagem e texto.

**O que foi aplicado no projeto:**
- `pages/Details` usa layout de duas colunas em telas largas: pôster fixo à esquerda, e à direita
  título, `RatingBadge`, gêneros (pills), ano/duração e sinopse completa.
- Em telas estreitas, as colunas empilham (pôster acima, informações abaixo).
- Botões de ação ("Adicionar aos Favoritos" / "Marcar como Assistido") ficam logo abaixo do
  título, sempre visíveis sem precisar rolar muito.

## Referência 3 — Navegação por Categorias (estilo Netflix/Spotify)

**Padrão observado:** navegação fluida por categorias/seções temáticas, hero banner de destaque
no topo, fileiras horizontais de cards que se repetem por categoria.

**O que foi aplicado no projeto:**
- `HeroBanner` no topo da Home, com imagem de fundo (backdrop) do item nº1 em trending da semana.
- Fileiras horizontais (`MediaRow`) para cada categoria de conteúdo, com scroll horizontal em vez
  de paginação — reforça a sensação de "vitrine" de streaming.
- Cards com hover sutil (leve aumento de brilho/escala) em vez de sombra genérica, para manter a
  identidade "cinema/streaming" da referência.
