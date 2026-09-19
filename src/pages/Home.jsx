import { useEffect, useState } from 'react'
import { getTrending, getPopularMovies, getPopularSeries } from '../api/tmdb'
import HeroBanner from '../components/HeroBanner'
import MediaRow from '../components/MediaRow'
import LoadingState from '../components/LoadingState'
import './Home.css'

const initialSection = { data: [], status: 'loading' }

export default function Home() {
  const [trending, setTrending] = useState(initialSection)
  const [movies, setMovies] = useState(initialSection)
  const [series, setSeries] = useState(initialSection)

  useEffect(() => {
    getTrending()
      .then((data) => setTrending({ data, status: 'success' }))
      .catch(() => setTrending({ data: [], status: 'error' }))

    getPopularMovies()
      .then((data) => setMovies({ data, status: 'success' }))
      .catch(() => setMovies({ data: [], status: 'error' }))

    getPopularSeries()
      .then((data) => setSeries({ data, status: 'success' }))
      .catch(() => setSeries({ data: [], status: 'error' }))
  }, [])

  const heroItem = trending.data[0]

  return (
    <div>
      {trending.status === 'loading' && (
        <div className="home-hero-loading">
          <LoadingState message="Carregando destaque…" />
        </div>
      )}
      {trending.status === 'success' && heroItem && <HeroBanner item={heroItem} />}

      <div className="container">
        <MediaRow title="Filmes Populares" items={movies.data} mediaType="movie" status={movies.status} />
        <MediaRow title="Séries Populares" items={series.data} mediaType="tv" status={series.status} />
      </div>
    </div>
  )
}
