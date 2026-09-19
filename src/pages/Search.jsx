import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { searchMulti } from '../api/tmdb'
import MediaGrid from '../components/MediaGrid'
import './Search.css'

export default function Search() {
  const [searchParams] = useSearchParams()
  const query = searchParams.get('q') ?? ''

  const [results, setResults] = useState([])
  const [status, setStatus] = useState('loading')

  useEffect(() => {
    if (!query) {
      setResults([])
      setStatus('success')
      return
    }

    setStatus('loading')
    searchMulti(query)
      .then((data) => {
        setResults(data)
        setStatus('success')
      })
      .catch(() => setStatus('error'))
  }, [query])

  return (
    <div className="container">
      <h1 className="section-title" style={{ marginTop: 40 }}>
        {query ? `Resultados para "${query}"` : 'Buscar'}
      </h1>
      <MediaGrid
        items={results}
        status={status}
        emptyTitle={query ? 'Nenhum resultado encontrado' : 'Digite algo para buscar'}
        emptyMessage={
          query
            ? 'Tente outro título, ou verifique a grafia.'
            : 'Use o campo de busca na barra lateral para encontrar filmes e séries.'
        }
      />
    </div>
  )
}
