import axios from 'axios'

const tmdb = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
  headers: {
    Authorization: `Bearer ${import.meta.env.VITE_TMDB_API_KEY}`,
    'Content-Type': 'application/json',
  },
  params: {
    language: 'pt-BR',
  },
})

/** Item nº1 da semana em alta (filme ou série). */
export async function getTrending() {
  const { data } = await tmdb.get('/trending/all/week')
  return data.results
}

/** Filmes populares no momento. */
export async function getPopularMovies() {
  const { data } = await tmdb.get('/movie/popular')
  return data.results
}

/** Séries populares no momento. */
export async function getPopularSeries() {
  const { data } = await tmdb.get('/tv/popular')
  return data.results
}

/**
 * Detalhes completos de um filme ou série.
 * @param {'movie'|'tv'} mediaType
 * @param {string|number} id
 */
export async function getDetails(mediaType, id) {
  const { data } = await tmdb.get(`/${mediaType}/${id}`)
  return data
}

/** Busca combinada (filmes, séries e pessoas — pessoas são filtradas fora). */
export async function searchMulti(query) {
  const { data } = await tmdb.get('/search/multi', {
    params: { query, include_adult: false },
  })
  return data.results.filter((item) => item.media_type === 'movie' || item.media_type === 'tv')
}

export const IMG_BASE = 'https://image.tmdb.org/t/p'
